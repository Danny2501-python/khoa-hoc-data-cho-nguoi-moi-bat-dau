const engineeringLessons = [
  ["Python", "Nền tảng", "https://docs.python.org/3/tutorial/",
    "Đọc CSV theo schema, chuyển tiền VND sang số nguyên và ghi rõ lỗi theo từng dòng. Tách bước chuẩn hóa khỏi bước ghi dữ liệu để dễ kiểm thử.",
    "Dùng csv.DictReader đọc giao dịch, loại bản ghi T02 lặp giống hệt, JOIN với danh sách tài khoản và ghi dòng A99 vào tệp lỗi. Kiểm tra 3 giao dịch hợp lệ, tổng 230.000 VND.",
    "Vì sao nên dùng số nguyên cho amount_vnd?", "VND trong bộ dữ liệu không có phần lẻ. Số nguyên giữ phép cộng chính xác và dễ kiểm tra đối soát."],
  ["Docker", "Nền tảng", "https://docs.docker.com/get-started/",
    "Image đóng gói môi trường chạy. Container là một phiên bản đang chạy của image. Bind mount đưa tệp từ máy vào container.",
    "Đóng gói script Python thành image. Gắn thư mục dữ liệu đầu vào chỉ đọc và thư mục kết quả riêng. Chạy hai lần, so sánh số dòng và tổng tiền.",
    "Báo cáo nằm trong filesystem của container sẽ ra sao khi xóa container?", "Báo cáo mất nếu chỉ nằm trong lớp ghi của container. Ghi ra bind mount hoặc volume để giữ kết quả."],
  ["Oracle SQL và PL/SQL", "Nền tảng", "https://docs.oracle.com/en/database/",
    "Tách bảng staging với bảng đích. MERGE đồng bộ theo khóa nghiệp vụ sau khi staging đã được kiểm tra trùng khóa. PL/SQL giúp đóng gói quy trình và xử lý lỗi.",
    "Tạo bảng staging và bảng fact có khóa transaction_id. Nạp lần đầu, chạy MERGE hai lần rồi kiểm tra fact vẫn có 3 dòng. Dùng bảng lỗi riêng đối với tài khoản A99.",
    "Vì sao phải xử lý khóa lặp trước MERGE?", "Nhiều dòng nguồn có thể cùng khớp một dòng đích. Tách bản sao giống hệt và cách ly trường hợp cùng khóa nhưng khác nội dung trước khi ghi."],
  ["MATLAB", "Nền tảng", "https://www.mathworks.com/support/learn-with-matlab-tutorials.html",
    "Bảng MATLAB giữ các cột khác kiểu. readtable đọc CSV, groupsummary tổng hợp theo nhóm và plot giúp so sánh kết quả theo ngày.",
    "Đọc kết quả đã chuẩn hóa, nhóm theo business_date. Vẽ tổng tiền từng ngày và xác nhận 200.000 VND ngày 20, 30.000 VND ngày 21.",
    "Tổng 360.000 VND khi đọc CSV thô báo hiệu điều gì?", "CSV thô gồm T02 lặp 80.000 VND và giao dịch A99 50.000 VND cần cách ly. Kiểm dữ liệu trước khi dùng tổng làm KPI."],
  ["MinIO và object storage", "Trung cấp", "https://docs.min.io/enterprise/aistor-object-store/developers/sdk/python/",
    "Object storage tổ chức dữ liệu bằng bucket và object key. Tiền tố ngày giúp định vị batch. Giữ nguyên tệp thô và lưu kết quả xử lý ở tiền tố riêng.",
    "Dùng MinIO hoặc môi trường tương thích S3 trong lab. Ghi batch vào raw/giao-dich/business_date=2026-11-20/, rồi giữ danh sách object và checksum trong manifest.",
    "Dấu / trong object key đại diện cho điều gì?", "Dấu phân cách chỉ tạo tiền tố theo quy ước đặt tên. Không cần tạo từng thư mục như filesystem thông thường."],
  ["Apache Airflow", "Trung cấp", "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/pipeline.html",
    "DAG biểu diễn các task và điều kiện phụ thuộc. Rerun và backfill cần dùng cùng business_date của batch. Thiết kế nạp có thể chạy lại an toàn.",
    "Thiết kế DAG ingest, validate, load, reconcile. Cố ý cho bước load lỗi một lần rồi retry. Chạy lại riêng ngày 20 và so sánh số dòng trong fact.",
    "Có nên lấy ngày hiện tại của máy khi retry để chọn dữ liệu?", "Nên lấy ngày nghiệp vụ từ dữ liệu hoặc tham số batch gắn với lần chạy. Retry ngày hôm sau vẫn phải xử lý cùng phạm vi."],
  ["Master Data Management", "Trung cấp", "https://www.ibm.com/think/topics/master-data-management",
    "Golden record thống nhất danh tính giữa các nguồn. Crosswalk ánh xạ cặp source_system và source_cif sang master_cif. Quy tắc ghép cần có bằng chứng và đường xử lý ngoại lệ.",
    "Nối tài khoản với crosswalk. Hai CIF nguồn CORE/C01 và CRM/R01 quy về M01. Kiểm tra có 2 tài khoản của M01 và tách dòng chưa có mapping.",
    "Hai khách hàng trùng họ tên có đủ điều kiện hợp nhất?", "Cần thêm định danh đáng tin và quy tắc đối chiếu. Trường hợp mơ hồ cần chuyển người quản trị dữ liệu xem xét."],
  ["Metadata, catalog và lineage", "Trung cấp", "https://openlineage.io/docs/",
    "Catalog lưu mô tả, owner, kiểu dữ liệu và SLA. Lineage ghi quan hệ giữa đầu vào, job và đầu ra, giúp truy ngược KPI về nguồn.",
    "Lập catalog cho 3 CSV và fact. Vẽ lineage từ cột amount_vnd qua bước chuẩn hóa và đối soát tới báo cáo EOD. Ghi run_id, business_date và số dòng lỗi.",
    "Khi tổng tiền lệch, metadata nào giúp khoanh vùng nhanh?", "Kết hợp business_date và run_id để tìm đúng lần chạy, rồi so checksum nguồn, số dòng lỗi và phiên bản logic tổng hợp."],
  ["AWS và Amazon S3", "Nâng cao", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    "Tách quyền đọc raw và quyền ghi curated theo IAM role. Versioning hỗ trợ khôi phục object và lifecycle kiểm soát lưu trữ theo thời hạn.",
    "Thiết kế policy cho ETL chỉ đọc tiền tố raw và ghi curated. Lập bảng quyền theo tác vụ, bao gồm trường hợp cố đọc một bucket ngoài phạm vi.",
    "Vì sao ưu tiên IAM role cho pipeline chạy trên AWS?", "Role cấp thông tin xác thực tạm thời và có thể giới hạn quyền tới đúng tài nguyên pipeline cần."],
  ["Amazon Redshift", "Nâng cao", "https://docs.aws.amazon.com/redshift/latest/gsg/getting-started.html",
    "COPY nạp dữ liệu từ S3 theo lô. Nạp staging trước, kiểm tra rồi ghi fact. Dùng EXPLAIN và số liệu truy vấn để đánh giá thiết kế vật lý.",
    "Phác thảo COPY từ curated trên S3, kiểm tra count và sum, sau đó tạo view doanh số theo business_date. Ghi rõ một dòng fact đại diện cho một giao dịch.",
    "Sau khi COPY đủ số dòng, còn cần kiểm tra gì?", "Kiểm tra trùng khóa, kiểu dữ liệu, khóa không khớp, tổng tiền và phân bổ theo ngày. Count bằng nhau vẫn có thể chứa sai dữ liệu."],
  ["Kubernetes", "Nâng cao", "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
    "Job phù hợp cho tác vụ hữu hạn. CronJob tạo Job theo lịch. Kết quả batch cần được giữ ngoài filesystem tạm của Pod.",
    "Dùng image Docker đã tạo để chạy Job trong cluster học tập. Kiểm tra logs và trạng thái hoàn thành. Mô tả cách xử lý khi hai lần chạy dùng cùng business_date.",
    "Dùng CronJob có giải quyết hoàn toàn nạp trùng?", "Vẫn cần thiết kế idempotent ở tầng dữ liệu. Chạy lại thủ công hoặc lỗi giữa chừng vẫn có thể tạo hai lần ghi."],
  ["Helm", "Nâng cao", "https://helm.sh/docs/chart_template_guide/",
    "Chart chứa template Kubernetes. Values cấu hình khác biệt giữa môi trường. Có thể render manifest trước khi áp dụng để kiểm tra tham số.",
    "Đóng gói CronJob thành chart, tách lịch và image tag vào values. Chạy helm lint và helm template, kiểm kết quả cho hai bộ values.",
    "Có nên ghi mật khẩu vào values.yaml rồi commit?", "Dùng tham chiếu tới Secret đã quản lý hoặc hệ thống quản lý bí mật. Giữ cấu hình trong Git và thông tin xác thực ở nơi phù hợp."],
  ["Phỏng vấn DE và DA Full-stack", "Phỏng vấn", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
    "Trình bày một luồng gồm ingestion, kiểm tra, warehouse, mô hình sao, semantic model và KPI. Mỗi quyết định cần gắn với grain, SLA hoặc độ tin cậy.",
    "Trong 5 phút, giải thích vì sao tổng từ dashboard lệch nguồn 130.000 VND. Chỉ ra cách phân biệt dòng lỗi, bản lặp và lỗi nhân dòng qua JOIN.",
    "How would you reconcile the EOD dashboard?", "I would reconcile by business date at each stage, track rejected and duplicate rows separately, and validate joins against the declared grain."],
  ["Dự án portfolio đối soát EOD", "Dự án", "https://openlineage.io/docs/",
    "Nối bài lab thành một luồng từ CSV thô tới dashboard. Đầu ra gồm báo cáo ngoại lệ, số kiểm soát theo business_date, lineage và hướng dẫn rerun.",
    "Dùng Docker, Python và Airflow với MinIO. Chọn Oracle hoặc Redshift cho warehouse. Tạo dashboard tổng tiền theo ngày và master CIF. Đối chiếu RAW = 360.000, trùng = 80.000, cách ly = 50.000 và hợp lệ = 230.000 VND.",
    "Điều kiện bàn giao nào chứng minh luồng chạy lại an toàn?", "Chạy cùng batch hai lần, so số dòng và tổng tiền, xác nhận không sinh thêm giao dịch và lưu được audit theo từng lần chạy."]
];

