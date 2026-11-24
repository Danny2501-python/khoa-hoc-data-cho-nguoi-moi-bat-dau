COREBANKX • THỰC HÀNH ĐỐI SOÁT THANH TOÁN ĐI

Theo dõi một lệnh chuyển tiền đi từ kênh qua Payment Hub đến sổ chi tiết Core, sổ cái GL, bảng kê quyết toán và số dư EOD. Bộ dữ liệu giả lập có 800 lệnh từ 04–13/05/2026 và bảng kê đến hết 14/05. Mọi số tiền là đồng Việt Nam, thời gian theo giờ Việt Nam (UTC+7). Quy ước riêng của bài: không có phí, lãi, hoàn tiền hay phát sinh Có trên tài khoản nguồn; lệnh từ 17:00 được quyết toán ngày kế tiếp, kể cả cuối tuần. Các trường hợp lệch được cài có chủ đích để luyện đối soát. Mã tài khoản, sơ đồ GL và giờ cắt chỉ dùng cho bài tập.

Làm bài trên SQLite
1. Mở corebankx-payments.db trong DB Browser for SQLite hoặc SQLiteStudio.
2. Mở khung Execute SQL, dán từng truy vấn trong exercises.sql và chạy.
3. Với SQLite CLI, dùng: sqlite3 -header -column corebankx-payments.db < exercises.sql
4. Đối chiếu kết quả với phần đáp án ở cuối truy vấn và mở lại trường nguồn bằng mã order_id.
Yêu cầu SQLite 3.25 trở lên để dùng hàm cửa sổ.

Dùng Excel / Power BI
Nhập từng CSV UTF-8 qua Data > From Text/CSV hoặc Get data > Text/CSV. Giữ các mã ở kiểu Text, số tiền là số nguyên, ngày ở dạng YYYY-MM-DD. Có thể dùng tệp data-dictionary.csv để tra cột.

Quan hệ
customer.cif_id 1–n account.cif_id
account.account_id 1–n payment_order.account_id
payment_order.order_id 1–n hub_attempt.order_id
payment_order.order_id 1–n core_posting.order_id
core_posting.posting_id 1–n gl_line.posting_id
payment_order.order_id nối với settlement_line.order_id theo tham chiếu giao dịch
account.account_id 1–n eod_balance.account_id
Khóa của bảng và định nghĩa từng cột được ghi trong data-dictionary.csv.

Giả định nghiệp vụ
• Ngân hàng khởi tạo chuyển đi, KH bị ghi Nợ. Ví dụ bút toán từ phía ngân hàng: Nợ tiền gửi khách hàng (DEP_CASA), Có khoản phải trả chờ quyết toán (PAY_CLEAR). Bảng gl_line chỉ chứa bút toán khởi tạo. Bảng kê đối tác phản ánh bước kế tiếp; bộ mẫu không mô phỏng bút toán tất toán khoản phải trả.
• Hub có thể thử lại khi TIMEOUT. Kết quả sau cùng lấy theo attempt_no lớn nhất.
• Mỗi lệnh được chấp nhận phải ghi Nợ đúng một lần và được quyết toán đủ số tiền của lệnh.
• Không có lệnh đang xử lý ở cuối cửa sổ quan sát. Những lệnh khởi tạo ngày 13/05 sau cut-off đã được theo dõi đến hết 14/05.
• Số dư EOD là số dư sổ sách, chưa mô phỏng phong tỏa hoặc hạn mức.
• Dữ liệu, lịch, số dư và mã đều giả lập. Tình huống được biên soạn từ các chủ đề CoreBankX gồm Payment Hub, Core, GL, EOD và kiểm tra chuyển đổi; không phải dữ liệu hay quy trình vận hành của một ngân hàng cụ thể.

Số dòng của từng bảng
customer: 120
account: 160
payment_order: 800
hub_attempt: 873
core_posting: 758
gl_line: 1516
settlement_line: 756
eod_balance: 1600
