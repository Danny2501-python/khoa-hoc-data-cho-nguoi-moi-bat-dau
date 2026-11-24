const dePractice = [
  ["Corey Schafer · Python CSV", "q5uM4VKywbA", "Đọc dữ liệu theo schema",
    "Mở tệp bằng csv.DictReader và chuyển amount_vnd sang int trước khi cộng. Dùng set để phát hiện transaction_id đã xuất hiện và dict để tra account_id. Nếu hai dòng cùng khóa có nội dung khác nhau, cách ly để điều tra. Khi dữ liệu quá lớn cho bộ nhớ, chuyển bước kiểm trùng sang staging có chỉ mục.",
    "Đổi ngày lọc ở dòng cuối thành 2026-11-21. Đáp án là 1 giao dịch và 30.000 VND.", "python",
    [["Dùng cấu trúc nào để tra tài khoản theo mã?", "dict theo account_id", "list đã sắp theo số tiền", "Một biến string chứa tổng"],
     ["Hai giao dịch cùng mã nhưng khác số tiền cần xử lý thế nào?", "Cách ly và kiểm tra xung đột", "Giữ dòng đầu theo thứ tự ngẫu nhiên", "Cộng cả hai vào fact"],
     ["Bản ghi A99 hợp lệ về định dạng nhưng thiếu gì?", "Tham chiếu tới tài khoản", "Kiểu số nguyên", "Giá trị ngày"]]],
  ["Fireship · Docker in 100 Seconds", "Gjnup-PuquQ", "Dữ liệu trong container",
    "Dockerfile mô tả cách build image. Khi chạy, container có một lớp ghi riêng. Mount đường dẫn kết quả ra ngoài để giữ bằng chứng đối soát khi container bị tạo lại. Pin phiên bản image để giảm khác biệt giữa máy học và CI.",
    "Chọn nơi ghi kết quả rồi chạy mô phỏng xóa container và kiểm xem báo cáo còn truy cập được.", "docker",
    [["Thành phần nào là bản đóng gói để chạy nhiều lần?", "Image", "Container đang chạy", "Volume"],
     ["Cờ chỉ đọc hợp lý cho mount nào?", "Thư mục dữ liệu nguồn", "Thư mục cần xuất kết quả", "Thư mục cần ghi log"],
     ["Pin image giúp đạt mục tiêu gì?", "Tái lập môi trường chạy", "Tự động đối soát số tiền", "Tăng số dòng CSV"]]],
  ["Oracle SQL · Giới thiệu", "y2CICRujsVw", "Staging, khóa và đối soát",
    "Nạp batch vào staging trước để kiểm kiểu dữ liệu, trùng khóa và tài khoản thiếu. Với Oracle MERGE, chuẩn bị tối đa một dòng nguồn sạch cho mỗi khóa đích. Transaction cho phép hoàn tác nhóm thay đổi khi bước ghi thất bại. Lab dùng SQLite để thực hành SELECT và kiểm tra điều kiện đầu vào.",
    "Chạy truy vấn, sau đó đổi GROUP BY sang account_id để đối soát theo tài khoản. Kết quả mong đợi là A01 150.000 VND và A02 80.000 VND.", "sql",
    [["MERGE dựa vào điều kiện nào để tìm dòng đích?", "Điều kiện ON theo khóa nghiệp vụ", "Thứ tự cột CSV", "Vị trí bản ghi trong tệp"],
     ["Bảng nào phù hợp để kiểm dữ liệu trước khi nạp fact?", "Staging", "Dashboard", "Data catalog"],
     ["Tác dụng của rollback khi lần nạp gặp lỗi?", "Hoàn tác các thay đổi chưa commit", "Xóa tệp CSV nguồn", "Tự sửa khóa trùng"]]],
  ["MathWorks · Getting Started with MATLAB", "https://www.mathworks.com/videos/getting-started-with-matlab-68985.html", "Nhóm dữ liệu theo ngày nghiệp vụ",
    "Dùng readtable để giữ tên cột. Dùng groupsummary(T,'business_date','sum','amount_vnd') rồi đối chiếu tên cột kết quả trước khi vẽ. So sánh tổng thô và tổng đã chuẩn hóa giúp nhận diện ảnh hưởng của bản lặp và bản ghi thiếu tài khoản.",
    "Đổi giữa dữ liệu thô và đã chuẩn hóa, quan sát chênh lệch ngày 20. Mô phỏng dùng phép nhóm tương đương groupsummary.", "matlab",
    [["readtable phù hợp khi dữ liệu có đặc điểm nào?", "Nhiều cột với kiểu khác nhau và tên cột", "Mọi ô đều phải là một kiểu số", "Dữ liệu chỉ là một ảnh PNG"],
     ["Muốn tính tổng tiền mỗi ngày, nhóm theo cột nào?", "business_date", "transaction_id", "amount_vnd"],
     ["Ngày 20 chênh bao nhiêu giữa tổng thô và tổng sạch?", "130.000 VND", "80.000 VND", "30.000 VND"]]],
  ["MinIO · Object Storage, Buckets, and S3", "gY090GEDdu8", "Object key và kiểm kê batch",
    "Bucket chứa object, còn key định danh object trong bucket. Prefix business_date=... cho phép liệt kê dữ liệu đúng kỳ. Đặt raw và curated ở hai vùng riêng. Manifest nên lưu danh sách key, số dòng và checksum của từng tệp để audit và chạy lại.",
    "Chọn prefix theo ngày để liệt kê object trong kho mô phỏng. So sánh kết quả hai ngày.", "minio",
    [["Tiền tố nào hỗ trợ chọn đúng kỳ đối soát?", "business_date=2026-11-20/", "transaction_id/", "latest/"],
     ["Manifest nên lưu thông tin nào để đối chiếu nội dung?", "Object key và checksum", "Mật khẩu người học", "Tên dashboard"],
     ["Raw zone nên giữ dữ liệu ở trạng thái nào?", "Bản gốc đúng theo lần nhận", "Luôn ghi đè bằng bảng tổng hợp", "Chỉ lưu các dòng đã làm sạch"]]],
  ["Astronomer · Intro to Apache Airflow", "https://www.astronomer.io/events/webinars/intro-to-airflow-video/", "DAG, retry và backfill",
    "Lập DAG ingest → validate → load → reconcile. Retry chạy lại task thất bại trong cùng kỳ xử lý. Backfill chạy các kỳ lịch sử. Dùng khóa batch và ghi đích theo cách idempotent để tránh kết quả bị nhân đôi khi mất phản hồi sau commit.",
    "Chọn kịch bản lỗi load lần đầu, đọc log retry, sau đó thay chiến lược ghi để quan sát sự khác biệt khi chạy lại.", "airflow",
    [["Backfill giải quyết việc gì?", "Xử lý lại các kỳ lịch sử", "Thay thế khóa fact", "Xóa log task"],
     ["Khi validate thất bại, task load nên xử lý thế nào?", "Chờ điều kiện phụ thuộc đạt", "Ghi toàn bộ dữ liệu lỗi", "Đổi ngày hệ thống"],
     ["Cách nào giảm rủi ro trùng khi retry sau commit?", "Ghi idempotent theo khóa batch và giao dịch", "Đổi transaction_id mỗi lần chạy", "Tắt audit"]]],
  ["IBM · What is Master Data Management", "l83bkKJh1wM", "Golden record, crosswalk và stewardship",
    "Khóa CIF nguồn chỉ duy nhất trong phạm vi source_system. Dùng crosswalk để ghép CIF nguồn sang master_cif. Golden record cần quy tắc ưu tiên nguồn cho từng thuộc tính, lịch sử hiệu lực và người chịu trách nhiệm duyệt ngoại lệ. Đo tỷ lệ mapping thiếu trước khi tính KPI theo khách hàng.",
    "Chạy SQL để thấy hai tài khoản cùng thuộc M01. Thử LEFT JOIN từ bảng giao dịch sang tài khoản để tìm giao dịch cần cách ly.", "sql",
    [["Khóa nào đáng dùng để nối bản ghi CIF nguồn?", "source_system và source_cif", "Chỉ source_cif", "Tên khách hàng"],
     ["Quy tắc survivorship quyết định điều gì?", "Nguồn nào cung cấp giá trị được giữ", "Cách đổi tên bucket", "Khung giờ Airflow"],
     ["Ai nên duyệt trường hợp khớp danh tính mơ hồ?", "Data steward", "Scheduler", "Load balancer"]]],
  ["OpenLineage · Observability for Data Pipelines", "uIuBBp3Ib64", "Catalog và lineage ở cấp lần chạy",
    "Catalog mô tả dataset, owner, schema và SLA. Lineage kết nối dataset đầu vào, job và dataset đầu ra. Lưu business_date và run_id để truy vết khi báo cáo lệch, đồng thời ghi các số kiểm soát để biết sai lệch phát sinh ở tầng nào.",
    "Chọn cột bị lệch để xem đường đi và audit tương ứng. Viết thêm mô tả owner và nguồn cho KPI trong catalog.", "lineage",
    [["Run ID dùng để làm gì?", "Phân biệt các lần thực thi", "Đặt tên người sở hữu dữ liệu", "Tính tổng giao dịch"],
     ["Thông tin nào phù hợp với catalog?", "Owner, schema và SLA", "Mật khẩu cơ sở dữ liệu", "Lệnh giữ Pod chạy"],
     ["Lineage cấp cột hữu ích khi nào?", "Truy ngược một KPI về các cột nguồn", "Thay thế sao lưu", "Tạo volume"]]],
  ["AWS · Introduction to Amazon S3", "ecv-19sYL3w", "Quyền truy cập theo vùng dữ liệu",
    "Pipeline cần đọc đúng raw object và ghi đúng curated prefix. Xem riêng các hành động đọc object, ghi object và liệt kê bucket. IAM role giúp cấp quyền tạm thời. Versioning và lifecycle giải quyết các nhu cầu khác nhau: khả năng khôi phục và giữ dữ liệu theo thời hạn.",
    "Chọn thao tác để xem quyết định của chính sách mô phỏng cho vai trò ETL.", "s3",
    [["Quyền nào phù hợp với worker chuyển raw sang curated?", "Đọc raw và ghi curated theo prefix", "Toàn quyền tất cả bucket", "Chỉ đọc curated"],
     ["Versioning giúp làm gì?", "Khôi phục phiên bản object cũ", "Chấm điểm quiz", "Tăng số tài khoản"],
     ["Lifecycle phù hợp để quản lý việc gì?", "Chuyển lớp lưu trữ hoặc hết hạn dữ liệu", "Chọn khóa nghiệp vụ", "Tính tổng fact"]]],
  ["AWS · Introduction to Amazon Redshift", "6hk0Kvjrvfo", "COPY và kiểm soát sau nạp",
    "COPY nạp lô dữ liệu S3 vào staging. Kiểm độ hợp lệ trước khi ghi fact. So sánh count theo ngày, số giao dịch duy nhất và sum tiền. Dùng EXPLAIN cùng số đo thực tế để xem cách quét và JOIN. Lab dùng SQLite cho truy vấn kiểm soát và xem tài liệu chính thức cho cú pháp Redshift hiện hành.",
    "Chạy kiểm số dòng, mã duy nhất và tổng tiền theo ngày. Chênh số dòng so với mã duy nhất ngày 20 chỉ ra bản ghi cần kiểm tra.", "sql",
    [["COPY nên nạp lô chưa kiểm vào đâu?", "Staging", "Dashboard", "IAM role"],
     ["Chỉ số nào giúp phát hiện mã bị lặp?", "So count(*) và count(distinct transaction_id)", "Chỉ đếm cột", "Đếm số tên bảng"],
     ["Khi count khớp mà tiền lệch, nên làm gì?", "Đối chiếu amount theo ngày và khóa chi tiết", "Công bố báo cáo ngay", "Đổi server"]]],
  ["Fireship · Kubernetes Explained", "PziYflu8cB8", "Job, CronJob và kết quả bền vững",
    "Job quản lý công việc có điểm kết thúc và có thể thử lại Pod thất bại. CronJob tạo Job theo lịch. concurrencyPolicy điều khiển chồng lịch trong cùng CronJob. Dữ liệu vẫn cần khóa để tránh lặp khi chạy lại thủ công hoặc khi có nhiều nguồn kích hoạt.",
    "Chọn chính sách Allow, Forbid hoặc Replace khi một Job còn chạy. Xem hiệu ứng trên lần lịch tiếp theo.", "k8s",
    [["Tài nguyên nào phù hợp với batch hữu hạn?", "Job", "Service", "Ingress"],
     ["Forbid có tác dụng gì khi Job cũ còn chạy?", "Bỏ lượt tạo Job mới từ cùng CronJob", "Tự sửa dữ liệu lỗi", "Xóa mọi Pod trong namespace"],
     ["Kết quả cần lưu ở đâu để còn khi Pod bị xóa?", "Kho lưu trữ bền vững", "Filesystem tạm của Pod", "Biến môi trường"]]],
  ["TechWorld with Nana · Helm và Helm Charts", "-ykwb1d0DXU", "Chart, values và manifest",
    "Chart đóng gói tài nguyên Kubernetes dưới dạng template. Values điền tham số theo môi trường. Render manifest trước để kiểm image tag, lịch và tài nguyên. Giữ bí mật trong hệ thống quản lý bí mật và chỉ tham chiếu tên Secret trong cấu hình.",
    "Chọn values cho dev hoặc prod để render phần CronJob và so sánh lịch, image tag.", "helm",
    [["helm template dùng để làm gì?", "Render manifest cấu hình", "Chạy SQL trên warehouse", "Lưu KPI vào catalog"],
     ["Tệp nào thường chứa giá trị cấu hình đầu vào?", "values.yaml", "transaction.csv", "report.pdf"],
     ["Mật khẩu nên lấy theo cách nào?", "Tham chiếu Secret đã quản lý", "Ghi thẳng vào values rồi commit", "Dùng tên tài khoản làm mật khẩu"]]],
  ["Guy in a Cube · Star Schema trong Power BI", "vZndrBBPiQc", "Giải thích sai lệch từ nguồn đến dashboard",
    "Mở đầu bằng business date, grain và định nghĩa KPI. Chỉ ra checkpoint phát sinh sai lệch, phân loại nguyên nhân và nêu tiêu chí nghiệm thu. Khi trình bày tiếng Anh, dùng con số cụ thể và diễn giải cách kiểm tra có thể lặp lại.",
    "Chạy truy vấn số kiểm soát. Trong 90 giây, giải thích bằng tiếng Anh vì sao ngày 20 có chênh lệch 130.000 VND.", "sql",
    [["Thông tin nào nên xác định trước khi JOIN?", "Grain của hai bảng", "Màu dashboard", "Tên người dùng máy"],
     ["Nguyên nhân nào tạo chênh lệch 130.000 VND?", "80.000 trùng và 50.000 không có tài khoản", "130.000 từ làm tròn", "30.000 giao dịch hợp lệ ngày 21"],
     ["Bằng chứng nào phù hợp để bảo vệ kết luận?", "Số kiểm soát từng tầng theo business_date", "Ảnh màn hình không rõ bộ lọc", "Chỉ một tổng chung"]]],
  ["Astronomer · Case study pipeline Apache Airflow", "9N0ZNFezfVw", "Tiêu chí nghiệm thu dự án EOD",
    "Tách raw, staging, curated và mart. Viết hợp đồng dữ liệu trước khi nạp. Mỗi giao dịch thô cần được phân vào đúng một nhóm: hợp lệ, lặp hoặc cách ly. Tạo README hướng dẫn rerun và lưu audit để người khác tái lập kết quả.",
    "Chạy lab SQL, chứng minh 360.000 = 230.000 + 80.000 + 50.000 VND. Sau đó thiết kế luồng Airflow và báo cáo theo master CIF.", "sql",
    [["Đẳng thức đối soát nào cần giữ?", "Raw = hợp lệ + lặp + cách ly", "Raw = hợp lệ − cách ly", "Raw luôn bằng curated"],
     ["Chạy cùng batch hai lần nên cho kết quả gì?", "Cùng số dòng và tổng tiền trong fact", "Fact tăng gấp đôi", "Batch thứ hai ghi sang ngày khác"],
     ["Đầu ra nào giúp người khác kiểm lại?", "README, audit và nguồn dữ liệu giả lập", "Chỉ slide mô tả", "Mật khẩu môi trường"]]]
];

