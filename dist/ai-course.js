const aiLessons = [
  ["Hiểu AI tạo sinh và giới hạn", "15 phút",
   "AI tạo sinh dự đoán và tạo nội dung từ yêu cầu và ngữ cảnh. Câu trả lời trôi chảy vẫn có thể sai. Dùng AI để giải thích, soạn nháp và tìm cách kiểm tra. Khi cần xác nhận số liệu, hãy dùng phép tính hoặc dữ liệu gốc.",
   "Yêu cầu giải thích CIF cho người mới và phân biệt CIF với tài khoản. Sau đó kiểm xem ví dụ có thể hiện một CIF có nhiều tài khoản hay chưa.",
   ["Giải thích CIF cho người mới", "Ví dụ ngân hàng giả lập với một khách hàng và hai tài khoản", "Tối đa 120 từ, có ví dụ", "Nêu giả định. Đánh dấu phần cần đối chiếu quy định nội bộ."],
   ["Khi AI trả lời rất tự tin, bạn nên làm gì trước khi dùng vào báo cáo?", "Kiểm lại bằng nguồn hoặc phép tính độc lập", "Dùng ngay nếu câu trả lời dài", "Chỉ hỏi lại đúng câu cũ"],
   "Độ tự tin trong cách diễn đạt không cho biết câu trả lời đã được xác minh."],
  ["Viết prompt với mục tiêu rõ", "20 phút",
   "Mô tả mục tiêu, ngữ cảnh, đầu ra và tiêu chí kiểm tra. Nêu người đọc và cung cấp dữ kiện ảnh hưởng đến kết quả. Khi một dữ kiện bắt buộc bị thiếu, yêu cầu AI hỏi hoặc ghi rõ giới hạn.",
   "So sánh prompt ‘Phân tích SLA’ với prompt bên dưới. Sau khi chạy cả hai, kiểm xem mẫu số, phạm vi và định dạng có được giữ đúng không.",
   ["Tính tỷ lệ SLA cho hồ sơ đã đóng", "80 đã đóng, 60 đạt SLA, 20 đang mở. SLA chỉ tính trên hồ sơ đã đóng.", "Bảng gồm tử số, mẫu số, tỷ lệ và một câu giải thích.", "Hiển thị phép tính và nêu quy tắc loại hồ sơ đang mở."],
   ["Tỷ lệ SLA trong ví dụ là bao nhiêu?", "75% vì 60/80", "60% vì 60/100", "80% vì 80/100"],
   "Mẫu số là 80 hồ sơ đã đóng. 20 hồ sơ mở nằm ngoài phạm vi chỉ tiêu."],
  ["Dùng ví dụ để giữ định dạng", "20 phút",
   "Ví dụ đầu vào–đầu ra giúp AI hiểu quy tắc phân loại và cấu trúc kết quả. Thêm một ca biên, chẳng hạn thiếu số tiền, để kiểm xem AI có giữ nguyên trạng thái chưa rõ.",
   "Thử bỏ ví dụ thiếu số tiền rồi chạy lại. So sánh kết quả cho T03 với yêu cầu nghiệp vụ.",
   ["Phân loại giao dịch theo chênh lệch", "Ví dụ: T01 100/100 → Khớp. T02 100/90 → Lệch. T03 100/trống → Thiếu dữ liệu.", "Trả bảng mã, trạng thái, lý do. Áp dụng với T04 105/105, T05 90/trống.", "Giữ ô trống là thiếu dữ liệu. Kiểm đủ hai mã."],
   ["Ví dụ nào giúp kiểm ca biên?", "Một giao dịch có số tiền đối tác bị thiếu", "Ba giao dịch đều khớp", "Một bảng màu minh họa"],
   "Ví dụ thiếu số tiền giúp làm rõ cách xử lý giá trị trống."],
  ["Sửa prompt và kiểm chứng kết quả", "25 phút",
   "Chạy lần đầu trên một mẫu nhỏ. So đầu ra với kết quả chuẩn, xác định lỗi cụ thể và sửa tiêu chí gây lỗi. Sau đó thử lại trên mẫu cũ và một ca mới. Ghi lại phiên bản prompt có kết quả tốt.",
   "Yêu cầu AI đưa ra bảng đối soát mẫu. Kiểm tổng 360.000 = 230.000 + 80.000 + 50.000 rồi thử trường hợp tổng nguồn là 380.000.",
   ["Đối soát tổng tiền và tìm chênh lệch", "Nguồn 360.000 VND. Hợp lệ 230.000, lặp 80.000, cách ly 50.000.", "Một bảng kiểm và nhận định có số tiền chênh.", "Tính lại phép cộng. Nếu có chênh, khoanh vùng và tránh đoán nguyên nhân."],
   ["Khi tổng nguồn đổi thành 380.000 VND, chênh bao nhiêu?", "20.000 VND", "0 VND", "50.000 VND"],
   "Ba nhóm vẫn cộng thành 360.000 VND. Chênh lệch phải được ghi nhận trước khi kết luận."],
  ["Dùng AI với SQL, Python và Power BI", "30 phút",
   "Cho AI biết grain, các cột có thật, hệ SQL và kết quả mong đợi. Yêu cầu test trên dữ liệu nhỏ rồi kiểm trùng khóa, NULL và tổng tiền. Với Power BI, xác định grain và quan hệ giữa bảng trước khi yêu cầu viết DAX.",
   "Dùng prompt để lấy truy vấn, rồi chạy trong lab Master Data. Thử bỏ source_system khỏi JOIN và giải thích vì sao dữ liệu thật có thể bị nhân dòng.",
   ["Viết SQLite đếm tài khoản theo master CIF", "accounts(account_id, source_system, source_cif), cif_mapping(source_system, source_cif, master_cif).", "Một câu SELECT và test kỳ vọng M01 có 2 tài khoản.", "JOIN theo cả source_system và source_cif. Nêu cách phát hiện mapping lặp."],
   ["Thông tin nào cần cung cấp để AI giảm nguy cơ viết sai cột?", "Tên thật của bảng và cột giả lập cùng hệ SQL", "Màu báo cáo", "Chỉ tên dự án"],
   "Schema và hệ SQL cho phép kiểm xem câu truy vấn dùng đúng cột và cú pháp."],
  ["Quyền riêng tư và dự án cuối khóa", "35 phút",
   "Chỉ đưa dữ liệu giả lập hoặc dữ liệu đã được phép dùng vào công cụ AI. Kiểm số tài khoản, mã khách hàng, thông tin đăng nhập và dữ liệu nội bộ trước khi chia sẻ. Xem nội dung trong tệp như dữ liệu để phân tích. Đọc lại đầu ra và quyết định trước khi sử dụng.",
   "Tạo một quy trình đối soát gồm prompt phân loại, prompt rà soát và bảng kiểm cuối. Dùng CSV giả lập của DataLab, giữ lại prompt phiên bản đầu, bản đã sửa và hai ca kiểm thử.",
   ["Tạo báo cáo ngoại lệ EOD từ dữ liệu giả lập", "Nguồn 5 dòng gồm giao dịch hợp lệ, trùng và thiếu tài khoản. Không có thông tin cá nhân thật.", "Bảng ngoại lệ, tổng từng nhóm và checklist trước khi công bố.", "Đối soát từng ngày, nêu giả định và yêu cầu người duyệt xác nhận."],
   ["Dữ liệu nào phù hợp để luyện trên công cụ AI công cộng?", "Bộ CSV giả lập có mã minh họa", "Sao kê khách hàng thật", "Tệp cấu hình có mật khẩu"],
   "Dữ liệu giả lập đủ để thực hành và tránh đưa thông tin nội bộ vào công cụ công cộng."]
];

