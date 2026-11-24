from pathlib import Path
from collections import Counter
from decimal import Decimal
import argparse,csv,io,json,zipfile

parser=argparse.ArgumentParser()
parser.add_argument('source_zip',type=Path)
args=parser.parse_args()
root=Path(__file__).resolve().parent
z=zipfile.ZipFile(args.source_zip)
def rows(name):
    result=list(csv.DictReader(io.TextIOWrapper(z.open('02_GOLD_ANSWER/target_csv/'+name+'.csv'),encoding='utf-8-sig')))
    assert all(r['is_synthetic']=='Y' for r in result)
    return result
c,t,p,l,g=(rows(n) for n in ['dim_customer','fact_cbs_transaction','fact_payment','dim_loan_account','fact_gl_journal'])
assert [len(x) for x in [c,t,p,l,g]]==[1000,20000,3000,500,40000]
def put(path,obj):
    f=root/path;f.parent.mkdir(parents=True,exist_ok=True)
    f.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
fabric='https://developer.microsoft.com/json-schemas/fabric/'
definition=fabric+'item/report/definition/'
def schema(stem,version):return definition+stem+'/'+version+'/schema.json'
report='Banking.Report'
model='Banking.SemanticModel'
put('Banking.pbip',{'$schema':fabric+'pbip/pbipProperties/1.0.0/schema.json','version':'1.0','artifacts':[{'report':{'path':report}}],'settings':{'enableAutoRecovery':True}})
put(report+'/definition.pbir',{'$schema':fabric+'item/report/definitionProperties/2.0.0/schema.json','version':'4.0','datasetReference':{'byPath':{'path':'../'+model}}})
put(model+'/definition.pbism',{'$schema':fabric+'item/semanticModel/definitionProperties/1.0.0/schema.json','version':'1.0','settings':{}})
tables=[]
def table(name,category,values,measure):
    values=sorted(values.items())
    data=[[k,int(v)] for k,v in values]
    expr='let Rows = Json.Document('+json.dumps(json.dumps(data,ensure_ascii=False),ensure_ascii=False).replace('\\"','""')+'), T = #table({"'+category+'","Số lượng"}, Rows), Typed = Table.TransformColumnTypes(T, {{"'+category+'", type text}, {"Số lượng", Int64.Type}}) in Typed'
    tables.append({'name':name,'columns':[{'name':category,'dataType':'string','sourceColumn':category,'summarizeBy':'none'},{'name':'Số lượng','dataType':'int64','sourceColumn':'Số lượng','isHidden':True,'summarizeBy':'sum'}],'measures':[{'name':measure,'expression':"SUM('"+name+"'[Số lượng])",'formatString':'#,0'}],'partitions':[{'name':name,'mode':'import','source':{'type':'m','expression':expr}}]})
    return [name,category,measure]