const deRows = [
  ["T01","A01","2026-11-20",120000], ["T02","A02","2026-11-20",80000],
  ["T02","A02","2026-11-20",80000], ["T03","A99","2026-11-20",50000],
  ["T04","A01","2026-11-21",30000]
];
const deTables = {
  transactions: {cols:["transaction_id","account_id","business_date","amount_vnd"],types:["TEXT","TEXT","TEXT","INTEGER"],rows:deRows},
  accounts: {cols:["account_id","source_system","source_cif"],types:["TEXT","TEXT","TEXT"],rows:[["A01","CORE","C01"],["A02","CRM","R01"]]},
  cif_mapping: {cols:["source_system","source_cif","master_cif"],types:["TEXT","TEXT","TEXT"],rows:[["CORE","C01","M01"],["CRM","R01","M01"]]}
};
const deControlQuery = `SELECT business_date, COUNT(*) AS raw_rows,
       COUNT(DISTINCT transaction_id) AS unique_ids,
       SUM(amount_vnd) AS raw_total
FROM transactions
GROUP BY business_date;`;
const deQueries = {
  2: `WITH clean AS (
  SELECT DISTINCT t.*
  FROM transactions t JOIN accounts a USING (account_id)
)
SELECT business_date, COUNT(*) AS valid_rows, SUM(amount_vnd) AS total_vnd
FROM clean GROUP BY business_date;`,
  6: `SELECT m.master_cif, COUNT(*) AS accounts
FROM accounts a
JOIN cif_mapping m USING (source_system, source_cif)
GROUP BY m.master_cif;`,
  13: `WITH numbered AS (
  SELECT t.*, a.account_id AS known_account,
    ROW_NUMBER() OVER (PARTITION BY transaction_id ORDER BY rowid) AS occurrence
  FROM transactions t LEFT JOIN accounts a USING (account_id)
)
SELECT CASE WHEN occurrence > 1 THEN 'duplicate'
            WHEN known_account IS NULL THEN 'quarantine'
            ELSE 'valid' END AS status,
       COUNT(*) AS rows, SUM(amount_vnd) AS total_vnd
FROM numbered
GROUP BY status;`.replace("ORDER BY rowid", "ORDER BY t.rowid")
};
const dePython = `import csv
from io import StringIO

source = StringIO("""transaction_id,account_id,business_date,amount_vnd
${deRows.map(row => row.join(",")).join("\n")}""")
seen = set()
valid = []
for row in csv.DictReader(source):
    key = row["transaction_id"]
    if key not in seen and row["account_id"] in {"A01", "A02"}:
        valid.append(row)
    seen.add(key)

day = "2026-11-20"
selected = [row for row in valid if row["business_date"] == day]
print("Giao dịch:", len(selected))
print("Tổng VND:", sum(int(row["amount_vnd"]) for row in selected))`;