const isMasterDataLesson = id => id === 6 || id === 7;

function renderEngineering(track, level, rawId, {esc, page, st, fileLink}) {
  const master = track === "master-data";
  const lessons = engineeringLessons.map((lesson, index) => ({lesson, index})).filter(({index}) => isMasterDataLesson(index) === master);
  const levels = ["Tất cả", ...new Set(lessons.map(({lesson}) => lesson[1]))];
  const active = levels[Number(level)] ? Number(level) : 0;
  const id = Number(rawId);
  const visible = lessons.filter(({lesson}) => !active || lesson[1] === levels[active]);
  const chosen = visible.find(({index}) => index === id);
  const href = (filter, index) => "#" + track + "/" + filter + (index === undefined ? "" : "/" + index);
  const current = href(active || 0);
  if (chosen) {
    const [title, group, url, reading, lab, question, answer] = chosen.lesson;
    const next = visible[visible.indexOf(chosen) + 1];
    return `<div class="de-page"><a href="${current}">Quay lại danh sách bài</a>
      ${page(group, title, "Đọc, thực hành trên dữ liệu ngân hàng giả lập và tự kiểm tra.")}
      <div class="de-detail">
        <section class="de-card"><h2>Bài đọc</h2><p>${esc(reading)}</p><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Mở tài liệu tham khảo</a></section>
        <section class="de-card"><h2>Bài thực hành</h2><p>${esc(lab)}</p></section>
        <section class="de-card"><h2>Tự kiểm tra</h2><p>${esc(question)}</p><details><summary>Xem đáp án và giải thích</summary><p>${esc(answer)}</p></details></section>
      </div>
      ${master ? "" : `<div class="de-actions"><a href="#engineering/course/${id}">Học theo lộ trình 30 ngày</a></div>`}
      ${renderDePractice(id,{esc,fileLink,st})}
      <div class="de-actions"><label><input type="checkbox" data-engineering-done="${id}" ${st.engineering[id] ? "checked" : ""}> Đánh dấu đã học</label>
      ${next ? `<a href="${href(active, next.index)}">Bài tiếp theo</a>` : ""}</div>
    </div>`;
  }
  const downloads = [["giao-dich", "Giao dịch"], ["tai-khoan", "Tài khoản"], ["cif-mapping", "Ánh xạ CIF"]];
  const done = lessons.filter(({index}) => st.engineering[index]).length;
  return `<div class="de-page">
    ${master ? page("Lộ trình học", "Master Data", "Chuẩn hóa CIF, quản trị metadata và truy vết dữ liệu ngân hàng.") : `<header class="de-hero de-hub"><div class="de-level">Lộ trình học</div><h1>Data Engineering</h1><p>Học từng bước từ Python và Docker đến điều phối pipeline, kho dữ liệu và đối soát cuối ngày.</p><div class="de-hub-stats"><span><strong>12</strong> khóa học</span><span><strong>30</strong> ngày mỗi khóa</span></div></header>`}
    <section class="de-card de-dataset"><div><h2>Dữ liệu thực hành</h2><p>CSV mẫu và bộ dữ liệu mở rộng cho bài đối soát EOD. ${done}/${lessons.length} bài đã học.</p></div><div class="de-actions">${downloads.map(([name, label]) => fileLink({path: "data/engineering/" + name + ".csv", label})).join("")}${fileLink({path:"data/engineering/eod-practice.zip",label:"Tải bộ dữ liệu mở rộng"})}</div></section>
    <nav class="de-filters" aria-label="Lọc bài học">${levels.map((label, index) => `<a href="${href(index)}" ${index === active ? 'aria-current="page"' : ""}>${esc(label)}</a>`).join("")}</nav>
    <div class="de-grid">${visible.map(({lesson, index}) => `<article class="de-card"><span class="de-level">${esc(lesson[1])}${st.engineering[index] ? " · Đã học" : ""}</span><h2><a href="${master ? href(active, index) : "#engineering/course/" + index}">${esc(lesson[0])}</a></h2><p>${esc(lesson[3])}</p>${master ? "" : `<div class="de-actions"><a class="de-primary" href="#engineering/course/${index}">Mở lộ trình 30 ngày</a><a href="${href(active, index)}">Bài lab</a></div>`}</article>`).join("")}</div>
  </div>`;
}
