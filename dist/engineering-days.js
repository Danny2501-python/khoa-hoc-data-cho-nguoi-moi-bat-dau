// Each entry pairs a concept with a hands-on task and an observable result.
const engineeringDays = {
0: `
Môi trường Python|Tạo venv và viết script in tên batch, ngày nghiệp vụ|Chạy được từ terminal và in đúng ba giá trị kiểm soát
Biến và kiểu dữ liệu|Chuyển amount_vnd từ chuỗi sang int, giữ mã CIF dạng str|00123 vẫn còn số 0 đầu và 80000 là số nguyên
Điều kiện|Phân loại giao dịch theo số tiền và trạng thái|Có nhánh riêng cho giá trị thiếu, âm và hợp lệ
Vòng lặp|Duyệt danh sách giao dịch và tính tổng theo trạng thái|Tổng thủ công khớp với tổng do chương trình tính
List và tuple|Biểu diễn bản ghi giao dịch và nhóm bản ghi hợp lệ|Giải thích được khi nào tuple phù hợp với khóa ghép
Dict và set|Lập chỉ mục account_id và phát hiện transaction_id lặp|Tra cứu được A99 thiếu và đếm bản lặp T02
Ôn tập tuần 1|Viết script phân loại giao dịch từ danh sách mẫu|Có ba test cho hợp lệ, trùng và không tìm thấy tài khoản
Hàm và phạm vi biến|Tách parse_amount, normalize_id và classify_row|Các hàm có thể gọi độc lập với input riêng
Ngoại lệ|Bắt ValueError khi amount sai định dạng|Dòng lỗi có lý do và batch vẫn xử lý dòng hợp lệ
Pathlib và UTF-8|Dùng Path kiểm tra rồi mở CSV với encoding tường minh|Chạy được từ thư mục làm việc khác
CSV DictReader|Đọc giao-dich.csv theo tên cột và lưu số dòng|Báo lỗi rõ nếu header thiếu amount_vnd
Ngày và múi giờ|Tách ngày nghiệp vụ khỏi timestamp có offset|Giao dịch gần nửa đêm thuộc đúng business_date theo quy tắc
Kiểm tra schema|Viết validator kiểm tra trường bắt buộc, loại và miền giá trị|Một dòng có hai lỗi ghi nhận được cả hai lý do
Ôn tập tuần 2|Ghi valid.csv và rejects.csv từ CSV đầu vào có lỗi|Số dòng hai tệp cộng lại đúng số dòng đã đọc
Join bằng dict|Ánh xạ giao dịch sang tài khoản và CIF|Giữ được số dòng, ghi riêng A99 và khóa tham chiếu trùng
Dedup và xung đột|So payload của các dòng cùng transaction_id|T02 lặp hệt được loại, trùng khóa khác tiền được cách ly
Tiền tệ chính xác|Dùng int cho VND và Decimal cho loại tiền có phần lẻ|Kết quả cộng 0.1 và 0.2 theo Decimal bằng 0.3
Tổng hợp dữ liệu|Dùng defaultdict tổng hợp số dòng và tiền theo ngày|Tổng hợp ngày cộng lại bằng tổng tất cả giao dịch hợp lệ
Generator và streaming|Duy trì tổng khi duyệt iterator thay vì nạp toàn CSV|Chạy trên tệp nhân bản và đo bộ nhớ đỉnh
Pandas và merge|Đọc CSV với dtype cho mã và merge validate=many_to_one|Chương trình báo lỗi khi dimension chứa khóa lặp
Ôn tập tuần 3|So kết quả stdlib và pandas trên cùng dữ liệu|Hai cách cho cùng số dòng, tổng tiền và ngoại lệ theo mã
CLI với argparse|Thêm input, output và business-date|Thiếu tham số trả mã lỗi và hiển thị trợ giúp
Logging có cấu trúc|Ghi batch_id, stage, count và elapsed_ms|Có thể lọc toàn bộ sự kiện của một lần chạy
Kiểm thử với pytest|Viết test tham số hóa cho số tiền và khóa trùng|Test thất bại nếu bỏ validate hoặc đổi quy tắc dedup
Schema drift|So cột dự kiến với header CSV và thêm phiên bản schema|Cột mới được ghi cảnh báo, thiếu cột bắt buộc dừng batch
Ghi tệp an toàn|Ghi tệp tạm cùng filesystem rồi thay bằng os.replace|Lỗi ghi giữa chừng giữ được bản kết quả đã công bố
Rerun theo ngày|Chạy cùng batch hai lần với cùng business_date|Checksum trên kết quả nghiệp vụ giống nhau
Audit và đối soát|Tạo audit.json cho raw, trùng, cách ly và hợp lệ|360.000 = 80.000 + 50.000 + 230.000 VND
Code review|Thử tệp trống, header sai, khóa lặp và ngày bất hợp lệ|Mỗi lỗi có hành vi xác định và được mô tả trong README
Dự án Python EOD|Bàn giao CLI, dữ liệu mẫu, test và báo cáo kiểm soát|Một lệnh tái tạo đủ output, audit và rejects từ raw
`,
1: `
Image và container|Chạy một container Python và xem trạng thái|Phân biệt được ID image và ID container
Vòng đời container|Chạy, dừng và xóa container dùng một lần|Giải thích ảnh hưởng tới dữ liệu ghi bên trong container
Pull và tag|Chạy cùng chương trình với hai tag Python|Báo cáo được version interpreter tương ứng từng tag
Dockerfile đầu tiên|Đóng gói script Python in business_date|Build và run thành công từ thư mục sạch
Build context|Giới hạn COPY bằng .dockerignore|Image không chứa dữ liệu raw hoặc tệp cấu hình cá nhân
CMD và ENTRYPOINT|Cho script nhận business-date từ docker run|Có thể truyền ngày khác mà không build lại
Ôn tập Dockerfile|Viết lệnh build và run có thể sao chép vào README|Người khác chạy đúng script mà không cần cài Python trên host
Bind mount|Gắn CSV đầu vào ở chế độ chỉ đọc|Đọc được dữ liệu nhưng không ghi đè vào raw
Named volume|Ghi kết quả batch vào named volume|Xóa container rồi đọc lại kết quả từ container mới
Quyền filesystem|Chạy app bằng user thường và cấp quyền thư mục output|App ghi được output và UID bên trong khác 0
Network cơ bản|Nối hai dịch vụ vào bridge network|Container gọi được dịch vụ qua tên DNS nội bộ
Port mapping|Expose API lab trên localhost|Host gọi được cổng đã ánh xạ và liệt kê đúng bind address
Biến môi trường|Truyền RAW_DIR và OUT_DIR lúc khởi chạy|Cùng image chạy được hai cấu hình output
Ôn tập lưu trữ|Chạy EOD với hai mount raw và output|Tệp gốc giữ checksum, kết quả tồn tại sau khi xóa container
Docker Compose|Mô tả worker và kho lưu trữ lab trong compose.yml|docker compose config phân giải đủ dịch vụ và biến
Healthcheck|Thêm kiểm tra sức khỏe cho dịch vụ phụ thuộc|Phân biệt được running và healthy qua trạng thái
Điều phối startup|Đợi phụ thuộc sẵn sàng trước khi worker kết nối|Log chỉ ra lần kết nối thành công sau khi phụ thuộc healthy
Build cache|Đổi thứ tự COPY requirements và source|Thay code không bắt buộc cài lại dependencies
Multi-stage build|Tách bước chuẩn bị dependencies với runtime image|Image cuối nhỏ hơn hoặc loại bỏ công cụ build
Image reproducibility|Pin phiên bản và so sánh hai lần build|README ghi rõ base tag hoặc digest và lý do cập nhật
Ôn tập Compose|Khởi động lab rồi chạy batch một lần|Các dịch vụ dùng tên DNS và kết quả có batch_id
Logs và exit code|Tạo trường hợp thiếu input và xem docker logs|Lỗi được ghi ra stderr và exit code khác 0
Giới hạn tài nguyên|Chạy batch mẫu với giới hạn bộ nhớ và CPU|Phân biệt lỗi OOM với lỗi nghiệp vụ từ log và inspect
Quản lý cấu hình nhạy cảm|Đưa cấu hình lab vào tệp mount tại runtime|Image history không chứa giá trị bí mật
Kiểm tra image|Lập danh sách package và đánh giá kết quả scan|Ghi lại thành phần, phiên bản và hướng cập nhật
CI build|Thêm bước build image và chạy test trên môi trường tạm|Pipeline thất bại khi test bên trong container lỗi
Registry và tag phát hành|Lập kế hoạch tag theo commit và quay lại tag cũ|Có thể chọn lại image cũ mà không nhầm giữa hai bản
Phục hồi sau lỗi|Dừng worker giữa chừng rồi chạy lại cùng batch|Không công bố tệp dở dang và không sinh dòng lặp
Runbook|Ghi lệnh inspect, logs, rerun và dọn môi trường lab|Người khác xác định được lỗi mount và lỗi kết nối
Dự án Docker EOD|Bàn giao Dockerfile, Compose và kết quả hai lần chạy|Audit đều đúng 230.000 VND hợp lệ và raw giữ nguyên
`,
2: `
Schema và grain|Phác staging giao dịch và bảng account|Mỗi bảng có grain cùng khóa nghiệp vụ được mô tả
Kiểu dữ liệu Oracle|Khai báo VARCHAR2 cho mã, NUMBER cho tiền và DATE cho ngày|Mã có số 0 đầu được giữ nguyên
SELECT và alias|Truy vấn giao dịch với tên cột báo cáo|Chỉ trả cột được yêu cầu và alias nhất quán
WHERE và NULL|Phân loại null, rỗng và số tiền bằng 0|Giải thích được IS NULL và hành vi chuỗi rỗng trong Oracle
ORDER BY|Lấy giao dịch lớn nhất theo ngày có giải hòa bằng mã|Thứ tự vẫn ổn định khi hai giao dịch bằng tiền
GROUP BY và HAVING|Tính tổng theo ngày và lọc nhóm có chênh lệch|Số nhóm và tổng khớp bảng kiểm soát
Ôn tập SQL nền tảng|Viết truy vấn đếm và tổng tiền raw|Kết quả mẫu là 5 dòng và 360.000 VND
INNER và LEFT JOIN|Tìm giao dịch không có tài khoản bằng LEFT JOIN|A99 xuất hiện trong ngoại lệ và không mất dòng raw
Anti join|So NOT EXISTS với NOT IN khi dimension có NULL|Ca có NULL cho thấy lý do chọn NOT EXISTS
CTE và grain|Tách normalize, dedup và validate thành CTE|Có thể truy vấn số dòng sau từng bước
CASE và chuyển kiểu|Chuẩn hóa trạng thái và xử lý amount không hợp lệ|Một dòng chữ trong amount không làm sai toàn batch
Ngày nghiệp vụ|Lọc khoảng ngày theo cận dưới và cận trên loại trừ|Giao dịch cuối ngày không bị bỏ sót
Window function|Dùng ROW_NUMBER với tie-breaker xác định|Cùng input luôn cho cùng bản ghi được giữ
Ôn tập đối soát SQL|Tính raw, duplicate, quarantine và accepted|Phương trình tiền đúng 360.000 = 80.000 + 50.000 + 230.000
DDL staging và fact|Tạo staging mềm và fact có ràng buộc nghiệp vụ|Fact từ chối khóa trùng hoặc trường bắt buộc NULL
INSERT và transaction|Nạp staging trong transaction riêng|Lỗi trước COMMIT không để lại fact nạp một phần
MERGE|Upsert fact từ staging đã loại trùng|Hai lần nạp giữ nguyên số giao dịch đích
Xung đột MERGE|Đưa hai bản ghi staging cùng khóa khác tiền vào quy trình|Bản ghi đi vào ngoại lệ trước khi MERGE
PL/SQL block|Viết DECLARE BEGIN EXCEPTION END in số dòng|Khối chạy và báo đúng lỗi đầu vào
Procedure và tham số|Tạo procedure theo business_date và batch_id|Cùng procedure chạy được hai ngày dữ liệu độc lập
Ôn tập nạp dữ liệu|Chạy procedure hai lần cho cùng batch|Đếm fact, tổng và mã ngoại lệ giống nhau
Exception và rollback|Giả lập lỗi trong bước ghi fact|Transaction quay lui và lỗi được chuyển về caller
Audit theo batch|Lưu started_at, status, input_count và output_count|Truy vấn được lần chạy mới nhất của một ngày
Bulk processing|So FORALL với thao tác từng dòng trên tệp mở rộng|Có số liệu thời gian và giữ cùng kết quả nghiệp vụ
Explain plan|So truy vấn lọc theo ngày phủ index với biến thể bọc hàm|Chỉ ra predicate và cách đọc plan
Index theo workload|Đánh giá khóa ghép business_date/transaction_id|Giải thích thứ tự cột bằng mẫu filter thật
Partition theo ngày|Phác partition và truy vấn kiểm tra pruning|Đọc được phạm vi partition qua kế hoạch truy vấn
Kiểm thử hồi quy|Thử dòng trùng khác tiền, tài khoản thiếu và tệp trống|Mỗi ca có số dòng kỳ vọng và SQL xác minh
Ôn phỏng vấn Oracle|Giải thích vì sao tổng tăng sau JOIN và cách phát hiện|Có truy vấn chứng minh grain của mỗi phía
Dự án Oracle EOD|Bàn giao DDL, SQL, procedure, audit và runbook|Rerun giữ kết quả và truy được giao dịch nguồn
`,
3: `
Làm quen MATLAB|Chạy script tạo vector số tiền và in tổng|Xác định được kích thước vector và tổng kiểm soát
Vector và ma trận|Tạo ma trận số tiền theo ngày và kênh|Tính đúng tổng theo hàng và theo cột
Index và logical mask|Lọc các giao dịch vượt ngưỡng|Số phần tử trả về bằng tổng mask
Kiểu dữ liệu và chuỗi|Tạo string array cho CIF có số 0 đầu|Mã giữ nguyên và lọc được theo tiền tố
Script và hàm|Tách hàm phân loại giao dịch khỏi script nhập liệu|Có thể chạy hàm với một bảng tự tạo
Điều kiện và vòng lặp|Gắn trạng thái dựa trên amount và account|Mỗi giao dịch có đúng một trạng thái cuối
Ôn tập nền tảng|So kết quả vòng lặp và biểu thức vector|Hai cách trả cùng số dòng trên dữ liệu mẫu
readtable|Đọc giao-dich.csv thành table và xem VariableNames|Xác nhận mã giao dịch được đọc kiểu phù hợp
detectImportOptions|Chỉ định kiểu cho cột mã, tiền và ngày|Tệp có số 0 đầu vẫn giữ đúng giá trị sau import
Dữ liệu thiếu|Dùng ismissing tạo bảng ngoại lệ|Đếm được dòng thiếu theo từng cột
datetime|Parse ngày nghiệp vụ và sắp thứ tự ổn định|Ngày lỗi được nhận diện, ngày hợp lệ được chuẩn hóa
Chuẩn hóa mã|Dùng strip và upper trên account_id|Khoảng trắng đầu cuối không tạo khóa mới
unique và dedup|Đếm lặp theo mã trước khi bỏ bản giống hệt|T02 lặp được ghi audit với số tiền 80.000
Ôn tập import|Tạo bảng sạch và ngoại lệ từ tệp mẫu|Kiểm tra 5 dòng raw trước khi phân loại
outerjoin|Join giao dịch với tài khoản và theo dõi dòng không match|A99 đi vào ngoại lệ
Kiểm tra grain|Tạo dimension chứa hai dòng cùng account_id|Nhận diện nhân dòng bằng đếm trước và sau join
groupsummary|Tổng hợp số dòng và tổng tiền theo ngày|Tổng hợp khớp mức chi tiết
findgroups và splitapply|Tính số tiền trung bình và tổng theo kênh|So được kết quả với groupsummary trên cùng nhóm
Timetable|Chuyển dữ liệu có timestamp và tổng hợp theo ngày|Mỗi nhóm thời gian theo đúng quy tắc ngày nghiệp vụ
Biểu đồ kiểm soát|Vẽ tổng raw, accepted và ngoại lệ theo ngày|Trục, đơn vị VND và legend đọc được
Ôn tập phân tích|Tạo bảng KPI và đồ thị đối soát|Chỉ được ngày nào có chênh lệch và truy ra nguyên nhân
writetable|Xuất clean, rejects và controls ra CSV|Tệp đọc lại giữ đúng header và số dòng
Live Script|Ghi kết quả phân tích xen kẽ code và diễn giải|Một người đọc có thể chạy lại các phép kiểm tra
Hàm có kiểm tra input|Ràng buộc table chứa đúng cột cần dùng|Đầu vào thiếu cột báo lỗi xác định
Kiểm thử với assert|Viết điều kiện kiểm tra tổng theo ngày và khóa duy nhất|Test thất bại nếu thêm bản trùng vào accepted
Xử lý tệp lớn|Thử tabularTextDatastore trên bộ mở rộng|Tổng từng chunk cộng lại bằng tổng kiểm soát
Đo hiệu năng|Đo thời gian trước và sau vector hóa|Báo cáo thời gian kèm kiểm tra kết quả tương đương
Đối chiếu Python và MATLAB|So accepted và rejects của hai cách theo transaction_id|Chênh lệch được giải thích theo quy tắc nhập dữ liệu
Ôn tập bàn giao|Chạy lại từ thư mục sạch và kiểm tra các biểu đồ|Kết quả không phụ thuộc thư mục máy tác giả
Dự án MATLAB EOD|Bàn giao Live Script, CSV và biểu đồ đối soát|Báo cáo chứng minh được 230.000 VND giao dịch hợp lệ
`,
4: `
Object storage|So filesystem với bucket và object key|Vẽ được luồng CSV raw qua curated
Môi trường MinIO|Khởi chạy môi trường lab và mở console|Đăng nhập được và tạo bucket thử nghiệm
MinIO Client|Cấu hình alias và xem bucket bằng mc ls|Alias đúng endpoint và không ghi bí mật vào README
Bucket và key|Tải CSV theo raw/business_date=YYYY-MM-DD|List theo tiền tố trả đúng batch
Đọc và ghi object|Tải lại CSV bằng mc cp và so checksum|Hai bản có cùng SHA-256
Metadata|Gắn batch_id và schema_version cho object|Đọc lại được metadata từ lần upload
Ôn tập tuần 1|Lưu và lấy lại ba tệp CSV nguồn|Manifest ghi đủ key, byte và checksum
Python S3 client|Thử list, put và get bằng SDK|Script đọc được đối tượng đã ghi
Prefix và partition|Thiết kế key theo nguồn và ngày nghiệp vụ|Một ngày có thể liệt kê mà không quét toàn bucket
Phân vùng raw và curated|Tạo quy ước bucketing/tên key|Raw và curated có đường dẫn, hợp đồng và trách nhiệm riêng
Phiên bản object|Bật versioning trên bucket lab và ghi hai phiên bản|Truy lại được bản trước bằng version ID
Xóa và khôi phục|Thử delete marker trên đối tượng dùng thử|Khôi phục được phiên bản cần thiết
Quyền truy cập|Tách quyền đọc raw và ghi curated cho worker|Ba thao tác hợp lệ và một thao tác bị từ chối được ghi nhận
Ôn tập quyền và phiên bản|Mô phỏng một bản curated bị thay nhầm|Khôi phục đúng bản và lưu bằng chứng
Presigned URL|Tạo URL hết hạn trong môi trường lab|URL hết hạn không còn đọc được object
Multipart upload|Thử tệp lớn hoặc mô phỏng theo các part|Phân biệt part, object hoàn tất và upload dở
Checksum integrity|So checksum độc lập với ETag multipart|Nêu rõ trường nào dùng để xác minh dữ liệu
Retry|Mô phỏng lỗi mạng tạm thời trong SDK lab|Lần chạy ghi số lần retry và vẫn không nhân output
Lifecycle|Đề xuất retention cho raw, curated và tệp tạm|Mỗi rule có prefix, thời hạn và lý do
Ôn tập tuần 3|Rà soát manifest, version và quyền worker|Mỗi key kiểm tra được checksum và nguồn gốc
Event notification|Thiết kế xử lý object-created trùng sự kiện|Cùng key/version được nhận nhiều lần nhưng xử lý một lần
Schema drift|Gắn schema version và chạy validation trước publish|Version không hỗ trợ được ghi vào khu cách ly
Xử lý batch đến muộn|Đưa file bổ sung vào ngày nghiệp vụ cũ|Luồng chạy lại đúng partition đã ảnh hưởng
Quan sát bucket|Tạo báo cáo độ trễ từ object đến curated|Phân biệt file trễ và pipeline chậm
Snapshot và audit|Lưu input_manifest cho một lần nạp|Có thể tái xác định phiên bản từng input
S3 compatibility|So endpoint, signing và các đặc tính cần kiểm tra|Có danh sách kiểm thử trước khi đổi nhà cung cấp
Phục hồi|Diễn tập dựng lại curated từ raw|Checksum đầu vào và số kiểm soát được lưu
Chi phí và dung lượng|Tính dung lượng theo số ngày giữ bản và phiên bản|Có công thức cùng giả định rõ ràng
Runbook MinIO|Viết cách kiểm tra lỗi quyền, key thiếu và SDK|Người khác lần từ log tới object cụ thể
Dự án MinIO EOD|Bàn giao policy, object layout, loader và manifest|Hai lần chạy cho cùng kết quả và vẫn truy xuất được raw
`,
5: `
Vai trò Airflow|Vẽ DAG đối soát từ đọc đến công bố|Ghi rõ phụ thuộc và điểm dừng nếu sai số
Môi trường lab|Khởi chạy môi trường Airflow theo phiên bản đã chọn|Xem được giao diện và danh sách DAG
DAG tối thiểu|Khai báo DAG gồm ba task có quan hệ phụ thuộc|Graph hiển thị đúng thứ tự
TaskFlow|Tách các hàm Python thành task TaskFlow|Mỗi task chạy được và lưu log riêng
Business date|Ánh xạ data interval sang ngày nghiệp vụ|Một lịch chạy lúc sáng sớm xử lý đúng dữ liệu ngày trước
Task instance|Chạy DAG hai lần và so trạng thái task|Phân biệt DAG run, task instance và attempt
Ôn tập DAG|Thiết kế ingest, validate và publish|Publish không chạy nếu validate thất bại
XCom|Truyền object key và batch_id qua XCom|Payload không chứa toàn bộ CSV
Connections|Khai báo kết nối lab và đọc bằng hook|DAG không chứa credential hardcode
Variables và Params|Truyền ngày nghiệp vụ và threshold có cấu hình|Ngày sai định dạng được phát hiện trước khi chạy
Retry và timeout|Giả lập lỗi tạm thời và lỗi dữ liệu|Lỗi tạm thời có retry, lỗi dữ liệu không bị che
Sensors|Chờ manifest đến theo lịch kiểm tra|Có timeout và mô tả bước xử lý khi thiếu tệp
Trigger rules|Tạo nhánh audit để ghi nhận cả lúc fail|Audit ghi đúng trạng thái sau task thất bại
Ôn tập vận hành|Tạo một run thiếu tệp rồi xử lý bằng run mới|Log đủ để phân biệt thiếu tệp và thất bại validation
Dynamic mapping|Chạy một task cho mỗi input trong manifest|Số mapped task khớp manifest
Pools và concurrency|Giới hạn số task đồng thời vào nguồn|Nhiều batch không vượt giới hạn cấu hình
Schedule và timezone|Thiết kế lịch theo giờ Việt Nam và hiển thị data interval|Ví dụ thời điểm 00:15 cho đúng business_date
Catchup và backfill|Mô phỏng xử lý ba ngày còn thiếu|Mỗi run ghi đúng partition riêng
Idempotency|Thiết kế nạp theo khóa ngày và giao dịch|Clear task hoặc rerun không tạo thêm giao dịch
Quarantine|Ghi tệp lỗi và số kiểm soát trước publish|Có thể truy một dòng lỗi về file và số dòng
Ôn tập tuần 3|Rerun một ngày trong khoảng backfill|Ngày khác giữ nguyên và tổng ngày đó ổn định
DAG import tests|Kiểm tra DAG import và kiểm tra quan hệ task|CI bắt được lỗi cú pháp và phụ thuộc thiếu
Data quality gate|Đặt ngưỡng chênh lệch trước publish|Sai 1 VND khiến bước công bố dừng
Lineage|Ghi input/output dataset và job_run_id|Truy từ fact về raw bằng thông tin audit
Theo dõi độ trễ|Tách thời gian chờ scheduler và thời gian chạy task|Có hai số đo riêng và mức cảnh báo
Cảnh báo có ngữ cảnh|Soạn thông báo lỗi có ngày, run ID và log|Người trực biết task nào và cần kiểm tra gì
Diễn tập sự cố|Dừng kho đích rồi khôi phục và chạy lại|Lần fail không xuất bản kết quả một phần
Tối ưu lịch|Phân tích lịch, thời gian dữ liệu đến và tải nguồn|Có phương án tránh đỉnh tải kèm số đo
Runbook Airflow|Viết hướng dẫn backfill và clear task có điều kiện|Người khác thực hiện đúng trên một ngày mẫu
Dự án Airflow EOD|Bàn giao DAG, tests, audit và bằng chứng rerun|Mọi task có log, kết quả khớp số tiền mẫu
`,
8: `
Kiến trúc AWS|Vẽ luồng dữ liệu với IAM role, S3 và kho đích|Giải thích trách nhiệm từng thành phần
Bucket và Region|Lập kế hoạch tên bucket, Region và môi trường|Nêu được lý do đặt storage và compute gần nhau
AWS CLI|Dùng profile lab và xác minh danh tính caller|Xác nhận được account/role trước khi thao tác
Object key|Đặt key raw theo hệ thống nguồn và business_date|Lọc một ngày trả đúng tệp liên quan
Upload và download|Đưa CSV giả lập lên sandbox S3 hoặc viết lệnh mô phỏng|Checksum trước và sau giống nhau
AWS SDK|Viết script kiểm tra object metadata và danh sách key|Có phân trang và xử lý trường hợp rỗng
Ôn tập tuần 1|Tạo manifest cho ba object nguồn|Mỗi object có key, kích cỡ và checksum
IAM role|Phác quyền truy cập cho job theo prefix|Chỉ ra action dùng bucket ARN và action dùng object ARN
Bucket policy|Đọc policy mẫu và giải thích deny/allow|Giải thích được trường hợp explicit deny
Block Public Access|Kiểm tra cấu hình một bucket lab hoặc policy mẫu|Tài liệu nêu trạng thái public và công cụ xác minh
Mã hóa|So SSE-S3 với SSE-KMS cho bộ dữ liệu lab|Giải thích quyền KMS cần thêm trong luồng đã chọn
Versioning|Lưu hai phiên bản và phục hồi bản trước|Version ID trong audit truy được nội dung đúng
Checksum và ETag|Đối chiếu checksum upload với dữ liệu gốc|Phân biệt ETag với checksum tệp nói chung
Ôn tập bảo vệ dữ liệu|Lập bảng actor/action/prefix|Có ca từ chối và ca được phép để kiểm tra
Storage classes|So lớp lưu trữ theo tần suất và thời gian lấy lại|Nêu rõ giả định truy cập và yêu cầu khôi phục
Lifecycle|Viết rule archive raw và dọn multipart dở|Rule có filter đúng và thời hạn rõ
Manifest batch|Tạo manifest chứa version_id và ngày nghiệp vụ|Rerun dùng đúng đầu vào dù key có phiên bản mới
Event notifications|Vẽ luồng S3 sang hàng đợi rồi worker|Nêu cách xử lý sự kiện lặp và chưa đúng thứ tự
Idempotency|Thiết kế khóa xử lý từ bucket/key/version|Cùng event hai lần chỉ sinh một đầu ra
Partition và file size|Thiết kế curated theo business_date và định dạng Parquet|Giải thích tác động của nhiều file nhỏ tới truy vấn
Ôn tập kiến trúc|Vẽ pipeline S3 theo các lớp raw, quarantine, curated|Mỗi vùng có owner và quyền phù hợp
Inventory|So manifest lô với S3 Inventory|Chỉ được từng loại phù hợp cho mục đích nào
Data events và audit|Thiết kế lưu sự kiện truy cập có chọn lọc|Giải thích chi phí tương đối và tiêu chí giữ log
Theo dõi chi phí|Ước tính storage, request và truy xuất theo giả định|Bảng tính có thể đổi số file và thời gian lưu
Disaster recovery|Đề xuất RPO, RTO và cách khôi phục từ phiên bản|Có bước xác minh checksum sau phục hồi
Kiểm tra quyền|Viết bộ test đọc raw, ghi curated và thao tác bị từ chối|Ma trận test tương ứng policy đã thiết kế
Dữ liệu đến muộn|Bổ sung key cho ngày cũ rồi chạy lại logic ngày đó|Chỉ partition bị ảnh hưởng được cập nhật
Diễn tập lỗi|Mô phỏng key thiếu, quyền sai và file hỏng|Có hướng xử lý riêng dựa trên tín hiệu lỗi
Ôn tập phỏng vấn S3|Giải thích lineage từ báo cáo về phiên bản object|Câu trả lời nêu manifest, batch ID và version ID
Dự án S3 EOD|Bàn giao sơ đồ, manifest, policy mẫu và runbook|Có bằng chứng truy vết, dọn tài nguyên lab và đối soát
`,
9: `
Data warehouse|Thiết kế fact giao dịch và ba dimension|Mỗi bảng có grain và mục đích truy vấn
Kiến trúc Redshift|So provisioned và serverless theo yêu cầu lab|Lập tiêu chí chọn theo tải, chi phí và năng lực vận hành
Môi trường học|Xác định cách chạy lab hoặc đọc plan mẫu|Có schema thử nghiệm và cách thu dọn tài nguyên
DDL staging|Tạo staging cho dữ liệu CSV vào S3|Ánh xạ đủ cột, loại và ngày nghiệp vụ
COPY từ S3|Viết COPY với định dạng, IAM role và đường dẫn|Lệnh trỏ đúng prefix của batch đã chọn
Lỗi nạp|Dùng bảng hoặc view hệ thống xem lỗi COPY|Chỉ được cột, lý do và tệp gặp lỗi
Ôn tập nạp dữ liệu|Nạp cùng tệp vào staging rồi đếm và tính tổng|Raw có 5 dòng, tổng 360.000 VND
Kiểm tra staging|Viết truy vấn null, trùng và khóa tham chiếu|Ba kiểm tra có ngưỡng để quyết định publish
Dedup bằng window|Dùng ROW_NUMBER để ưu tiên bản ổn định|T02 lặp hệt được loại đúng một lần
Ngoại lệ dữ liệu|Tạo bảng rejects với lý do và batch ID|A99 có thể tra cứu từ audit
MERGE|Cập nhật fact từ tập staging đã kiểm tra|Rerun không tăng số dòng fact
Transaction|Gom bước ghi fact và audit thành giao dịch phù hợp|Lỗi kiểm tra không để dữ liệu nghiệp vụ xuất bản một phần
Mô hình sao|Liên kết fact với date, account và customer|Join từ fact sang dimension không nhân số dòng
Ôn tập đối soát|Tính accepted, duplicate và quarantine|Kiểm được phương trình kiểm soát mẫu bằng SQL
Sort key|So lựa chọn theo bộ lọc business_date và workload|Giải thích được khi nào AUTO phù hợp
Distribution|So AUTO, EVEN, KEY và ALL ở mức thiết kế|Lập giả thuyết ảnh hưởng đến join và lưu trữ
EXPLAIN|Đọc plan có scan, join và data redistribution|Chỉ được vị trí nghi ngờ tốn tài nguyên
System views|Thu thời gian và số dòng từ lịch sử query|Đo được hai truy vấn chạy cùng điều kiện
Statistics|Phân tích thống kê và tác động lên lựa chọn plan|Xác định cách kiểm tra trước và sau thay đổi
Materialized view|Tạo tổng EOD theo ngày và kiểm tra refresh|Tổng từ view bằng tổng fact và có thời điểm refresh
Ôn tập hiệu năng|So hai thiết kế bằng cùng tập query|Có số đo và giải thích trade-off
Spectrum|Phân tích đọc dữ liệu ngoài trong S3|Xác định khi nào lọc partition giảm lượng quét
UNLOAD|Xuất dữ liệu tổng hợp về S3 theo định dạng phù hợp|Đọc lại bản xuất và so số kiểm soát
Quản trị truy cập|Tách role loader, analyst và owner|Analyst đọc view cần dùng và không ghi fact
Tích hợp Power BI|Thiết kế bảng tổng và chỉ rõ chế độ kết nối dự kiến|Xác định grain, khóa và tải truy vấn của báo cáo
Tính đồng thời|Đánh giá batch nạp trùng giờ analyst chạy truy vấn|Có kịch bản đo và đề xuất lịch giảm xung đột
Rerun và khôi phục|Chạy lại ngày lỗi từ manifest đã ghi|Kết quả ngày bị lỗi được khôi phục đúng
Chi phí|Ước lượng chi phí theo compute, lưu trữ và truy vấn|Nêu đủ giả định và điểm cần theo dõi
Ôn tập phỏng vấn Redshift|Giải thích cách chẩn đoán dashboard chậm|Câu trả lời tách model, truy vấn và warehouse
Dự án Redshift EOD|Bàn giao SQL, mô hình sao, plan và báo cáo audit|Có truy vấn chứng minh tổng đúng và kết quả tái lập
`,
10: `
Cluster và kubectl|Dùng cluster local và kiểm tra context hiện hành|Xác định đúng cluster và namespace lab
Pod|Chạy container in ngày nghiệp vụ trong Pod|Đọc được trạng thái và log sau khi kết thúc
Manifest YAML|Viết Pod manifest và kiểm tra dry-run|Manifest hợp lệ trước khi tạo tài nguyên
Namespace|Tạo namespace riêng cho lab EOD|Tài nguyên lab xuất hiện đúng namespace
Labels và selectors|Gắn labels app, stage và team cho workload|Lọc bằng selector trả đúng tập tài nguyên
ConfigMap|Cấp cấu hình đường dẫn và ngày qua ConfigMap|Đổi cấu hình mà không build lại image
Ôn tập kubectl|Đọc events, mô tả Pod và xem log|Chẩn đoán được tên image sai
Secret|Cấp thông tin sandbox bằng Secret đã có|Manifest ứng dụng chỉ tham chiếu tên và key
Resource requests|Đặt requests và limits cho workload lab|Giải thích cách scheduler dùng request
OOM và exit code|Mô phỏng batch vượt giới hạn bộ nhớ|Nhận ra OOMKilled từ trạng thái container
Job|Tạo Job theo ngày nghiệp vụ|Job Complete và audit nằm ngoài filesystem Pod
Backoff và deadline|Tạo Job lỗi có backoffLimit và deadline|Job dừng theo giới hạn đã cấu hình
CronJob|Đặt lịch chạy múi giờ Việt Nam|Giải thích lần chạy kế tiếp theo schedule
Ôn tập batch|Chạy manual Job từ template CronJob|Ngày nghiệp vụ và batch ID được nhận đúng
Chính sách chồng lịch|Thử concurrencyPolicy: Forbid|Chứng minh hai lần chạy định kỳ không chồng nhau trong ca lab
Volume|Gắn thư mục tạm và lưu kết quả vào nơi bền vững|Tệp đầu ra đọc được sau khi xóa Pod
Service|Cho worker truy cập dịch vụ lab qua DNS nội bộ|Worker kết nối bằng tên thay cho IP Pod
Probes|Phân biệt startup, readiness và liveness bằng service phụ trợ|Readiness lỗi không làm restart container
Service account|Gán identity riêng cho Job|Pod dùng đúng service account được khai báo
RBAC|Tạo Role lab tối thiểu và dùng auth can-i|Có quyền cần thiết và bị từ chối thao tác ngoài phạm vi
Ôn tập vận hành|Chẩn đoán Pending, ImagePullBackOff và OOMKilled|Mỗi trạng thái có lệnh kiểm tra phù hợp
Security context|Chạy batch với non-root và filesystem chỉ đọc khi phù hợp|Container vẫn ghi được vào đường dẫn output đã mount
NetworkPolicy|Thiết kế quy tắc kết nối worker đến storage cho cluster hỗ trợ|Luồng cần thiết chạy và luồng ngoài danh sách bị chặn
Observability|Gắn batch ID vào log và label tương ứng|Từ ngày nghiệp vụ tìm được Job và log liên quan
Cleanup Job|Đặt TTL và giới hạn lịch sử CronJob|Báo cáo audit vẫn truy cập được khi Job đã dọn
Triển khai image|Pin image release bằng version hoặc digest|Lần chạy sau dùng đúng image đã kiểm thử
Rerun ngày cũ|Tạo Job độc lập với business_date cũ|Dữ liệu ngày khác không bị thay đổi
Diễn tập sự cố|Làm cho storage tạm không truy cập được rồi khôi phục|Khôi phục bằng rerun và kiểm tra số dòng đích
Runbook Kubernetes|Viết lệnh tìm Job theo batch và cách rerun|Người khác xử lý được ba tình huống lỗi mẫu
Dự án Kubernetes EOD|Bàn giao manifest, log và bằng chứng chạy lại|Job hoàn tất và xuất audit khớp số kiểm soát
`,
11: `
Chart và release|Tạo chart rỗng cho EOD worker|Chỉ ra vai trò Chart.yaml, values.yaml và templates
helm template|Render chart mới ra YAML|Biết manifest nào sẽ được tạo trước khi cài
Cấu trúc values|Khai báo image repository, tag và business_date|Hai file values chọn được hai image tag
Go templates|Đọc .Values và .Release.Name trong template|Render đúng tên với hai release khác nhau
Quote và indent|Render env và labels có giá trị chuỗi|YAML vẫn parse đúng khi giá trị chứa dấu cách
Helpers|Tạo named template cho labels chung|Job và CronJob có labels nhất quán
Ôn tập render|Tạo chart chỉ gồm Job và xem diff khi đổi values|Diff chỉ thay đổi các trường dự kiến
CronJob template|Tham số hóa schedule, timezone và concurrencyPolicy|Render cron khác nhau theo môi trường
Optional resources|Bật tắt audit ConfigMap bằng điều kiện|Render ở hai cấu hình có đúng số tài nguyên
Config và secret ref|Tham chiếu Secret hiện có bằng values|Manifest render không chứa bí mật
Resources và security context|Tham số hóa giới hạn và quyền runtime|Manifest có đủ khai báo ở cấu hình production mẫu
Values schema|Khai báo JSON Schema cho trường bắt buộc|Lint thất bại với image tag sai loại
Override values|So default, values file và set khi render|Thứ tự ưu tiên được chứng minh bằng đầu ra
Ôn tập values|Tạo dev và staging values cho cùng chart|Cấu hình khác nhau được kiểm tra bằng diff
helm lint|Chạy lint với từng bộ values|Lỗi thiếu trường và lỗi template bị bắt
Kiểm tra manifest Kubernetes|Dùng dry-run trên YAML đã render|Xác minh kiểu và tên trường theo cluster lab
Install|Cài release vào namespace riêng|helm status và kubectl cho thấy tài nguyên đúng
Upgrade|Đổi image hoặc lịch chạy rồi nâng cấp release|helm history ghi revision mới
Rollback|Quay lại revision trước trong namespace lab|Manifest và cấu hình quay về giá trị dự kiến
Release failure|Thử cấu hình image sai trong môi trường thử nghiệm|Ghi rõ lỗi và tín hiệu kiểm tra
Ôn tập release|Cài, nâng cấp và quay lui một release mẫu|Có log và manifest cho mỗi bước
Job bất biến|Thử thay trường template của Job đã tạo|Giải thích trường hợp cần Job mới theo lần chạy
Test release|Tạo smoke test kiểm tra manifest hoặc phụ thuộc|Test gặp lỗi kết nối cho kết quả thất bại
Dependencies|Thêm chart phụ cho môi trường học nếu cần|Có phiên bản phụ thuộc rõ và render được
Package chart|Đóng gói chart theo SemVer|Tên gói phản ánh đúng chart version
OCI registry|Lập quy trình push/pull chart vào registry lab|Phân biệt chart version với appVersion
CI kiểm tra chart|Render mỗi môi trường và kiểm tra YAML trong CI|CI báo lỗi khi nhánh values chưa hợp lệ
Diễn tập nâng cấp|So manifest trước và sau thay lịch chạy|Biết thay đổi nào ảnh hưởng Job đang chạy
Runbook Helm|Ghi cách xem history, diff và phục hồi release|Người khác quay lại phiên bản được chỉ định
Dự án Helm EOD|Bàn giao chart, values và quy trình nâng cấp|Chart can thiệp đúng namespace và chạy batch thành công
`,
12: `
Giới thiệu bản thân|Thu âm câu giới thiệu 60 giây theo JD|Nêu được phạm vi công việc, công cụ và kết quả
SQL và grain|Giải thích giao dịch, tài khoản và CIF ở grain nào|Nêu khóa và ví dụ một phép JOIN nhân dòng
SQL đối soát|Viết SQL tính tổng theo business_date|Có số đối chứng và xử lý ngày không có dữ liệu
Python CSV|Viết cách parse tệp có lỗi số tiền|Nêu encoding, exception và output ngoại lệ
Power BI model|Vẽ mô hình sao cho giao dịch và khách hàng|Nêu chiều lọc và vị trí tính KPI
Data quality|Trình bày quy tắc completeness và uniqueness|Mỗi rule có ngưỡng và hành động khi fail
Mock nền tảng|Tự trả lời sáu câu trong 20 phút|Ghi điểm yếu và sửa hai câu còn thiếu ví dụ
Window functions|Viết dedup bằng ROW_NUMBER|Có tie-breaker và giải thích trùng khác nội dung
Incremental load|Thiết kế watermark có vùng dữ liệu tới muộn|Rerun không nhân dòng và mô tả điều kiện backfill
Data reconciliation|Giải thích vì sao raw và dashboard lệch 130.000 VND|Tách rõ 80.000 trùng và 50.000 cách ly
Airflow và rerun|Giải thích data interval, retry và backfill|Đưa ví dụ ba ngày chạy lại đúng partition
Docker troubleshooting|Xử lý batch không thấy CSV trong container|Nêu lệnh kiểm tra mount và working directory
Object storage|Thiết kế prefix, versioning và manifest|Mỗi đầu ra truy được tới phiên bản raw
Mock SQL và pipeline|Giải hai câu SQL và một case thiết kế trong 35 phút|Mỗi câu có giả định, giải pháp và cách kiểm chứng
System design|Thiết kế pipeline EOD từ core banking tới dashboard|Có SLA, dung lượng, failure modes và khâu công bố
Warehouse và hiệu năng|Giải thích khi nào cần xem EXPLAIN và system logs|Dùng số đo để chọn một giả thuyết hiệu năng
SCD Type 2|Tình huống khách đổi phân khúc giữa tháng|Chọn đúng phiên bản dimension tại thời điểm giao dịch
Semantic model|Giải thích filter context với ví dụ KPI EOD|Dự đoán được kết quả dưới hai bộ lọc khác nhau
Bảo mật dữ liệu|Thiết kế phân quyền cho analyst, loader và vận hành|Chỉ rõ ai truy cập raw, curated và bản tổng hợp
Sự cố dữ liệu|Trả lời khi dashboard đã công bố sai số|Ưu tiên khoanh vùng, thông báo và kiểm chứng bản sửa
Mock thiết kế|Thuyết trình kiến trúc trong 8 phút và tự phản biện|Nêu hai lựa chọn và trade-off cụ thể
STAR về ưu tiên|Kể tình huống có hai yêu cầu cùng SLA|Nêu cách ưu tiên và kết quả định lượng hoặc có căn cứ
STAR về lỗi|Trình bày một lỗi phân tích và cách ngăn tái diễn|Có trách nhiệm cá nhân, tín hiệu và cải thiện quy trình
English introduction|Trả lời Tell me about yourself trong 60 giây|Mỗi ý có ví dụ và không đọc nguyên văn CV
English troubleshooting|Trả lời How would you reconcile a failed EOD batch?|Có quy trình kiểm soát số liệu và bước quyết định rerun
Case SQL khó|So query chống nhân dòng khi dimension có hiệu lực theo ngày|Viết điều kiện thời gian và kiểm tra số dòng sau JOIN
Case stakeholder|Giải thích chênh lệch KPI với bên nghiệp vụ|Nêu số tiền, lý do, ảnh hưởng và bước xác nhận
Mock song ngữ|Phỏng vấn giả lập 45 phút gồm SQL và system design|Chấm theo độ đúng, rõ, bằng chứng và giao tiếp
Ôn hồ sơ|Đối chiếu CV với hai case đã luyện|Mỗi kỹ năng quan trọng có một tình huống bằng chứng
Phỏng vấn tổng hợp|Thực hiện một vòng đầy đủ và ghi âm|Tự chấm theo rubric và viết kế hoạch sửa ba mục yếu
`,
13: `
Phạm vi dự án|Viết yêu cầu đối soát EOD và định nghĩa hệ thống nguồn|Có người dùng, SLA và tiêu chí bàn giao
Dữ liệu nguồn|Kiểm kê ba CSV và bộ mở rộng|Ghi số dòng, header, ngày và checksum
Hợp đồng dữ liệu|Viết schema và quy tắc tiền, ngày, khóa|Một tệp lỗi có thể được phát hiện trước nạp
Grain|Vẽ grain của raw, staging, fact và đối soát ngày|Mỗi grain có khóa kiểm tra duy nhất
Mô hình luồng|Vẽ raw, validate, quarantine, curated và báo cáo|Có điểm kiểm soát và nơi lưu đầu ra từng bước
Bảng kiểm soát|Tính tay số liệu trên ví dụ mẫu|Raw 360.000 VND, accepted 230.000 VND
Mốc tuần 1|Chốt scope, schema và kết quả mẫu|Người khác xác nhận quy tắc nghiệp vụ từ README
Python ingestion|Đọc dữ liệu bằng script có tham số input và ngày|Raw được kiểm tra header và không bị thay đổi
Validation|Xử lý sai kiểu, thiếu mã và số tiền bất hợp lệ|Lưu nguyên nhân và file/số dòng cho rejects
Dedup|Tách bản lặp hệt và trùng khóa khác payload|Hai loại có metrics và lý do riêng
Mapping CIF|Join account và CIF rồi kiểm tra grain|A99 đi vào ngoại lệ và không nhân dòng
Audit manifest|Ghi input checksum, version và stage metrics|Một batch truy ngược được tất cả nguồn
Đóng gói Docker|Build image nhỏ có script và phụ thuộc|Batch chạy từ máy sạch bằng lệnh trong README
Mốc tuần 2|Chạy script trên bộ mẫu và bộ mở rộng|Đối chiếu số kiểm soát và lưu file đối chứng
Object storage|Đặt layout raw và curated theo business_date|Rerun đọc lại đúng phiên bản nguồn
Airflow DAG|Điều phối ingest, validate, load, reconcile và publish|Publish bị chặn khi reconcile fail
Warehouse staging|Tạo staging và fact trong hệ quản trị đã chọn|Ràng buộc khóa và dữ liệu đúng kiểu
Nạp fact|Nạp theo batch với giao dịch và logic idempotent|Hai lần chạy giữ nguyên số dòng nghiệp vụ
Mô hình sao|Tạo dimension ngày, account và customer|Mọi fact có đường nối rõ ràng tới dữ liệu chiều
Quy tắc DQ|Thêm test khóa duy nhất, tham chiếu và số tiền|Bơm dòng lỗi hợp lệ cho bài test và phát hiện được
Mốc tuần 3|Rerun DAG khi nguồn đến muộn|Ngày ảnh hưởng được cập nhật và log đầy đủ
Power BI KPI|Tạo tổng raw, accepted, duplicate và quarantined|Biểu đồ và KPI khớp số kiểm soát
Drill-through|Tạo danh sách ngoại lệ để tra nguồn|Người dùng lọc ngày rồi tìm được giao dịch lỗi
Lineage|Liên kết metric báo cáo với fact và raw manifest|Mỗi đường truy vết có batch_id và nguồn
SLA và cảnh báo|Đặt giờ hoàn thành và ngưỡng chênh lệch|Alert chứa stage, ngày và cách tìm log
Backfill nhiều ngày|Xử lý lại ba ngày theo thứ tự đã chọn|Kết quả các ngày ngoài phạm vi giữ nguyên
Diễn tập sự cố|Dừng giữa bước load rồi tiếp tục bằng rerun|Không publish một phần và audit phân biệt lần chạy
Hiệu năng|Đo thời gian và số dòng từng stage trên bộ lớn|Có số liệu trước/sau và cách tái lập phép đo
Chuẩn bị demo|Viết README, sơ đồ và kịch bản demo năm phút|Người khác chạy lại theo thứ tự được ghi
Bàn giao portfolio|Trình bày từ raw đến dashboard và demo lỗi|Có bằng chứng kiểm soát tiền, rerun, lineage và ngoại lệ
`
};

