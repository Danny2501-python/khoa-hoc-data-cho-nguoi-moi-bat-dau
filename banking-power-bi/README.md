# Banking Operations Dashboard

Báo cáo Power BI tiếng Việt từ bộ Banking AI Mapping tổng hợp.

| Trang | Chỉ số và hình trực quan |
| --- | --- |
| Tổng quan vận hành | CIF, giao dịch Core, lệnh thanh toán, khoản vay, xu hướng theo tháng, tiền tệ và kênh |
| Thanh toán & kiểm soát | Trạng thái thanh toán, KYC, khoản vay và đối soát GL |

## Mở báo cáo

Clone repository, rồi mở `Banking.pbip` trong Power BI Desktop trên Windows với hỗ trợ PBIP/PBIR. Giữ thư mục Report và SemanticModel cạnh tệp PBIP. Sau khi mở, chạy Refresh để nạp các bảng tổng hợp nhúng trong mô hình.

Các bảng được tổng hợp theo từng biểu đồ. Trang hiện không dùng bộ lọc chung giữa nhiều bảng. Mã khách hàng, tên, số điện thoại, email, địa chỉ và giao dịch chi tiết không nằm trong các bảng công khai.

## Kiểm tra và tái tạo

`metrics.csv` lưu số kiểm soát. Đối soát GL nhóm theo mã journal và tiền tệ, lấy tổng Nợ trừ tổng Có bằng số thập phân chính xác. Báo cáo đếm giao dịch theo tiền tệ, không cộng số tiền giữa nhiều đồng tiền.

Để tái tạo từ ZIP gốc, chạy `python banking-power-bi/build.py /path/to/banking.zip` từ gốc repository. Script dùng các bảng Silver trong `02_GOLD_ANSWER/target_csv/` và chỉ đưa số liệu tổng hợp vào mô hình. Bản này được kiểm tra qua mã nguồn và số kiểm soát. Việc mở và render trong Power BI Desktop cần được xác nhận trên Windows.

[Tài liệu PBIP/PBIR](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report)
