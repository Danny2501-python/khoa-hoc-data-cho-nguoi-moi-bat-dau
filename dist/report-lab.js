window.makeReportLab = function({esc,table,st,save}) {
 const source=PROGRAM.tables.HoSo;
 const state=st.reportLab??={};
 const measures={
   total:['Tiếp nhận','COUNTROWS(HoSo)'],
   closed:['Đã đóng','CALCULATE([Tiếp nhận], HoSo[TrangThai] = "Đã đóng")'],
   late:['Trễ hạn','COUNTROWS(FILTER(HoSo, HoSo[TrangThai] = "Đã đóng" && NOT ISBLANK(HoSo[XuLyPhut]) && HoSo[XuLyPhut] > HoSo[SLAPhut]))'],
   rate:['Tỷ lệ đạt','DIVIDE([Đạt hạn], [Đã đóng])'],
   avg:['Phút xử lý trung bình','AVERAGE(HoSo[XuLyPhut])']
 };
 const visuals=state.visuals??=[];
 const axes={Tuan:"Tuần",ChiNhanh:"Chi nhánh",NghiepVu:"Nghiệp vụ",TrangThai:"Trạng thái"};
 const kinds={bar:"Thanh ngang",line:"Đường",card:"Thẻ KPI",table:"Bảng"};
 const numericColumns=new Set(["Tuan","XuLyPhut","SLAPhut"]);
 let selected=-1;
 const branches=[...new Set(source.rows.map(r=>r[3]))];
 let imported=source;
 const options=(obj,selected)=>Object.entries(obj).map(([k,label])=>'<option value="'+esc(k)+'" '+(k===selected?'selected':'')+'>'+esc(label)+'</option>').join('');
 function panel(){return `<section class="workpad" id="reportLab"><header class="bi-header"><p>DataLab · SQL → Power BI</p><h3>Bàn dựng báo cáo</h3>
 <p>Dùng 24 hồ sơ mẫu hoặc chạy SELECT * FROM HoSo rồi bấm “Nạp kết quả vào báo cáo”.</p>
 <p data-report-source role="status">Nguồn mặc định: 24 hồ sơ mẫu.</p></header>
 <div class="bi-workspace"><section class="bi-config"><h4>Cấu hình biểu đồ</h4>
 <label class="field">Bộ lọc chi nhánh<select name="branch">${options({"":"Tất cả",...Object.fromEntries(branches.map(b=>[b,b]))},state.branch)}</select></label>
 <label class="field">Tên thẻ hoặc biểu đồ<input name="visualTitle" maxlength="80" placeholder="Ví dụ: Tỷ lệ đạt hạn theo tuần"></label>
 <label class="field">Measure DAX<select name="measure">${options(Object.fromEntries(Object.entries(measures).map(([k,v])=>[k,v[0]])),state.measure||"rate")}<option value="custom">Công thức tự nhập</option></select></label>
 <label class="field">Nhóm theo<select name="axis">${options(axes,state.axis)}</select></label>
 <label class="field">Biểu đồ<select name="chart">${options(kinds,state.chart)}</select></label>
 <details class="bi-formula"><summary>Công thức DAX tự nhập</summary><label class="field">Công thức tự nhập<textarea name="dax" rows="2" placeholder="AVERAGE(HoSo[XuLyPhut])"></textarea></label>
 <p class="small">Hỗ trợ COUNTROWS(HoSo) và SUM, AVERAGE, MIN, MAX trên cột Tuan, XuLyPhut hoặc SLAPhut. Chọn “Công thức tự nhập” để sử dụng.</p></details>
 <div class="actions"><button type="button" class="btn green" data-add-visual>Thêm vào báo cáo</button><button type="button" class="btn ghost" data-new-visual hidden>Hủy chỉnh sửa</button></div>
 <p data-visual-status role="status"></p>
 </section><section class="bi-preview"><h4>Xem trước</h4><div class="report-preview" aria-live="polite"></div></section></div><section class="bi-saved"><h4>Báo cáo của bạn</h4><div class="report-canvas"></div></section></section>`;}
 function calc(rows,key){
   const closed=rows.filter(r=>r.TrangThai==="Đã đóng");
   const observed=closed.filter(r=>r.XuLyPhut!=null);
   const late=observed.filter(r=>r.XuLyPhut>r.SLAPhut).length;
   const pass=observed.filter(r=>r.XuLyPhut<=r.SLAPhut).length;
   const times=rows.map(r=>r.XuLyPhut).filter(v=>v!=null);
   return {total:rows.length,closed:closed.length,late,rate:closed.length?100*pass/closed.length:null,avg:times.length?times.reduce((a,b)=>a+b,0)/times.length:null}[key];
 }
 function custom(formula){
   if(/^COUNTROWS\s*\(\s*HoSo\s*\)$/i.test(formula))return rows=>rows.length;
   const match=/^(SUM|AVERAGE|MIN|MAX)\s*\(\s*HoSo\[([a-z]+)\]\s*\)$/i.exec(formula);
   if(!match)return null;
   const col=[...numericColumns].find(c=>c.toLowerCase()===match[2].toLowerCase());
   if(!col)return null;
   return rows=>{
     const values=rows.map(r=>r[col]).filter(Number.isFinite);
     if(!values.length)return null;
     const sum=values.reduce((a,b)=>a+b,0);
     return {SUM:sum,AVERAGE:sum/values.length,MIN:Math.min(...values),MAX:Math.max(...values)}[match[1].toUpperCase()];
   };
 }
 const fields=["visualTitle","measure","axis","chart","dax"];
 function draft(root){return Object.fromEntries(fields.map(name=>[name,root.querySelector('[name='+name+']').value.trim()]));}
 function renderVisual(rows,item){
   const {measure:key,axis,chart,dax}=item;
   const value=key==="custom"?custom(dax):data=>calc(data,key);
   if(!value)return "<p>Công thức chưa hợp lệ hoặc nằm ngoài nhóm hàm được hỗ trợ.</p>";
   const [label,formula]=measures[key]||["Measure tự nhập",dax];
   const summary=[...new Set(rows.map(r=>r[axis]))].sort((a,b)=>String(a).localeCompare(String(b),'vi',{numeric:true})).map(k=>[k,value(rows.filter(r=>r[axis]===k))]);
   const max=Math.max(1,...summary.map(x=>x[1]||0));
   const fmt=v=>v==null?"—":v.toLocaleString("vi-VN",{maximumFractionDigits:2})+(key==="rate"?"%":"");
   const points=summary.map(([,v],i)=>v==null?null:[30+440*i/Math.max(summary.length-1,1),110-90*v/max]);
   const path=points.map((p,i)=>p?(points[i-1]?"L":"M")+p.join(" "):"").join(" ");
   const visual=chart==="card"||chart==="table"?"":chart==="line"?`<svg viewBox="0 0 500 125" width="100%" role="img" aria-label="Biểu đồ đường. Xem giá trị từng nhóm trong bảng dưới."><path d="M30 10 V110 H480" fill="none" stroke="#8a9ab4"/><path d="${path}" fill="none" stroke="#14765c" stroke-width="3"/>${points.filter(Boolean).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#14765c"/>`).join("")}</svg>`:summary.map(([k,v])=>`<div class="bi-bar"><span>${esc(k)}</span><strong>${fmt(v)}</strong><progress aria-label="${esc(k)}" value="${v??0}" max="${max}"></progress></div>`).join("");
   return `<div class="bi-metric"><h4>${esc(item.visualTitle||label)}</h4><strong>${fmt(value(rows))}</strong></div><details><summary>Công thức DAX</summary><pre class="code">${esc(formula)}</pre></details>${visual}`+(chart==="card"?"":table([[axes[axis],label],...summary.map(([k,v])=>[k,fmt(v)])]));
 }
 function update(){
   const root=document.getElementById("reportLab");if(!root)return;
   const branch=root.querySelector('[name=branch]').value;
   const rows=imported.rows.map(r=>Object.fromEntries(imported.cols.map((c,i)=>[c,r[i]]))).filter(r=>!branch||r.ChiNhanh===branch);
   root.querySelector(".report-preview").innerHTML=renderVisual(rows,draft(root));
   root.querySelector(".report-canvas").innerHTML=visuals.map((item,i)=>`<article class="report-tile">${renderVisual(rows,item)}
   <div class="actions"><button type="button" class="btn ghost" data-visual-edit="${i}">Sửa</button><button type="button" class="btn ghost" data-visual-remove="${i}">Bỏ khỏi báo cáo</button></div></article>`).join("")||"<p>Chọn một loại biểu đồ rồi bấm Thêm vào báo cáo.</p>";
 }
 function edit(root,index){
   selected=index;
   if(index>=0)for(const name of fields)root.querySelector('[name='+name+']').value=visuals[index][name];
   root.querySelector("[data-add-visual]").textContent=index<0?"Thêm vào báo cáo":"Lưu thay đổi";
   root.querySelector("[data-new-visual]").hidden=index<0;
   root.querySelector(".bi-formula").open=root.querySelector("[name=measure]").value==="custom";
   if(index>=0)root.querySelector('[name=visualTitle]').focus();
   update();
 }
 document.addEventListener("change",e=>{
   if(!e.target.closest("#reportLab"))return;
   if(["branch","axis","chart","measure"].includes(e.target.name)&&e.target.value!=="custom"){state[e.target.name]=e.target.value;save();}
   if(e.target.name==="measure")e.target.closest("#reportLab").querySelector(".bi-formula").open=e.target.value==="custom";
   update();
 });
 document.addEventListener("click",e=>{
   const button=e.target.closest("button"),root=button?.closest("#reportLab");
   if(!root)return;
   const status=root.querySelector("[data-visual-status]");
   if(button.hasAttribute("data-add-visual")){
     const item=draft(root);
     if(item.measure==="custom"&&!custom(item.dax)){status.textContent="Kiểm tra công thức theo các hàm được hỗ trợ.";return;}
     if(selected<0)visuals.push(item);else visuals[selected]=item;
     save();edit(root,-1);status.textContent="Đã lưu báo cáo trên trình duyệt này.";
   }
   if(button.hasAttribute("data-new-visual"))edit(root,-1);
   if(button.dataset.visualEdit!=null)edit(root,Number(button.dataset.visualEdit));
   if(button.dataset.visualRemove!=null){
     visuals.splice(Number(button.dataset.visualRemove),1);
     save();edit(root,-1);status.textContent="Đã bỏ thẻ hoặc biểu đồ khỏi báo cáo.";
   }
 });
 function load(result){
   const msg=document.querySelector("[data-report-source]");if(!msg)return;
   const needed=["Tuan","ChiNhanh","NghiepVu","TrangThai","XuLyPhut","SLAPhut"];
   if(!needed.every(k=>result.columns.includes(k))||result.count>result.rows.length){
     msg.textContent="Cần đủ cột và tối đa 100 dòng. Thử SELECT * FROM HoSo WHERE Tuan = 1.";return;
   }
   imported={cols:result.columns,rows:result.rows};
   state.data=imported;save();
   msg.textContent="Đã nạp "+result.count+" dòng từ kết quả SQL.";
   update();
 }
 function mount(){selected=-1;imported=state.data||source;const msg=document.querySelector("[data-report-source]");if(msg&&state.data)msg.textContent="Đã nạp "+imported.rows.length+" dòng từ kết quả SQL.";update();}
 return {panel,mount,load};
};
