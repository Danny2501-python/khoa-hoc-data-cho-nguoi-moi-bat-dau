# Khóa học Data cho người mới bắt đầu

Lộ trình tự học tiếng Việt với Excel, SQL, Python và Power BI. Khóa học có bài đọc, video, quiz và bài thực hành trên dữ liệu mẫu.

[Học trực tuyến](https://datalabstudy.pages.dev/#start) · [Lộ trình 100 ngày](https://datalabstudy.pages.dev/#roadmap) · [Kho Banking AI Mapping](https://datalabstudy.pages.dev/#mapping)

## Chạy trên máy

Từ thư mục repo, chạy:

```sh
python3 -m http.server 8000 --directory dist
```

Mở http://localhost:8000. Bạn có thể tạo bản HTML tải về bằng `python3 scripts/export_offline.py` hoặc mở trực tiếp khóa học qua link trên. Một số lab và video cần Internet.

## Cấu trúc dự án

| Thư mục | Nội dung |
| --- | --- |
| [dist/](dist/) | HTML, CSS và JavaScript của ứng dụng học |
| [curriculum/](curriculum/) | Nội dung nền tảng, danh mục sách, ví dụ và video |
| [dist/data/](dist/data/) | Tệp CSV, SQLite và dữ liệu bài thực hành |
| [scripts/](scripts/) | Tạo học liệu, dữ liệu theo buổi và bản HTML ngoại tuyến |

Ứng dụng chạy trong trình duyệt. Lab SQL dùng SQLite trong Web Worker. Tiến độ lưu trong trình duyệt theo địa chỉ web đang mở.

## Bài thực hành đầu tiên

Mở Kho Banking AI Mapping và chọn nhóm CIF. Chạy truy vấn mẫu, rồi giải thích vì sao số quan hệ tài khoản có thể lớn hơn số CIF duy nhất. Thử đổi điều kiện lọc và kiểm lại kết quả.