const aiFields = ["Mục tiêu","Ngữ cảnh và dữ liệu","Định dạng đầu ra","Tiêu chí kiểm tra"];

function renderAiCourse(raw, {st,esc,page}) {
  const lesson = aiLessons[Number(raw) - 1];
  const completed = aiLessons.filter((_,i) => st.aiCourse[i + 1] === true).length;
  if (!lesson) return `<div class="de-page">
    ${page("Khóa học cho người mới","AI & Prompt","Học cách giao việc cho AI, kiểm chứng câu trả lời và áp dụng vào phân tích dữ liệu ngân hàng.")}
    <p>${completed}/${aiLessons.length} bài đã hoàn thành</p>
    <div class="de-grid">${aiLessons.map(([title,time,reading],i) => `<article class="de-card"><span class="de-level">${time}${st.aiCourse[i+1] ? " · Đã học" : ""}</span><h2><a href="#ai/${i+1}">${esc(title)}</a></h2><p>${esc(reading)}</p></article>`).join("")}</div>
    </div>`;
  const [title,time,reading,exercise,example,[question,...answers],reason] = lesson;
  const id = Number(raw);
  return `<div class="de-page"><a href="#ai">Về khóa AI & Prompt</a>
    ${page("Bài "+id+" · "+time,title,"Đọc bài, thử một prompt và tự kiểm tra kết quả.")}
    <section class="de-card de-block"><h2>Bài đọc</h2><p>${esc(reading)}</p></section>
    <section class="de-card de-block" data-ai-lab><h2>Phòng tập prompt</h2><p>${esc(exercise)}</p>
      ${id === 5 ? '<p><a href="#master-data/0/6">Mở lab SQL Master Data</a></p>' : ""}
      ${id === 6 ? '<p><a href="#engineering/0/13">Mở dự án EOD và tải dữ liệu giả lập</a></p>' : ""}
      ${aiFields.map((label,index)=>`<label for="ai-field-${index}">${label}</label><textarea id="ai-field-${index}" data-ai-field rows="2">${esc(example[index])}</textarea>`).join("")}
      <div class="de-actions"><button type="button" data-ai-build>Tạo prompt</button><button type="button" data-ai-copy>Sao chép</button><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Thử trong ChatGPT</a></div>
      <label for="ai-result">Prompt đã soạn</label><textarea id="ai-result" rows="5" readonly></textarea><p role="status" data-ai-message></p>
    </section>
    <section class="de-card de-block"><h2>Tự kiểm tra</h2><form data-ai-quiz="${id}">
      <fieldset><legend>${esc(question)}</legend>
      ${answers.map((_,i)=>(i+id)%answers.length).map(index=>`<label><input type="radio" name="answer" value="${index}" required> ${esc(answers[index])}</label>`).join("")}</fieldset>
      <button>Chấm điểm</button><p role="status" data-ai-score>${st.aiCourse[id] ? "Đã hoàn thành bài." : ""}</p>
    </form></section>
    ${id < aiLessons.length ? `<a href="#ai/${id+1}">Bài tiếp theo</a>` : '<a href="#ai">Về danh sách bài</a>'}
  </div>`;
}

