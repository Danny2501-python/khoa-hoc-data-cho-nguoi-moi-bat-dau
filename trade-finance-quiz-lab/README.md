# Trade Finance Quiz Lab

Ứng dụng Google Apps Script để tổ chức bài kiểm tra Trade Finance, chấm điểm và lưu kết quả vào Google Sheets.

| Tệp | Nội dung |
| --- | --- |
| `Code.gs` | Xử lý đề thi, lượt làm bài và kết quả |
| `QuestionBank.gs` | Ngân hàng 213 câu hỏi và đáp án |
| `Index.html` | Giao diện web |

## Triển khai bản sao

1. Tạo dự án Google Apps Script. Thêm đúng ba tệp như bảng trên.
2. Chạy `setupTradeFinanceQuiz()` trong trình chỉnh sửa và cấp quyền Google Sheets. Hàm khởi tạo bảng kết quả, đề mẫu và mã quản trị.
3. Xem `ADMIN_PIN` trong **Project Settings → Script properties** của dự án bạn quản lý.
4. Chọn **Deploy → New deployment → Web app** và chọn quyền truy cập phù hợp với nhóm học.

Mã nguồn công khai có kèm đáp án. Tệp manifest của bản triển khai gốc chưa có trong bản sao này.

[Tài liệu Google về web app](https://developers.google.com/apps-script/guides/web)