const deSimulations = {
  docker: ["Nơi ghi báo cáo", ["Filesystem container", "Bind mount", "Volume"], option =>
    option ? "Xóa container → chạy container mới → báo cáo đối soát vẫn đọc được từ vùng lưu bền vững." : "Xóa container → lớp ghi bị xóa → báo cáo đối soát mất."],
  matlab: ["Nguồn tính tổng", ["Raw", "Đã chuẩn hóa"], option => {
    const rows = option ? [...new Map(deRows.filter(row => row[1] !== "A99").map(row => [row[0],row])).values()] : deRows;
    const totals = {};
    for (const [, , day, amount] of rows) totals[day] = (totals[day] || 0) + amount;
    return Object.entries(totals).map(([day, amount]) => day + ": " + amount.toLocaleString("vi-VN") + " VND").join("\n");
  }],
  minio: ["Prefix ngày", ["2026-11-20", "2026-11-21"], option => {
    const day = ["2026-11-20","2026-11-21"][option];
    return "raw/giao-dich/business_date=" + day + "/batch.csv\nSố dòng trong manifest: " + deRows.filter(row => row[2] === day).length;
  }],
  airflow: ["Tình huống khi load", ["Thành công", "Mất phản hồi sau commit · ghi theo khóa", "Mất phản hồi sau commit · append"], option =>
    "ingest → validate → load\n" + (option ? "Lần 1 đã commit nhưng mất phản hồi.\nLần 2 chạy lại cùng batch.\n" : "") +
    "reconcile → " + (option === 2 ? "6 dòng, 460.000 VND · lỗi nhân đôi." : "3 dòng, 230.000 VND · đạt.")],
  lineage: ["Chỉ tiêu cần truy vết", ["Tổng tiền", "Số khách hàng"], option =>
    option ? "cif_mapping.master_cif → JOIN accounts → COUNT(DISTINCT master_cif) → dashboard\nAudit: 1 master CIF hợp lệ."
           : "transactions.amount_vnd → validate → fact.amount_vnd → SUM → dashboard\nAudit: raw 360.000, trùng 80.000, cách ly 50.000 VND."],
  s3: ["Thao tác của ETL", ["GetObject /raw", "PutObject /curated", "PutObject /raw", "GetObject /private"], option =>
    option < 2 ? "ALLOW · Hành động và prefix phù hợp với role mô phỏng." : "DENY · Hành động hoặc prefix ngoài quyền của role mô phỏng."],
  k8s: ["concurrencyPolicy", ["Allow", "Forbid", "Replace"], option =>
    ["Job cũ tiếp tục và Job mới bắt đầu.", "Job cũ tiếp tục và lượt chạy mới bị bỏ qua.", "Job cũ bị thay thế bằng Job mới."][option]],
  helm: ["Môi trường values", ["dev", "prod"], option =>
    'kind: CronJob\nspec:\n  schedule: "' + (option ? "0 18 * * *" : "*/15 * * * *") +
    '"\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers:\n            - name: reconcile\n              image: datalab/reconcile:' + (option ? "1.0.0" : "dev")]
};

