window.ReportDays = [
 {
  "n": 91,
  "title": "Chuẩn bị SQL Server và 24 hồ sơ mẫu",
  "goal": "Tạo nguồn dữ liệu cho báo cáo hiệu suất chi nhánh.",
  "read": "Mỗi dòng là một hồ sơ. Khóa MaHS giữ nguyên các số 0 đầu. Dữ liệu giả lập có hai tuần tiếp nhận và ba chi nhánh.",
  "steps": [
   "Trong SSMS kết nối một SQL Server thực hành, chọn cơ sở dữ liệu riêng đã có quyền tạo bảng. Tải script DataLab ở dưới.",
   "Chạy toàn bộ script một lần. Script tạo bảng dbo.DataLabHoSo và nạp bộ mẫu khi bảng chưa tồn tại.",
   "Chạy truy vấn kiểm. Nếu số dòng khác số mã, kiểm tra khóa trước khi tạo báo cáo."
  ],
  "code": "SELECT COUNT(*) AS SoDong, COUNT(DISTINCT MaHS) AS SoMa\nFROM dbo.DataLabHoSo;",
  "output": "Bảng nguồn có 24 dòng và 24 mã.",
  "q": "Có bao nhiêu mã hồ sơ duy nhất?",
  "answers": [
   "24"
  ],
  "why": "Bảng nguồn có 24 dòng và 24 mã.",
  "quizTheme": 62,
  "clip": 1,
  "book": "sql",
  "pages": "63"
 },
 {
  "n": 92,
  "title": "Kết nối Power BI Desktop tới SQL Server",
  "goal": "Nạp bảng nguồn bằng chế độ Import.",
  "read": "Import lưu bản dữ liệu trong mô hình. Sau khi nguồn đổi, dùng Refresh để đọc lại. Với SQL Server, cần nhập đúng tên máy chủ và instance của môi trường thực hành.",
  "steps": [
   "Trong Power BI Desktop trên Windows, chọn Get data → SQL Server. Điền đúng Server và Database như trong SSMS, chọn Import.",
   "Đăng nhập bằng phương thức được quản trị viên cấp. Trong Navigator chọn dbo.DataLabHoSo → Transform Data.",
   "Đổi tên truy vấn thành HoSo. Kiểm tra MaHS là Text, NgayNhan là Date và hai trường phút là Whole Number. Close & Apply, lưu tệp BaoCaoVanHanh.pbix."
  ],
  "code": "SELECT DB_NAME() AS TenDatabase, @@SERVERNAME AS TenServer;",
  "output": "Tệp PBIX kết nối đúng bảng với 24 hồ sơ.",
  "q": "Sau lần Import đầu, bảng HoSo phải có bao nhiêu dòng?",
  "answers": [
   "24"
  ],
  "why": "Tệp PBIX kết nối đúng bảng với 24 hồ sơ.",
  "quizTheme": 62,
  "clip": 2,
  "book": "sql",
  "pages": "63"
 },
 {
  "n": 93,
  "title": "Viết query kiểm tra chất lượng nguồn",
  "goal": "Phát hiện dòng đóng thiếu thời gian hoặc sai đơn vị.",
  "read": "Hồ sơ đang xử lý có thể chưa có số phút hoàn tất. Nếu điền 0 vào ô trống, trung bình có thể giảm sai.",
  "steps": [
   "Trong SSMS chạy query bên dưới. Ghi số dòng lỗi.",
   "Đổi điều kiện WHERE thành XuLyPhut IS NULL, kiểm tra trạng thái của bốn dòng trả về.",
   "Trong Power Query giữ nguyên null. Đối chiếu kiểu dữ liệu và số dòng với SQL trước khi tiếp tục."
  ],
  "code": "SELECT MaHS, TrangThai, XuLyPhut, SLAPhut\nFROM dbo.DataLabHoSo\nWHERE SLAPhut <= 0 OR XuLyPhut < 0\n   OR (TrangThai = N'Đã đóng' AND XuLyPhut IS NULL);",
  "output": "Bảng lỗi rỗng và 4 hồ sơ mở có thời gian trống.",
  "q": "Có bao nhiêu hồ sơ đóng thiếu thời gian?",
  "answers": [
   "0"
  ],
  "why": "Bảng lỗi rỗng và 4 hồ sơ mở có thời gian trống.",
  "quizTheme": 63,
  "clip": 3,
  "book": "sql",
  "pages": "63"
 },
 {
  "n": 94,
  "title": "Query tính SLA theo tuần và chi nhánh",
  "goal": "Tạo bảng đối chứng cho biểu đồ và thẻ KPI.",
  "read": "Cùng một điều kiện phải được áp ở SQL và DAX. Hồ sơ vừa chạm ngưỡng vẫn đạt. Tỷ lệ toàn hàng dùng tổng tử chia tổng mẫu.",
  "steps": [
   "Chạy query theo tuần và chi nhánh. Lưu kết quả làm số đối chứng.",
   "Bỏ ChiNhanh khỏi SELECT và GROUP BY để tính theo tuần. Tuần 1 đạt 8/10, tuần 2 đạt 6/10.",
   "Bỏ cả hai chiều nhóm để kiểm tra toàn kỳ. Giữ bảng HoSo ở cấp chi tiết trong PBIX."
  ],
  "code": "WITH F AS (\n SELECT *, CASE WHEN TrangThai=N'Đã đóng' THEN 1 ELSE 0 END AS Dong,\n CASE WHEN TrangThai=N'Đã đóng' AND XuLyPhut<=SLAPhut THEN 1 ELSE 0 END AS Dat\n FROM dbo.DataLabHoSo\n)\nSELECT Tuan, ChiNhanh, SUM(Dat) AS Dat, SUM(Dong) AS Dong,\n 100.0*SUM(Dat)/NULLIF(SUM(Dong),0) AS TyLePct\nFROM F GROUP BY Tuan, ChiNhanh ORDER BY Tuan, ChiNhanh;",
  "output": "Bảng 6 nhóm và kết quả toàn kỳ 14/20.",
  "q": "Có bao nhiêu nhóm tuần–chi nhánh?",
  "answers": [
   "6"
  ],
  "why": "Bảng 6 nhóm và kết quả toàn kỳ 14/20.",
  "quizTheme": 83,
  "clip": 4,
  "book": "sql",
  "pages": "63"
 },
 {
  "n": 95,
  "title": "Dựng mô hình dữ liệu hình sao",
  "goal": "Tạo bảng chiều để lọc mà không nhân bản hồ sơ.",
  "read": "Bảng HoSo lưu sự kiện, DimCN lưu từng tên chi nhánh đúng một lần. Lọc một chiều từ bảng danh mục xuống bảng sự kiện.",
  "steps": [
   "Trong Modeling → New table, tạo DimCN và DimNgay bằng hai biểu thức dưới, mỗi lần nhập một biểu thức.",
   "Trong Model view tạo quan hệ 1:* DimCN[ChiNhanh] → HoSo[ChiNhanh] và DimNgay[Date] → HoSo[NgayNhan]. Chọn Single, Active.",
   "Tạo slicer từ DimCN. Chọn Hà Nội và kiểm bảng chi tiết còn 8 mã."
  ],
  "code": "DimCN = DISTINCT(HoSo[ChiNhanh])\n\nDimNgay = CALENDAR(MIN(HoSo[NgayNhan]), MAX(HoSo[NgayNhan]))",
  "output": "Mô hình một bảng sự kiện, hai bảng chiều.",
  "q": "DimCN có bao nhiêu dòng?",
  "answers": [
   "3"
  ],
  "why": "Mô hình một bảng sự kiện, hai bảng chiều.",
  "quizTheme": 64,
  "clip": 5,
  "book": "powerbi",
  "pages": "22"
 },
 {
  "n": 96,
  "title": "Viết measure DAX cho thẻ KPI",
  "goal": "Tạo bốn measure tái sử dụng trong mọi biểu đồ.",
  "read": "Measure tính lại theo slicer và trục biểu đồ. DIVIDE trả về trống khi mẫu số bằng 0. ISBLANK bảo vệ phép so sánh thời gian thiếu.",
  "steps": [
   "Chọn HoSo → New measure, nhập lần lượt từng biểu thức.",
   "Định dạng TyLeDat là Percentage. Thêm ba Card cho TiepNhan, DaDong và TyLeDat.",
   "Xóa bộ lọc. Kiểm ba thẻ lần lượt 24, 20, 70%. Lọc theo tuần và so lại query Ngày 94."
  ],
  "code": "TiepNhan = COUNTROWS(HoSo)\n\nDaDong = CALCULATE([TiepNhan], HoSo[TrangThai] = \"Đã đóng\")\n\nDatHan = COUNTROWS(FILTER(HoSo, HoSo[TrangThai] = \"Đã đóng\" && NOT ISBLANK(HoSo[XuLyPhut]) && HoSo[XuLyPhut] <= HoSo[SLAPhut]))\n\nTyLeDat = DIVIDE([DatHan], [DaDong])",
  "output": "Bộ bốn measure và ba thẻ đã đối chiếu.",
  "q": "Toàn kỳ có bao nhiêu hồ sơ đạt?",
  "answers": [
   "14"
  ],
  "why": "Bộ bốn measure và ba thẻ đã đối chiếu.",
  "quizTheme": 66,
  "clip": 6,
  "book": "powerbi",
  "pages": "22"
 },
 {
  "n": 97,
  "title": "Đo biến động bằng DAX",
  "goal": "Giải thích mức giảm giữa hai tuần theo điểm phần trăm.",
  "read": "Chênh lệch tuyệt đối của 60% và 80% là −20 điểm phần trăm. Nếu so tương đối, mức giảm là 25%.",
  "steps": [
   "Tạo hai measure dưới. Trong Matrix đặt Rows = HoSo[Tuan], Values = TyLeDat, TyLeTuanTruoc, ChenhDiem.",
   "Định dạng TyLeTuanTruoc là Percentage, ChenhDiem là Decimal Number. Dùng trục tuần số 1 và 2 của bộ mẫu.",
   "Tuần đầu phải trống ở cột so sánh. Lọc Cần Thơ và kiểm phép tính vẫn chỉ dùng dữ liệu chi nhánh đó."
  ],
  "code": "TyLeTuanTruoc = VAR W = SELECTEDVALUE(HoSo[Tuan]) RETURN IF(NOT ISBLANK(W), CALCULATE([TyLeDat], FILTER(ALL(HoSo[Tuan]), HoSo[Tuan] = W - 1)))\n\nChenhDiem = IF(NOT ISBLANK([TyLeTuanTruoc]), 100 * ([TyLeDat] - [TyLeTuanTruoc]))",
  "output": "Ma trận có mức thay đổi tuần 2 bằng −20 điểm.",
  "q": "Tuần 2 giảm bao nhiêu điểm phần trăm?",
  "answers": [
   "20"
  ],
  "why": "Ma trận có mức thay đổi tuần 2 bằng −20 điểm.",
  "quizTheme": 67,
  "clip": 8,
  "book": "powerbi",
  "pages": "22"
 },
 {
  "n": 98,
  "title": "Dựng trang tổng quan với ba biểu đồ",
  "goal": "Giúp trưởng ca thấy khối lượng, xu hướng và nơi phát sinh trễ.",
  "read": "Thẻ KPI trả lời tình hình chung. Đường cho thấy thay đổi theo tuần. Thanh ngang giúp so sánh đơn vị trên cùng thang đo.",
  "steps": [
   "Đặt ba Card của Ngày 96 trên đầu trang Tổng quan, thêm slicer DimCN[ChiNhanh].",
   "Tạo Line chart: X = HoSo[Tuan], Y = TyLeDat. Tạo Bar chart: Y = DimCN[ChiNhanh], X = TreHan. Tạo Stacked column: X = HoSo[NghiepVu], Y = TiepNhan, Legend = HoSo[TrangThai].",
   "Đặt tên biểu đồ có đơn vị. Chọn Hà Nội: tổng 8 hồ sơ, 4 trễ. Xóa lọc và xác nhận số trễ trở về 6."
  ],
  "code": "TreHan = COUNTROWS(FILTER(HoSo, HoSo[TrangThai] = \"Đã đóng\" && NOT ISBLANK(HoSo[XuLyPhut]) && HoSo[XuLyPhut] > HoSo[SLAPhut]))",
  "output": "Một trang tổng quan có ba KPI, ba biểu đồ và slicer.",
  "q": "Tổng số hồ sơ trễ trên biểu đồ thanh là bao nhiêu?",
  "answers": [
   "6"
  ],
  "why": "Một trang tổng quan có ba KPI, ba biểu đồ và slicer.",
  "quizTheme": 68,
  "clip": 10,
  "book": "powerbi",
  "pages": "22"
 },
 {
  "n": 99,
  "title": "Trang chi tiết và drillthrough",
  "goal": "Truy từ một cột chi nhánh về danh sách mã trễ.",
  "read": "Drillthrough truyền ngữ cảnh chi nhánh từ trang tổng quan. Bộ lọc trang chi tiết giữ đúng các ngoại lệ người quản lý cần xử lý.",
  "steps": [
   "Tạo New column CoTre theo công thức dưới. Tạo trang Chi tiết, thêm DimCN[ChiNhanh] vào Drill-through filters.",
   "Tạo Table gồm MaHS, NgayNhan, ChiNhanh, XuLyPhut, SLAPhut, LyDoTre. Đặt bộ lọc trang CoTre = 1, thêm nút Back.",
   "Trên biểu đồ thanh bấm phải Hà Nội → Drillthrough → Chi tiết. Kiểm bốn mã HS003, HS013, HS016, HS021."
  ],
  "code": "CoTre = IF(HoSo[TrangThai] = \"Đã đóng\" && NOT ISBLANK(HoSo[XuLyPhut]) && HoSo[XuLyPhut] > HoSo[SLAPhut], 1, 0)",
  "output": "Trang chi tiết lọc đúng chi nhánh và truy ngược về tổng quan.",
  "q": "Drillthrough Hà Nội trả về bao nhiêu hồ sơ trễ?",
  "answers": [
   "4"
  ],
  "why": "Trang chi tiết lọc đúng chi nhánh và truy ngược về tổng quan.",
  "quizTheme": 69,
  "clip": 11,
  "book": "powerbi",
  "pages": "22"
 },
 {
  "n": 100,
  "title": "Nghiệm thu và bàn giao báo cáo",
  "goal": "Bàn giao PBIX hai trang cùng số đối chứng tái lập được.",
  "read": "Một báo cáo hoàn chỉnh cần người nhận truy về mã nguồn được, hiểu điều kiện KPI và biết khi nào dữ liệu được làm mới.",
  "steps": [
   "Refresh PBIX. Xóa lọc, đối chiếu tổng 24 tiếp nhận, 20 đóng, 14 đạt, 6 trễ với SQL. Kiểm lần nữa theo tuần và chi nhánh.",
   "Thử drillthrough từ Hà Nội. Chạy query dưới để kiểm danh sách và số phút vượt hạn. HS013 vượt 35 phút.",
   "Lưu PBIX, script SQL và ghi chú bàn giao gồm tên server/database, định nghĩa KPI, thời điểm refresh và kết quả thử. Nếu xuất bản lên Service và nguồn nằm nội bộ, cấu hình gateway và thông tin kết nối phù hợp trước khi đặt lịch refresh."
  ],
  "code": "SELECT MaHS, ChiNhanh, XuLyPhut-SLAPhut AS PhutTre, LyDoTre\nFROM dbo.DataLabHoSo\nWHERE TrangThai=N'Đã đóng' AND XuLyPhut>SLAPhut\nORDER BY PhutTre DESC, MaHS;",
  "output": "PBIX hai trang, script SQL và biên bản kiểm tổng–chi tiết.",
  "q": "Hồ sơ HS013 vượt hạn bao nhiêu phút?",
  "answers": [
   "35"
  ],
  "why": "PBIX hai trang, script SQL và biên bản kiểm tổng–chi tiết.",
  "quizTheme": 70,
  "clip": 13,
  "book": "powerbi",
  "pages": "22"
 }
];
PROGRAM.days.push(...ReportDays);
