const advancedTrack = [
  [
    "I",
    "1",
    "Cấp độ dữ liệu và JOIN",
    "Một dòng là một hồ sơ hay một lần xử lý? Đếm khóa trước và sau JOIN để phân biệt nhân dòng với tăng thực tế.",
    "Kiểm tra khóa MaHS rồi tổng hợp số hồ sơ theo chi nhánh. Nêu cách xử lý khi bảng lịch sử có nhiều dòng cho một mã.",
    "Sau JOIN số dòng tăng gấp đôi nhưng số mã giữ nguyên, bạn kiểm gì?",
    "Đếm số bản ghi theo khóa ở cả hai bảng và kiểm tra cấp độ. Nếu cần trạng thái cuối, chọn một dòng theo thứ tự thời gian và khóa phân xử trước khi nối.",
    "https://www.postgresql.org/docs/current/tutorial-join.html"
  ],
  [
    "I",
    "2",
    "CTE và KPI SLA",
    "Tách tử số và mẫu số trước khi tính tỷ lệ. Hồ sơ mở không thuộc mẫu số hồ sơ đóng.",
    "Viết CTE gắn cờ Đã đóng và Đạt hạn. Tính tỷ lệ toàn kỳ và đối chiếu theo chi nhánh.",
    "Tại sao không lấy trung bình các tỷ lệ chi nhánh?",
    "Mẫu số mỗi chi nhánh có thể khác nhau. Dùng tổng số đạt chia tổng số hồ sơ đóng và báo rõ phạm vi.",
    "https://leetcode.com/studyplan/top-sql-50/"
  ],
  [
    "I",
    "3",
    "Window functions và bảng xếp hạng",
    "Hàm cửa sổ giữ từng dòng. PARTITION BY chia nhóm, ORDER BY quyết định thứ tự.",
    "Tìm hai hồ sơ xử lý lâu nhất mỗi chi nhánh. Dùng MaHS làm khóa phân xử khi thời gian bằng nhau.",
    "ROW_NUMBER khác DENSE_RANK như thế nào khi đồng hạng?",
    "ROW_NUMBER cấp số thứ tự riêng từng dòng. DENSE_RANK cho các dòng đồng hạng cùng một số và không bỏ hạng kế tiếp.",
    "https://www.postgresql.org/docs/current/tutorial-window.html"
  ],
  [
    "I",
    "4",
    "Đối soát dữ liệu và NULL",
    "Ghép với bảng danh mục phải kiểm tra tính duy nhất của khóa. Trong pandas, hai khóa thiếu có thể khớp nhau.",
    "Đọc ba tệp mẫu. Dùng merge với indicator=True và validate phù hợp; tách phần chỉ có một bên để kiểm tổng tiền.",
    "Chọn validate nào khi nhiều giao dịch thuộc một mã danh mục?",
    "many_to_one. Nếu khóa danh mục trùng, sửa hoặc cách ly dữ liệu nguồn theo nghiệp vụ trước khi tính tổng.",
    "https://pandas.pydata.org/docs/user_guide/merging.html"
  ],
  [
    "I",
    "5",
    "Mô hình sao và ngữ cảnh DAX",
    "Bảng chiều dùng để lọc và nhóm, bảng sự kiện lưu quan sát. Measure được tính lại theo ngữ cảnh của ô đang xem.",
    "Dùng DimCN nối 1:* tới HoSo. Tạo measure tỷ lệ đạt rồi kiểm ba mức: toàn bộ, chi nhánh và tuần.",
    "Một measure đúng theo từng dòng nhưng tổng bị nghi sai, bạn kiểm gì?",
    "Kiểm ngữ cảnh ở dòng tổng. Với tỷ lệ, tính lại tử và mẫu trên toàn tập đang lọc, thay vì cộng hoặc lấy trung bình kết quả hiển thị.",
    "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"
  ],
  [
    "I",
    "6",
    "Case Intermediate: báo cáo SLA",
    "Một báo cáo vận hành cần số đối chứng và đường dẫn từ chỉ số về từng hồ sơ.",
    "Nhập CSV vào Power BI và tạo 3 KPI, 1 xu hướng tuần, 1 bảng theo chi nhánh. Ghi kết quả kỳ vọng rồi đổi bộ lọc và so với query SQL.",
    "Bạn bảo vệ KPI SLA trước quản lý như thế nào?",
    "Nêu số hồ sơ đạt, số hồ sơ đã đóng, kỳ tính, tiêu chí đạt và số hồ sơ đang mở. Chỉ ra cách truy lại từng dòng.",
    "https://datalemur.com/questions"
  ],
  [
    "A",
    "1",
    "SQL nâng cao: latest record và chuỗi thời gian",
    "Thứ tự phải xác định khi timestamp trùng. Phân biệt ngày nghiệp vụ với thời điểm hệ thống nhận dữ liệu.",
    "Thiết kế bảng lịch sử và viết truy vấn giữ bản mới nhất theo MaHS. Thử ca đồng timestamp và bản đến muộn.",
    "Làm sao loại trùng mà vẫn tái chạy ra cùng kết quả?",
    "Xếp theo timestamp, sau đó dùng mã sự kiện duy nhất để phân xử. Lưu chính sách xử lý bản đến muộn và chạy lại ca kiểm biên.",
    "https://www.postgresql.org/docs/current/tutorial-window.html"
  ],
  [
    "A",
    "2",
    "Mô hình nhiều fact và tổng không cộng được",
    "Fact hồ sơ và fact giao dịch có cấp độ khác nhau. Nối trực tiếp hai fact qua chi nhánh thường làm nhân số dòng.",
    "Thiết kế hai fact dùng chung chiều ngày và chi nhánh. So tổng tiền và số hồ sơ trước và sau lọc; mô tả trường hợp KPI cuối ngày.",
    "Vì sao không cộng số dư cuối ngày để ra số dư tháng?",
    "Số dư là chỉ số tại thời điểm. Chọn kỳ chốt và bản hợp lệ cuối kỳ; cộng qua đối tượng tại cùng thời điểm nếu cùng đơn vị.",
    "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"
  ],
  [
    "A",
    "3",
    "DAX nâng cao: so tuần trước và kiểm bộ lọc",
    "Khi đổi bộ lọc thời gian cần giữ chi nhánh và nghiệp vụ. Tổng nhiều kỳ có thể không xác định được một kỳ so sánh.",
    "Tạo measure kỳ trước và chênh điểm phần trăm, kiểm thiếu kỳ trước, nhiều tuần được chọn và mẫu số bằng 0.",
    "Slicer chi nhánh phải tác động ra sao khi tính tuần trước?",
    "Giữ bộ lọc chiều chi nhánh và chỉ thay phạm vi ngày sang kỳ trước. Chọn quy tắc rõ ràng cho tổng nhiều kỳ.",
    "https://learn.microsoft.com/en-us/dax/dax-overview"
  ],
  [
    "A",
    "4",
    "Chẩn đoán báo cáo chậm",
    "Đo thời gian theo từng visual và điều kiện lọc. Một thay đổi chỉ có ý nghĩa nếu số liệu vẫn đúng.",
    "Đo cùng một trang trước và sau khi bỏ cột dư hoặc giảm số visual. Ghi số lần thử, thời gian và kết quả SQL đối chiếu.",
    "Performance Analyzer cho thấy DAX query chậm, kiểm gì tiếp?",
    "Xem quan hệ, cardinality, phép lặp qua fact và bộ lọc visual. Đổi từng yếu tố rồi đo lại với cùng ngữ cảnh.",
    "https://learn.microsoft.com/en-us/power-bi/desktop-performance-analyzer"
  ],
  [
    "A",
    "5",
    "Incremental refresh và kiểm soát dữ liệu đến muộn",
    "Cửa sổ refresh phải bao phủ khoảng dữ liệu có thể được sửa. Phân chia khoảng ngày theo quy tắc không chồng lấn.",
    "Thiết kế RangeStart và RangeEnd cho dữ liệu mẫu. Lập kịch bản sửa dòng cũ, nạp lại cùng batch và thiếu một kỳ.",
    "Nếu bản sửa đến ngoài cửa sổ refresh, bạn xử lý thế nào?",
    "Xác định phân vùng bị ảnh hưởng và lên phương án refresh lại phạm vi đó. Đối soát số dòng, khóa và chỉ số trước khi công bố.",
    "https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-configure"
  ],
  [
    "A",
    "6",
    "Case Advanced: nghiệm thu dashboard đa chi nhánh",
    "Nghiệm thu cần kiểm tổng–chi tiết, phân quyền, refresh và hiệu năng với cùng định nghĩa nghiệp vụ.",
    "Làm mock interview 30 phút. Trình bày sơ đồ nguồn, query, model, measure, phân quyền, test với hai chi nhánh và ghi chú rollback.",
    "Báo cáo đúng ở tài khoản quản trị nhưng một chi nhánh nhìn thấy dữ liệu ngoài phạm vi, bạn làm gì?",
    "Khoanh phạm vi chia sẻ, kiểm ánh xạ người dùng và đường truyền bộ lọc. Kiểm bằng vai trò đại diện trước khi mở lại báo cáo.",
    "https://datalemur.com/questions"
  ]
];
advancedTrack.push(...[
 [
  "I",
  "7",
  "Khảo sát dữ liệu chiến dịch giả lập",
  "Đếm tổng dòng, số đăng ký y=yes và phân bố theo kênh.",
  "Đếm tổng dòng, số đăng ký y=yes và phân bố theo kênh. Ghi rõ một dòng là quan sát chiến dịch, chưa đủ khóa để đếm khách hàng duy nhất.",
  "Bạn kiểm tra kết quả bài “Khảo sát dữ liệu chiến dịch giả lập” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đếm tổng dòng, số đăng ký y=yes và phân bố theo kênh. Ghi rõ một dòng là quan sát chiến dịch, chưa đủ khóa để đếm khách hàng duy nhất. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "8",
  "Định kiểu CSV và giá trị unknown",
  "Nhập tệp phân cách bằng dấu chấm phẩy.",
  "Nhập tệp phân cách bằng dấu chấm phẩy. Giữ unknown riêng, đo tỷ trọng theo nghề nghiệp và kiểm mẫu số.",
  "Bạn kiểm tra kết quả bài “Định kiểu CSV và giá trị unknown” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Nhập tệp phân cách bằng dấu chấm phẩy. Giữ unknown riêng, đo tỷ trọng theo nghề nghiệp và kiểm mẫu số. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "crlt8LNbc6E"
 ],
 [
  "I",
  "9",
  "Tỷ lệ chuyển đổi theo kênh",
  "Nhóm theo contact, tính số dòng, số yes và tỷ lệ.",
  "Nhóm theo contact, tính số dòng, số yes và tỷ lệ. So sánh với trung bình tỷ lệ của từng tháng.",
  "Bạn kiểm tra kết quả bài “Tỷ lệ chuyển đổi theo kênh” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Nhóm theo contact, tính số dòng, số yes và tỷ lệ. So sánh với trung bình tỷ lệ của từng tháng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "10",
  "Nhóm tháng và sắp xếp thời gian",
  "Tạo cột thứ tự 1–12 cho month.",
  "Tạo cột thứ tự 1–12 cho month. Dựng biểu đồ đường và giải thích giới hạn khi tệp chỉ có tên tháng.",
  "Bạn kiểm tra kết quả bài “Nhóm tháng và sắp xếp thời gian” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo cột thứ tự 1–12 cho month. Dựng biểu đồ đường và giải thích giới hạn khi tệp chỉ có tên tháng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "11",
  "Xếp hạng phân khúc",
  "Xếp hạng nghề theo tỷ lệ chuyển đổi trong mỗi kênh.",
  "Xếp hạng nghề theo tỷ lệ chuyển đổi trong mỗi kênh. Chỉ xét nhóm tối thiểu 100 quan sát và kiểm trường hợp đồng hạng.",
  "Bạn kiểm tra kết quả bài “Xếp hạng phân khúc” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Xếp hạng nghề theo tỷ lệ chuyển đổi trong mỗi kênh. Chỉ xét nhóm tối thiểu 100 quan sát và kiểm trường hợp đồng hạng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "12",
  "Lọc bằng EXISTS và NOT EXISTS",
  "Dùng sổ nội bộ và sao kê để tìm mã chỉ xuất hiện một bên.",
  "Dùng sổ nội bộ và sao kê để tìm mã chỉ xuất hiện một bên. Kiểm sự khác nhau giữa đếm mã và đếm dòng.",
  "Bạn kiểm tra kết quả bài “Lọc bằng EXISTS và NOT EXISTS” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dùng sổ nội bộ và sao kê để tìm mã chỉ xuất hiện một bên. Kiểm sự khác nhau giữa đếm mã và đếm dòng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "13",
  "UNION ALL và kiểm nguồn",
  "Gắn nhãn nguồn cho hai sổ rồi chồng dòng.",
  "Gắn nhãn nguồn cho hai sổ rồi chồng dòng. Tính tổng riêng từng nguồn và xác định các mã có mặt ở cả hai.",
  "Bạn kiểm tra kết quả bài “UNION ALL và kiểm nguồn” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Gắn nhãn nguồn cho hai sổ rồi chồng dòng. Tính tổng riêng từng nguồn và xác định các mã có mặt ở cả hai. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "14",
  "Đối soát 3.000 giao dịch",
  "Đối chiếu theo MaGD.",
  "Đối chiếu theo MaGD. Gắn nhãn khớp, lệch tiền, thiếu sao kê và chỉ có sao kê. Kiểm tổng số mã ngoại lệ.",
  "Bạn kiểm tra kết quả bài “Đối soát 3.000 giao dịch” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đối chiếu theo MaGD. Gắn nhãn khớp, lệch tiền, thiếu sao kê và chỉ có sao kê. Kiểm tổng số mã ngoại lệ. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "15",
  "Truy vấn top N và phân xử",
  "Chọn ba giao dịch có giá trị cao nhất từng chi nhánh.",
  "Chọn ba giao dịch có giá trị cao nhất từng chi nhánh. Thêm MaGD vào ORDER BY để kết quả ổn định.",
  "Bạn kiểm tra kết quả bài “Truy vấn top N và phân xử” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Chọn ba giao dịch có giá trị cao nhất từng chi nhánh. Thêm MaGD vào ORDER BY để kết quả ổn định. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "16",
  "Running total và khung cửa sổ",
  "Tính lũy kế giá trị theo chi nhánh trên dữ liệu giao dịch.",
  "Tính lũy kế giá trị theo chi nhánh trên dữ liệu giao dịch. So kết quả ROWS với nhóm đồng ngày.",
  "Bạn kiểm tra kết quả bài “Running total và khung cửa sổ” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tính lũy kế giá trị theo chi nhánh trên dữ liệu giao dịch. So kết quả ROWS với nhóm đồng ngày. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "17",
  "So sánh kỳ bằng LAG",
  "Tổng hợp giá trị theo ngày rồi dùng LAG so phiên liền trước.",
  "Tổng hợp giá trị theo ngày rồi dùng LAG so phiên liền trước. Bổ sung các ngày không phát sinh để kiểm khoảng trống.",
  "Bạn kiểm tra kết quả bài “So sánh kỳ bằng LAG” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tổng hợp giá trị theo ngày rồi dùng LAG so phiên liền trước. Bổ sung các ngày không phát sinh để kiểm khoảng trống. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "18",
  "Phân tầng giá trị giao dịch",
  "Dùng CASE tạo ba ngưỡng giá trị.",
  "Dùng CASE tạo ba ngưỡng giá trị. Đối chiếu dòng đúng bằng ngưỡng và tổng của ba nhóm.",
  "Bạn kiểm tra kết quả bài “Phân tầng giá trị giao dịch” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dùng CASE tạo ba ngưỡng giá trị. Đối chiếu dòng đúng bằng ngưỡng và tổng của ba nhóm. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "19",
  "Bảng ngày và lịch nghiệp vụ",
  "Tạo bảng ngày liên tục.",
  "Tạo bảng ngày liên tục. So số ngày có giao dịch với số ngày làm việc theo quy ước của bài.",
  "Bạn kiểm tra kết quả bài “Bảng ngày và lịch nghiệp vụ” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo bảng ngày liên tục. So số ngày có giao dịch với số ngày làm việc theo quy ước của bài. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "I",
  "20",
  "Power Query và nạp dữ liệu",
  "Nạp CSV chiến dịch giả lập của buổi này, đổi kiểu, kiểm số dòng trước và sau.",
  "Nạp CSV chiến dịch giả lập của buổi này, đổi kiểu, kiểm số dòng trước và sau. Lưu ba bước biến đổi để chạy lại.",
  "Bạn kiểm tra kết quả bài “Power Query và nạp dữ liệu” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Nạp CSV chiến dịch giả lập của buổi này, đổi kiểu, kiểm số dòng trước và sau. Lưu ba bước biến đổi để chạy lại. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "crlt8LNbc6E"
 ],
 [
  "I",
  "21",
  "Đo chất lượng với pandas",
  "Đếm null, unknown và khóa trùng.",
  "Đếm null, unknown và khóa trùng. Tạo bảng số kiểm trước và sau khi chuẩn hóa các trường.",
  "Bạn kiểm tra kết quả bài “Đo chất lượng với pandas” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đếm null, unknown và khóa trùng. Tạo bảng số kiểm trước và sau khi chuẩn hóa các trường. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "crlt8LNbc6E"
 ],
 [
  "I",
  "22",
  "Hợp nhất dữ liệu theo khóa",
  "Tạo danh mục chi nhánh và merge many-to-one.",
  "Tạo danh mục chi nhánh và merge many-to-one. Cố tình thêm một khóa trùng trong danh mục để thử kiểm soát.",
  "Bạn kiểm tra kết quả bài “Hợp nhất dữ liệu theo khóa” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo danh mục chi nhánh và merge many-to-one. Cố tình thêm một khóa trùng trong danh mục để thử kiểm soát. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "I",
  "23",
  "Measure và calculated column",
  "So cờ Đạt hạn ở từng dòng với measure tỷ lệ.",
  "So cờ Đạt hạn ở từng dòng với measure tỷ lệ. Lọc tuần 1 và giải thích đại lượng nào tính lại.",
  "Bạn kiểm tra kết quả bài “Measure và calculated column” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. So cờ Đạt hạn ở từng dòng với measure tỷ lệ. Lọc tuần 1 và giải thích đại lượng nào tính lại. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "I",
  "24",
  "KPI có mẫu số bằng không",
  "Tạo slicer cho một nhóm không có hồ sơ đóng.",
  "Tạo slicer cho một nhóm không có hồ sơ đóng. Hiển thị trạng thái thiếu mẫu số và kiểm tổng không bị biến thành 0%.",
  "Bạn kiểm tra kết quả bài “KPI có mẫu số bằng không” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo slicer cho một nhóm không có hồ sơ đóng. Hiển thị trạng thái thiếu mẫu số và kiểm tổng không bị biến thành 0%. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "I",
  "25",
  "Dashboard KPI chiến dịch",
  "Dựng báo cáo gồm lượt quan sát, đăng ký, tỷ lệ đăng ký và biểu đồ theo kênh.",
  "Dựng báo cáo gồm lượt quan sát, đăng ký, tỷ lệ đăng ký và biểu đồ theo kênh. Chú thích phạm vi quan sát.",
  "Bạn kiểm tra kết quả bài “Dashboard KPI chiến dịch” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dựng báo cáo gồm lượt quan sát, đăng ký, tỷ lệ đăng ký và biểu đồ theo kênh. Chú thích phạm vi quan sát. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "HlXPiP0YioU"
 ],
 [
  "I",
  "26",
  "Drillthrough theo chi nhánh",
  "Tạo bảng chi tiết cho danh sách lệch tiền.",
  "Tạo bảng chi tiết cho danh sách lệch tiền. Chọn một chi nhánh và đối chiếu tổng tiền với câu SQL.",
  "Bạn kiểm tra kết quả bài “Drillthrough theo chi nhánh” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo bảng chi tiết cho danh sách lệch tiền. Chọn một chi nhánh và đối chiếu tổng tiền với câu SQL. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "HlXPiP0YioU"
 ],
 [
  "I",
  "27",
  "Tỷ trọng và Pareto",
  "Tính tỷ trọng giá trị theo loại nghiệp vụ rồi xếp giảm dần.",
  "Tính tỷ trọng giá trị theo loại nghiệp vụ rồi xếp giảm dần. Kiểm nếu hai nhóm có cùng tổng.",
  "Bạn kiểm tra kết quả bài “Tỷ trọng và Pareto” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tính tỷ trọng giá trị theo loại nghiệp vụ rồi xếp giảm dần. Kiểm nếu hai nhóm có cùng tổng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "HlXPiP0YioU"
 ],
 [
  "I",
  "28",
  "Đọc đề SQL phỏng vấn",
  "Chọn một bài SQL 50 về GROUP BY.",
  "Chọn một bài SQL 50 về GROUP BY. Viết hai ví dụ nhỏ gồm NULL và nhóm rỗng trước khi làm.",
  "Bạn kiểm tra kết quả bài “Đọc đề SQL phỏng vấn” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Chọn một bài SQL 50 về GROUP BY. Viết hai ví dụ nhỏ gồm NULL và nhóm rỗng trước khi làm. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "29",
  "Phỏng vấn theo tình huống",
  "Giải thích một KPI sai sau JOIN với ví dụ ba dòng.",
  "Giải thích một KPI sai sau JOIN với ví dụ ba dòng. Nêu SQL kiểm tra, nguyên nhân và cách sửa.",
  "Bạn kiểm tra kết quả bài “Phỏng vấn theo tình huống” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Giải thích một KPI sai sau JOIN với ví dụ ba dòng. Nêu SQL kiểm tra, nguyên nhân và cách sửa. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "dkzaWBxB0vA"
 ],
 [
  "I",
  "30",
  "Dự án Intermediate",
  "Nộp query, bảng đối soát và dashboard hai trang.",
  "Nộp query, bảng đối soát và dashboard hai trang. Ghi định nghĩa ba KPI, ca biên và kết quả chạy lại.",
  "Bạn kiểm tra kết quả bài “Dự án Intermediate” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Nộp query, bảng đối soát và dashboard hai trang. Ghi định nghĩa ba KPI, ca biên và kết quả chạy lại. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "HlXPiP0YioU"
 ],
 [
  "A",
  "7",
  "Đọc execution plan",
  "So hai truy vấn lọc cùng ngày.",
  "So hai truy vấn lọc cùng ngày. Kiểm kết quả trong SQLite và dùng EXPLAIN QUERY PLAN trong công cụ SQLite riêng để so cách truy cập bảng.",
  "Bạn kiểm tra kết quả bài “Đọc execution plan” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. So hai truy vấn lọc cùng ngày. Kiểm kết quả trong SQLite và dùng EXPLAIN QUERY PLAN trong công cụ SQLite riêng để so cách truy cập bảng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "8",
  "Tối ưu điều kiện lọc ngày",
  "Viết điều kiện lọc theo khoảng ngày nửa mở.",
  "Viết điều kiện lọc theo khoảng ngày nửa mở. Thử hai bản ghi đúng biên và so hiệu năng với cách bọc hàm cột ngày.",
  "Bạn kiểm tra kết quả bài “Tối ưu điều kiện lọc ngày” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Viết điều kiện lọc theo khoảng ngày nửa mở. Thử hai bản ghi đúng biên và so hiệu năng với cách bọc hàm cột ngày. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "9",
  "Index nhiều cột",
  "Đề xuất thứ tự khóa index cho lọc chi nhánh và thời gian.",
  "Đề xuất thứ tự khóa index cho lọc chi nhánh và thời gian. So số trang đọc, ghi chi phí bảo trì khi nạp mới.",
  "Bạn kiểm tra kết quả bài “Index nhiều cột” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đề xuất thứ tự khóa index cho lọc chi nhánh và thời gian. So số trang đọc, ghi chi phí bảo trì khi nạp mới. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "10",
  "Chuyển đổi kiểu khi JOIN",
  "So nối cột cùng kiểu và cột phải ép kiểu.",
  "So nối cột cùng kiểu và cột phải ép kiểu. Kiểm khóa có số 0 đầu và số dòng mất do đổi kiểu.",
  "Bạn kiểm tra kết quả bài “Chuyển đổi kiểu khi JOIN” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. So nối cột cùng kiểu và cột phải ép kiểu. Kiểm khóa có số 0 đầu và số dòng mất do đổi kiểu. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "11",
  "Cửa sổ trượt theo ngày",
  "Dựng bảng ngày rồi tính rolling 7 ngày.",
  "Dựng bảng ngày rồi tính rolling 7 ngày. Kiểm ngày đầu, ngày vắng giao dịch và khoảng tích lũy.",
  "Bạn kiểm tra kết quả bài “Cửa sổ trượt theo ngày” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dựng bảng ngày rồi tính rolling 7 ngày. Kiểm ngày đầu, ngày vắng giao dịch và khoảng tích lũy. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "12",
  "Gaps and islands",
  "Dùng LAG phát hiện chuỗi ngày liên tiếp có sự cố.",
  "Dùng LAG phát hiện chuỗi ngày liên tiếp có sự cố. So kết quả khi có hai sự kiện trong cùng ngày.",
  "Bạn kiểm tra kết quả bài “Gaps and islands” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dùng LAG phát hiện chuỗi ngày liên tiếp có sự cố. So kết quả khi có hai sự kiện trong cùng ngày. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "13",
  "Snapshot và lịch sử trạng thái",
  "Tái tạo trạng thái hồ sơ tại ngày chốt.",
  "Tái tạo trạng thái hồ sơ tại ngày chốt. Kiểm các bản cập nhật xảy ra sau mốc hoặc đồng thời điểm.",
  "Bạn kiểm tra kết quả bài “Snapshot và lịch sử trạng thái” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tái tạo trạng thái hồ sơ tại ngày chốt. Kiểm các bản cập nhật xảy ra sau mốc hoặc đồng thời điểm. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "14",
  "Đối soát tổng–chi tiết theo batch",
  "Chạy bộ giao dịch theo hai batch, bỏ một lô rồi xác định lô thiếu qua tổng kiểm, trước khi khoanh từng mã.",
  "Chạy bộ giao dịch theo hai batch, bỏ một lô rồi xác định lô thiếu qua tổng kiểm, trước khi khoanh từng mã.",
  "Bạn kiểm tra kết quả bài “Đối soát tổng–chi tiết theo batch” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Chạy bộ giao dịch theo hai batch, bỏ một lô rồi xác định lô thiếu qua tổng kiểm, trước khi khoanh từng mã. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  ""
 ],
 [
  "A",
  "15",
  "Nạp lại an toàn",
  "Mô phỏng nạp một batch hai lần, giữ khóa ổn định.",
  "Mô phỏng nạp một batch hai lần, giữ khóa ổn định. Viết tiêu chí chứng minh số dòng và số tiền giữ nguyên.",
  "Bạn kiểm tra kết quả bài “Nạp lại an toàn” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Mô phỏng nạp một batch hai lần, giữ khóa ổn định. Viết tiêu chí chứng minh số dòng và số tiền giữ nguyên. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "JsJWBr1_ktQ"
 ],
 [
  "A",
  "16",
  "Watermark và cập nhật đến muộn",
  "Lập một mốc tải, nạp bản đến muộn rồi tái quét một khoảng chồng lấn.",
  "Lập một mốc tải, nạp bản đến muộn rồi tái quét một khoảng chồng lấn. Kiểm trùng bằng khóa sự kiện.",
  "Bạn kiểm tra kết quả bài “Watermark và cập nhật đến muộn” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Lập một mốc tải, nạp bản đến muộn rồi tái quét một khoảng chồng lấn. Kiểm trùng bằng khóa sự kiện. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "JsJWBr1_ktQ"
 ],
 [
  "A",
  "17",
  "Kiểm rò rỉ dữ liệu chiến dịch",
  "Dựng baseline dự báo trước cuộc gọi, loại duration vì chỉ có sau cuộc gọi.",
  "Dựng baseline dự báo trước cuộc gọi, loại duration vì chỉ có sau cuộc gọi. So hai tập trường trên cùng phép chia.",
  "Bạn kiểm tra kết quả bài “Kiểm rò rỉ dữ liệu chiến dịch” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dựng baseline dự báo trước cuộc gọi, loại duration vì chỉ có sau cuộc gọi. So hai tập trường trên cùng phép chia. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "18",
  "Chia tập theo thời gian",
  "Giữ phần quan sát cuối theo NgayQuanSat làm tập kiểm.",
  "Giữ phần quan sát cuối theo NgayQuanSat làm tập kiểm. So với chia ngẫu nhiên và nói rõ vì sao cần giữ thứ tự NgayQuanSat khi đánh giá.",
  "Bạn kiểm tra kết quả bài “Chia tập theo thời gian” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Giữ phần quan sát cuối theo NgayQuanSat làm tập kiểm. So với chia ngẫu nhiên và nói rõ vì sao cần giữ thứ tự NgayQuanSat khi đánh giá. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "19",
  "Chọn ngưỡng cảnh báo",
  "Dùng bảng CreditCard giả lập để lập ma trận nhầm lẫn trên dữ liệu lịch sử.",
  "Dùng bảng CreditCard giả lập để lập ma trận nhầm lẫn trên dữ liệu lịch sử. Nếu chỉ có thể rà 300 hồ sơ, đo precision ở nhóm 300 điểm cao nhất.",
  "Bạn kiểm tra kết quả bài “Chọn ngưỡng cảnh báo” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dùng bảng CreditCard giả lập để lập ma trận nhầm lẫn trên dữ liệu lịch sử. Nếu chỉ có thể rà 300 hồ sơ, đo precision ở nhóm 300 điểm cao nhất. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "20",
  "Theo dõi thay đổi phân bố",
  "So tỷ lệ unknown và cơ cấu contact giữa hai đoạn tệp.",
  "So tỷ lệ unknown và cơ cấu contact giữa hai đoạn tệp. Đặt ngưỡng cảnh báo và liên hệ chất lượng nguồn.",
  "Bạn kiểm tra kết quả bài “Theo dõi thay đổi phân bố” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. So tỷ lệ unknown và cơ cấu contact giữa hai đoạn tệp. Đặt ngưỡng cảnh báo và liên hệ chất lượng nguồn. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://archive.ics.uci.edu/dataset/222/bank+marketing",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "21",
  "DAX: tỷ trọng trong tổng được lọc",
  "Tạo measure so với tổng theo phạm vi slicer.",
  "Tạo measure so với tổng theo phạm vi slicer. Kiểm tổng ba chi nhánh và nêu khi nào dùng ALLSELECTED.",
  "Bạn kiểm tra kết quả bài “DAX: tỷ trọng trong tổng được lọc” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo measure so với tổng theo phạm vi slicer. Kiểm tổng ba chi nhánh và nêu khi nào dùng ALLSELECTED. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "A",
  "22",
  "DAX: tổng theo lát cắt",
  "Tạo ma trận tuần và chi nhánh, thử tỷ lệ có trọng số.",
  "Tạo ma trận tuần và chi nhánh, thử tỷ lệ có trọng số. Viết expected result cho dòng tổng và nhóm rỗng.",
  "Bạn kiểm tra kết quả bài “DAX: tổng theo lát cắt” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo ma trận tuần và chi nhánh, thử tỷ lệ có trọng số. Viết expected result cho dòng tổng và nhóm rỗng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "A",
  "23",
  "DAX: so kỳ có ngày vắng",
  "Dùng bảng ngày liên tục, kiểm ngày và tháng trước.",
  "Dùng bảng ngày liên tục, kiểm ngày và tháng trước. Ghi cách hiển thị khi không đủ kỳ.",
  "Bạn kiểm tra kết quả bài “DAX: so kỳ có ngày vắng” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Dùng bảng ngày liên tục, kiểm ngày và tháng trước. Ghi cách hiển thị khi không đủ kỳ. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "A",
  "24",
  "RLS theo danh mục chi nhánh",
  "Tạo ánh xạ người dùng giả lập sang nhiều chi nhánh.",
  "Tạo ánh xạ người dùng giả lập sang nhiều chi nhánh. Kiểm người có hai quyền, không có quyền và vai trò quản trị.",
  "Bạn kiểm tra kết quả bài “RLS theo danh mục chi nhánh” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Tạo ánh xạ người dùng giả lập sang nhiều chi nhánh. Kiểm người có hai quyền, không có quyền và vai trò quản trị. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "pb3DjX_hgac"
 ],
 [
  "A",
  "25",
  "Refresh và theo dõi dữ liệu",
  "Đặt số kiểm trước và sau refresh.",
  "Đặt số kiểm trước và sau refresh. Mô phỏng mất nguồn và dữ liệu làm mới một phần.",
  "Bạn kiểm tra kết quả bài “Refresh và theo dõi dữ liệu” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đặt số kiểm trước và sau refresh. Mô phỏng mất nguồn và dữ liệu làm mới một phần. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "HlXPiP0YioU"
 ],
 [
  "A",
  "26",
  "Giảm dung lượng semantic model",
  "Kiểm cột định danh và timestamp có cardinality cao.",
  "Kiểm cột định danh và timestamp có cardinality cao. So kích thước và độ đúng sau khi bỏ trường không dùng.",
  "Bạn kiểm tra kết quả bài “Giảm dung lượng semantic model” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Kiểm cột định danh và timestamp có cardinality cao. So kích thước và độ đúng sau khi bỏ trường không dùng. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "HlXPiP0YioU"
 ],
 [
  "A",
  "27",
  "Đối chiếu performance theo kịch bản",
  "Đo ba lượt mỗi kịch bản lọc.",
  "Đo ba lượt mỗi kịch bản lọc. Dùng trung vị, kiểm cache và nêu vì sao không so hai điều kiện khác nhau.",
  "Bạn kiểm tra kết quả bài “Đối chiếu performance theo kịch bản” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Đo ba lượt mỗi kịch bản lọc. Dùng trung vị, kiểm cache và nêu vì sao không so hai điều kiện khác nhau. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://learn.microsoft.com/en-us/dax/dax-overview",
  "HlXPiP0YioU"
 ],
 [
  "A",
  "28",
  "Phỏng vấn SQL nâng cao",
  "Chọn một bài Medium hoặc Hard trong DataLemur, viết giả định, test trường hợp hòa hạng và giải thích phương án khác.",
  "Chọn một bài Medium hoặc Hard trong DataLemur, viết giả định, test trường hợp hòa hạng và giải thích phương án khác.",
  "Bạn kiểm tra kết quả bài “Phỏng vấn SQL nâng cao” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Chọn một bài Medium hoặc Hard trong DataLemur, viết giả định, test trường hợp hòa hạng và giải thích phương án khác. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "29",
  "Mock interview thiết kế hệ thống",
  "Thiết kế flow từ SQL đến dashboard đa chi nhánh.",
  "Thiết kế flow từ SQL đến dashboard đa chi nhánh. Nêu một sự cố dữ liệu, cách phát hiện, khoanh vùng và phục hồi.",
  "Bạn kiểm tra kết quả bài “Mock interview thiết kế hệ thống” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Thiết kế flow từ SQL đến dashboard đa chi nhánh. Nêu một sự cố dữ liệu, cách phát hiện, khoanh vùng và phục hồi. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "dkzaWBxB0vA"
 ],
 [
  "A",
  "30",
  "Dự án Advanced",
  "Bàn giao mô hình, đối soát, kiểm RLS, refresh, đo hiệu năng và checklist rollback.",
  "Bàn giao mô hình, đối soát, kiểm RLS, refresh, đo hiệu năng và checklist rollback. Bảo vệ trước hai câu chất vấn.",
  "Bạn kiểm tra kết quả bài “Dự án Advanced” thế nào trước khi bàn giao?",
  "Nêu cấp độ dữ liệu, phạm vi và giá trị kỳ vọng. Bàn giao mô hình, đối soát, kiểm RLS, refresh, đo hiệu năng và checklist rollback. Bảo vệ trước hai câu chất vấn. Lưu đầu vào và kết quả kiểm để người khác chạy lại.",
  "https://www.postgresql.org/docs/current/tutorial-window.html",
  "HlXPiP0YioU"
 ]
]);
const advancedSQL = {
  "I1": "SELECT h.ChiNhanh,COUNT(*) AS DongSauJoin,COUNT(DISTINCT h.MaHS) AS HoSo FROM HoSo h JOIN LichSu l USING(MaHS) GROUP BY h.ChiNhanh;",
  "I2": "WITH C AS (SELECT ChiNhanh, TrangThai='Đã đóng' AS Dong, TrangThai='Đã đóng' AND COALESCE(XuLyPhut<=SLAPhut,0) AS Dat FROM HoSo) SELECT ChiNhanh, SUM(Dat) AS Dat, SUM(Dong) AS Dong, ROUND(100.0*SUM(Dat)/NULLIF(SUM(Dong),0),2) AS Pct FROM C GROUP BY ChiNhanh;",
  "I3": "WITH X AS (SELECT MaHS,ChiNhanh,XuLyPhut,ROW_NUMBER() OVER(PARTITION BY ChiNhanh ORDER BY XuLyPhut DESC,MaHS) AS rn FROM HoSo WHERE XuLyPhut IS NOT NULL) SELECT * FROM X WHERE rn<=2 ORDER BY ChiNhanh,rn;",
  "I4": "SELECT s.MaGD,s.SoTienVND,k.SoTienVND AS TienSaoKe,d.Vung FROM SoNoiBo s LEFT JOIN SaoKe k USING(MaGD) LEFT JOIN DimCN d ON d.ChiNhanh=s.ChiNhanh WHERE k.MaGD IS NULL OR s.SoTienVND<>k.SoTienVND;",
  "I5": "SELECT d.Vung,STRFTIME('%W',l.Ngay) AS Tuan,SUM(h.XuLyPhut<=h.SLAPhut) AS Dat,COUNT(h.XuLyPhut) AS Dong FROM HoSo h JOIN DimCN d USING(ChiNhanh) JOIN Lich l ON l.Ngay=h.NgayNhan GROUP BY d.Vung,Tuan;",
  "I6": "SELECT ChiNhanh,COUNT(*) AS Tong,COUNT(XuLyPhut) AS Dong,SUM(XuLyPhut<=SLAPhut) AS Dat,ROUND(100.0*SUM(XuLyPhut<=SLAPhut)/NULLIF(COUNT(XuLyPhut),0),2) AS Pct FROM HoSo GROUP BY ChiNhanh;",
  "I7": "SELECT Contact,COUNT(*) AS QuanSat,SUM(Y='yes') AS DangKy FROM Marketing GROUP BY Contact;",
  "I8": "SELECT Job,COUNT(*) AS Tong,SUM(Education='unknown') AS KhongRo,ROUND(100.0*SUM(Education='unknown')/COUNT(*),2) AS Pct FROM Marketing GROUP BY Job;",
  "I9": "SELECT Contact,COUNT(*) AS Tong,SUM(Y='yes') AS DangKy,AVG(Y='yes') AS TiLe FROM Marketing GROUP BY Contact;",
  "I10": "SELECT Month,(INSTR('janfebmaraprmayjunjulaugsepoctnovdec',Month)+2)/3 AS ThuTu,COUNT(*) AS SoDong FROM Marketing GROUP BY Month ORDER BY ThuTu;",
  "I11": "WITH G AS (SELECT Contact,Job,AVG(Y='yes') AS TiLe,COUNT(*) AS N FROM Marketing GROUP BY Contact,Job HAVING COUNT(*)>=100) SELECT *,DENSE_RANK() OVER(PARTITION BY Contact ORDER BY TiLe DESC) AS Hang FROM G;",
  "I12": "SELECT MaGD,'Nội bộ' AS Nguon FROM SoNoiBo s WHERE NOT EXISTS(SELECT 1 FROM SaoKe k WHERE k.MaGD=s.MaGD) UNION ALL SELECT MaGD,'Sao kê' FROM SaoKe k WHERE NOT EXISTS(SELECT 1 FROM SoNoiBo s WHERE s.MaGD=k.MaGD);",
  "I13": "WITH X AS (SELECT MaGD,SoTienVND,'Nội bộ' AS Nguon FROM SoNoiBo UNION ALL SELECT MaGD,SoTienVND,'Sao kê' FROM SaoKe) SELECT Nguon,COUNT(*) AS SoDong,SUM(SoTienVND) AS Tong FROM X GROUP BY Nguon;",
  "I14": "WITH X AS (SELECT CASE WHEN k.MaGD IS NULL THEN 'Thiếu sao kê' WHEN s.SoTienVND<>k.SoTienVND THEN 'Lệch tiền' ELSE 'Khớp' END AS KetQua FROM SoNoiBo s LEFT JOIN SaoKe k USING(MaGD) UNION ALL SELECT 'Chỉ có sao kê' FROM SaoKe k LEFT JOIN SoNoiBo s USING(MaGD) WHERE s.MaGD IS NULL) SELECT KetQua,COUNT(*) AS SoMa FROM X GROUP BY KetQua;",
  "I15": "WITH X AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY ChiNhanh ORDER BY SoTienVND DESC,MaGD) AS Hang FROM SoNoiBo) SELECT * FROM X WHERE Hang<=3 ORDER BY ChiNhanh,Hang;",
  "I16": "SELECT ChiNhanh,NgayGD,MaGD,SUM(SoTienVND) OVER(PARTITION BY ChiNhanh ORDER BY NgayGD,MaGD ROWS UNBOUNDED PRECEDING) AS LuyKeDong,SUM(SoTienVND) OVER(PARTITION BY ChiNhanh ORDER BY NgayGD RANGE UNBOUNDED PRECEDING) AS LuyKeNgay FROM SoNoiBo ORDER BY ChiNhanh,NgayGD,MaGD;",
  "I17": "WITH X AS (SELECT l.Ngay,COALESCE(SUM(s.SoTienVND),0) AS Tong FROM Lich l LEFT JOIN SoNoiBo s ON s.NgayGD=l.Ngay GROUP BY l.Ngay) SELECT *,Tong-LAG(Tong) OVER(ORDER BY Ngay) AS Chenh FROM X;",
  "I18": "WITH X AS (SELECT CASE WHEN SoTienVND<1000000 THEN 'Thấp' WHEN SoTienVND<2000000 THEN 'Trung bình' ELSE 'Cao' END AS PhanHang FROM SoNoiBo) SELECT PhanHang,COUNT(*) AS SoDong FROM X GROUP BY PhanHang;",
  "I19": "SELECT LamViec,COUNT(*) AS SoNgay,SUM(EXISTS(SELECT 1 FROM SoNoiBo s WHERE s.NgayGD=l.Ngay)) AS NgayCoGD FROM Lich l GROUP BY LamViec;",
  "I20": "SELECT COUNT(*) AS SoDong,COUNT(Campaign) AS SoDongCoCampaign,MIN(Campaign) AS GiaTriNhoNhat,MAX(Campaign) AS GiaTriLonNhat FROM Marketing;",
  "I21": "SELECT COUNT(*) AS SoDong,COUNT(*)-COUNT(Campaign) AS NullCampaign,SUM(Education='unknown') AS UnknownEdu,COUNT(*)-COUNT(DISTINCT MaQuanSat) AS TrungMa FROM Marketing;",
  "I22": "SELECT d.Vung,COUNT(*) AS SoDong,SUM(s.SoTienVND) AS Tong FROM SoNoiBo s JOIN DimCN d USING(ChiNhanh) GROUP BY d.Vung;",
  "I23": "SELECT MaHS,NgayNhan,XuLyPhut,SLAPhut,CASE WHEN TrangThai='Đã đóng' THEN XuLyPhut<=SLAPhut END AS CoDat FROM HoSo WHERE NgayNhan<(SELECT DATE(MIN(Ngay),'+7 days') FROM Lich) ORDER BY NgayNhan,MaHS;",
  "I24": "SELECT d.ChiNhanh,COUNT(h.XuLyPhut) AS Dong,1.0*SUM(h.XuLyPhut<=h.SLAPhut)/NULLIF(COUNT(h.XuLyPhut),0) AS TiLe FROM DimCN d LEFT JOIN HoSo h USING(ChiNhanh) GROUP BY d.ChiNhanh;",
  "I25": "SELECT Contact,COUNT(*) AS Luot,SUM(Y='yes') AS DangKy,AVG(Y='yes') AS TiLe FROM Marketing GROUP BY Contact ORDER BY TiLe DESC;",
  "I26": "SELECT s.ChiNhanh,s.MaGD,s.SoTienVND-k.SoTienVND AS Chenh FROM SoNoiBo s JOIN SaoKe k USING(MaGD) WHERE s.SoTienVND<>k.SoTienVND ORDER BY s.ChiNhanh,s.MaGD;",
  "I27": "WITH X AS (SELECT Loai,SUM(SoTienVND) AS Tong FROM SoNoiBo GROUP BY Loai) SELECT *,1.0*Tong/SUM(Tong) OVER() AS TiTrong,1.0*SUM(Tong) OVER(ORDER BY Tong DESC,Loai)/SUM(Tong) OVER() AS Pareto FROM X ORDER BY Tong DESC,Loai;",
  "I28": "SELECT d.Vung,COUNT(s.MaGD) AS SoGD,SUM(s.SoTienVND) AS Tong FROM DimCN d LEFT JOIN SoNoiBo s ON s.ChiNhanh=d.ChiNhanh AND s.NgayGD=(SELECT MIN(NgayGD) FROM SoNoiBo) GROUP BY d.Vung;",
  "I29": "SELECT h.ChiNhanh,COUNT(*) AS DongSauJoin,COUNT(DISTINCT h.MaHS) AS SoHoSo,SUM(h.TrangThai='Đã đóng') AS DongSauJoinDaDong FROM HoSo h JOIN LichSu l USING(MaHS) GROUP BY h.ChiNhanh;",
  "I30": "SELECT COALESCE(d.Vung,'Toàn bộ') AS Vung,COUNT(*) AS HoSo,COUNT(XuLyPhut) AS Dong,SUM(XuLyPhut<=SLAPhut) AS Dat FROM HoSo JOIN DimCN d USING(ChiNhanh) GROUP BY d.Vung UNION ALL SELECT 'Toàn bộ',COUNT(*),COUNT(XuLyPhut),SUM(XuLyPhut<=SLAPhut) FROM HoSo;",
  "A1": "WITH X AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY MaHS ORDER BY ThoiDiem DESC,SuKien DESC) AS rn FROM LichSu) SELECT MaHS,ThoiDiem,SuKien,TrangThai,NgayNap FROM X WHERE rn=1 ORDER BY MaHS;",
  "A2": "WITH S AS (SELECT ChiNhanh,NgayGD,SUM(SoTienVND) AS Tong FROM SoNoiBo GROUP BY ChiNhanh,NgayGD), H AS (SELECT ChiNhanh,NgayNhan,COUNT(*) AS SoHS FROM HoSo GROUP BY ChiNhanh,NgayNhan) SELECT c.ChiNhanh,l.Ngay,COALESCE(Tong,0) AS Tong,COALESCE(SoHS,0) AS SoHS FROM DimCN c CROSS JOIN Lich l LEFT JOIN S ON S.ChiNhanh=c.ChiNhanh AND S.NgayGD=l.Ngay LEFT JOIN H ON H.ChiNhanh=c.ChiNhanh AND H.NgayNhan=l.Ngay;",
  "A3": "WITH X AS (SELECT STRFTIME('%Y-%W',l.Ngay) AS Tuan,1.0*SUM(XuLyPhut<=SLAPhut)/NULLIF(COUNT(XuLyPhut),0) AS TiLe FROM Lich l LEFT JOIN HoSo h ON h.NgayNhan=l.Ngay GROUP BY Tuan) SELECT *,LAG(TiLe) OVER(ORDER BY Tuan) AS TuanTruoc,100*(TiLe-LAG(TiLe) OVER(ORDER BY Tuan)) AS DiemPct FROM X;",
  "A4": "SELECT d.Vung,l.Ngay,SUM(s.SoTienVND) AS Tong FROM SoNoiBo s JOIN DimCN d USING(ChiNhanh) JOIN Lich l ON l.Ngay=s.NgayGD GROUP BY d.Vung,l.Ngay;",
  "A5": "SELECT SUBSTR(ThoiDiem,1,10) AS NgaySuKien,COUNT(*) AS SoDong,SUM(NgayNap>SUBSTR(ThoiDiem,1,10)) AS DenMuon FROM LichSu GROUP BY NgaySuKien;",
  "A6": "SELECT d.Vung,COUNT(h.MaHS) AS Tong,COUNT(h.XuLyPhut) AS DaDong,SUM(h.XuLyPhut<=h.SLAPhut) AS Dat FROM DimCN d LEFT JOIN HoSo h USING(ChiNhanh) GROUP BY d.Vung;",
  "A7": "SELECT COUNT(*) AS SoDong,SUM(SoTienVND) AS Tong FROM SoNoiBo WHERE NgayGD=(SELECT MIN(NgayGD) FROM SoNoiBo);",
  "A8": "WITH B AS (SELECT MIN(Ngay) AS TuNgay,DATE(MIN(Ngay),'+7 days') AS DenNgay FROM Lich) SELECT B.TuNgay,B.DenNgay,COUNT(*) AS SoDong FROM SoNoiBo CROSS JOIN B WHERE NgayGD>=B.TuNgay AND NgayGD<B.DenNgay;",
  "A9": "SELECT ChiNhanh,NgayGD,SUM(SoTienVND) AS Tong FROM SoNoiBo WHERE ChiNhanh=(SELECT MIN(ChiNhanh) FROM DimCN) AND NgayGD>=(SELECT DATE(MIN(NgayGD),'+7 days') FROM SoNoiBo) GROUP BY ChiNhanh,NgayGD;",
  "A10": "SELECT k.MaCu,s.MaGD,s.SoTienVND,CASE WHEN CAST(k.MaCu AS TEXT)=CAST(CAST(k.MaCu AS INTEGER) AS TEXT) THEN 0 ELSE 1 END AS MatSo0Dau FROM KhoaCu k JOIN SoNoiBo s USING(MaGD);",
  "A11": "WITH X AS (SELECT l.Ngay,COALESCE(SUM(s.SoTienVND),0) AS Tong FROM Lich l LEFT JOIN SoNoiBo s ON s.NgayGD=l.Ngay GROUP BY l.Ngay) SELECT *,SUM(Tong) OVER(ORDER BY Ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS Rolling7 FROM X;",
  "A12": "WITH D AS (SELECT DISTINCT SUBSTR(ThoiDiem,1,10) AS Ngay FROM LichSu WHERE NgayNap>SUBSTR(ThoiDiem,1,10)), G AS (SELECT Ngay,JULIANDAY(Ngay)-ROW_NUMBER() OVER(ORDER BY Ngay) AS Nhom FROM D) SELECT MIN(Ngay) AS BatDau,MAX(Ngay) AS KetThuc,COUNT(*) AS SoNgay FROM G GROUP BY Nhom ORDER BY BatDau;",
  "A13": "WITH X AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY MaHS ORDER BY ThoiDiem DESC,SuKien DESC) AS rn FROM LichSu WHERE ThoiDiem < (SELECT DATE(MIN(NgayNhan),'+18 days') FROM HoSo)) SELECT TrangThai,COUNT(*) AS SoHS FROM X WHERE rn=1 GROUP BY TrangThai;",
  "A14": "WITH S AS (SELECT Batch,COUNT(*) AS SoDong,SUM(SoTienVND) AS Tong FROM SoNoiBo GROUP BY Batch), K AS (SELECT Batch,COUNT(*) AS SoDong,SUM(SoTienVND) AS Tong FROM SaoKe GROUP BY Batch) SELECT n.Batch,n.SoDongKyVong,COALESCE(k.SoDong,0) AS CoSaoKe,s.Tong-COALESCE(k.Tong,0) AS Chenh FROM NhatKy n JOIN S s USING(Batch) LEFT JOIN K k USING(Batch);",
  "A15": "WITH X AS (SELECT DISTINCT MaGD,Batch,SoTienVND FROM SoNoiBo) SELECT Batch,COUNT(*) AS SauKhuTrung,SUM(SoTienVND) AS Tong,(SELECT COUNT(*) FROM SoNoiBo s WHERE s.Batch=x.Batch) AS Truoc FROM X x GROUP BY Batch;",
  "A16": "SELECT NgayNap,COUNT(DISTINCT SuKien) AS SuKien,SUM(NgayNap>SUBSTR(ThoiDiem,1,10)) AS DenMuon FROM LichSu GROUP BY NgayNap ORDER BY NgayNap;",
  "A17": "SELECT Contact,COUNT(*) AS N,AVG(Y='yes') AS TiLe,AVG(CASE WHEN Y='yes' THEN Duration END) AS GiayNhomYes,AVG(CASE WHEN Y='no' THEN Duration END) AS GiayNhomNo FROM Marketing GROUP BY Contact;",
  "A18": "WITH X AS (SELECT *,NTILE(5) OVER(ORDER BY NgayQuanSat,MaQuanSat) AS Nhom FROM Marketing) SELECT CASE WHEN Nhom=5 THEN 'Kiểm' ELSE 'Huấn luyện' END AS Tap,MIN(NgayQuanSat) AS TuNgay,MAX(NgayQuanSat) AS DenNgay,AVG(Y='yes') AS TiLe FROM X GROUP BY Tap;",
  "A19": "WITH X AS (SELECT *,ROW_NUMBER() OVER(ORDER BY DiemRuiRo DESC,MaHoSo) AS Hang FROM CreditCard) SELECT SUM(Hang<=300 AND DefaultNextMonth=1) AS TP,SUM(Hang<=300 AND DefaultNextMonth=0) AS FP,SUM(Hang>300 AND DefaultNextMonth=1) AS FN,SUM(Hang>300 AND DefaultNextMonth=0) AS TN,AVG(CASE WHEN Hang<=300 THEN DefaultNextMonth END) AS Precision FROM X;",
  "A20": "WITH X AS (SELECT *,NTILE(2) OVER(ORDER BY NgayQuanSat,MaQuanSat) AS Ky FROM Marketing) SELECT Ky,Contact,COUNT(*) AS SoDong,AVG(Education='unknown') AS TiLeUnknown FROM X GROUP BY Ky,Contact;",
  "A21": "WITH X AS (SELECT d.Vung,SUM(s.SoTienVND) AS Tong FROM SoNoiBo s JOIN DimCN d USING(ChiNhanh) WHERE d.Vung<>'Bắc' GROUP BY d.Vung) SELECT *,1.0*Tong/SUM(Tong) OVER() AS TiTrong FROM X;",
  "A22": "SELECT d.Vung,STRFTIME('%Y-%W',l.Ngay) AS Tuan,SUM(h.XuLyPhut<=h.SLAPhut) AS Dat,COUNT(h.XuLyPhut) AS Dong,AVG(h.XuLyPhut<=h.SLAPhut) AS TiLe FROM DimCN d CROSS JOIN Lich l LEFT JOIN HoSo h ON h.ChiNhanh=d.ChiNhanh AND h.NgayNhan=l.Ngay GROUP BY d.Vung,Tuan;",
  "A23": "WITH X AS (SELECT l.Ngay,COALESCE(SUM(s.SoTienVND),0) AS Tong FROM Lich l LEFT JOIN SoNoiBo s ON s.NgayGD=l.Ngay GROUP BY l.Ngay) SELECT a.Ngay,a.Tong,b.Tong AS NgayTruoc,c.Tong AS ThangTruoc FROM X a LEFT JOIN X b ON b.Ngay=DATE(a.Ngay,'-1 day') LEFT JOIN X c ON c.Ngay=DATE(a.Ngay,'-1 month') ORDER BY a.Ngay;",
  "A24": "SELECT q.NguoiDung,d.Vung,COUNT(s.MaGD) AS SoGD FROM Quyen q JOIN DimCN d USING(ChiNhanh) LEFT JOIN SoNoiBo s USING(ChiNhanh) GROUP BY q.NguoiDung,d.Vung;",
  "A25": "WITH X AS (SELECT Batch,COUNT(*) AS SoDong FROM SoNoiBo GROUP BY Batch) SELECT n.*,COALESCE(x.SoDong,0) AS ThucTe,n.SoDongKyVong-COALESCE(x.SoDong,0) AS ChuaNap FROM NhatKy n LEFT JOIN X x USING(Batch);",
  "A26": "SELECT COUNT(*) AS SoDong,COUNT(DISTINCT SuKien) AS IdPhanBiet,COUNT(DISTINCT ThoiDiem) AS TimestampPhanBiet,COUNT(DISTINCT TrangThai) AS TrangThaiPhanBiet FROM LichSu;",
  "A27": "SELECT ChiNhanh,COUNT(*) AS SoDong,SUM(SoTienVND) AS Tong FROM SoNoiBo WHERE NgayGD BETWEEN (SELECT MIN(Ngay) FROM Lich) AND (SELECT DATE(MIN(Ngay),'+6 days') FROM Lich) GROUP BY ChiNhanh;",
  "A28": "WITH X AS (SELECT MaGD,ChiNhanh,SoTienVND,DENSE_RANK() OVER(PARTITION BY ChiNhanh ORDER BY SoTienVND DESC) AS Hang FROM SoNoiBo) SELECT * FROM X WHERE Hang<=3 ORDER BY ChiNhanh,Hang,MaGD;",
  "A29": "WITH X AS (SELECT Batch,COUNT(*) AS DoiTac FROM SaoKe GROUP BY Batch) SELECT n.Batch,n.TrangThai,n.SoDongKyVong,COALESCE(x.DoiTac,0) AS DoiTac FROM NhatKy n LEFT JOIN X x USING(Batch) ORDER BY n.Batch;",
  "A30": "WITH X AS (SELECT s.ChiNhanh,COUNT(*) AS SoGD,SUM(k.MaGD IS NULL OR k.SoTienVND<>s.SoTienVND) AS NgoaiLe FROM SoNoiBo s LEFT JOIN SaoKe k USING(MaGD) GROUP BY s.ChiNhanh) SELECT d.Vung,q.NguoiDung,x.SoGD,x.NgoaiLe FROM DimCN d LEFT JOIN X x USING(ChiNhanh) LEFT JOIN Quyen q USING(ChiNhanh) ORDER BY d.Vung,q.NguoiDung;"
};
function renderAdvanced(level,number,{st,esc,page,tag,fileLink,trackQuiz}){
 const selected=level==="advanced"?"A":"I",slug=selected==="A"?"advanced":"intermediate";
 const done=st.advancedTrack||{};
 const tracks=advancedTrack.filter(([key])=>key===selected);
 const label=selected==="A"?"Advanced":"Intermediate";
 const header=page("SQL · Power BI · Data Quality",label,selected==="A"?"30 buổi về mô hình, hiệu năng và vận hành báo cáo ngân hàng.":"30 buổi về truy vấn, KPI và xây dựng báo cáo ngân hàng.");
 const sources='<section class="content"><h2>Nguồn luyện phỏng vấn</h2><p><a class="textlink" href="https://leetcode.com/studyplan/top-sql-50/" target="_blank" rel="noopener">LeetCode SQL 50</a> · <a class="textlink" href="https://datalemur.com/questions" target="_blank" rel="noopener">DataLemur SQL Interview Questions</a></p></section>';
 const item=tracks.find(x=>x[1]===number);
 if(!item)return header+'<section class="content"><h2>'+esc(slug==="advanced"?"Advanced · Thiết kế và vận hành":"Intermediate · Phân tích và dựng báo cáo")+'</h2>'+tracks.map(([,n,title,read])=>'<a class="itemlink" href="#'+slug+'/'+n+'"><span class="num">'+n+'</span><strong>'+esc(title)+'</strong><span>'+ (done[selected+n]?"Đã học":"Mở bài")+'</span></a>').join("")+'</section>'+sources;
 const [key,n,title,read,task,question,answer,url]=item;
 const [video,videoTitle]=lessonVideos.track[key+n] || [];
 const quizId=(key==="I"?100:130)+Number(n);
 const quizzes='<section class="content"><h2>30 phút · Kiểm tra cuối buổi</h2>'+trackQuiz.panel(quizId,"exam")+'</section>';
 const dataset=trackDatasets[key+n];
 const files=Object.entries(dataset.tables).map(([name,table])=>fileLink({
   label:name+" · "+table.rows.length.toLocaleString("vi-VN")+" dòng",
   path:"data/track/"+dataset.id+"/"+name+".csv"
 })).join("");
 const schema=Object.entries(dataset.tables).map(([name,t])=>
   '<li><strong>'+esc(name)+'</strong> · '+esc(t.cols.join(", "))+'</li>').join("");
 const sql=advancedSQL[key+n];
 const practiceData='<h3>Dataset '+dataset.id+'</h3><p>Dữ liệu ngân hàng giả lập dành riêng cho buổi này. Dùng các tệp CSV dưới đây để thực hành với Python hoặc Power BI.</p><div class="actions">'+files+'</div><details><summary>Xem bảng và tên cột</summary><ul>'+schema+'</ul></details>';
 const workbench='<details class="workpad"><summary>Chạy SQL với dataset '+dataset.id+'</summary><label class="field">Truy vấn SQLite<textarea id="track-sql" rows="6">'+esc(sql)+'</textarea></label><button class="btn green" type="button" data-track-sql="'+key+n+'">Chạy SQL</button><div id="sqlresult" role="status"></div></details>';
 const videoHtml=video?`<section class="content"><h2>30 phút · Video và luyện lại</h2><h3>${esc(videoTitle)}</h3><iframe class="videoplayer" title="${esc(videoTitle)}" src="https://www.youtube-nocookie.com/embed/${video}" width="640" height="360" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><p><a class="textlink" href="https://www.youtube.com/watch?v=${video}" target="_blank" rel="noopener">Mở video trên YouTube</a></p></section>`:"";
 return '<a class="backlink" href="#'+slug+'">Về lộ trình</a>'+page(label+" · Buổi "+n,title,read)+
 '<section class="content"><h2>15 phút · Học liệu và ôn nhanh</h2><p><a class="textlink" href="'+esc(url)+'" target="_blank" rel="noopener">Đọc tài liệu liên quan</a></p>'+trackQuiz.panel(quizId,"review")+'</section>'+
 '<section class="content"><h2>15 phút · Thực hành</h2><p>'+esc(task)+'</p>'+practiceData+workbench+'<div class="actions"><a class="btn ghost" href="'+esc(url)+'" target="_blank" rel="noopener">Đọc tài liệu hoặc luyện đề</a></div></section>'+(videoHtml||'<section class="content"><h2>30 phút · Đọc và làm lại ví dụ</h2><p>Đọc tài liệu đính kèm, chạy một ví dụ rồi thử một ca biên.</p></section>')+
 '<section class="content"><h2>Phỏng vấn tình huống</h2><p>'+esc(question)+'</p><details><summary>Xem cách trả lời</summary><p>'+esc(answer)+'</p></details><p class="small">Trình bày giả định, cách kiểm số và một ca biên trước khi xem lời giải.</p><label class="choice"><input type="checkbox" data-track-done="'+key+n+'" '+(done[key+n]?"checked":"")+'> Tôi đã làm bài và tự kiểm kết quả</label><div class="actions"><a class="textlink" href="#'+(n<30?slug+'/'+(Number(n)+1):selected==="I"?"advanced/1":"advanced")+'">'+(n<30?"Buổi tiếp theo":selected==="I"?"Sang Advanced":"Xem lại Advanced")+'</a></div></section>'+quizzes+sources;
}