const engineeringSources = {
  0: {reading: [["Python Tutorial", "https://docs.python.org/3/tutorial/"], ["Python CSV", "https://docs.python.org/3/library/csv.html"], ["Pandas · Merge", "https://pandas.pydata.org/docs/user_guide/merging.html"], ["pytest · Get started", "https://docs.pytest.org/en/stable/getting-started.html"]], video: ["Harvard CS50P · Bài giảng và bài tập", "https://cs50.harvard.edu/python/"]},
  1: {reading: [["Docker · Get started", "https://docs.docker.com/get-started/"], ["Docker · Storage", "https://docs.docker.com/engine/storage/"], ["Docker Compose", "https://docs.docker.com/compose/"], ["Docker · Build", "https://docs.docker.com/build/"]], video: ["Docker Training · Video hướng dẫn", "https://www.docker.com/trainings/"]},
  2: {reading: [["Oracle Dev Gym · SQL", "https://devgym.oracle.com/pls/apex/dg/competition/sql"], ["Oracle Database · SQL Reference", "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/"], ["Oracle Dev Gym · PL/SQL", "https://devgym.oracle.com/pls/apex/dg/competition/plsql"], ["Oracle · SQL Tuning Guide", "https://docs.oracle.com/en/database/oracle/oracle-database/23/tgsql/"]], video: ["Oracle Developers · Video SQL và PL/SQL", "https://www.youtube.com/@OracleDevelopers/search?query=SQL"]},
  3: {reading: [["MathWorks · MATLAB Onramp", "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted"], ["MathWorks · readtable", "https://www.mathworks.com/help/matlab/ref/readtable.html"], ["MathWorks · groupsummary", "https://www.mathworks.com/help/matlab/ref/double.groupsummary.html"], ["MathWorks · Unit Testing", "https://www.mathworks.com/help/matlab/matlab-unit-test-framework.html"]], video: ["MathWorks · Video MATLAB Tutorials", "https://www.mathworks.com/support/learn-with-matlab-tutorials.html"]},
  4: {reading: [["MinIO · Documentation", "https://docs.min.io/"], ["MinIO · SDK Python", "https://min.io/docs/minio/linux/developers/python/minio-py.html"], ["AWS · Object lifecycle", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"], ["AWS · Event notifications", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html"]], video: ["MinIO 101 · S3 Object Storage", "https://www.youtube.com/watch?v=tH8LuZsSdHg"]},
  5: {reading: [["Apache Airflow · Tutorials", "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html"], ["Apache Airflow · Core concepts", "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html"], ["Apache Airflow · Best practices", "https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html"], ["OpenLineage · Getting started", "https://openlineage.io/getting-started/"]], video: ["Astronomer · Airflow 101", "https://www.astronomer.io/events/webinars/airflow-101-how-to-get-started-writing-data-pipelines-with-apache-airflow-video/"]},
  8: {reading: [["AWS · Amazon S3 User Guide", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"], ["AWS · IAM với S3", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-iam.html"], ["AWS · Object lifecycle", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"], ["AWS · Theo dõi S3", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/monitoring-overview.html"]], video: ["AWS · Amazon S3 Video Tutorials", "https://aws.amazon.com/s3/videos/"]},
  9: {reading: [["AWS · Redshift Database Developer Guide", "https://docs.aws.amazon.com/redshift/latest/dg/welcome.html"], ["AWS · Amazon Redshift MERGE", "https://docs.aws.amazon.com/redshift/latest/dg/r_MERGE.html"], ["AWS · Table design best practices", "https://docs.aws.amazon.com/redshift/latest/dg/c_designing-tables-best-practices.html"], ["AWS · Query performance", "https://docs.aws.amazon.com/redshift/latest/dg/c-query-performance.html"]], video: ["AWS · Amazon Redshift Getting Started", "https://www.youtube.com/watch?v=8b58xGDHIog"]},
  10: {reading: [["Kubernetes · Learn Basics", "https://kubernetes.io/docs/tutorials/kubernetes-basics/"], ["Kubernetes · Workloads", "https://kubernetes.io/docs/concepts/workloads/"], ["Kubernetes · CronJob", "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/"], ["Kubernetes · Debug applications", "https://kubernetes.io/docs/tasks/debug/debug-application/"]], video: ["Kubernetes Tutorial · Kiến trúc và thực hành", "https://www.youtube.com/watch?v=KVBON1lA9N8"]},
  11: {reading: [["Helm · Chart Template Guide", "https://helm.sh/docs/chart_template_guide/"], ["Helm · Charts và cấu trúc values", "https://helm.sh/docs/topics/charts/"], ["Helm · Using Helm", "https://helm.sh/docs/intro/using_helm/"], ["Helm · Registries", "https://helm.sh/docs/topics/registries/"]], video: ["CNCF · Helm Package Manager", "https://www.youtube.com/watch?v=RHnTTP3_Q7Y"]},
  12: {reading: [["DataTalks.Club · Engineering Zoomcamp", "https://datatalksclub.github.io/podwiki/course-wiki/data-engineering-zoomcamp/"], ["Oracle Dev Gym · SQL", "https://devgym.oracle.com/pls/apex/dg/competition/sql"], ["Microsoft Learn · Star schema", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"], ["National Careers Service · STAR", "https://nationalcareers.service.gov.uk/careers-advice/interview-advice/the-star-method"]], video: ["DataTalks.Club · Data Engineering Zoomcamp", "https://www.youtube.com/@DataTalksClub/search?query=data%20engineering%20zoomcamp"]},
  13: {reading: [["DataTalks.Club · Data Engineering Zoomcamp", "https://datatalksclub.github.io/podwiki/course-wiki/data-engineering-zoomcamp/"], ["Apache Airflow · Best practices", "https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html"], ["dbt · Data tests", "https://docs.getdbt.com/docs/build/data-tests"], ["OpenLineage · Getting started", "https://openlineage.io/getting-started/"]], video: ["DataTalks.Club · Video dự án Data Engineering", "https://www.youtube.com/@DataTalksClub/search?query=data%20engineering%20project"]}
};

const engineeringPhases = [
  {first: 1, last: 7, name: "Nền tảng"},
  {first: 8, last: 14, name: "Thực hành"},
  {first: 15, last: 21, name: "Ứng dụng"},
  {first: 22, last: 30, name: "Chuyên sâu và tổng kết"}
];

const engineeringExamples = {
  0: {2: ["Số tiền VND dùng số nguyên để cộng chính xác. Mã định danh là chuỗi vì số 0 đầu có ý nghĩa.", "amount_vnd = int(\"80000\")\ncif_id = \"00123\"\nassert amount_vnd == 80000 and cif_id.startswith(\"00\")"], 11: ["DictReader trả giá trị theo tên cột. Kiểm tra fieldnames trước vòng lặp để phân biệt tệp thiếu header với dòng sai kiểu.", "with open(path, encoding=\"utf-8-sig\", newline=\"\") as source:\n    rows = csv.DictReader(source)\n    if \"amount_vnd\" not in (rows.fieldnames or []):\n        raise ValueError(\"Thiếu cột amount_vnd\")"], 16: ["Một transaction_id có thể lặp y hệt hoặc xuất hiện với nội dung khác. Hai trường hợp cần lý do audit riêng."]},
  1: {8: ["Bind mount cho phép batch đọc tệp từ host. Cờ readonly giúp hạn chế việc ghi nhầm vào thư mục raw.", "docker run --rm --mount type=bind,source=./raw,target=/raw,readonly eod-lab"], 19: ["Multi-stage build giữ công cụ biên dịch ở stage build và chỉ chép sản phẩm cần chạy sang stage cuối."]},
  2: {8: ["LEFT JOIN giữ giao dịch thiếu tài khoản để đưa vào bảng ngoại lệ. Đếm số dòng trước và sau join để phát hiện dimension trùng khóa.", "SELECT t.transaction_id, t.account_id\nFROM stg_transaction t\nLEFT JOIN dim_account a ON a.account_id = t.account_id\nWHERE a.account_id IS NULL;"], 13: ["ROW_NUMBER chỉ lặp lại kết quả ổn định khi ORDER BY có tie-breaker duy nhất. Kiểm tra bản trùng có payload khác trước khi chọn bản ghi giữ lại."]},
  3: {8: ["Table cho phép mỗi cột giữ kiểu dữ liệu riêng. Đọc kiểu từng cột trước khi tổng hợp hoặc ghép khóa.", 'T = readtable("giao-dich.csv", TextType="string");\ndisp(T.Properties.VariableNames)\nsummary(T)']},
  4: {5: ["Object key thuộc bucket và có thể chứa tiền tố giống thư mục. So checksum của bản tải lại với tệp gốc trước khi đưa bản sao vào pipeline."]},
  5: {8: ["XCom phù hợp cho metadata nhỏ. Chuyển object key giữa các task để worker sau tự tải dữ liệu từ storage."], 19: ["Idempotency yêu cầu cùng batch và cùng phiên bản đầu vào cho cùng trạng thái nghiệp vụ. Audit có thể ghi thêm một lần chạy."]},
  8: {17: ["Key nhận diện vị trí, còn version_id nhận diện nội dung tại một phiên bản lưu trữ cụ thể. Manifest cần cả hai để tái lập một lần chạy."]},
  9: {5: ["COPY đọc dữ liệu từ S3 ở phía warehouse. Nạp vào staging trước giúp kiểm tra lỗi mà vẫn bảo toàn số liệu fact."], 17: ["Plan cho biết các bước dự kiến. Kết hợp lịch sử thực thi để xác định bước thực sự tốn thời gian trong workload."]},
  10: {11: ["Job theo dõi việc hoàn thành của batch. Đưa báo cáo ra storage bền vững để việc dọn Pod không làm mất kết quả."]},
  11: {2: ["helm template render manifest bằng values trước khi cài vào cluster. Dùng cùng command với file cấu hình của từng môi trường.", "helm template eod ./eod-chart -f values-dev.yaml"], 19: ["Rollback đưa release về revision cũ. Nếu một batch đã ghi dữ liệu, cần kiểm tra trạng thái nghiệp vụ trước khi chạy lại."]},
  12: {10: ["Một cách trả lời là đối chiếu từng stage theo business_date. Đọc raw 360.000 VND, xác minh 80.000 VND bị loại do trùng và 50.000 VND vào vùng cách ly, rồi so accepted 230.000 VND với báo cáo."]},
  13: {24: ["Lineage hữu ích nhất khi người vận hành có thể tra một KPI cụ thể về bảng fact, batch_id và checksum raw. Đường truy vết cần được kiểm tra bằng một ngày mẫu."]}
};

function getEngineeringDays(id) {
  return engineeringDays[id].trim().split("\n").map(line => line.split("|"));
}

function engineeringDownloads(fileLink) {
  const files = [
    ["giao-dich.csv", "Giao dịch"],
    ["tai-khoan.csv", "Tài khoản"],
    ["cif-mapping.csv", "Ánh xạ CIF"],
    ["eod-practice.zip", "Bộ dữ liệu EOD mở rộng"]
  ];
  return files.map(([file, label]) => fileLink({path: "data/engineering/" + file, label})).join("");
}

function engineeringLessonVideo(id, day) {
  const practiceDay = {0: 11, 1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 8: 1, 9: 2, 10: 1, 11: 1, 12: 5, 13: 16};
  if (day === practiceDay[id]) {
    const [title, source] = dePractice[id];
    return [title, source.startsWith("https://") ? source : "https://www.youtube.com/watch?v=" + source];
  }
  if (id === 0) {
    const weeks = {2: 0, 3: 1, 4: 2, 5: 2, 6: 2, 8: 0, 9: 3, 10: 6, 13: 3, 23: 4, 24: 5};
    if (Object.hasOwn(weeks, day)) {
      return ["Harvard CS50P · Bài giảng tuần " + weeks[day], "https://cs50.harvard.edu/python/weeks/" + weeks[day] + "/"];
    }
  }
  return null;
}

function renderEngineeringDays(id, day, {esc, st, fileLink}) {
  const [title, group, , description] = engineeringLessons[id];
  const days = getEngineeringDays(id);
  const source = engineeringSources[id];
  const route = "#engineering/course/" + id;
  const dayLink = n => route + "/" + n;
  const key = n => "course-" + id + "-day-" + n;
  const complete = n => Boolean(st.engineering[key(n)]);
  const completed = days.filter((_, index) => complete(index + 1)).length;
  const next = days.findIndex((_, index) => !complete(index + 1)) + 1;
  const external = ([label, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const progress = `<div class="de-progress"><label for="course-progress">${completed}/30 ngày đã học</label><progress id="course-progress" value="${completed}" max="30">${completed}/30</progress></div>`;

  if (Number.isInteger(day) && day >= 1 && day <= days.length) {
    const [topic, task, check] = days[day - 1];
    const example = engineeringExamples[id]?.[day];
    const lessonVideo = engineeringLessonVideo(id, day);
    const videoPath = "data/engineering/videos/" + id + "/" + String(day).padStart(2, "0") + ".mp4";
    const phase = engineeringPhases.findIndex(({last}) => day <= last);
    return `<div class="de-page de-study">
      <nav class="de-crumbs" aria-label="Đường dẫn"><a href="#engineering">Data Engineering</a><a href="${route}">${esc(title)}</a></nav>
      <header class="de-hero"><div class="de-level">Ngày ${day}/30 · ${engineeringPhases[phase].name}</div><h1>${esc(topic)}</h1>${progress}</header>
      <section class="de-card de-lesson-video">
        <h2>Video tóm tắt buổi học</h2>
        <p>27 giây · Tiếng Việt trên màn hình · Không lời</p>
        <video controls playsinline preload="none" aria-label="${esc("Video ngày " + day + ": " + topic)}">
          <source src="${videoPath}" type="video/mp4">
          <a href="${videoPath}">Mở tệp video</a>
        </video>
        ${lessonVideo ? `<p>Bài giảng bổ sung: ${external(lessonVideo)}</p>` : ""}
      </section>
      <div class="de-study-grid">
        <article class="de-card">
          ${example ? `<h2>Kiến thức và ví dụ</h2><p>${esc(example[0])}</p>${example[1] ? `<pre><code>${esc(example[1])}</code></pre>` : ""}` : ""}
          <h2>Bài thực hành</h2><p>${esc(task)}.</p>
          <h2>Điều kiện hoàn thành</h2><p>${esc(check)}.</p>
          <details><summary>Cách tự kiểm tra</summary><ol><li>Ghi lại giả định và nguồn dữ liệu đã dùng.</li><li>Lưu kết quả hoặc log chứng minh tiêu chí trên.</li><li>Thử một trường hợp biên và giải thích kết quả.</li></ol></details>
          <div class="de-actions"><label><input type="checkbox" data-engineering-course-day="${key(day)}" ${complete(day) ? "checked" : ""}> Đánh dấu hoàn thành</label></div>
        </article>
        <aside class="de-card">
          <h2>Tài liệu và video của khóa</h2><ul><li>${external(source.reading[phase])}</li><li>${external(source.video)}</li></ul>
          <h2>Dữ liệu ngân hàng giả lập</h2><div class="de-actions">${engineeringDownloads(fileLink)}</div>
        </aside>
      </div>
      <nav class="de-actions" aria-label="Chuyển ngày">${day > 1 ? `<a href="${dayLink(day - 1)}">Ngày trước</a>` : ""}<a href="${route}">Danh sách 30 ngày</a>${day < 30 ? `<a class="de-primary" href="${dayLink(day + 1)}">Ngày tiếp theo</a>` : ""}</nav>
    </div>`;
  }

  return `<div class="de-page de-study">
    <nav class="de-crumbs" aria-label="Đường dẫn"><a href="#engineering">Data Engineering</a></nav>
    <header class="de-hero"><div class="de-level">${esc(group)} · Lộ trình 30 ngày</div><h1>${esc(title)}</h1><p>${esc(description)}</p>${progress}
      <a class="de-primary" href="${dayLink(next || 1)}">${next === 1 ? "Bắt đầu ngày 1" : next ? "Tiếp tục ngày " + next : "Ôn lại từ ngày 1"}</a>
    </header>
    <section class="de-card de-library"><h2>Tài liệu, video và dữ liệu thực hành</h2><ul>${source.reading.map(resource => `<li>${external(resource)}</li>`).join("")}<li>${external(source.video)}</li></ul>
    <div class="de-actions">${engineeringDownloads(fileLink)}<a href="#engineering/0/${id}">Mở bài lab chuyên đề</a></div></section>
    ${engineeringPhases.map(({first, last, name}) => `<section class="de-phase"><h2>${name}</h2><ol start="${first}">${days.slice(first - 1, last).map(([topic], index) => {
      const n = first + index;
      return `<li><a href="${dayLink(n)}"><span class="de-day-number">Ngày ${n}</span><strong>${esc(topic)}</strong>${complete(n) ? '<span class="de-status">Đã học</span>' : ""}</a></li>`;
    }).join("")}</ol></section>`).join("")}
  </div>`;
}
