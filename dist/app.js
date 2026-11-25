(function(){
"use strict";
const paths={
home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h5v-6h3v6h5V9.5"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',route:'<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M8 6h8a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8"/>',flask:'<path d="M9 3h6m-5 0v6l-6 10a1.3 1.3 0 0 0 1.3 2h13.4a1.3 1.3 0 0 0 1.3-2L14 9V3M8 15h8"/>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8"/>',book:'<path d="M12 6c-3-2-6-2.5-10-2v14c4-.4 7 .1 10 2 3-1.9 6-2.4 10-2V4c-4-.5-7 0-10 2Zm0 0v14"/>',brief:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c6 3 12 3 18 0m-9 0v3"/>',layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 4.5 9-4.5m-18 5 9 4.5 9-4.5"/>',table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 10v10"/>',compare:'<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/>',chart:'<path d="M3 3v17h18M7 15v-3m5 3V8m5 7v-5"/>',pulse:'<path d="M2 13h5l3-8 4 14 3-8h5"/>',search:'<circle cx="10" cy="10" r="6.3"/><path d="m15 15 5 5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M4 10h16"/>',play:'<path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',chev:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',circle:'<circle cx="12" cy="12" r="8"/>',done:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-7"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',x:'<path d="m6 6 12 12m0-12L6 18"/>',computer:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4m-5 0h10"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',external:'<path d="M14 3h7v7m0-7L10 14m0-10H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5"/>',file:'<path d="M5 3h10l4 4v14H5zM14 3v6h5M8 13h8m-8 4h6"/>',goal:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',level:'<path d="M4 19v-4m6 4v-8m6 8V6m4 13V3"/>',cap:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c3 3 9 3 12 0v-6m4-2v7"/>',notebook:'<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 3v18M3 7h4m-4 5h4m-4 5h4"/>',bulb:'<path d="M8 15c-4-4-2-10 4-10s8 6 4 10l-2 3h-4zM10 21h4"/>',db:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v11c0 4 16 4 16 0V6m-16 6c0 4 16 4 16 0"/>'
};
const icon=n=>`<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${paths[n]||paths.book}</svg>`;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const e=id=>document.getElementById(id);
const nav=[["overview","Tổng quan","grid"],["roadmap","Lộ trình học","route"],["intermediate","Intermediate","cap"],["advanced","Advanced","chart"],["engineering","Data Engineering","layers"],["cloud-banking","AWS & Ngân hàng số","cloud"],["master-data","Master Data","db"],["ai","AI & Prompt","bulb"],["mapping","Kho dữ liệu Mapping","table"],["labs","Phòng thực hành","flask"],["interview","Luyện phỏng vấn","mic"],["bank","Nghiệp vụ Core Banking","db"],["books","Tủ tài liệu","layers"],["videos","Khóa video","play"],["math","Toán ứng dụng","chart"],["quick","12 bài ôn nhanh","notebook"],["dictionary","Từ điển ngân hàng","book"],["start","Bắt đầu học","book"]];
const tones=MODULES.map(m=>m.tone);
const L=window.LABS;
const key="datalab-progress-v1";
const previousKey=["datalab","gp","bank-v1"].join("").replace("datalab","datalab-");let st;
try{st=JSON.parse(localStorage.getItem(key)||localStorage.getItem(previousKey)||"{}");}catch{st={};}
if(!st||typeof st!=="object"||Array.isArray(st))st={};
for(const k of ["learn","labs","notes","answers","days","sqlDraft","engineering","engineeringQuiz","aiCourse"])if(!st[k]||typeof st[k]!=="object"||Array.isArray(st[k]))st[k]={};
let storageOK=true,interCategory="Tất cả";
const save=()=>{try{localStorage.setItem(key,JSON.stringify(st));}catch{storageOK=false;let el=e("storestatus");if(el)el.textContent="Tiến độ chỉ có trong phiên này";}};
bindDePractice({st,save});
bindAiCourse({st,save});
const lessonDone=i=>st.learn[i]===true;
const labDone=l=>st.labs[l.id]===true;
const nLessons=()=>COURSE.filter((_,i)=>lessonDone(i)).length;
const nLabs=()=>L.filter(labDone).length;
const nextLesson=()=>{const n=COURSE.findIndex((_,i)=>!lessonDone(i));return n<0?0:n;};
const nextLab=()=>L.find(l=>!labDone(l))||L[0];
const weekOf=i=>Math.floor(i/3);
const mins=w=>COURSE.slice(w*3,w*3+3).reduce((n,x)=>n+x.min,0);
const pad=n=>String(n).padStart(2,"0");
const modUrl=w=>"#week/"+(w+1);
const lesUrl=i=>"#lesson/"+(i+1);
const tag=(name,cls="mint")=>`<span class="tag ${cls}">${esc(name)}</span>`;
const tile=(name,cls)=>`<span class="tile ${cls}">${icon(name)}</span>`;
const btn=(href,label,kind="green",symbol="")=>`<a href="${href}" class="btn ${kind}">${symbol?icon(symbol):""}${esc(label)}</a>`;
const back=(href,label)=>`<a class="backlink" href="${href}">${icon("back")}${esc(label)}</a>`;
const page=(k,t,p)=>`<div class="pagehead"><div class="eyebrow">${esc(k)}</div><h1>${esc(t)}</h1><p>${esc(p)}</p></div>`;
const bullet=items=>`<ol class="steps">${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`;
const table=rows=>`<div class="tablewrap"><table><thead><tr>${rows[0].map(x=>`<th scope="col">${esc(x)}</th>`).join("")}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const parent=s=>({week:"quick",lesson:"quick",read:"roadmap",day:"roadmap",month:"roadmap",book:"books",lab:"labs"}[s]||s);
function side(current){
const links=items=>items.map(([id,label,ic])=>`<a href="#${id}" class="navlink ${current===id?"active":""}" ${current===id?'aria-current="page"':""}>${icon(ic)}${label}</a>`).join("");
e("side").innerHTML=`<a class="brand" href="#overview" aria-label="DataLab, tổng quan"><span class="mark"><svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true"><path d="M3 17.5h5v7H3zm8-7.5h5v14.5h-5zm8-6.5h5v21h-5z" fill="currentColor"/></svg></span><span>Data<span class="labword">Lab</span></span></a><button class="mobx" id="closemenu" aria-label="Đóng điều hướng">${icon("x")}</button><nav><div class="navgroup"><p class="navTitle">Không gian học tập</p>${links(nav.slice(0,10))}</div><div class="navgroup"><p class="navTitle">Tài nguyên</p>${links(nav.slice(10))}</div></nav><div class="sidefoot"><div class="fticon">${icon("computer")}</div><div><strong>Tự học cá nhân</strong><small id="storestatus">${storageOK?"Lưu tiến độ trên thiết bị":"Tiến độ trong phiên này"}</small></div></div>`;
}
function progress(){
const total=nLessons()+nLabs(),pct=Math.round(total/16*100);
return `<section class="box"><div class="boxhead"><h2>Tiến độ của bạn</h2>${icon("pulse")}</div><div class="progbody"><div class="ring" style="--val:${pct}%" aria-label="${total} trên 16 nội dung hoàn thành"><div class="ringinner"><b>${pct}%</b></div></div><div class="metrics"><div class="metric"><span class="bookline">${icon("book")}Bài học</span><b>${nLessons()}/12</b></div><div class="metric"><span class="bookline">${icon("flask")}Thực hành</span><b>${nLabs()}/4</b></div></div></div></section>`;
}
function moduleList(w){
const m=MODULES[w];return `<section class="content module"><div class="modulebar">${tile(m.icon,m.tone)}<div><div class="wk">Tuần ${pad(w+1)}</div><h2>${m.title}</h2><p>${m.desc}</p></div></div>${COURSE.slice(w*3,w*3+3).map((l,j)=>{const i=w*3+j;return `<a href="${lesUrl(i)}" class="itemlink"><span class="num">${pad(i+1)}</span><strong>${esc(l.title)}</strong><span class="small">${l.min}′</span>${icon(lessonDone(i)?"done":"chev")}</a>`;}).join("")}</section>`;
}
const wkTasks=[
["Làm quen với dữ liệu","Mở tệp 24 hồ sơ ở bài Excel. Tập đọc tên cột, xác định một dòng là gì và mô tả quy tắc SLA. Tuần sau bạn sẽ dùng chính tệp này để lập báo cáo.",0],
["Nộp một bảng hiệu suất","Hoàn tất bài thực hành Excel, kiểm tra số hồ sơ đã đóng, số đạt SLA và tỷ lệ toàn kỳ.",0],
["Bàn giao danh sách ngoại lệ","Đối soát hai sổ, giữ đủ mã từ hai nguồn và ghi người cần xác minh từng ngoại lệ.",1],
["Trình bày kết quả","Hoàn tất hai bài dashboard và cải tiến. Trình bày trong 60 giây, sau đó luyện nói lại bằng tiếng Anh.",2]
];
function quickRoadmap(){
return page("Thư viện bài bổ trợ","12 bài ôn nhanh","Đi theo bốn chặng. Mỗi buổi đọc ví dụ, tự làm lại và trả lời câu kiểm tra trước khi chuyển bài.")+`<section class="content schedule"><h2>Lịch học gợi ý</h2><div class="subnav" role="group" aria-label="Chọn lịch học"><button class="chip ${st.pace!=="fast"?"selected":""}" data-pace="regular" aria-pressed="${st.pace!=="fast"}">4 tuần cơ bản</button><button class="chip ${st.pace==="fast"?"selected":""}" data-pace="fast" aria-pressed="${st.pace==="fast"}">14 ngày tăng tốc</button></div>${st.pace==="fast"?`<ol class="studylist"><li>Ngày 1–3: học bài 1–3 và đọc thử tệp hồ sơ.</li><li>Ngày 4–6: học bài 4–6 và hoàn tất bài Excel.</li><li>Ngày 7–9: học bài 7–9, đối soát hai sổ.</li><li>Ngày 10–12: học bài 10–12, dựng dashboard và viết email cải tiến.</li><li>Ngày 13–14: làm lại các bài sai và tự phỏng vấn trong 20 phút.</li></ol>`:`<p>Mỗi tuần dành ba buổi cho ba bài học, mỗi buổi 25–45 phút. Dành buổi thứ tư để làm lại ví dụ và hoàn thành sản phẩm của chặng. Tuần cuối có hai bài thực hành, nên dành thêm một buổi.</p>`}</section>${MODULES.map((_,w)=>moduleList(w)).join("")}`;
}
function week(w){
let m=MODULES[w],h=wkTasks[w];return back("#quick","12 bài ôn nhanh")+page("Tuần "+pad(w+1),m.title,m.desc)+`<div class="twocol"><div>${moduleList(w)}<section class="content"><h2>${h[0]}</h2><p>${h[1]}</p><div class="actions">${btn("#lab/"+L[h[2]].id,"Mở bài thực hành","ghost","flask")}${w===3?btn("#lab/"+L[3].id,"Bài cải tiến","ghost","bulb"):""}</div></section></div><aside class="rail"><div class="box"><div class="promohead">${icon("goal")}Sản phẩm của tuần</div><h3 style="margin:9px 0">${m.output}</h3><p class="small">3 bài học · ${mins(w)} phút học lý thuyết và ví dụ.</p></div>${progress()}</aside></div>`;
}
function note(id){return `<section class="content"><h2>Ghi chú của bạn</h2><label class="small" for="note">Ghi lại điều còn vướng hoặc cách bạn giải bài.</label><textarea id="note" data-note="${id}" placeholder="Viết ghi chú…">${esc(st.notes[id]||"")}</textarea><span class="saved" id="noteState" role="status"></span></section>`;}
function lesson(i){
const l=COURSE[i],w=weekOf(i),m=MODULES[w],passed=lessonDone(i);st.started=true;save();
return back(modUrl(w),"Các bài học tuần "+(w+1))+`<div class="twocol"><div><section class="content lessonhead">${tag("Tuần "+pad(w+1)+" · Bài "+pad(i+1),m.tone)}<h1>${l.title}</h1><p>${l.goal}</p><div class="meta">${icon("clock")}${l.min} phút <span>·</span>${passed?"Đã hoàn thành":"Bài tự học"}</div></section><section class="content">${i===0?'<h2>Bắt đầu từ con số 0</h2><p>DA là cách gọi thường gặp của Data Analyst (chuyên viên phân tích dữ liệu). Trong công việc vận hành, bạn dùng số liệu để trả lời những câu cụ thể như “Có bao nhiêu hồ sơ trễ?” và “Đơn vị nào cần hỗ trợ?”.</p><p>Buổi này chỉ cần trình duyệt và giấy nháp. Đọc bảng bên dưới từ trái sang phải. Nếu muốn gõ lại trong Excel, mở Blank workbook, bấm ô A1 và nhập tiêu đề đầu tiên. Nhấn Tab để sang cột kế, Enter để xuống dòng. Ô A2 là giao điểm của cột A và dòng 2.</p><h3>Tình huống vận hành</h3>':'<h2>Tình huống vận hành</h2>'}<p>${esc(l.story)}</p><h3>Kiến thức cần nắm</h3><p>${esc(l.theory)}</p><h3>Ví dụ minh họa</h3>${table(l.table)}${l.code?`<pre class="code">${esc(l.code)}</pre>`:""}<h3>Thực hiện từng bước</h3>${bullet(l.steps)}</section><section class="content"><h2>Tự làm lại</h2><p>${esc(l.task)}</p><details><summary>Xem lời giải gợi ý</summary><p>${esc(l.answer)}</p></details></section><section class="content" id="quiz"><h2>Kiểm tra cuối bài</h2><form id="lessonquiz" data-lesson="${i}"><p><strong>${esc(l.q[0])}</strong></p>${l.q[1].map((v,n)=>`<label class="choice"><input type="radio" name="option" value="${n}" ${passed&&n===l.q[2]?"checked":""} required>${esc(v)}</label>`).join("")}<div class="actions"><button class="btn green" type="submit">Kiểm tra đáp án</button></div><div role="status" class="feedback" id="quizfeedback">${passed?"Đã hoàn thành. "+esc(l.q[3]):""}</div></form><div id="lessonNext">${passed?nextAction(i):""}</div></section>${note("lesson"+i)}</div><aside class="rail"><section class="box"><div class="promohead">${icon(m.icon)}Tuần ${pad(w+1)}</div><h3 style="margin-top:8px">${m.title}</h3><ul class="sectionlist">${COURSE.slice(w*3,w*3+3).map((v,j)=>`<li><a class="${i===w*3+j?"current":""}" href="${lesUrl(w*3+j)}">${icon(lessonDone(w*3+j)?"done":"circle")}${v.title}</a></li>`).join("")}</ul></section>${progress()}</aside></div>`;
}
function nextAction(i){return `<div class="actions">${i===11?btn("#labs","Đến phòng thực hành","ghost","flask"):btn(lesUrl(i+1),"Học bài tiếp theo","ghost","book")}</div>`;}
function labs(){return page("Ứng dụng kiến thức","Phòng thực hành","Tải dữ liệu giả lập, làm bài theo hướng dẫn và nhập kết quả để tự chấm. Bốn bài dùng chung bối cảnh vận hành ngân hàng.")+bank.linkPanel("labs")+`<div class="listgrid">${L.map((l,i)=>`<a class="card labcard" href="#lab/${l.id}"><div class="labcardname">${tile(["table","compare","chart","bulb"][i],tones[i])}${tag(labDone(l)?"Đã hoàn thành":l.tag,tones[i])}</div><h2>${l.title}</h2><p>${l.intro}</p><div class="meta" style="margin-top:15px">${icon("clock")}${l.minutes} phút <span>·</span> 3 câu tự chấm</div><span class="textlink">Mở bài thực hành</span></a>`).join("")}</div>`;}
function fileLink(f){const url=window.OFFLINE_CSV?.[f.path]||f.path;return `<a class="download" href="${esc(url)}" download="${esc(f.path.split("/").pop())}">${icon("download")}${esc(f.label)}</a>`;}
function lab(l){
const idx=L.indexOf(l);
return back("#labs","Phòng thực hành")+`<div class="twocol"><div><section class="content lessonhead">${tag(l.tag,tones[idx])}<h1>${l.title}</h1><p>${l.intro}</p><div class="meta">${icon("clock")}${l.minutes} phút <span>·</span> Dữ liệu giả lập</div></section><section class="content"><h2>Tệp dữ liệu thực hành</h2><p>Tải tệp CSV và mở bằng Excel. Giữ một bản gốc để kiểm tra kết quả.</p><div>${l.files.map(fileLink).join("")}</div><h3>Các bước thực hiện</h3>${bullet(l.steps)}</section><section class="content"><h2>Kiểm tra kết quả</h2><p>Trả lời đúng cả ba câu để hoàn thành bài thực hành.</p><form id="labquiz" data-lab="${l.id}">${l.questions.map((q,i)=>`<label class="field"><span>${i+1}. ${esc(q.prompt)}</span><input name="a${i}" required autocomplete="off" value="${esc(st.answers[l.id]?.[i]??"")}" ${typeof q.answer==="number"?'inputmode="decimal"':""}></label><div class="feedback" id="fb${i}"></div>`).join("")}<button class="btn green" type="submit">Chấm bài thực hành</button><div class="feedback" role="status" id="labfeedback">${labDone(l)?"Đã hoàn thành bài thực hành.":""}</div></form><details><summary>Xem lời giải chi tiết</summary>${bullet(l.solution)}</details></section>${note("lab"+l.id)}</div><aside class="rail">${progress()}<section class="box"><div class="promohead">${icon("book")}Ôn lại lý thuyết</div><ul class="sectionlist">${[[4,5],[6,7,8],[9],[10,11]][idx].map(i=>`<li><a href="${lesUrl(i)}">${icon("book")}${COURSE[i].title}</a></li>`).join("")}</ul></section></aside></div>`;
}
function interview(){
let cats=["Tất cả",...new Set(INTERVIEWS.map(x=>x[0]))],filtered=INTERVIEWS.filter(z=>interCategory==="Tất cả"||z[0]===interCategory);
return page("Ôn tập ứng tuyển","Luyện phỏng vấn","Dành 60–90 giây tự nói câu trả lời, sau đó mở đáp án mẫu để đối chiếu cách lập luận. Hai câu tiếng Anh giúp bạn luyện giải thích kết quả trong công việc.")+`<div class="subnav" aria-label="Lọc chủ đề">${cats.map(c=>`<button class="chip ${interCategory===c?"selected":""}" data-int="${esc(c)}" aria-pressed="${interCategory===c}">${c}</button>`).join("")}</div>${filtered.map(a=>`<details class="content interview"><summary>${tag(a[0],"mint")} ${esc(a[1])}</summary><h3>Gợi ý trả lời</h3><p>${esc(a[2])}</p><div class="callout"><strong>Tự đánh giá.</strong> ${esc(a[3])}</div></details>`).join("")}${note("interview")}`;
}
const norm=x=>x.normalize("NFD").replace(/\p{M}/gu,"").replace(/đ/gi,"d").toLocaleLowerCase("vi");
function beginner(){return page("Học dữ liệu từ đầu","Bắt đầu học","Dành cho người chưa từng học phân tích dữ liệu. Bạn có thể bắt đầu bằng một bảng nhỏ và học theo tốc độ của mình.")+`<div class="twocol"><section class="content"><h2>Bạn nên học theo thứ tự nào?</h2><ol><li><strong>Excel và tư duy dữ liệu.</strong> Đọc bảng, nhận biết dòng và cột, lọc dữ liệu và tính chỉ số đơn giản.</li><li><strong>SQL và Python.</strong> Truy vấn, ghép bảng và làm sạch dữ liệu bằng bài tập có kết quả để đối chiếu.</li><li><strong>Power BI.</strong> Tạo báo cáo đầu tiên, giải thích chỉ số và kiểm tra tổng.</li></ol><div class="actions">${btn("#day/1","Bắt đầu ngày 01","green","play")}${btn("#roadmap","Xem lộ trình","ghost","route")}</div><p>Các ví dụ sử dụng dữ liệu ngân hàng giả lập để luyện kỹ năng có thể áp dụng cho nhiều ngành.</p></section><aside class="rail"><section class="box"><h2>Học ngoại tuyến</h2><p class="small">Tải bản HTML và mở trên máy tính. Tiến độ được lưu theo trình duyệt.</p>${window.OFFLINE_CSV?'<p class="small">Bạn đang dùng bản ngoại tuyến.</p>':'<a class="download" href="DataLab_offline.html" download>'+icon("download")+'Tải bản ngoại tuyến</a>'}</section></aside></div>`;}

const main=e("main");
const bank=makeBankCenter({esc,icon,table,tag,btn,back,note,fileLink,norm});
const study=makeStudyProgram({st,save,esc,icon,tag,tile,btn,back,page,table,bullet,fileLink,note,render,bank});
const getRoute=()=>{const [s,i,p,d]=location.hash.slice(1).split("/");if(s==="advanced"&&["intermediate","advanced"].includes(i))return [i,p];if(s==="engineering"&&i==="course")return [s,i,p,d];if(s==="engineering"&&isMasterDataLesson(Number(p)))return ["master-data",i,p];return [s==="job"?"start":s||"overview",i,p];};
function toggleMenu(open){e("side").classList.toggle("open",open);e("shade").hidden=!open;e("menubtn")?.setAttribute("aria-expanded",String(open));}
function render(reset=true){
study.video.unmount();let[s,n,p,d]=getRoute(),i=Number(n)-1;let html,current=parent(s);if(s==="cloud-banking")html=cloudBanking(page);else if(s==="mapping")html=renderMappingLab(n,{esc,page,fileLink});else if(s==="ai")html=renderAiCourse(n,{st,esc,page});else if(s==="engineering"&&n==="course"&&Object.hasOwn(engineeringDays,p))html=renderEngineeringDays(Number(p),Number(d),{esc,st,fileLink});else if(s==="engineering"||s==="master-data")html=renderEngineering(s,n,p,{st,esc,page,fileLink});else if(s==="advanced"||s==="intermediate")html=renderAdvanced(s,n,{st,esc,page,tag,fileLink,trackQuiz:study.quiz});else if(s==="bank")html=bank.view(n,p);else if(s==="roadmap")html=study.month();else if(s==="month"&&[1,2,3,4].includes(+n))html=study.month(+n);else if(s==="day"&&Number.isInteger(+n)&&+n>=1&&+n<=PROGRAM.days.length){if(p)Reader.remember(PROGRAM.days[+n-1].book,p);html=study.day(+n);}else if(s==="read"&&Number.isInteger(+n)&&+n>=1&&+n<=PROGRAM.days.length)html=study.reading(+n);else if(s==="books")html=study.catalog();else if(s==="book"&&Object.hasOwn(study.books,n))html=study.detail(n,p);else if(s==="videos")html=study.videoHub(n);else if(s==="math")html=study.math();else if(s==="quick")html=quickRoadmap();else if(s==="week"&&Number.isInteger(i)&&i>=0&&i<4)html=week(i);else if(s==="lesson"&&Number.isInteger(i)&&i>=0&&i<12)html=lesson(i);else if(s==="labs")html=labs();else if(s==="lab"&&L.some(l=>l.id===n))html=lab(L.find(l=>l.id===n));else if(s==="interview")html=interview();else if(s==="dictionary")html=bank.dictionary(n);else if(s==="start")html=beginner();else{html=study.home();current="overview";}
const title=nav.find(x=>x[0]===current)?.[1]||"Tổng quan";side(current);e("top").innerHTML=`<div class="crumbs"><button class="menubtn" id="menubtn" aria-label="Mở điều hướng" aria-expanded="false" aria-controls="side">${icon("menu")}</button><span class="rootcrumb">Không gian học tập</span><span class="slash">/</span><strong>${title}</strong></div><div class="toptools"><a class="searchtop" id="quicksearch" href="#dictionary" aria-label="Tra cứu thuật ngữ">${icon("search")}<span>Tra cứu thuật ngữ</span></a><span class="avatar" title="Học viên">HV</span></div>`;StudySQL.stop();main.innerHTML=html;Reader.hydrate(main);study.video.mount();study.reportLab.mount();document.title=(main.querySelector("h1")?.textContent||title)+" · DataLab";toggleMenu(false);if(reset){window.scrollTo(0,0);main.focus({preventScroll:true});}
}
document.addEventListener("click",ev=>{
const t=ev.target.closest("button,a,#shade");if(!t)return;if(t.id==="menubtn"){toggleMenu(true);e("closemenu").focus();}else if(t.id==="closemenu"||t.id==="shade"){toggleMenu(false);e("menubtn").focus();}else if(t.classList.contains("navlink")||t.classList.contains("brand"))toggleMenu(false);
if(t.dataset.pace){st.pace=t.dataset.pace;save();render(false);main.querySelector(".chip.selected")?.focus();}
if(t.dataset.int){interCategory=t.dataset.int;render(false);main.querySelector(".chip.selected")?.focus();}
if(t.id==="quicksearch"){setTimeout(()=>e("termsearch")?.focus(),50);}
if(t.classList.contains("skip")){ev.preventDefault();main.focus();}
});
document.addEventListener("keydown",ev=>{if(ev.key==="Escape"&&e("side").classList.contains("open")){toggleMenu(false);e("menubtn").focus();}});
document.addEventListener("input",ev=>{const t=ev.target;if(t.dataset.note){st.notes[t.dataset.note]=t.value;save();e("noteState").textContent=storageOK?"Đã lưu trên thiết bị":"Đã giữ ghi chú trong phiên này";}if(t.form?.id==="labquiz"){const f=t.form;st.answers[f.dataset.lab]=[0,1,2].map(i=>f.elements["a"+i].value);save();}});
function refreshProgress(){const box=main.querySelector(".rail .ring")?.closest("section");if(box)box.outerHTML=progress();}
document.addEventListener("submit",ev=>{
let f=ev.target;if(f.id==="lessonquiz"){ev.preventDefault();const i=Number(f.dataset.lesson),l=COURSE[i],ok=Number(new FormData(f).get("option"))===l.q[2];const msg=e("quizfeedback");msg.classList.toggle("bad",!ok);msg.textContent=(ok?"Chính xác. ":"Chưa đúng. ")+l.q[3]+(ok?"":" Chọn lại để thử lần nữa.");if(ok){st.learn[i]=true;save();e("lessonNext").innerHTML=nextAction(i);refreshProgress();const status=main.querySelector(".lessonhead .meta");if(status)status.innerHTML=icon("clock")+l.min+" phút <span>·</span> Đã hoàn thành";const cur=main.querySelector(".sectionlist .current svg");if(cur)cur.outerHTML=icon("done");}}
if(f.id==="labquiz"){ev.preventDefault();const l=L.find(x=>x.id===f.dataset.lab),vals=l.questions.map((_,i)=>f.elements["a"+i].value.trim());let n=0;l.questions.forEach((q,i)=>{let v=vals[i],normalized=v.replace(/\s/g,"").replace(/%$/,"").replace(",",".");let ok=typeof q.answer==="number"?v!==""&&Number(normalized)===q.answer:norm(v)===norm(String(q.answer));if(ok)n++;let m=e("fb"+i);m.classList.toggle("bad",!ok);m.textContent=(ok?"Đúng. ":"Chưa đúng. ")+q.explain;});st.answers[l.id]=vals;if(n===l.questions.length)st.labs[l.id]=true;save();e("labfeedback").textContent=n+"/3 câu đúng. "+(n===3?"Bạn đã hoàn thành bài thực hành.":"Sửa câu còn sai và chấm lại.");refreshProgress();}
});
document.addEventListener("change",event=>{
const courseDay=event.target.dataset.engineeringCourseDay;
if(courseDay){st.engineering[courseDay]=event.target.checked;save();render(false);main.querySelector("[data-engineering-course-day]")?.focus({preventScroll:true});return;}
const id=event.target.dataset.engineeringDone;
if(id!==undefined){st.engineering[id]=event.target.checked;save();}
});
document.addEventListener("change",event=>{const key=event.target.dataset.trackDone;if(key){(st.advancedTrack??={})[key]=event.target.checked;save();}});

document.addEventListener("click",event=>{
 const button=event.target.closest("[data-track-sql]");
 if(!button)return;
 const out=document.getElementById("sqlresult");
 out.textContent="Đang chạy…";
 StudySQL.run(document.getElementById("track-sql").value,trackDatasets[button.dataset.trackSql].tables,result=>{
   if(!out.isConnected)return;
   if(result.error){out.textContent=result.error;return;}
   out.innerHTML='<p>'+result.count+' dòng kết quả</p>'+(result.columns.length?table([result.columns,...result.rows.map(row=>row.map(v=>v??"NULL"))]):"");
 });
});

window.addEventListener("hashchange",()=>render(true));
render(false);
})();