function trackQuestions(id){
 const key=id<=130?"I":"A",n=id-(key==="I"?100:130);
 const item=advancedTrack.find(row=>row[0]===key&&Number(row[1])===n);
 const theme=key==="I"?[31,38,34,53,65,70,62,63,66,73,39,41,42,44,34,38,54,36,54,62,48,53,67,66,68,69,67,45,60,70]:
 [43,64,67,70,82,88,45,32,40,35,54,51,43,44,57,59,78,77,76,86,67,66,73,69,87,64,70,45,89,90];
 const base=PROGRAM.days[theme[n-1]-1];
 const questions=base.n<=60?sqlQuestions(base):biQuestions(base);
 const report=n>=7||key==="A";
 const make=(prompt,right,a,b,why)=>[prompt,String(right),String(a),String(b),why];
 const cases=Array.from({length:10},(_,i)=>{
   const a=20+n+i*3,b=10+i,t=100+10*i;
   const scenario="Hồ sơ kiểm thử "+(i+1)+" của buổi "+n+". ";
   if(report&&i>=6){
     const falsePositive=b, alerts=a+b;
     return make(scenario+"Trong "+alerts+" cảnh báo có "+a+" trường hợp đúng. Mẫu số của precision là bao nhiêu?",alerts,a,t,"Precision tính trên các trường hợp được hệ thống cảnh báo, gồm "+a+" đúng và "+falsePositive+" sai.");
   }
   if(i%3===0)return make(scenario+"Sổ có "+a+" mã chỉ nội bộ, "+b+" mã chỉ đối tác và "+t+" mã trùng hai bên. Có bao nhiêu mã cần điều tra do thiếu một bên?",a+b,a+b+t,t,"Cộng hai nhóm chỉ xuất hiện một bên. Nhóm khớp khóa còn cần kiểm số tiền.");
   if(i%3===1)return make(scenario+"Có "+t+" hồ sơ đóng, "+a+" đạt và "+b+" hồ sơ mở. Mẫu số cho tỷ lệ đạt trên hồ sơ đã đóng là gì?",t,t+b,a,"Chỉ đếm hồ sơ đã đóng trong mẫu số theo định nghĩa đã chốt.");
   return make(scenario+"Trong "+t+" hồ sơ đã đóng, "+a+" đạt hạn, phần còn lại trễ. Có bao nhiêu hồ sơ trễ?",t-a,t-b,t+a,"Trừ số đạt khỏi tổng đã đóng. Giả định không có hồ sơ đóng chưa phân loại.");
 });
 return [...questions.slice(0,10),...cases,...questions.slice(10,30)];
}
