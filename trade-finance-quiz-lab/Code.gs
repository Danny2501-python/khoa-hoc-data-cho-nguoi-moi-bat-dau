/**
 * TRADE FINANCE QUIZ LAB — multi-user Google Apps Script backend
 * Store results in Google Sheets. Run setupTradeFinanceQuiz() once before deploying.
 * Questions and correct answers are kept on the server, never sent before submission.
 */
const TF_HEADERS = {
  Exams: ['id','title','question_ids','duration_min','created_at','status','categories','level'],
  Attempts: ['id','exam_id','name','participant_code','started_at','finished_at','status','score','total','percent','elapsed_seconds','answers_json','topic_json','question_ids']
};
const TF_PROPS = PropertiesService.getScriptProperties();
// Lazy getters: Apps Script can initialize .gs files in different orders.
function getCategories_(){return QUESTION_BANK_DATA.meta.categories;}
function getQuestions_(){return QUESTION_BANK_DATA.questions;}
var _tfQuestionCache,_tfCategoryCache;
function getQuestionMap_(){return _tfQuestionCache||(_tfQuestionCache=Object.fromEntries(getQuestions_().map(q=>[q.id,q])));}
function getCategoryMap_(){return _tfCategoryCache||(_tfCategoryCache=Object.fromEntries(getCategories_().map(c=>[c.id,c])));}

/**
 * V6.1: lightweight web entry point.
 * Does not read Google Sheets in doGet. Uses public catalog snapshot,
 * refreshed by owner from Apps Script editor and on subsequent admin changes.
 */
function doGet(e){
  const p = (e && e.parameter) || {};
  if (String(p.health || '') === '1') {
    return HtmlService.createHtmlOutput(
      '<!doctype html><html lang="vi"><meta charset="utf-8"><body style="font:16px sans-serif;padding:24px">' +
      '<h2>Trade Finance Quiz – Web App đang chạy</h2>' +
      '<p>Version: TF_V6_1_PUBLIC_CATALOG</p>' +
      '<p>Nếu trang này mở được nhưng trang chủ lỗi, kiểm tra Apps Script → Lượt thực thi.</p>' +
      '</body></html>'
    ).setTitle('Trade Finance – Health Check');
  }
  if (String(p.diagnose || '') === '1') {
    // Existing V5 diagnostics: server-side access and exam status (no secrets).
    const report = tfDiagnoseWeb_();
    return HtmlService.createHtmlOutput(
      '<!doctype html><html lang="vi"><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<body style="background:#f3f6fc;color:#142645;padding:24px;font:16px system-ui">' +
      '<h2>Trade Finance Quiz – Chẩn đoán web</h2>' +
      '<pre style="white-space:pre-wrap;background:white;padding:20px;border-radius:12px">' +
      JSON.stringify(report, null, 2) + '</pre>' +
      '<p>Không chứa mật khẩu, email hoặc ID Google Sheets.</p></body></html>'
    ).setTitle('Chẩn đoán Trade Finance Quiz');
  }
  try {
    const t = HtmlService.createTemplateFromFile('Index');
    t.initialExamId = String(p.exam||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,64);
    t.initialAdmin = String(p.admin||'') === '1';
    let publicCatalog = {appUrl:'', exams:[], categories:[], questionCount:0};
    try {
      const saved = TF_PROPS.getProperty('TF_PUBLIC_CATALOG');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.exams)) publicCatalog = parsed;
      }
    } catch (catalogError) {
      Logger.log('Invalid public catalog cache: '+String(catalogError.message||catalogError));
    }
    // The index file uses <?!= initialBootstrapJson ?>. Only metadata, no answers.
    t.initialBootstrapJson = JSON.stringify(publicCatalog)
      .replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026')
      .replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
    return t.evaluate().setTitle('Trade Finance Quiz Lab | Thi online & Thống kê')
      .addMetaTag('viewport','width=device-width, initial-scale=1.0');
  } catch (err) {
    Logger.log('Web page render failed: '+String(err&&err.stack||err));
    return HtmlService.createHtmlOutput(
      '<!doctype html><html lang="vi"><meta charset="utf-8"><body style="font:16px system-ui;padding:24px">'+
      '<h2>Không tải được giao diện Quiz Lab</h2>'+
      '<p>Lỗi khi dựng trang. Chủ ứng dụng hãy mở Apps Script → Lượt thực thi để xem chi tiết.</p>'+
      '<p>Bản kiểm tra: TF_V6_1_PUBLIC_CATALOG</p></body></html>'
    ).setTitle('Trade Finance – Web App Error');
  }
}