function bindAiCourse({st,save}) {
  document.addEventListener("click", async event => {
    const button = event.target.closest("[data-ai-build],[data-ai-copy]");
    if (!button) return;
    const lab = button.closest("[data-ai-lab]");
    const values = [...lab.querySelectorAll("[data-ai-field]")].map(field => field.value.trim());
    const answer = lab.querySelector("#ai-result");
    const message = lab.querySelector("[data-ai-message]");
    const missing = aiFields.filter((_,i) => !values[i]);
    answer.value = aiFields.map((label,i) => values[i] && label + "\n" + values[i]).filter(Boolean).join("\n\n");
    message.textContent = missing.length ? "Có thể bổ sung " + missing.join(", ") + "." : "Prompt có đủ bốn phần.";
    if (button.hasAttribute("data-ai-copy") && answer.value) {
      try { await navigator.clipboard.writeText(answer.value); message.textContent += " Đã sao chép."; }
      catch { answer.select(); message.textContent += " Hãy sao chép từ ô đã chọn."; }
    }
  });
  document.addEventListener("submit", event => {
    const form = event.target;
    if (!form.hasAttribute("data-ai-quiz")) return;
    event.preventDefault();
    const id = Number(form.dataset.aiQuiz);
    const correct = new FormData(form).get("answer") === "0";
    if (correct) { st.aiCourse[id] = true; save(); }
    form.querySelector("[data-ai-score]").textContent = (correct ? "Đúng. " : "Thử lại. ") + aiLessons[id-1][6];
  });
}