function renderDePractice(id, {esc, fileLink, st}) {
  const [title, video, heading, reading, challenge, engine, questions] = dePractice[id];
  const youtube = !video.startsWith("https://");
  const source = youtube ? "https://www.youtube.com/watch?v=" + video : video;
  const tasks = [...questions];
  const saved = st.engineeringQuiz[id];
  const simulation = deSimulations[engine];
  return `<nav class="de-filters" aria-label="Nội dung bài học">
    ${[["de-reading","Tài liệu & dữ liệu"],["de-video","Video ôn"],["de-lab","Lab trực tuyến"],["de-quiz","Bài kiểm tra"]].map(([anchor,label]) => `<button type="button" data-de-jump="${anchor}">${label}</button>`).join("")}
  </nav>
  <section class="de-card de-block" id="de-reading"><h2>${esc(heading)}</h2>
    <p>${esc(reading)}</p><div class="de-actions">
      ${fileLink({path:"data/engineering/bai-" + (id + 1) + ".txt",label:"Tải tài liệu đọc"})}
      ${fileLink({path:"data/engineering/giao-dich.csv",label:"CSV mẫu cho lab"})}
      ${fileLink({path:"data/engineering/eod-practice.zip",label:"Bộ dữ liệu mở rộng"})}
    </div></section>
  <section class="de-card de-block" id="de-video"><h2>Video ôn tập</h2><p>${esc(title)}</p>
    ${youtube ? `<button type="button" data-de-video="${esc(video)}">Phát ngay trong bài</button>` : ""}
    <a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Mở video tại nguồn</a>
    <div data-de-player></div></section>
  <section class="de-card de-block" id="de-lab"><h2>Lab trực tuyến</h2><p>${esc(challenge)}</p>
    ${simulation ? `<p>Môi trường mô phỏng trong trình duyệt.</p><label>${esc(simulation[0])}
      <select data-de-variant>${simulation[1].map((option,index) => `<option value="${index}">${esc(option)}</option>`).join("")}</select></label>`
      : `<p>${engine === "sql" ? "SQLite chạy trên dữ liệu mẫu." : "Python chạy trong trình duyệt. Lần đầu cần tải Pyodide qua Internet."}</p>
      <label for="de-code">Mã thực hành</label><textarea id="de-code" rows="12" spellcheck="false">${esc(engine === "python" ? dePython : deQueries[id] || deControlQuery)}</textarea>`}
    <div class="de-actions"><button type="button" data-de-run="${id}">Chạy bài lab</button></div>
    <pre aria-live="polite" data-de-output>Kết quả sẽ xuất hiện ở đây.</pre></section>
  <section class="de-card de-block" id="de-quiz"><h2>Bài kiểm tra cuối bài</h2>
    <form data-de-quiz="${id}">
      ${tasks.map(([question,...options],index) => `<fieldset><legend>${index + 1}. ${esc(question)}</legend>
        ${options.map((_, position) => (position + (id + index + 1) % options.length) % options.length).map(position =>
          `<label><input required type="radio" name="q${index}" value="${position}"> ${esc(options[position])}</label>`).join("")}
        <p data-de-feedback="${index}" hidden></p></fieldset>`).join("")}
      <button>Chấm điểm</button><p role="status" data-de-score>${Number.isInteger(saved) ? "Điểm gần nhất: " + saved + "/" + tasks.length : ""}</p>
    </form></section>`;
}