/** Run once as the owner. View > Logs shows the dashboard passcode and Sheet URL. */
function setupTradeFinanceQuiz(){
  let id=TF_PROPS.getProperty('SHEET_ID');
  if(!id){
    const ss=SpreadsheetApp.create('Trade Finance Quiz Lab — Kết quả & Phân tích');
    id=ss.getId();
    TF_PROPS.setProperty('SHEET_ID', id);
  }
  const ss=SpreadsheetApp.openById(id);
  Object.keys(TF_HEADERS).forEach(k=>{
    let sheet=ss.getSheetByName(k);
    if(!sheet)sheet=ss.insertSheet(k);
    if(sheet.getLastRow()===0)sheet.appendRow(TF_HEADERS[k]);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,TF_HEADERS[k].length).setBackground('#102e78').setFontColor('#ffffff').setFontWeight('bold');
  });
  const defaultSheet=ss.getSheetByName('Sheet1');
  if(defaultSheet && !defaultSheet.getLastRow() && ss.getSheets().length>1) ss.deleteSheet(defaultSheet);
  let pin=TF_PROPS.getProperty('ADMIN_PIN');
  if(!pin){pin=Utilities.getUuid().replace(/-/g,'').slice(0,14).toUpperCase(); TF_PROPS.setProperty('ADMIN_PIN',pin);}
  const exams=ss.getSheetByName('Exams');
  if(exams.getLastRow()===1){
    const idExam='DEMO-'+Utilities.getUuid().slice(0,8).toUpperCase();
    const qs=chooseQuestions_(getQuestions_(),30,idExam);
    exams.appendRow([idExam,'Đề tổng hợp Trade Finance · 30 câu',qs.map(q=>q.id).join(','),35,new Date().toISOString(),'open','Tất cả','Tất cả']);
  }
  const output='Đã cấu hình Google Sheets và đề thi. Không hiển thị ADMIN_PIN trong log.';
  Logger.log(output);
  refreshTradeFinanceCatalogSafely_();
  return 'Đã thiết lập. Mã quản trị chỉ xem được trong Execution log của người sở hữu dự án.';
}

