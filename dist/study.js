const makeStudyProgram = function({st,save,esc,icon,tag,tile,btn,back,page,table,bullet,fileLink,note,render,bank}){
const {days,books,videos,tables}=window.PROGRAM;
const months=[
["Excel, toán ứng dụng & đối soát","Lập báo cáo hiệu suất 24 hồ sơ và giải thích sai lệch giữa hai sổ.","table","mint"],
["SQL & Python cho số liệu vận hành","Truy vấn, làm sạch và tái tạo cùng một báo cáo bằng ba công cụ.","db","blue"],
["Power BI & dự án cuối khóa","Thiết kế dashboard, kiểm chứng kết quả và bàn giao bằng hai ngôn ngữ.","chart","purple"]
];
const units=[
[[1,7,"Đọc dữ liệu & định nghĩa KPI"],[8,14,"Công thức Excel & thống kê mô tả"],[15,21,"Kiểm soát chất lượng & đối soát"],[22,28,"PivotTable, xác suất & biểu đồ"],[29,30,"Bàn giao báo cáo Excel"]],
[[31,35,"Bước đầu với SQL"],[36,40,"Tổng hợp, phân nhóm & JOIN"],[41,45,"Đối soát SQL & bài kiểm tra"],[46,50,"Làm quen Python và pandas"],[51,55,"Gom nhóm, ghép bảng & chuỗi thời gian"],[56,60,"Kiểm thử và bàn giao notebook"]],
[[61,65,"Power Query & mô hình dữ liệu"],[66,70,"DAX, báo cáo & nghiệm thu"],[71,75,"Thiết kế trực quan từ Practical Tableau"],[76,80,"Thống kê, AI & cải tiến"],[81,87,"Dự án báo cáo vận hành"],[88,90,"Nghiệm thu, bàn giao & phỏng vấn"]]
];
months.push(["SQL Server → Power BI","Xây báo cáo SLA hai trang từ nguồn SQL đến biểu đồ và bảng chi tiết.","chart","blue"]);
units.push([[91,94,"Kết nối và kiểm chứng nguồn SQL"],[95,97,"Mô hình và measure DAX"],[98,100,"Thiết kế và nghiệm thu báo cáo"]]);
const bridges={1:"#lesson/1",6:"#lesson/2",7:"#lesson/3",8:"#lesson/5",14:"#lesson/4",17:"#lesson/7",18:"#lesson/8",20:"#lesson/9",21:"#lab/doi-soat",22:"#lesson/6",29:"#lab/excel-kpi",30:"#lab/excel-kpi",44:"#lab/doi-soat",60:"#lab/doi-soat",61:"#lesson/10",70:"#lab/dashboard",76:"#lab/cai-tien",78:"#lesson/11",80:"#lab/cai-tien",89:"#lesson/12",90:"#interview"};
const datafiles=[{label:"Hồ sơ vận hành",path:"data/ho-so-van-hanh.csv"},{label:"Sổ nội bộ",path:"data/so-noi-bo.csv"},{label:"Sao kê đối tác",path:"data/sao-ke-doi-tac.csv"}];
const max=days.length;
const reportLab=makeReportLab({esc,table,st,save});
let lastReportResult;
const quiz=makeDailyQuiz({esc,save,rec,updateUI});
const video=makeDailyVideo({st,save,esc});
const entry=n=>st.days[n]||{};
const count=(a=1,b=max)=>days.slice(a-1,b).filter(d=>entry(d.n).done).length;
const resume=()=>{let d=st.lastDay;return d>=1&&d<=max&&!entry(d).done?d:days.find(x=>!entry(x.n).done)?.n||1;};
const durl=n=>"#day/"+n;
const mOf=n=>Math.ceil(n/30);
const p2=n=>String(n).padStart(2,"0");
const mkExt=(url,label)=>`<a class="textlink outbound" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ${icon("external")}</a>`;
const dayln=(n,l)=>btn(durl(n),l,"ghost","book");
const vurl=(key,index=1)=>{const v=videos[key];return "https://www.youtube.com/watch?v="+v.items[index-1][0]+"&list="+v.id;};
function progress(){
const c=count(),pct=Math.round(100*c/max);
return `<section class="box"><div class="boxhead"><h2>Tiến độ 100 ngày</h2>${icon("pulse")}</div><div class="progbody"><div class="ring" style="--val:${pct}%"><div class="ringinner"><b>${pct}%</b></div></div><div class="metrics"><div class="metric">Đã hoàn thành <b>${c}/100</b></div><div class="metric">Giờ theo kế hoạch <b>${1.5*c}/150</b></div></div></div></section>`;
}
function home(){
  const n=resume(),d=days[n-1];
  const covers=["Excel","SQL + Python","Power BI","SQL → BI"];
  const cards=months.map(([name,desc,ic],i)=>{
    const start=30*i+1,end=Math.min(max,30*(i+1)),done=count(start,end);
    return `<a class="course-cover cover-${i+1}" href="#month/${i+1}">
      <div class="cover-art"><i aria-hidden="true" class="data-sculpture"><i></i><i></i><i></i></i><span class="cover-symbol">${icon(ic)}</span><b>${covers[i]}</b></div>
      <div class="cover-body"><span class="cover-range">Tháng ${p2(i+1)} · Ngày ${start}–${end}</span><h3>${esc(name)}</h3><p>${esc(desc)}</p>
      <div class="cover-progress"><span>${done}/${end-start+1} buổi</span><i><i style="width:${100*done/(end-start+1)}%"></i></i></div></div></a>`;
  }).join("");
  const cta=count()===max?"Ôn lại ngày 01":st.lastDay?"Học tiếp ngày "+p2(n):"Bắt đầu ngày 01";
  const tracks=[
    ["intermediate","Intermediate","SQL, KPI và báo cáo","db"],
    ["advanced","Advanced","Mô hình và vận hành","chart"],
    ["engineering","Data Engineering","Python, ETL và Airflow","layers"],
    ["master-data","Master Data","CIF, metadata và lineage","db"],
    ["ai","AI & Prompt","Thực hành cho người mới","bulb"],
    ["labs","Phòng thực hành","SQL và Power BI","flask"],
    ["mapping","Kho dữ liệu Mapping","CIF, giao dịch, GL và DQ","table"]
  ];
  return `<div class="review-home">
    <section class="review-hero"><div class="review-copy">
      <p>DataLab</p>
      <h1>Học phân tích dữ liệu<br class="review-break"> từ đầu</h1>
      <p>Dành cho người mới. Học Excel, SQL, Python và Power BI qua bài tập và dữ liệu giả lập.</p>
      <div class="studio-actions">${btn(durl(n),cta,"studio-cta","play")}<a href="#roadmap" class="hero-outline">Xem lộ trình</a></div>
    </div><img src="hero-art.webp" alt="" fetchpriority="high"></section>
    <div class="review-summary">
      <section class="review-next"><p>Ngày ${p2(n)} · 90 phút</p><h2><a href="${durl(n)}">${esc(d.title)}</a></h2><p>${esc(d.goal)}</p></section>
      ${progress()}
    </div>
    <section class="studio-path"><div class="review-section-head"><h2>Lộ trình 100 ngày</h2></div><div class="course-covers">${cards}</div></section>
    <section class="review-tracks"><div class="review-section-head"><h2>Khóa học và phòng thực hành</h2></div>
      <div class="review-track-grid">${tracks.map(([route,title,desc,ic])=>`<a href="#${route}">${icon(ic)}<div><strong>${title}</strong><span>${desc}</span></div></a>`).join("")}</div>
    </section>
  </div>${bank.homeLinks()}`;

}
let filter="all";
function month(m){
if(!m)m=mOf(resume());
const done=count((m-1)*30+1,m*30),blocks=units[m-1];const allowed=d=>filter==="all"||Boolean(entry(d.n).done)===(filter==="done");
return page("100 ngày · 150 giờ","Lộ trình từng ngày","Ba tháng nền tảng và 10 buổi dự án SQL → Power BI. Chọn một ngày để xem phần đọc hoặc video, thực hành, sản phẩm cần lưu và câu tự kiểm tra.")+`<section class="content"><h2>90 phút mỗi buổi</h2><p>15 phút đọc và làm 10 câu ôn nhanh, 15 phút thực hành, 30 phút học theo video hoặc luyện tình huống và 30 phút làm bài kiểm tra 30 câu.</p></section><div class="subnav monthtabs">${months.map((v,i)=>`<a class="chip ${i+1===m?"selected":""}" href="#month/${i+1}" ${i+1===m?'aria-current="page"':""}>Tháng ${i+1}</a>`).join("")}</div><div class="twocol"><div><section class="content"><div class="wk">Ngày ${(m-1)*30+1}–${Math.min(max,m*30)} · ${done}/${Math.min(30,max-(m-1)*30)} hoàn thành</div><h2>${months[m-1][0]}</h2><p>${months[m-1][1]}</p><div class="actions">${["all","todo","done"].map((v,i)=>`<button class="chip ${filter===v?"selected":""}" data-day-filter="${v}" aria-pressed="${filter===v}">${["Tất cả","Chưa xong","Đã xong"][i]}</button>`).join("")}</div></section>${blocks.map(([start,end,title])=>{const list=days.slice(start-1,end).filter(allowed);return !list.length?"":`<section class="content module"><div class="modulebar"><div><div class="wk">Ngày ${p2(start)}–${p2(end)}</div><h2>${title}</h2></div></div>${list.map(d=>`<a class="itemlink" href="${durl(d.n)}"><span class="num">${p2(d.n)}</span><strong>${esc(d.title)}</strong><span class="small">90 phút</span>${icon(entry(d.n).done?"done":"chev")}</a>`).join("")}</section>`;}).join("")}${!days.slice((m-1)*30,m*30).some(allowed)?'<p class="empty">Chưa có buổi nào trong bộ lọc này.</p>':""}</div><aside class="rail">${progress()}</aside></div>`;
}
function videoList(key,ns){
return ns.map(i=>{let [id,title,duration]=videos[key].items[i-1];return `<div class="vidrow"><a class="vidline" href="${esc(vurl(key,i))}" target="_blank" rel="noopener">${icon("play")}<span>${esc(title.replace(/^Khóa Học SQL Server - /i,""))}</span><small>${duration}</small></a><button class="vopen" data-watch="${key}/${i}" aria-label="Xem trên web: ${esc(title)}">Xem tại đây</button></div>`;}).join("");
}
function bookControls(id,p){
 return `<div class="actions"><a class="btn ghost" data-readbook="${esc(id)}" data-p="${p}" hidden></a><label class="btn ghost filepicker">${icon("book")}Chọn PDF trên máy<input type="file" accept="application/pdf,.pdf" data-localbook="${esc(id)}"></label></div><p class="small" role="status" id="readerMsg"></p>`;
}
function article(d){
 if(d.n===1)return `<p>${esc(DayOne.intro)}</p><h3>Sáu hồ sơ trong ca tiếp nhận</h3>${table(DayOne.rows)}<p>${esc(DayOne.example)}</p>`;
 if(d.n>90)return `<p>${esc(d.read)}</p><h3>Kết quả cần đối chiếu</h3><p>${esc(d.output)}</p>`;
 const c=readingCase(d.n);
 return `<p>${esc(d.read)}</p><section class="case-inset"><h3>${esc(c.title)}</h3><p>${esc(c.example)}</p><p>${esc(c.explain)}</p></section>`;
}

function reading(d){
 const p=parseInt(d.pages),b=books[d.book];
 return back(durl(d.n),"Quay lại ngày "+p2(d.n))+page("Bài đọc DataLab · Ngày "+p2(d.n),d.title,d.goal)+`<article class="content bank-prose">${article(d)}<h2>Tự đối chiếu</h2><p>${esc(d.q)}</p><details><summary>Xem lời giải</summary><p>${esc(d.answers[0])}. ${esc(d.why)}</p></details><div class="actions">${btn("#book/"+d.book+"/"+p,"Đọc chuyên đề liên quan","ghost","book")}${btn(durl(d.n),"Về bài ôn nhanh","green")}</div><p class="small">${esc(b[1])} · Trang tham chiếu ${esc(d.pages)}</p></article>`;
}

function stepsbox(time,title,body){return `<section class="content dayblock"><div class="dayblockhead"><span class="timebox">${time} phút</span><h2>${title}</h2></div>${body}</section>`;}
function reportSQL(d){
 if([92,95,96,97,98,99].includes(d.n))return "SELECT * FROM HoSo ORDER BY MaHS;";
 return d.code.replaceAll("dbo.DataLabHoSo","HoSo").replaceAll("N'","'");
}
function sqlEditor(d){return `<div class="workpad"><h3>Chạy thử SQL ngay trên web</h3><p class="small">SQLite đã nạp HoSo, NoiBo, DoiTac từ ba CSV. Chạy từng câu SELECT hoặc WITH. SQL Server trong video dùng TOP, SQLite dùng LIMIT.</p><label class="sr" for="sqlcode">Câu truy vấn</label><textarea id="sqlcode" spellcheck="false">${esc(st.sqlDraft[d.n]??d.code)}</textarea><div class="actions"><button class="btn green" data-sqlrun="${d.n}">${icon("play")}Chạy truy vấn</button><button class="btn ghost" data-sqlreset="${d.n}">Khôi phục câu mẫu</button></div>${d.n>90?'<button type="button" class="btn ghost" data-report-import disabled>Nạp kết quả vào báo cáo</button>':""}<div id="sqlresult" role="status"></div></div>`;}
function editor(d){
if(d.n>90)return sqlEditor({...d,code:reportSQL(d)})+reportLab.panel()+fileLink({label:"Tải script SQL Server và 24 hồ sơ mẫu",path:"data/DataLabHoSo.sql"})+`<h3>${[91,92,93,94,100].includes(d.n)?"Truy vấn trong SSMS":"Công thức trong Power BI Desktop"}</h3><pre class="code">${esc(d.code)}</pre>`+mkExt("https://learn.microsoft.com/en-us/power-query/connectors/sql-server","Microsoft Learn · Kết nối SQL Server");
return d.n>=31&&d.n<=45?sqlEditor(d):d.code?`<pre class="code">${esc(d.code)}</pre><div class="actions">${mkExt("https://colab.research.google.com/","Mở Google Colab")}</div><p class="small">Trong Colab, mở biểu tượng thư mục bên trái, tải CSV vào phiên làm việc rồi chạy ô bằng Shift + Enter. Tải notebook về để giữ kết quả.</p>`:"";
}
function updateUI(n){
 const r=entry(n),button=document.getElementById("finishday"),msg=document.getElementById("dayresult");if(!button||!msg)return;
 button.disabled=!!r.done||!r.examComplete||!r.output;button.textContent=r.done?"Đã hoàn thành ngày "+p2(n):"Hoàn thành ngày "+p2(n);
 msg.textContent=r.done?"Đã lưu vào tiến độ.":r.examComplete&&r.output?"Đã nộp bài và xác nhận thực hành.":"Hoàn thành bài kiểm tra và xác nhận sản phẩm thực hành để ghi nhận buổi học.";
}

function day(n){
 const d=days[n-1],s=entry(n),m=mOf(n),b=books[d.book];st.lastDay=n;save();
 const ref=`<div class="actions">${btn("#read/"+n,"Mở bài đọc đầy đủ","ghost","book")}${btn("#book/"+d.book+"/"+parseInt(d.pages),"Đọc chuyên đề","ghost")}</div><p class="small">Tham chiếu ${esc(b[1])}, trang ${esc(d.pages)}. <a href="#book/${d.book}">Mục lục chọn đọc</a></p>`;
 const practice=n===1?DayOne.steps:d.steps;
 const product=n===1?"Bảng sáu hồ sơ có cột KetQua, tỷ lệ đạt hạn và mã hồ sơ trễ.":d.output;
 const cta=`<button class="btn green" id="finishday" data-finish="${n}" ${s.done||!s.examComplete||!s.output?"disabled":""}>${s.done?"Đã hoàn thành":"Hoàn thành ngày "+p2(n)}</button>`;
 return back("#month/"+m,"Lịch tháng "+m)+`<div class="twocol"><div><section class="content lessonhead">${tag("Tháng "+m+" · Ngày "+p2(n)+"/100",months[m-1][3])}<h1>${esc(d.title)}</h1><p>${esc(d.goal)}</p><div class="meta">${icon("clock")}90 phút <span>·</span>${s.done?"Đã hoàn thành":"Tự học có hướng dẫn"}</div></section>
 ${stepsbox(15,"Đọc học liệu và ôn nhanh",article(d)+ref+quiz.panel(n,"review"))}
 ${stepsbox(15,"Thực hành có hướng dẫn",bullet(practice)+editor(d)+(n===1?fileLink({label:"Bảng sáu hồ sơ Ngày 1",path:"data/ngay-01.csv"}):"")+`<details><summary>Dữ liệu thực hành của khóa</summary>${datafiles.map(fileLink).join("")}</details><h3>Sản phẩm cần lưu</h3><p>${esc(product)}</p><label class="choice"><input type="checkbox" data-output="${n}" ${s.output?"checked":""}>Tôi đã hoàn thành sản phẩm thực hành.</label>`+(bridges[n]?`<div class="actions">${btn(bridges[n],"Bài thực hành bổ trợ","ghost","flask")}</div>`:""))}
 ${stepsbox(30,videoPractice[n]?"Luyện tình huống":"Video và luyện lại",video.panel(n))}
 ${stepsbox(30,"Kiểm tra cuối buổi",(n===1?`<details><summary>Xem bảng sáu hồ sơ của đề</summary>${table(DayOne.rows)}</details>`:`<details><summary>Tra cứu dữ liệu và ví dụ của buổi</summary>${article(d)}${datafiles.map(fileLink).join("")}</details>`)+quiz.panel(n,"exam"))}
 <section class="content"><div class="actions">${cta}</div><p class="small" role="status" id="dayresult">${s.done?"Đã lưu vào tiến độ.":"Hoàn thành bài kiểm tra và xác nhận sản phẩm thực hành để ghi nhận buổi học."}</p></section>${note("day"+n)}<div class="actions">${n>1?dayln(n-1,"Ngày trước"):""}${n<max?dayln(n+1,"Ngày kế tiếp"):btn("#roadmap","Xem lại lộ trình","ghost")}</div></div><aside class="rail">${progress()}<section class="box"><h3>Tra cứu trong buổi</h3><div class="sources"><a href="#dictionary">Từ điển ngân hàng Việt – Anh</a><a href="#books">Tủ tài liệu</a><a href="#videos">Khóa video</a></div></section></aside></div>`;
}

function catalog(){
return page("Tài nguyên học tập","Tủ tài liệu","12 tài liệu đã được chọn chương và trang theo lộ trình. Số trang tính từ trang đầu tiên của tệp PDF. Bạn có thể học theo phần giải thích và ví dụ tiếng Việt ngay trong mỗi ngày.")+bank.linkPanel("books")+
`<div class="section-head"><h2>Phân tích dữ liệu & công cụ</h2></div>${shelf(Object.values(books).slice(0,7))}<div class="section-head below"><h2>Toán & tài chính · CFA Level I 2022</h2></div><p class="small" style="margin-bottom:12px">Book 1 dành cho toán và thống kê. Bốn quyển sau bổ sung bối cảnh nghiệp vụ, quản trị và cách báo cáo.</p>${shelf(Object.values(books).slice(7))}`;
}
function shelf(list){return `<div class="listgrid">${list.map((b,i)=>`<a class="card labcard" href="#book/${b[0]}"><div class="labcardname">${tile(b[0].startsWith("cfa")?"chart":"book",["mint","blue","orange","purple"][i%4])}${tag(b[3]+" trang","mint")}</div><h2>${esc(b[1])}</h2><span class="small">${esc(b[2])}</span><p style="margin-top:8px">${esc(b[4])}</p><span class="textlink">Xem phần đọc và ngày học</span></a>`).join("")}</div>`;}
function detail(id,p){
 const b=books[id],range=days.filter(d=>d.book===id),hasPage=Boolean(p)&&Number.isFinite(+p),pg=hasPage?Number(p):b[7][0][0],a=bookTopic(id,pg);
 const body=hasPage?`<article class="content bank-prose topic-article"><div class="wk">Chuyên đề DataLab · ${esc(b[1])}</div><h2>${esc(a.title)}</h2><p>${esc(a.concept)}</p><h3>Ví dụ thực hành</h3><p>${esc(a.example)}</p><h3>Tự kiểm tra</h3><p>${esc(a.question)}</p><details><summary>Xem lời giải</summary><p>${esc(a.answer)}</p></details></article>`:"";
 return back("#books","Tủ tài liệu")+page("Học liệu theo chủ đề",b[1],b[2])+`<div class="twocol"><div>${body}<section class="content"><h2>Mục lục chọn đọc</h2><p>${esc(b[4])}</p>${b[7].map(([start,t])=>`<a class="itemlink" href="#book/${id}/${start}"><strong>${esc(t)}</strong><span class="small">Đọc chuyên đề</span>${icon("chev")}</a>`).join("")}</section><section class="content"><h3>Nguồn tham khảo</h3>${mkExt(b[5],b[6])}<details><summary>Đối chiếu với PDF cá nhân</summary>${bookControls(id,pg)}</details></section></div><aside class="rail"><section class="box"><h3>Buổi học liên quan</h3><ul class="sectionlist">${range.map(d=>`<li><a href="${durl(d.n)}">Ngày ${p2(d.n)} · ${esc(d.title)}</a></li>`).join("")}</ul></section></aside></div>`;
}

function videoHub(key="excel"){
 if(!["excel","sql","bi"].includes(key))key="excel";
 const courses=[["excel","Excel cơ bản"],["sql","SQL Server"],["bi","Power BI"]];
 const tabs=courses.map(([id,label])=>`<a class="chip ${key===id?"selected":""}" ${key===id?'aria-current="page"':""} href="#videos/${id}">${label}${id==="sql"?" · "+videos[id].items.length+" video":""}</a>`).join("");
 const header=page("Học liệu nghe nhìn","Khóa video","Chọn khóa học để xem video ngay trên DataLab.")+`<div class="subnav">${tabs}</div>`;
 if(key==="excel"){
 const n=Math.min(resume(),17);
 return header+`<section class="content"><div class="eyebrow">Thắng Tin Học · Danh sách phát</div><h2>Học Excel cơ bản</h2><p>Bài đầu tiên giới thiệu Microsoft Excel. Bạn có thể chọn bài tiếp theo trong danh sách phát ngay trên trình phát.</p>${video.panel(n)}<div class="actions">${btn(durl(n),"Vào buổi học ngày "+p2(n),"ghost","book")}</div></section>`;
 }
 if(key==="bi"){
   const daily=lessonVideos.days.flatMap((item,i)=>item?[[item,i+61]]:[]);
   const rows=entries=>entries.map(([[id,title],label,href])=>`<div class="vidrow curated-video"><a class="vidline" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${icon("play")}<span>${esc(title)}</span></a><a class="vopen" href="${href}">${label}</a></div>`).join("");
   const schedule=(from,to)=>rows(daily.filter(([,n])=>n>=from&&n<=to).map(([item,n])=>[item,"Ngày "+n,durl(n)]));
   const track=(prefix,slug)=>rows(Object.entries(lessonVideos.track).filter(([key])=>key.startsWith(prefix)).map(([key,item])=>[item,"Buổi "+key.slice(1),"#"+slug+"/"+key.slice(1)]));
   return header+`<div class="video-collection"><section class="content"><h2>Nền tảng và dự án</h2>${schedule(61,90)}</section><section class="content"><h2>Dự án SQL Server và Power BI</h2>${schedule(91,100)}</section><section class="content"><h2>Intermediate</h2>${track("I","intermediate")}</section><section class="content"><h2>Advanced</h2>${track("A","advanced")}</section></div><section class="content"><details><summary>Playlist gốc PL‑300</summary><p>${mkExt(vurl("bi"),"Mở playlist trên YouTube")}</p>${videoList("bi",videos.bi.items.map((_,i)=>i+1))}</details></section>`;
 }
 const v=videos[key],scheduled=days.filter(d=>d.videos?.[0]===key);
 return header+`<div class="twocol"><section class="content"><h2>${esc(v.title)}</h2><div class="actions">${mkExt(vurl(key),"Mở khóa học trên YouTube")}</div><div class="videolist">${videoList(key,v.items.map((_,i)=>i+1))}</div></section><aside class="rail"><section class="box"><h3>Buổi học liên quan</h3><ul class="sectionlist">${scheduled.map(d=>`<li><a href="${durl(d.n)}">Ngày ${p2(d.n)} · ${esc(d.title)}</a></li>`).join("")}</ul></section></aside></div>`;
}
function rec(n){return st.days[n]||(st.days[n]={});}
document.addEventListener("change",async ev=>{const t=ev.target;if(t.dataset.output){const n=Number(t.dataset.output);rec(n).output=t.checked;save();updateUI(n);}
if(t.dataset.localbook&&t.files?.length){const msg=document.getElementById("readerMsg");try{const persist=await Reader.attach(t.dataset.localbook,t.files[0]);await Reader.hydrate(document);msg.textContent=persist?"Đã gắn tệp. Chọn Đọc PDF để mở đúng trang.":"Đã gắn tệp cho phiên học này. Chọn Đọc PDF để mở.";}catch(err){msg.textContent=err.message;}t.value="";}});
document.addEventListener("click",ev=>{const t=ev.target.closest("button,a");if(!t)return;

if(t.dataset.watch){
 const [key,which,start,end]=t.dataset.watch.split("/"), row=t.closest(".vidrow"), item=videos[key]?.items[Number(which)-1];if(!row||!item)return;
 const old=document.getElementById("embeddedvideo"),same=old?.previousElementSibling===row;old?.remove();if(same)return;
 const holder=document.createElement("div");holder.id="embeddedvideo";holder.innerHTML=`<iframe class="videoplayer" title="${esc(item[1])}" src="https://www.youtube-nocookie.com/embed/${item[0]}${end?"?start="+Number(start)+"&amp;end="+Number(end):""}" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="small">Nếu trình phát không hiển thị, chọn tên video để xem trực tiếp trên YouTube.</p>`;row.after(holder);
}
if(t.dataset.dayFilter){filter=t.dataset.dayFilter;render(false);}
if(t.dataset.emptyread&&t.getAttribute("href")?.startsWith("#")){ev.preventDefault();document.getElementById("readerMsg").textContent="Chọn tệp PDF trên máy trước khi mở trang đọc.";}
if(t.dataset.finish){const n=Number(t.dataset.finish),r=rec(n);if(r.examComplete&&r.output){r.done=true;save();render(false);document.getElementById("dayresult").textContent="Đã lưu ngày "+p2(n)+" vào tiến độ.";}}
if(t.hasAttribute("data-report-import")&&lastReportResult)reportLab.load(lastReportResult);
if(t.dataset.sqlreset){const n=Number(t.dataset.sqlreset);delete st.sqlDraft[n];save();document.getElementById("sqlcode").value=n>90?reportSQL(days[n-1]):days[n-1].code;}
if(t.dataset.sqlrun){const n=Number(t.dataset.sqlrun),area=document.getElementById("sqlcode"),out=document.getElementById("sqlresult");st.sqlDraft[n]=area.value;save();const importButton=document.querySelector("[data-report-import]");if(importButton)importButton.disabled=true;out.textContent="Đang chạy truy vấn…";StudySQL.run(area.value,tables,r=>{if(!out.isConnected)return;if(r.error){out.textContent=r.error;return;}if(importButton){lastReportResult=r;importButton.disabled=false;}out.innerHTML=`<p class="small">${r.count} dòng kết quả${r.count>100?" · hiển thị 100 dòng đầu":""}</p>`+(r.columns.length?table([r.columns,...r.rows.map(row=>row.map(v=>v===null?"NULL":String(v)))]):"");const grid=out.querySelector(".tablewrap");if(grid){grid.tabIndex=0;grid.setAttribute("role","region");grid.setAttribute("aria-label","Bảng kết quả truy vấn");out.insertAdjacentHTML("afterbegin",'<p class="small">Vuốt ngang trong bảng để xem các cột bên phải.</p>');}});}
});
document.addEventListener("input",ev=>{if(ev.target.id==="sqlcode"){st.sqlDraft[st.lastDay]=ev.target.value;save();}});
function math(){
 const list=[[2,"Kiểu dữ liệu"],[5,"Tần số và tỷ trọng"],[12,"Trung bình và trung vị"],[13,"Trọng số"],[23,"Bảng chéo"],[24,"Phần trăm và điểm phần trăm"],[25,"Độ phân tán"],[26,"Xác suất có điều kiện"],[27,"Sai lệch do chọn mẫu"],[55,"Thống kê bằng pandas"],[56,"Xác suất thực nghiệm"],[77,"Lấy mẫu phân tầng"],[86,"Độ tin cậy của kết luận"]];
 return page("SchweserNotes · Thực hành thống kê","Toán cho phân tích vận hành","Dùng các hồ sơ giả lập để tính tay trước, kiểm bằng Excel hoặc Python rồi diễn giải kết quả. Các buổi dưới đây đã nằm trong lịch 90 ngày.")+`<div class="actions" style="margin-bottom:18px">${btn("#book/cfa1/41","Mở Book 1 · Quantitative Methods","ghost","book")}</div><div class="mathgrid">${list.map(([n,t])=>`<a class="card labcard" href="${durl(n)}"><span class="wk">Ngày ${p2(n)} · 90 phút</span><h2 style="margin:7px 0">${t}</h2><p>${esc(days[n-1].goal)}</p></a>`).join("")}</div>`;
}
return {quiz,reportLab,video,home,month,day,reading:n=>reading(days[n-1]),catalog,detail,videoHub,math,books,progress};
};