function runDePython(code, output) {
  const url = URL.createObjectURL(new Blob([`onmessage = async ({data}) => {
    const base = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
    try {
      importScripts(base + "pyodide.js");
      const runtime = await loadPyodide({indexURL:base});
      const lines = [];
      runtime.setStdout({batched: text => lines.push(text)});
      runtime.setStderr({batched: text => lines.push(text)});
      await runtime.runPythonAsync(data);
      postMessage(lines.join("\\n") || "Đã chạy. Dùng print() để hiển thị kết quả.");
    } catch (error) { postMessage(error.message); }
  };`], {type:"text/javascript"}));
  let worker;
  try { worker = new Worker(url); }
  catch { URL.revokeObjectURL(url); output("Không mở được Python Worker."); return; }
  const finish = text => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); output(text); };
  const timer = setTimeout(() => finish("Quá thời gian tải hoặc chạy Python. Kiểm tra kết nối rồi thử lại."), 25000);
  worker.onmessage = event => finish(event.data);
  worker.onerror = () => finish("Không tải được Python Worker.");
  worker.postMessage(code);
}

function bindDePractice({st,save}) {
  document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.deJump) document.getElementById(button.dataset.deJump)?.scrollIntoView({block:"start"});
    if (button.dataset.deVideo) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + button.dataset.deVideo + "?autoplay=1";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.title = "Video ôn tập";
      button.closest("section").querySelector("[data-de-player]").replaceChildren(iframe);
    }
    const id = button.dataset.deRun;
    if (id === undefined) return;
    const lab = button.closest("section");
    const out = lab.querySelector("[data-de-output]");
    const engine = dePractice[id][5];
    const output = text => { out.textContent = text; button.disabled = false; };
    if (deSimulations[engine]) {
      output(deSimulations[engine][2](Number(lab.querySelector("select").value)));
      return;
    }
    const code = lab.querySelector("textarea").value;
    button.disabled = true;
    out.textContent = "Đang chạy…";
    if (engine === "python") runDePython(code,output);
    else StudySQL.run(code,deTables,result => output(result.error || [result.columns,...result.rows].map(row => row.join(" | ")).join("\n") + "\nSố dòng: " + result.count));
  });
  document.addEventListener("submit", event => {
    const form = event.target;
    const id = form.dataset.deQuiz;
    if (id === undefined) return;
    event.preventDefault();
    const values = new FormData(form);
    let score = 0;
    dePractice[id][6].forEach(([,answer],index) => {
      const correct = values.get("q" + index) === "0";
      if (correct) score++;
      const feedback = form.querySelector('[data-de-feedback="' + index + '"]');
      feedback.hidden = false;
      feedback.textContent = correct ? "Đúng. " + answer + "." : "Đáp án đúng: " + answer + ". Xem mục Tài liệu & dữ liệu để ôn lại.";
    });
    st.engineeringQuiz[id] = score;
    save();
    form.querySelector("[data-de-score]").textContent = "Kết quả: " + score + "/" + dePractice[id][6].length;
  });
}