function sheet_(name){
  const id=TF_PROPS.getProperty('SHEET_ID');
  if(!id)throw Error('Chưa cài đặt. Chủ ứng dụng cần chạy setupTradeFinanceQuiz() trong Apps Script.');
  const sheet=SpreadsheetApp.openById(id).getSheetByName(name);
  if(!sheet)throw Error('Thiếu Sheet: '+name+'. Hãy chạy setupTradeFinanceQuiz().');
  return sheet;
}
function rows_(name){
  const sh=sheet_(name),n=sh.getLastRow();
  if(n<2)return [];
  const header=TF_HEADERS[name];
  return sh.getRange(2,1,n-1,header.length).getValues().map((a,i)=>{
    const o={_row:i+2};header.forEach((h,j)=>o[h]=String(a[j]==null?'':a[j]));return o;
  });
}
function assertAdmin_(pin){
  const real=TF_PROPS.getProperty('ADMIN_PIN');
  if(!real || typeof pin!=='string' || pin!==real)throw Error('Mã quản trị không chính xác.');
}
function safeCell_(v){
  let s=String(v==null?'':v).trim();
  // Prevent spreadsheet formula injection when exporting user-entered values.
  if(/^[\s]*[=+@\-]/.test(s)) s="'"+s;
  return s;
}
function hash32_(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0;}
function shuffled_(values, seed){
  const a=values.slice();let h=hash32_(String(seed));
  for(let i=a.length-1;i>0;i--){h=(Math.imul(h,1664525)+1013904223)>>>0;const j=Math.floor((h/4294967296)*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function chooseQuestions_(pool,count,seed){
  const buckets={};pool.forEach(q=>(buckets[q.category]||(buckets[q.category]=[])).push(q));
  const catIds=shuffled_(Object.keys(buckets),seed+'cats');
  catIds.forEach(c=>buckets[c]=shuffled_(buckets[c],seed+c));
  let picked=[];let any=true;
  while(picked.length<count&&any){any=false;catIds.forEach(c=>{if(picked.length<count && buckets[c].length){picked.push(buckets[c].shift());any=true;}});}
  return shuffled_(picked,seed+'final');
}
/** Upgrade compatible with existing Google Sheets; do not delete earlier results. */
function ensureAttemptSchema_(){
  const sh=sheet_('Attempts');
  if(String(sh.getRange(1,14).getValue()||'').trim()!=='question_ids'){
    sh.getRange(1,14).setValue('question_ids').setFontWeight('bold').setBackground('#102e78').setFontColor('#ffffff');
  }
}
function examPool_(e){
  const all=getQuestions_(),known=getCategoryMap_();
  const categories=String(e.categories||'').split(',').filter(id=>Boolean(known[id]));
  const level=['Cơ bản','Trung bình','Nâng cao'].includes(e.level)?e.level:null;
  const pool=all.filter(q=>(!categories.length||categories.includes(q.category))&&(!level||q.level===level));
  if(!pool.length)throw Error('Không có câu hỏi hợp lệ cho đề này.');
  return pool;
}
/**
 * Server assigns a new question selection for EACH attempt, favouring less-used
 * items and approximately matching the exam's topic + level blueprint.
 * When more questions are needed than the bank contains, overlap is unavoidable.
 */
function allocateForAttempt_(e,previous,attemptId){
  const blueprint=String(e.question_ids||'').split(',').filter(Boolean).map(id=>getQuestionMap_()[id]).filter(Boolean);
  const pool=examPool_(e),count=Math.min(pool.length,blueprint.length||20);
  const usage={};pool.forEach(q=>usage[q.id]=0);
  previous.filter(a=>a.exam_id===e.id).forEach(a=>{
    const oldIds=String(a.question_ids||e.question_ids||'').split(',').filter(Boolean);
    oldIds.forEach(id=>{if(Object.prototype.hasOwnProperty.call(usage,id))usage[id]++});
  });
  const byCat={};pool.forEach(q=>(byCat[q.category]||(byCat[q.category]=[])).push(q));
  const targets=blueprint.length?shuffled_(blueprint,attemptId+':target'):shuffled_(pool,attemptId+':fallback').slice(0,count);
  const used=new Set(),picked=[];
  targets.slice(0,count).forEach((slot,i)=>{
    let options=(byCat[slot.category]||[]).filter(q=>!used.has(q.id));
    if(!options.length)options=pool.filter(q=>!used.has(q.id));
    if(!options.length)return;
    // Reuse is minimized FIRST, then approximate the level on each slot.
    const sorted=shuffled_(options,attemptId+':slot:'+i).sort((a,b)=>
      (usage[a.id]-usage[b.id])||
      (Number(b.level===slot.level)-Number(a.level===slot.level))
    );
    const next=sorted[0];used.add(next.id);picked.push(next.id);
  });
  return shuffled_(picked,attemptId+':question-order');
}

function extractExam_(e){return {id:e.id,title:e.title,count:e.question_ids.split(',').filter(Boolean).length,duration:Number(e.duration_min)||0,status:e.status,categories:e.categories,level:e.level,createdAt:e.created_at};}
function isOpenExam_(e){return String(e.status||'').trim().toLowerCase()==='open';}
function getBootstrap(){
  const exams=rows_('Exams').filter(isOpenExam_).map(extractExam_).reverse();
  return {appUrl:ScriptApp.getService().getUrl()||'',exams:exams,categories:getCategories_(),questionCount:getQuestions_().length};
}
function getExamInfo(examId){
  const e=rows_('Exams').find(x=>x.id===String(examId));
  if(!e||!isOpenExam_(e))throw Error('Đề thi không tồn tại hoặc đã đóng.');
  return extractExam_(e);
}
function publicQuestion_(q,attemptId){
  const permutation=shuffled_([0,1,2,3],attemptId+':'+q.id);
  return {id:q.id,category:q.category,categoryLabel:(getCategoryMap_()[q.category]||{}).label||q.category,question:q.question,options:permutation.map(i=>q.options[i]),level:q.level};
}
/** Creates one participant attempt. Anonymous sessions are permitted, so identity is self-reported. */
function startAttempt(payload){
  payload=payload||{};
  const e=rows_('Exams').find(x=>x.id===String(payload.examId||''));
  if(!e||!isOpenExam_(e))throw Error('Đề thi đã đóng hoặc không tồn tại.');
  const name=String(payload.name||'').trim().slice(0,70);
  if(name.length<2)throw Error('Vui lòng nhập họ tên (ít nhất 2 ký tự).');
  const code=String(payload.participantCode||'').trim().slice(0,45);
  const attemptId=Utilities.getUuid(),startedAt=new Date().toISOString();
  const lock=LockService.getScriptLock();lock.waitLock(25000);
  let ids;
  try{
    ensureAttemptSchema_();
    // Read assigned IDs inside the lock so simultaneous participants get different sets.
    const previous=rows_('Attempts');
    const previousSets=new Set(previous.filter(a=>a.exam_id===e.id).map(a=>
      String(a.question_ids||e.question_ids||'').split(',').filter(Boolean).sort().join(',')));
    for(let retry=0;retry<12;retry++){
      ids=allocateForAttempt_(e,previous,attemptId+':'+retry);
      // For a full-bank exam distinct complete question sets are mathematically impossible.
      if(!previousSets.has(ids.slice().sort().join(',')))break;
    }
    if(!ids.length)throw Error('Không tạo được đề thi từ ngân hàng câu hỏi.');
    sheet_('Attempts').appendRow([attemptId,e.id,safeCell_(name),safeCell_(code),startedAt,'','started',0,ids.length,0,0,'','',ids.join(',')]);
  }finally{lock.releaseLock();}
  return {attemptId,startedAt,name,exam:extractExam_(e),questions:ids.map(id=>publicQuestion_(getQuestionMap_()[id],attemptId))};
}
function submitAttempt(payload){
  payload=payload||{};
  const attemptId=String(payload.attemptId||'');
  if(!/^[a-fA-F0-9-]{36}$/.test(attemptId))throw Error('Mã bài làm không hợp lệ.');
  const answers=payload.answers||{};
  if(!answers||typeof answers!=='object'||Array.isArray(answers))throw Error('Dữ liệu đáp án không hợp lệ.');
  const lock=LockService.getScriptLock();lock.waitLock(25000);
  try{
    const attempt=rows_('Attempts').find(a=>a.id===attemptId);
    if(!attempt)throw Error('Không tìm thấy bài làm.');
    if(attempt.status!=='started')throw Error('Bài này đã được nộp trước đó.');
    const e=rows_('Exams').find(x=>x.id===attempt.exam_id);
    if(!e)throw Error('Không tìm thấy đề thi gốc.');
    const ids=String(attempt.question_ids||e.question_ids||'').split(',').filter(Boolean);
    const topicMap={},review=[],cleanAnswers={};let correctCount=0, answered=0;
    ids.forEach(qid=>{
      const q=getQuestionMap_()[qid], order=shuffled_([0,1,2,3],attemptId+':'+qid);
      const idx=Object.prototype.hasOwnProperty.call(answers,qid)?Number(answers[qid]):-1;
      const chosen=Number.isInteger(idx)&&idx>=0&&idx<=3?idx:-1;
      cleanAnswers[qid]=chosen;
      const rightIndex=order.indexOf(q.correct),ok=chosen===rightIndex;
      if(chosen!==-1)answered++;
      if(ok)correctCount++;
      if(!topicMap[q.category])topicMap[q.category]={total:0,correct:0};
      topicMap[q.category].total++;if(ok)topicMap[q.category].correct++;
      review.push({id:qid,category:q.category,categoryLabel:(getCategoryMap_()[q.category]||{}).label||q.category,question:q.question,options:order.map(i=>q.options[i]),selected:chosen,correctIndex:rightIndex,isCorrect:ok,explanation:q.explanation,source:q.source});
    });
    const elapsed=Math.max(0,Math.round((Date.now()-new Date(attempt.started_at).getTime())/1000));
    const limit=Number(e.duration_min)||0;
    const late=limit>0&&elapsed>limit*60+20;
    const pct=Math.round((correctCount/ids.length)*100);
    const updated=[new Date().toISOString(),late?'late':'submitted',correctCount,ids.length,pct,elapsed,JSON.stringify(cleanAnswers),JSON.stringify(topicMap)];
    // Column indexes: F–M on Attempts.
    sheet_('Attempts').getRange(attempt._row,6,1,updated.length).setValues([updated]);
    return {name:attempt.name,exam:extractExam_(e),score:correctCount,total:ids.length,percent:pct,answered,elapsedSeconds:elapsed,late,review};
  }finally{lock.releaseLock();}
}
function adminGetOverview(pin,examId){
  assertAdmin_(pin);
  const allExams=rows_('Exams').reverse(),allAttempts=rows_('Attempts');
  const selected=allExams.find(e=>e.id===String(examId||''))||allExams[0];
  if(!selected)return {exams:[],selected:null,stats:null};
  const submitted=allAttempts.filter(a=>a.exam_id===selected.id&&['late','submitted'].includes(a.status));
  const pending=allAttempts.filter(a=>a.exam_id===selected.id&&a.status==='started').length;
  const chapters={},questions={},qmap=getQuestionMap_(),categories=getCategoryMap_();
  const addChapter=(cat)=>{if(!chapters[cat])chapters[cat]={id:cat,label:(categories[cat]||{}).label||cat,correct:0,total:0};};
  examPool_(selected).forEach(q=>addChapter(q.category));
  const participants=[];
  submitted.forEach(a=>{
    let answers={};try{answers=JSON.parse(a.answers_json||'{}')||{};}catch(err){}
    // Every participant may have a distinct set; calculate over their own IDs.
    const ids=String(a.question_ids||selected.question_ids||'').split(',').filter(Boolean);
    ids.forEach(id=>{
      const q=qmap[id];if(!q)return;
      addChapter(q.category);
      if(!questions[id])questions[id]={id,category:q.category,categoryLabel:chapters[q.category].label,question:q.question,correct:0,total:0,wrong:0,source:q.source};
      const ans=Object.prototype.hasOwnProperty.call(answers,id)?Number(answers[id]):-1;
      const good=ans===shuffled_([0,1,2,3],a.id+':'+id).indexOf(q.correct);
      chapters[q.category].total++;questions[id].total++;
      if(good){chapters[q.category].correct++;questions[id].correct++;}else{questions[id].wrong++;}
    });
    participants.push({name:a.name,code:a.participant_code,score:Number(a.score),total:Number(a.total),percent:Number(a.percent),at:a.finished_at,late:a.status==='late',seconds:Number(a.elapsed_seconds),attemptId:a.id});
  });
  participants.sort((a,b)=>b.percent-a.percent||a.seconds-b.seconds||a.name.localeCompare(b.name));
  const topics=Object.values(chapters).map(t=>({...t,accuracy:t.total?Math.round(t.correct/t.total*100):0})).sort((a,b)=>
    (!a.total)-(!b.total)||a.accuracy-b.accuracy);
  const hardQuestions=Object.values(questions).map(q=>({...q,accuracy:q.total?Math.round(q.correct/q.total*100):0})).sort((a,b)=>a.accuracy-b.accuracy||b.wrong-a.wrong);
  const unique=new Set(participants.map(x=>(x.code||x.name).trim().toLowerCase())).size;
  const assigned=allAttempts.filter(a=>a.exam_id===selected.id);
  const assignedIds=assigned.flatMap(a=>String(a.question_ids||selected.question_ids||'').split(',').filter(Boolean));
  const distinctAssigned=new Set(assignedIds).size;
  return {
    exams:allExams.map(extractExam_),selected:extractExam_(selected),
    stats:{submissions:submitted.length,uniqueParticipants:unique,pending,avgScore:submitted.length?Math.round(submitted.reduce((a,x)=>a+Number(x.percent),0)/submitted.length):0,passCount:participants.filter(x=>x.percent>=70).length,lateCount:participants.filter(x=>x.late).length,distinctQuestions:distinctAssigned,poolQuestions:examPool_(selected).length,reusedQuestions:assignedIds.length-distinctAssigned},
    participants,topics,questions:hardQuestions
  };
}
function adminCreateExam(pin,config){
  assertAdmin_(pin);config=config||{};
  const title=String(config.title||'').trim().slice(0,100);
  if(title.length<4)throw Error('Tên đề phải có ít nhất 4 ký tự.');
  const cats=Array.isArray(config.categories)?config.categories.filter(id=>!!getCategoryMap_()[id]):[];
  if(!cats.length)throw Error('Chọn ít nhất một chương.');
  const level=['Cơ bản','Trung bình','Nâng cao'].includes(config.level)?config.level:'all';
  const pool=getQuestions_().filter(q=>cats.includes(q.category)&&(level==='all'||q.level===level));
  if(!pool.length)throw Error('Không có câu phù hợp bộ lọc.');
  const count=Math.min(pool.length,Math.max(1,Math.floor(Number(config.count)||20)));
  const duration=Math.max(0,Math.min(240,Math.floor(Number(config.duration)||0)));
  const examId='TF-'+Utilities.getUuid().slice(0,12).toUpperCase();
  const questions=chooseQuestions_(pool,count,examId);
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{sheet_('Exams').appendRow([examId,safeCell_(title),questions.map(q=>q.id).join(','),duration,new Date().toISOString(),'open',cats.join(','),level]);}
  finally{lock.releaseLock();}
  refreshTradeFinanceCatalogSafely_();
  return extractExam_({id:examId,title,question_ids:questions.map(q=>q.id).join(','),duration_min:duration,created_at:new Date().toISOString(),status:'open',categories:cats.join(','),level});
}
function adminToggleExam(pin,examId,open){
  assertAdmin_(pin);const e=rows_('Exams').find(x=>x.id===String(examId));
  if(!e)throw Error('Không tìm thấy đề.');
  sheet_('Exams').getRange(e._row,6).setValue(open?'open':'closed');
  SpreadsheetApp.flush();
  refreshTradeFinanceCatalogSafely_();
  return true;
}


/**
 * CHẨN ĐOÁN QUYỀN TRUY CẬP GOOGLE SHEETS
 * Chạy trực tiếp hàm testQuizSheetAccess trong Apps Script editor.
 * Không ghi SHEET_ID hoặc mật khẩu quản trị ra nhật ký.
 */
function testQuizSheetAccess() {
  const id = PropertiesService
    .getScriptProperties()
    .getProperty('SHEET_ID');

  if (!id) {
    Logger.log('LỖI: Chưa có SHEET_ID');
    return;
  }

  try {
    const ss = SpreadsheetApp.openById(id.trim());
    Logger.log('THÀNH CÔNG: ' + ss.getName());
    Logger.log(
      'Các sheet: ' +
      ss.getSheets().map(s => s.getName()).join(', ')
    );
    // Luu fingerprint de doi chieu cau hinh editor va web, khong luu email.
    TF_PROPS.setProperty('TF_DIAG_SHEET_HASH', tfSheetFingerprint_(id.trim()));
    Logger.log('Đã lưu dấu đối chiếu SHEET_ID (không in ID).');
  } catch (e) {
    Logger.log('LỖI: ' + e.message);
  }
}


/** Khong tai nao xem duoc SHEET_ID qua trang diagnose. */
function tfSheetFingerprint_(id) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
    String(id), Utilities.Charset.UTF_8);
  return Utilities.base64EncodeWebSafe(bytes).slice(0, 20);
}

/**
 * Public, read-only diagnostics for DIFFERENT ACCOUNTS accessing the SAME /exec.
 * No sheet ID, emails, user names, exam codes, PINs, answers or scores returned.
 * Open exactly /exec?diagnose=1 in both browsers, compare release and counts.
 */
function tfDiagnoseWeb_() {
  const result = {
    release: 'TF_V6_1_PUBLIC_CATALOG_20261121',
    checkedAt: new Date().toISOString(),
    sheetIdPresent: false,
    sameSheetAsEditor: 'UNKNOWN',
    spreadsheetAccess: 'NOT_CHECKED',
    examsAndAttempts: 'NOT_CHECKED',
    examsTotal: null,
    examsOpen: null,
    examsClosed: null,
    bootstrapOpen: null,
    headerStatusColumn: 'NOT_CHECKED'
  };
  try {
    const id = String(TF_PROPS.getProperty('SHEET_ID') || '').trim();
    const expectedHash = TF_PROPS.getProperty('TF_DIAG_SHEET_HASH');
    result.sheetIdPresent = Boolean(id);
    result.sameSheetAsEditor = !expectedHash ? 'RUN_TEST_FIRST' :
      (id && tfSheetFingerprint_(id) === expectedHash ? 'YES' : 'NO');
    if (!id) {
      result.spreadsheetAccess = 'MISSING_SHEET_ID';
      return result;
    }
    const ss = SpreadsheetApp.openById(id);
    result.spreadsheetAccess = 'OK';
    const sh = ss.getSheetByName('Exams');
    result.examsAndAttempts = sh && ss.getSheetByName('Attempts')
      ? 'OK' : 'MISSING_TABS';
    if (!sh) return result;
    const header = sh.getRange(1, 1, 1, 8).getDisplayValues()[0]
      .map(x => String(x || '').trim().toLowerCase());
    const idxStatus = header.indexOf('status');
    const idxId = header.indexOf('id');
    result.headerStatusColumn = idxStatus === 5 && idxId === 0 ? 'OK' : 'MISMATCH';
    const lastRow = sh.getLastRow();
    const data = lastRow < 2 ? [] : sh.getRange(2, 1, lastRow - 1, 8).getDisplayValues();
    const existing = data.filter(r => String(r[0] || '').trim());
    result.examsTotal = existing.length;
    if (idxStatus >= 0) {
      result.examsOpen = existing.filter(r => String(r[idxStatus] || '').trim().toLowerCase() === 'open').length;
      result.examsClosed = existing.length - result.examsOpen;
    }
    // Confirm what the public frontend really receives, not just raw Sheets cells.
    result.bootstrapOpen = getBootstrap().exams.length;
  } catch (err) {
    result.spreadsheetAccess = 'ACCESS_FAILED';
    Logger.log('Public diagnostic failed: ' + err.message);
  }
  return result;
}


/**
 * KHÔI PHỤC DANH SÁCH ĐỀ THI TRỐNG (CHẠY THỦ CÔNG TRONG EDITOR).
 * - Không xóa/sửa đề cũ hay bảng điểm.
 * - Nếu đã có đề OPEN: chỉ thông báo, không tạo trùng.
 * - Nếu không có đề OPEN: tạo một đề tổng hợp mới (tối đa 30 câu).
 * - Đề mới là mẫu cấu trúc: mỗi lượt startAttempt vẫn được cấp bộ câu riêng.
 *
 * Cách dùng: chọn ensureOpenTradeFinanceExam trên thanh hàm -> Chạy -> Xem nhật ký.
 */
function ensureOpenTradeFinanceExam(){
  const lock=LockService.getScriptLock();
  lock.waitLock(30000);
  try{
    const sh=sheet_('Exams');
    const expected=TF_HEADERS.Exams;
    const headers=sh.getRange(1,1,1,expected.length).getDisplayValues()[0]
      .map(s=>String(s).trim());
    if(expected.some((h,i)=>headers[i]!==h)){
      throw Error('Sheet Exams có thứ tự cột không đúng. Dừng để tránh ghi sai dữ liệu.');
    }

    const existing=rows_('Exams').filter(e=>String(e.id||'').trim());
    const open=existing.filter(isOpenExam_);
    Logger.log('Tổng số đề hiện có: '+existing.length);
    Logger.log('Số đề đang mở: '+open.length);
    if(open.length){
      open.forEach(e=>Logger.log('Đề đang mở: '+e.title+' | Mã: '+e.id));
      Logger.log('Đề đang mở đã tồn tại. Đang cập nhật bản sao công khai.');
      refreshTradeFinanceCatalogSafely_();
      return {created:false,open:open.length};
    }

    const bank=getQuestions_();
    if(!Array.isArray(bank)||bank.length===0){
      throw Error('Ngân hàng câu hỏi trống. Kiểm tra QuestionBank.gs trước khi tạo đề.');
    }
    const count=Math.min(30,bank.length);
    const examId='TF-NEW-'+Utilities.getUuid().slice(0,8).toUpperCase();
    const questions=chooseQuestions_(bank,count,examId);
    const title='Đề tổng hợp Trade Finance · '+count+' câu';
    sh.appendRow([
      examId,title,questions.map(q=>q.id).join(','),35,
      new Date().toISOString(),'open','Tất cả','Tất cả'
    ]);
    SpreadsheetApp.flush();
    Logger.log('ĐÃ TẠO ĐỀ MỚI: '+title);
    Logger.log('MÃ ĐỀ: '+examId);
    Logger.log('Trạng thái: open');
    Logger.log('Quay lại website /exec, nhấn Làm mới hoặc tải lại trang.');
    refreshTradeFinanceCatalogSafely_();
    return {created:true,examId:examId,count:questions.length};
  }finally{
    lock.releaseLock();
  }
}


/** Owner action: run this ONCE in the Apps Script editor after updating V6.1. */
function publishTradeFinanceCatalog(){
  const meta = getBootstrap();  // Owner has Sheets access (tested in editor).
  const catalog = {
    appUrl: String(meta.appUrl||''),
    exams: (meta.exams||[]).slice(0,20).map(e=>({
      id:e.id,title:e.title,count:e.count,duration:e.duration,
      status:e.status,categories:e.categories,level:e.level,createdAt:e.createdAt
    })),
    categories: (meta.categories||[]).map(c=>({id:c.id,label:c.label,description:c.description||''})),
    questionCount: Number(meta.questionCount)||0
  };
  let json=JSON.stringify(catalog);
  // Script Properties limit is 9 KB per property; avoid an oversized value.
  while (Utilities.newBlob(json).getBytes().length > 8000 && catalog.exams.length>1){
    catalog.exams.pop();json=JSON.stringify(catalog);
  }
  if (Utilities.newBlob(json).getBytes().length>8000){
    catalog.categories = catalog.categories.map(c=>({id:c.id,label:c.label,description:''}));
    json=JSON.stringify(catalog);
  }
  if (Utilities.newBlob(json).getBytes().length>8000){
    throw Error('Public catalog too large for Script Properties. Reduce number of exams.');
  }
  TF_PROPS.setProperty('TF_PUBLIC_CATALOG',json);
  Logger.log('ĐÃ LƯU DANH SÁCH ĐỀ CÔNG KHAI: '+catalog.exams.length+' đề; '+catalog.questionCount+' câu trong ngân hàng.');
  Logger.log('Không cần chia sẻ Google Sheets cho người làm bài.');
  return {exams:catalog.exams.length, questions:catalog.questionCount};
}

function refreshTradeFinanceCatalogSafely_(){
  try { publishTradeFinanceCatalog(); }
  catch (err) { Logger.log('Không thể cập nhật bản sao danh sách đề: '+String(err.message||err)); }
}
