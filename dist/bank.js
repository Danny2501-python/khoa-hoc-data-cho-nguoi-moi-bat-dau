function makeBankCenter({esc,icon,table,tag,btn,back,note,fileLink,norm}){
  const lessons=window.BANK_CORE_LESSONS, pack=window.BANK_DATA_LAB;
  const series=window.BANK_BRANCH_SERIES;
  const sourceList=[...window.BANK_SOURCES,{title:"Mật độ chi nhánh ngân hàng thương mại tại Việt Nam",publisher:"IMF · Financial Access Survey / FRED",topic:"Dữ liệu công khai",url:series.source,how:"Tải chuỗi theo năm, giữ nguyên đơn vị trên 100.000 người trưởng thành và so sánh biến động giữa hai kỳ."}];
  const oldLabels={
    PivotTable:["Bảng tổng hợp","PivotTable"],
    "Power Query":["Công cụ biến đổi dữ liệu","Power Query"],
    SLA:["Thỏa thuận mức dịch vụ","SLA · Service level agreement"]
  };
  const terms=[
    ...window.BANK_NEW_TERMS,
    ...TERMS.map(([label,translation,definition])=>{
      const [vi,term]=oldLabels[label]||[label,translation];
      return {term,vi,definition,group:"Phân tích vận hành",example:"",source:""};
    })
  ].sort((a,b)=>a.vi.localeCompare(b.vi,"vi")||a.term.localeCompare(b.term,"en"));
  const totalRows=pack.tables.reduce((total,t)=>total+t.rows,0);
  const vn=(n,max=0)=>Number(n).toLocaleString("vi-VN",{maximumFractionDigits:max});
  const caseURL=i=>`#bank/case/${i+1}`;
  const lessonURL=i=>`#bank/lesson/${i+1}`;
  const ext=(url,label)=>`<a class="bank-ext" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${icon("external")}</a>`;
  const getFile=(f)=>fileLink({label:f.label,path:"data/corebank/"+f.file});
  const sourceName=url=>sourceList.find(s=>s.url===url)?.title||new URL(url).hostname.replace(/^www\./,"");
  let search="",category="",limit=18;
  const draft=new Map();

  const areas=[
    ["#bank","book","Chuyên đề nghiệp vụ",`${lessons.length} chuyên đề`],
    ["#bank/data","db","Dữ liệu & bài tập",`${pack.tables.length} bảng giả lập · ${pack.cases.length} bài SQL`],
    ["#dictionary","search","Từ điển ngân hàng",`${terms.length} thuật ngữ Việt – Anh`],
    ["#bank/sources","layers","Nguồn tham khảo",`${sourceList.length} tài liệu & nguồn dữ liệu`]
  ];
  function homeLinks(){
    return `<section class="bank-home"><div class="bank-home-title"><h2>Học nghiệp vụ ngân hàng</h2></div><div class="bank-shortcuts">${areas.map(([href,ic,title,caption])=>`<a href="${href}"><span class="bank-shorticon">${icon(ic)}</span><span><strong>${esc(title)}</strong><small>${esc(caption)}</small></span></a>`).join("")}</div></section>`;
  }
  function linkPanel(type){
    const data=type==="labs";
    return `<a class="bank-cross" href="${data?"#bank/data":"#bank/sources"}">${icon(data?"db":"layers")}<span><strong>${data?"Bộ dữ liệu Core Banking":"Tài liệu nghiệp vụ ngân hàng"}</strong><small>${data?`${pack.tables.length} bảng có từ điển trường và ${pack.cases.length} tình huống chạy được bằng SQL.`:"Tra nguồn gốc, mở tài liệu chính thức và chọn phần cần đọc cho từng nghiệp vụ."}</small></span>${icon("chev")}</a>`;
  }
  function top(active,title,desc){
    return `<header class="bank-heading"><div class="eyebrow">Kho học liệu ngân hàng</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></header><nav class="bank-tabs" aria-label="Học liệu ngân hàng">${areas.map(([href,ic,name])=>`<a href="${href}" ${active===href?'aria-current="page"':""}>${icon(ic)}${esc(name)}</a>`).join("")}</nav>`;
  }
  function lessonHub(){
    return top("#bank","Nghiệp vụ Core Banking","Theo dấu một giao dịch từ yêu cầu của khách hàng đến dữ liệu ghi sổ. Mỗi chuyên đề có tình huống, cách kiểm tra và ví dụ để tự làm lại.")+
      `<div class="bank-lesson-grid">${lessons.map((l,i)=>`<a class="bank-lesson" href="${lessonURL(i)}"><span class="bank-kicker">${esc(l.group)}</span><h2>${esc(l.title)}</h2><p>${esc(l.question)}</p><span class="bank-read">Đọc chuyên đề ${icon("chev")}</span></a>`).join("")}</div>`;
  }
  function lessonDetail(i){
    const l=lessons[i], urls=l.sources||[];
    const relatedCases=[[1,2],[7],[8],[3,4],[6],[5],[0,7],[2],[7,8],[]][i]||[];
    return back("#bank","Tất cả chuyên đề")+`<div class="bank-heading detail-heading"><div class="eyebrow">${esc(l.group)}</div><h1>${esc(l.title)}</h1><p>${esc(l.question)}</p></div>
    <div class="bank-columns"><div><section class="content bank-prose"><h2>Hiểu nghiệp vụ</h2><p>${esc(l.concept)}</p><h3>Các bước xử lý</h3><ol>${l.flow.map(v=>`<li>${esc(v)}</li>`).join("")}</ol></section>
    <section class="content bank-prose"><h2>Ví dụ có lời giải</h2><p>${esc(l.example)}</p><h3>Tự kiểm tra</h3><p>${esc(l.check)}</p><div class="bank-note"><strong>Điểm dễ nhầm</strong><p>${esc(l.pitfall)}</p></div></section>${note("bank-lesson-"+(i+1))}</div>
    <aside class="rail"><section class="box bank-side"><h2>Đọc cùng chuyên đề</h2>${urls.length?urls.map(u=>ext(u,sourceName(u))).join(""):'<p>Tình huống biên soạn từ các chủ đề trong tài liệu Tổng quan Dự Án CoreBankX.</p>'}</section><section class="box bank-side"><h2>Thực hành tiếp</h2>${relatedCases.map(n=>`<a href="${caseURL(n)}">${esc(pack.cases[n].title)}</a>`).join("")}${i===9?'<a href="#bank/public">Đọc chuỗi số liệu của IMF về Việt Nam</a>':""}<a href="#bank/data">Mở bộ dữ liệu Core Banking</a><a href="#dictionary">Tra thuật ngữ Việt – Anh</a>${i+1<lessons.length?`<a href="${lessonURL(i+1)}">${esc(lessons[i+1].title)}</a>`:""}</section></aside></div>`;
  }
  function sourceHub(){
    const groupFor=s=>{
      if (/Dữ liệu.*công khai|Khai thác dữ liệu/i.test(s.topic)) return "Dữ liệu công khai";
      if (/Tiền gửi|Ngoại hối|Kế toán/.test(s.topic)) return "Tiền gửi, kế toán và ngoại hối";
      if (/Kiến trúc|Thanh toán|Sao kê/.test(s.topic)) return "Kiến trúc và thanh toán";
      return "Quản trị dữ liệu và nghiệm thu";
    };
    const groups=[...new Set(sourceList.map(groupFor))];
    return top("#bank/sources","Tài liệu nghiệp vụ ngân hàng","Chọn một câu hỏi nghiệp vụ, đọc hướng dẫn bên cạnh từng nguồn rồi mở tài liệu gốc để đối chiếu.")+
      `<div class="bank-note"><strong>Tài liệu nền của chuyên đề</strong><p>Các tình huống học tập được biên soạn từ các chủ đề trong tài liệu “Tổng quan Dự Án CoreBankX”, như Thin Core, hạch toán, chuyển đổi dữ liệu và nghiệm thu.</p></div>`+
      groups.map(g=>`<section class="bank-shelf"><h2>${esc(g)}</h2><div class="bank-source-grid">${sourceList.filter(s=>groupFor(s)===g).map(s=>`<article class="bank-source"><span class="bank-kicker">${esc(s.publisher)}</span><h3>${ext(s.url,s.title)}</h3><p>${esc(s.how)}</p></article>`).join("")}</div></section>`).join("");
  }
  function termResults(){
    const words=norm(search.trim()).split(/\s+/).filter(Boolean);
    const matches=terms.filter(t=>(!category||t.group===category)&&words.every(w=>norm([t.term,t.vi,t.group,t.definition,t.example].join(" ")).includes(w)));
    if(words.length){
      const query=norm(search.trim());
      const relevance=t=>{
        const labels=[norm(t.vi),norm(t.term)];
        if(labels.includes(query))return 3;
        if(labels.some(label=>label.startsWith(query)))return 2;
        return words.every(w=>labels.some(label=>label.includes(w)))?1:0;
      };
      matches.sort((a,b)=>relevance(b)-relevance(a));
    }
    const visible=matches.slice(0,limit);
    return `<p class="bank-result-count" role="status">${matches.length?vn(matches.length)+" thuật ngữ · hiển thị "+visible.length:"Chưa tìm thấy thuật ngữ phù hợp."}</p>${!matches.length?`<button type="button" class="chip" data-bank-clear>Xóa bộ lọc</button>`:""}
      <div class="bank-terms">${visible.map(t=>`<article class="bank-term"><span class="bank-kicker">${esc(t.group)}</span><h2>${esc(t.vi)}</h2><div class="bank-english" lang="en">${esc(t.term)}</div><p>${esc(t.definition)}</p>${t.example?`<div class="bank-example"><strong>Ví dụ</strong> ${esc(t.example)}</div>`:""}${t.source?ext(t.source,"Nguồn tham khảo"):""}</article>`).join("")}</div>${matches.length>limit?`<button type="button" class="btn ghost bank-more" data-bank-more>Hiển thị thêm ${Math.min(18,matches.length-limit)} thuật ngữ</button>`:""}`;
  }
  function dictionary(prefill){
    if(prefill){try{search=decodeURIComponent(prefill);}catch{search=prefill;}category="";limit=18;}
    const categories=[...new Set(terms.map(t=>t.group))].sort((a,b)=>a.localeCompare(b,"vi"));
    return top("#dictionary","Từ điển ngân hàng Việt – Anh","Tra chữ viết tắt, thuật ngữ nghiệp vụ hoặc tên trường dữ liệu. Bạn có thể gõ không dấu và lọc theo chủ đề.")+
      `<div class="bank-filters"><label class="termsearch">${icon("search")}<input type="search" id="termsearch" value="${esc(search)}" aria-label="Tìm thuật ngữ" placeholder="Tìm CIF, giải ngân, sổ cái…"></label><label class="bank-select"><span>Chủ đề</span><select id="bank-group"><option value="">Tất cả chủ đề</option>${categories.map(g=>`<option ${g===category?"selected":""}>${esc(g)}</option>`).join("")}</select></label></div><div id="terms">${termResults()}</div>`;
  }
  function publicData(){
    const first=series.values[0], last=series.values.at(-1);
    const unit="chi nhánh trên 100.000 người trưởng thành";
    const newestChange=last[1]-series.values.at(-2)[1];
    return `<section class="content bank-prose bank-public"><span class="bank-kicker">Dữ liệu công khai · Việt Nam</span><h2>Mật độ chi nhánh ngân hàng thương mại</h2><p>Mỗi dòng là một năm của Việt Nam. Chỉ tiêu đo số ${unit}. Chuỗi gồm ${series.values.length} quan sát từ ${first[0]} đến ${last[0]} trong Financial Access Survey của IMF.</p>
      <figure><figcaption>Chi nhánh trên 100.000 người trưởng thành</figcaption><div class="bank-bars" role="img" aria-label="Mật độ đạt ${vn(4.0399838660,2)} năm 2020, giảm còn ${vn(2.9295233227,2)} năm 2021 và đạt ${vn(last[1],2)} năm ${last[0]}. Bảng bên dưới có đủ các giá trị.">${series.values.map(([year,value])=>`<div title="${year} · ${vn(value,4)}" style="--bar:${value/5*100}%"></div>`).join("")}</div><div class="bank-axis"><span>${first[0]}</span><span>${last[0]}</span></div></figure>
      <div class="bank-actions">${fileLink({path:"data/public/mat-do-chi-nhanh-vn.csv",label:"Tải 17 quan sát (CSV)"})}${ext(series.source,"Bảng gốc IMF qua FRED")}</div>
      <details><summary>Xem bảng và bài tập đọc chỉ tiêu</summary>${table([["Năm",unit],...series.values.map(([y,v])=>[y,vn(v,6)])])}<h3>Từ 2023 đến 2024, chỉ tiêu thay đổi bao nhiêu?</h3><p>Lấy mức năm 2024 trừ mức năm 2023 trước khi làm tròn. Kết quả tăng ${vn(newestChange,4)} ${unit}, tương đương khoảng ${vn(100*newestChange/series.values.at(-2)[1],2)}% so với 2023. Muốn suy ra số chi nhánh thực tế cần biết dân số trưởng thành từng năm.</p></details></section>`;
  }
  function tableGuide(t){
    const preview=t.preview||[];
    const keys=preview.length?Object.keys(preview[0]):[];
    return `<details class="bank-schema"><summary><span><code>${esc(t.name)}</code><small>${esc(t.grain)}</small></span><span>${vn(t.rows)} dòng</span></summary><div class="bank-schema-body"><p><strong>Khóa</strong> · ${esc(t.key)}</p>${table([["Trường","Ý nghĩa"],...t.fields.map(f=>[f.name,f.description])])}${keys.length?`<h3>Dòng dữ liệu mẫu</h3>${table([keys,...preview.map(row=>keys.map(k=>row[k]??"NULL"))])}`:""}${getFile({file:t.file,label:"Tải CSV của bảng"})}</div></details>`;
  }
  function dataHub(){
    return top("#bank/data","Dữ liệu & bài tập ngân hàng","Khám phá các bảng liên quan, tra ý nghĩa từng trường và thực hành trên cùng một bộ số liệu. Bạn có thể chạy SQL ngay trên trang hoặc tải dữ liệu về Excel, Power BI và SQLite.")+
      `<section class="content bank-prose"><span class="bank-kicker">Dữ liệu giả lập · Core Banking</span><h2>Bộ dữ liệu giao dịch và đối soát</h2><p>${esc(pack.intro)}</p><div class="bank-counts"><span><b>${pack.tables.length}</b> bảng liên kết</span><span><b>${vn(totalRows)}</b> dòng</span><span><b>${pack.cases.length}</b> bài SQL</span></div><div class="bank-actions">${pack.files.map(getFile).join("")}</div></section>
      <a class="bank-cross" href="#bank/public">${icon("chart")}<span><strong>Dữ liệu công khai · Mật độ chi nhánh tại Việt Nam</strong><small>17 quan sát theo năm của IMF, kèm biểu đồ, CSV và bài tập đọc chỉ tiêu.</small></span>${icon("chev")}</a>
      <section class="content bank-prose"><h2>Từ điển trường & dữ liệu mẫu</h2><p>Mở một bảng để xem mỗi dòng đại diện cho đối tượng nào, khóa ghép, ý nghĩa các cột và bản ghi mẫu.</p>${pack.tables.map(tableGuide).join("")}</section>
      <section class="content bank-prose"><h2>Tình huống thực hành</h2><div class="bank-cases">${pack.cases.map((c,i)=>`<a href="${caseURL(i)}"><span><strong>${esc(c.title)}</strong><small>${esc(c.question)}</small></span>${icon("chev")}</a>`).join("")}</div></section>`;
  }
  function caseDetail(i){
    const c=pack.cases[i], firstTable=pack.tables[0].name;
    return back("#bank/data","Dữ liệu & bài tập")+`<header class="bank-heading detail-heading"><div class="eyebrow">Thực hành SQLite · Dữ liệu giả lập</div><h1>${esc(c.title)}</h1><p>${esc(c.question)}</p></header>
      <div class="bank-columns"><div><section class="content bank-prose"><h2>Thử truy vấn</h2><p>Sửa câu SQL rồi chạy để xem kết quả trên toàn bộ dữ liệu. Kết quả hiển thị tối đa 100 dòng.</p><label class="bank-code-label" for="bank-query">SQL của bạn</label><textarea id="bank-query" spellcheck="false" data-case="${i}">${esc(draft.get(i)??("SELECT *\nFROM "+firstTable+"\nLIMIT 5;"))}</textarea><div class="bank-actions"><button type="button" class="btn green" data-bank-run="${i}">${icon("play")}Chạy SQL</button><button type="button" class="btn ghost" data-bank-solution="${i}">Nạp truy vấn mẫu</button></div><div id="bank-query-result" class="bank-query-result" aria-live="polite"></div></section>
      <section class="content bank-prose"><h2>Đối chiếu bài làm</h2><details><summary>Gợi ý cách tiếp cận</summary><p>${esc(c.method)}</p></details><details><summary>Xem lời giải và kết quả kỳ vọng</summary><pre class="code">${esc(c.sql)}</pre><h3>Kết quả</h3><p>${esc(c.result)}</p><h3>Giải thích</h3><p>${esc(c.why)}</p></details></section>${note("bank-case-"+(i+1))}</div>
      <aside class="rail"><section class="box bank-side"><h2>Các bảng có thể truy vấn</h2>${pack.tables.map(t=>`<details><summary><code>${esc(t.name)}</code></summary><p>${esc(t.grain)}</p><p>${t.fields.map(f=>`<code>${esc(f.name)}</code>`).join(", ")}</p></details>`).join("")}</section><section class="box bank-side"><h2>Bài thực hành</h2><a href="#bank/data">Xem từ điển trường và tải dữ liệu</a>${i+1<pack.cases.length?`<a href="${caseURL(i+1)}">${esc(pack.cases[i+1].title)}</a>`:""}</section></aside></div>`;
  }
  function view(section,id){
    const i=Number(id)-1;
    if(section==="lesson"&&Number.isInteger(i)&&lessons[i])return lessonDetail(i);
    if(section==="case"&&Number.isInteger(i)&&pack.cases[i])return caseDetail(i);
    if(section==="data")return dataHub();
    if(section==="public")return back("#bank/data","Dữ liệu & bài tập")+top("#bank/data","Đọc số liệu ngân hàng Việt Nam","Luyện phân tích chuỗi thời gian bằng bảng thống kê công khai của IMF.")+publicData();
    if(section==="sources")return sourceHub();
    return lessonHub();
  }
  function refreshTerms(){
    const box=document.getElementById("terms");
    if(box)box.innerHTML=termResults();
  }
  document.addEventListener("input",ev=>{
    if(ev.target.id==="termsearch"){search=ev.target.value;limit=18;refreshTerms();}
    if(ev.target.id==="bank-query")draft.set(Number(ev.target.dataset.case),ev.target.value);
  });
  document.addEventListener("change",ev=>{
    if(ev.target.id==="bank-group"){category=ev.target.value;limit=18;refreshTerms();}
  });
  document.addEventListener("click",ev=>{
    const button=ev.target.closest("button");
    if(!button)return;
    if(button.hasAttribute("data-bank-more")){
      const before=limit;limit+=18;refreshTerms();
      const firstNew=document.querySelectorAll(".bank-term")[before];if(firstNew){firstNew.tabIndex=-1;firstNew.focus({preventScroll:true});firstNew.scrollIntoView({block:"nearest"});}
    }
    if(button.hasAttribute("data-bank-clear")){
      search="";category="";limit=18;
      document.getElementById("termsearch").value="";document.getElementById("bank-group").value="";
      refreshTerms();document.getElementById("termsearch").focus();
    }
    if(button.dataset.bankSolution!==undefined){
      const i=Number(button.dataset.bankSolution),input=document.getElementById("bank-query");
      input.value=pack.cases[i].sql;draft.set(i,input.value);input.focus();
    }
    if(button.dataset.bankRun!==undefined){
      const code=document.getElementById("bank-query"),out=document.getElementById("bank-query-result");
      const dbName=pack.files.find(f=>/\.(sqlite3?|db)$/i.test(f.file)).file;
      const path="data/corebank/"+dbName;
      const databaseURL=window.OFFLINE_CSV?.[path]||new URL(path,document.baseURI).href;
      button.disabled=true;out.textContent="Đang chạy truy vấn…";
      StudySQL.run(code.value,{},result=>{
        if(!out.isConnected)return;
        button.disabled=false;
        if(result.error){out.textContent="Lỗi truy vấn · "+result.error;return;}
        out.innerHTML=`<p>${vn(result.count)} dòng kết quả${result.count>100?" · hiển thị 100 dòng đầu":""}</p>`+(result.columns.length?table([result.columns,...result.rows.map(r=>r.map(v=>v??"NULL"))]):"");
      },databaseURL);
    }
  });
  return {homeLinks,linkPanel,view,dictionary};
}
