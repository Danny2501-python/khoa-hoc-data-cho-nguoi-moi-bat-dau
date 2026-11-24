const mappingExercises = [
  ["cif", "Master Data · CIF và quan hệ tài khoản", "4 bảng", "Một khách hàng có thể sở hữu hoặc được ủy quyền trên nhiều tài khoản. Dùng ACN để nối CIF; kiểm tra grain của bảng quan hệ trước khi đếm khách hàng.",
    "Đếm số CIF theo vai trò; so sánh số quan hệ với số CIF duy nhất trong cùng vai trò.",
    "SELECT ROLE, COUNT(*) AS relationships, COUNT(DISTINCT ACN) AS distinct_cifs FROM PRF_RELCIF GROUP BY ROLE ORDER BY ROLE"],
  ["accounts", "Core Banking · Tiền gửi, khoản vay và kỳ trả nợ", "5 bảng", "CID là mã tài khoản trong bộ thực hành. Kỳ trả nợ là mẫu theo khoản vay, nên một khoản vay có thể có nhiều kỳ.",
    "Kiểm tra phạm vi số kỳ mẫu mỗi khoản vay. Tìm khoản vay thiếu kỳ hoặc có số kỳ khác 12.",
    "WITH n AS (SELECT l.CID,COUNT(i.CID) AS periods FROM PRF_LN l LEFT JOIN STG_LOAN_INSTALLMENT i USING(CID) GROUP BY l.CID) SELECT COUNT(*) AS loans, MIN(periods) AS min_periods, MAX(periods) AS max_periods FROM n"],
  ["payments", "Data Engineering · Giao dịch và thanh toán", "4 bảng", "Dùng TSEQ để so sánh các nguồn có cùng mã giao dịch. Số tiền mang đơn vị tiền gốc. Phân tổ theo mã tiền tệ trước khi tổng hợp.",
    "Đếm và tính tổng giao dịch theo tiền tệ. Sau đó kiểm tra TSEQ lặp trước khi nối bảng kênh.",
    "SELECT CRCD AS currency, COUNT(*) AS records, COUNT(DISTINCT TSEQ) AS unique_ids, ROUND(SUM(CAST(TAMT AS REAL)),2) AS amount FROM PRF_HIST GROUP BY CRCD ORDER BY CRCD"],
  ["gl", "Đối soát · Bút toán GL", "40.000 dòng", "Mỗi journal có nhiều dòng ghi Nợ/Có. Đối chiếu theo journal và tiền tệ. Dùng ngưỡng sai số rõ ràng khi làm việc với số thập phân.",
    "Tìm bút toán không cân. Tạo một bản sao cục bộ và thay đổi một dòng để kiểm xem quy tắc bắt được lỗi.",
    "SELECT JOURNAL_ID, CURRENCY_CODE, ROUND(SUM(CAST(DEBIT_AMOUNT AS REAL)-CAST(CREDIT_AMOUNT AS REAL)),2) AS difference FROM STG_GL_POSTING GROUP BY JOURNAL_ID,CURRENCY_CODE HAVING ABS(SUM(CAST(DEBIT_AMOUNT AS REAL)-CAST(CREDIT_AMOUNT AS REAL)))>0.005"],
  ["lookup", "Metadata · Danh mục tham chiếu", "5 bảng", "Danh mục mã giúp chuẩn hóa cách hiển thị và xác định giá trị không hợp lệ. Kiểm tra tính duy nhất của mã trước khi ghép.",
    "Đếm mã tiền tệ trong giao dịch không khớp danh mục tham chiếu.",
    "SELECT COUNT(*) AS unknown_currency_rows FROM PRF_HIST t LEFT JOIN PRF_CRCD c USING(CRCD) WHERE c.CRCD IS NULL"]
];

function renderMappingLab(slug,{esc,page,fileLink}) {
  const exercise=mappingExercises.find(([id])=>id===slug);
  const download=(name,label)=>fileLink({path:"data/mapping/"+name,label});
  if(exercise){
    const [id,title,size,reading,task,query]=exercise;
    return `<div class="de-page"><a href="#mapping">Về kho dữ liệu</a>${page(size,title,reading)}
      <section class="de-card de-block"><h2>Thực hành</h2><p>${esc(task)}</p><div class="de-actions">${download(id+".zip","Tải nhóm CSV")}</div>
      <label for="mapping-sql">Truy vấn SQLite</label><textarea id="mapping-sql" rows="7" spellcheck="false">${esc(query)}</textarea>
      <div class="de-actions"><button type="button" data-mapping-run>Chạy truy vấn</button></div><pre data-mapping-result aria-live="polite">Kết quả sẽ xuất hiện ở đây.</pre></section></div>`;
  }
  return `<div class="de-page">${page("Kho dữ liệu thực hành","Banking AI Mapping","19 bảng ngân hàng giả lập đã lược bỏ các trường nhận diện, phân theo chủ đề và thực hành trực tiếp bằng SQLite.")}
    <div class="de-grid">${mappingExercises.map(([id,title,size,reading])=>`<article class="de-card"><span class="de-level">${esc(size)}</span><h2><a href="#mapping/${id}">${esc(title)}</a></h2><p>${esc(reading)}</p><div class="de-actions">${download(id+".zip","Tải nhóm CSV")}</div></article>`).join("")}</div>
    <section class="de-card de-block"><h2>AI Mapping và Data Quality</h2><ol>
    <li>Dùng nhóm CIF, tài khoản, giao dịch và schema đích để lập STTM gồm trường nguồn, khóa nối, phép biến đổi, kiểu dữ liệu và quy tắc DQ.</li>
    <li>Dùng danh mục lỗi để thiết kế test trên bản sao riêng. Giữ nguyên dữ liệu sạch.</li>
    <li>So quy tắc với đáp án sau khi nộp. Giữ bộ đáp án ngoài dữ liệu đưa cho AI khi chấm mù.</li>
    </ol><div class="de-actions">${download("target-schema.csv","Schema đích")}${download("table-counts.csv","Số dòng theo bảng")}${download("dq-cases.csv","16 tình huống DQ")}${download("banking-lab.db","Toàn bộ SQLite")}</div>
    <details><summary>Mở đáp án tham khảo</summary><p>${download("evaluation.zip","Tải STTM và bảng kiểm")}</p></details></section></div>`;
}
document.addEventListener("click",event=>{
  const button=event.target.closest("[data-mapping-run]");
  if(!button)return;
  const section=button.closest("section");
  const output=section.querySelector("[data-mapping-result]");
  const query=section.querySelector("textarea").value;
  button.disabled=true;
  output.textContent="Đang tải dữ liệu và chạy truy vấn…";
  const path="data/mapping/banking-lab.db";
  StudySQL.run(query,{},result=>{
    button.disabled=false;
    output.textContent=result.error||(result.count?[result.columns,...result.rows].map(row=>row.join(" | ")).join("\n"):"Không có dòng kết quả.")+"\nSố dòng: "+result.count;
  },window.OFFLINE_CSV?.[path]||new URL(path,document.baseURI).href);
});