kpis=[table(n,'Nhãn',{'Tổng':len(seq)},m) for n,seq,m in [('Khách hàng',c,'Khách hàng CIF'),('Giao dịch',t,'Giao dịch Core'),('Thanh toán',p,'Lệnh thanh toán'),('Khoản vay',l,'Tài khoản vay')]]
tx=table('Xu hướng Core','Tháng',Counter(x['transaction_date'][:7] for x in t),'Số giao dịch theo tháng')
currency=table('Tiền tệ Core','Tiền tệ',Counter(x['currency_code'] for x in t),'Số giao dịch theo tiền tệ')
channel=table('Kênh Core','Kênh',Counter(x['channel_code'] for x in t),'Số giao dịch theo kênh')
pay=table('Kết quả thanh toán','Trạng thái',Counter(x['status'] for x in p),'Số lệnh theo trạng thái')
kyc=table('Hồ sơ KYC','Trạng thái',Counter(x['kyc_status'] for x in c),'Số CIF theo KYC')
loan=table('Danh mục vay','Trạng thái',Counter(x['loan_status'] for x in l),'Số khoản vay theo trạng thái')
gls=Counter()
for x in g:gls[(x['journal_id'],x['currency_code'])]+=Decimal(x['debit_amount'] or '0')-Decimal(x['credit_amount'] or '0')
gl=table('Kiểm soát GL','Kết quả',Counter('Cân' if not value else 'Lệch' for value in gls.values()),'Số journal theo kết quả')
put(model+'/model.bim',{'name':'Banking','compatibilityLevel':1601,'model':{'culture':'vi-VN','defaultPowerBIDataSourceVersion':'powerBI_V3','tables':tables}})
folder=report+'/definition'
put(folder+'/version.json',{'$schema':schema('versionMetadata','1.0.0'),'version':'2.0.0'})
theme={'name':'Banking Operations','dataColors':['#116B72','#E3A043','#4D61AA','#8B5B92','#607083'],'background':'#EDF3F8','foreground':'#13273C','tableAccent':'#116B72'}
put(report+'/StaticResources/RegisteredResources/Banking.json',theme)
put(folder+'/report.json',{'$schema':schema('report','2.0.0'),'themeCollection':{'customTheme':{'name':'Banking.json','reportVersionAtImport':'5.59','type':'RegisteredResources'}},'resourcePackages':[{'name':'RegisteredResources','type':'RegisteredResources','items':[{'name':'Banking.json','path':'Banking.json','type':'CustomTheme'}]}]})
ids=['BankingOverview','BankingControls']
put(folder+'/pages/pages.json',{'$schema':schema('pagesMetadata','1.0.0'),'pageOrder':ids,'activePageName':ids[0]})
def literal(x):return {'expr':{'Literal':{'Value':x}}}
def visual(page,name,pos,kind=None,fields=None,title=None,heading=None):
    x,y,w,h=pos
    spec={'$schema':schema('visualContainer','2.0.0'),'name':name,'position':dict(x=x,y=y,width=w,height=h,z=0)}
    if heading:
        v={'visualType':'textbox','objects':{'general':[{'properties':{'paragraphs':[{'textRuns':[{'value':heading,'textStyle':{'fontSize':'26pt','fontWeight':'bold','color':'#13273C'}}]}]}}]}}
    else:
        entity,category,measure=fields
        def projection(field,typ):
            return {'field':{typ:{'Expression':{'SourceRef':{'Entity':entity}},'Property':field}},'queryRef':entity+'.'+field,'nativeQueryRef':field,'active':True}
        state={('Values' if kind=='card' else 'Y'):{'projections':[projection(measure,'Measure')]}}
        if kind!='card': state['Category']={'projections':[projection(category,'Column')]}
        v={'visualType':kind,'query':{'queryState':state},'visualContainerObjects':{'title':[{'properties':{'show':literal('true'),'text':literal("'"+title+"'")}}]}}
    spec['visual']=v
    put(folder+f'/pages/{page}/visuals/{name}/visual.json',spec)
for i,page in enumerate(ids):
    put(folder+f'/pages/{page}/page.json',{'$schema':schema('page','2.0.0'),'name':page,'displayName':['Tổng quan vận hành','Thanh toán & kiểm soát'][i],'displayOption':'FitToPage','width':1280,'height':720})
    visual(page,'Title',(24,18,1232,70),heading=['Vận hành ngân hàng | Tổng quan','Vận hành ngân hàng | Kiểm soát'][i])
for i,f in enumerate(kpis):
    visual(ids[0],f'KPI{i}',(24+i*312,100,296,116),'card',f,f[2])
visual(ids[0],'Trend',(24,232,800,268),'lineChart',tx,'Số giao dịch theo tháng')
visual(ids[0],'Currency',(840,232,416,268),'columnChart',currency,'Số giao dịch theo tiền tệ')
visual(ids[0],'Channel',(24,516,1232,180),'barChart',channel,'Số giao dịch theo kênh')
for i,(f,title) in enumerate(zip([pay,kyc,loan,gl],['Trạng thái lệnh thanh toán','Tình trạng KYC','Trạng thái khoản vay','Đối soát Nợ/Có theo journal'])):
    visual(ids[1],f'Check{i}',(24+(i%2)*624,100+(i//2)*304,608,288),'columnChart',f,title)
with (root/'metrics.csv').open('w',encoding='utf-8',newline='') as out:
    writer=csv.writer(out);writer.writerow(['metric','value'])
    writer.writerows([('customer_count',len(c)),('transaction_count',len(t)),('payment_count',len(p)),('loan_count',len(l)),('gl_line_count',len(g)),('gl_journal_currency_count',len(gls)),('gl_unbalanced_count',sum(v!=0 for v in gls.values()))])
print((root/'metrics.csv').read_text())
