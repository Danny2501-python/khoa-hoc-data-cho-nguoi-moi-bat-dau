window.LABS = [
  {
    id: "excel-kpi", title: "Lập báo cáo hiệu suất bằng Excel", tag: "Excel & PivotTable", minutes: 45,
    intro: "Trưởng phòng muốn biết trong hai tuần vừa qua, bao nhiêu hồ sơ đã đóng và bao nhiêu hồ sơ đạt thời hạn cam kết (SLA). Bạn sẽ tự lập báo cáo đầu tiên từ 24 hồ sơ giả lập.",
    files: [{ label: "Hồ sơ vận hành · 24 dòng (CSV)", path: "data/ho-so-van-hanh.csv" }],
    steps: [
      "Mở Excel → Data → From Text/CSV, chọn tệp và dấu phẩy làm dấu phân cách, chọn UTF-8. Mỗi dòng là một hồ sơ. MaHS là mã duy nhất, NgayNhan là ngày tiếp nhận, Tuan là tuần tiếp nhận, ChiNhanh và NghiepVu dùng để phân nhóm.",
      "Chọn vùng dữ liệu → Insert → Table, tích My table has headers. TrangThai cho biết hồ sơ đã đóng hay đang xử lý. XuLyPhut là thời gian thực tế của hồ sơ đã đóng. SLAPhut là giới hạn cho phép của từng hồ sơ. Thời gian bằng giới hạn vẫn đạt SLA.",
      "Thêm cột DaDong với công thức =IF([@TrangThai]=\"Đã đóng\",1,0). Thêm cột DatSLA với =IF([@DaDong]=0,\"\",IF([@XuLyPhut]<=[@SLAPhut],1,0)). Nếu Excel dùng dấu chấm phẩy làm dấu phân cách đối số, đổi các dấu phẩy trong công thức.",
      "Chọn Insert → PivotTable → New Worksheet. Kéo ChiNhanh vào Rows. Kéo MaHS vào Values rồi chọn Count. Thêm DaDong và DatSLA vào Values rồi chọn Sum cho cả hai. Bật Grand Totals để đọc tổng.",
      "Ở ngoài PivotTable, chia tổng DatSLA cho tổng DaDong rồi định dạng Percentage. Kiểm tra lại HS004 có thời gian xử lý đúng bằng giới hạn 30 phút và HS011 chưa đóng. Viết một câu diễn giải kết quả kèm kỳ đo."
    ],
    questions: [
      { prompt: "Trong cả hai tuần có bao nhiêu hồ sơ đã đóng?", answer: 20, explain: "24 hồ sơ trừ 4 hồ sơ đang xử lý bằng 20 hồ sơ đã đóng." },
      { prompt: "Có bao nhiêu hồ sơ đã đóng đạt SLA?", answer: 14, explain: "Tuần 1 có 8 và tuần 2 có 6 hồ sơ đạt. Cả trường hợp xử lý đúng bằng giới hạn cũng đạt." },
      { prompt: "Tỷ lệ đạt SLA toàn kỳ là bao nhiêu phần trăm? Nhập số, ví dụ 85.", answer: 70, explain: "14 ÷ 20 × 100 = 70%. Mẫu số gồm các hồ sơ đã đóng." }
    ],
    solution: [
      "PivotTable theo chi nhánh, theo thứ tự tổng / đã đóng / đạt SLA: Hà Nội 8 / 8 / 4, Đà Nẵng 8 / 6 / 5, Cần Thơ 8 / 6 / 5.",
      "Có 6 hồ sơ đóng trễ, 14 hồ sơ đóng đúng hạn và 4 hồ sơ đang xử lý. Tổng ba nhóm bằng 24.",
      "Câu báo cáo mẫu: “Trong nhóm hồ sơ tiếp nhận từ 02 đến 13/11, 14/20 hồ sơ đã đóng đạt SLA (70%). Còn 4 hồ sơ đang xử lý tại thời điểm trích xuất.”"
    ]
  },
  {
    id: "doi-soat", title: "Tìm giao dịch lệch giữa hai sổ", tag: "Đối soát", minutes: 50,
    intro: "Hai bộ phận gửi sổ giao dịch cùng kỳ chốt. Nếu chỉ so tổng tiền, bạn sẽ không biết cần kiểm tra giao dịch nào. Hãy ghép theo mã, tách mã trùng và bàn giao danh sách ngoại lệ.",
    files: [{ label: "Sổ nội bộ (CSV)", path: "data/so-noi-bo.csv" }, { label: "Sao kê đối tác (CSV)", path: "data/sao-ke-doi-tac.csv" }],
    steps: [
      "Nhập hai CSV vào hai sheet, đặt tên NB và DT. Cả hai tệp đều có cột A là MaGD (mã giao dịch dùng để khớp), cột B là SoTienVND (số tiền nguyên theo VND). Trong tình huống này, mỗi bên dự kiến có đúng một dòng cho mỗi mã.",
      "Tạo sheet DoiSoat. Chép toàn bộ mã của cả hai nguồn vào cột A với tiêu đề MaGD. Chọn cột A → Data → Remove Duplicates. Thao tác này chỉ áp dụng cho danh sách mã ở sheet mới. Giữ nguyên hai bảng gốc để đếm lần xuất hiện.",
      "Tại dòng 2, nhập =COUNTIF(NB!A:A,A2) vào B2 và =COUNTIF(DT!A:A,A2) vào C2, kéo xuống. Ưu tiên kiểm tra trùng nếu một bên đếm được hơn 1 dòng. Nếu một bên đếm được 0 thì mã chỉ xuất hiện ở bên còn lại.",
      "Với mỗi mã có B=C=1, lấy số tiền bằng =SUMIF(NB!A:A,A2,NB!B:B) và =SUMIF(DT!A:A,A2,DT!B:B). Lấy số nội bộ trừ số đối tác. Nếu Excel yêu cầu, dùng dấu chấm phẩy để phân cách đối số.",
      "Tô màu và ghi nhãn từng mã: khớp, lệch tiền, thiếu bên đối tác, thiếu bên nội bộ, hoặc trùng mã. Thêm cột người xử lý và bằng chứng cần xin. Ghi nhận GD110 để kiểm tra nguồn trước khi điều chỉnh."
    ],
    questions: [
      { prompt: "Có bao nhiêu mã xuất hiện đúng một lần ở mỗi bên và khớp tiền?", answer: 7, explain: "GD101, GD102, GD103, GD105, GD106, GD107 và GD108 khớp cả khóa lẫn tiền." },
      { prompt: "Với GD104, số tiền nội bộ trừ số tiền đối tác bằng bao nhiêu VND? Nhập chữ số liền nhau.", answer: 50000, explain: "1.250.000 − 1.200.000 = +50.000 VND." },
      { prompt: "Mã giao dịch nào xuất hiện hai lần trong sổ nội bộ?", answer: "GD110", explain: "Sổ nội bộ có hai dòng 560.000 VND cho GD110, trong khi sao kê đối tác chỉ có một dòng." }
    ],
    solution: [
      "Có 11 mã phân biệt. 7 mã khớp và 4 mã ngoại lệ: GD104 lệch tiền, GD109 chỉ có nội bộ, GD110 trùng ở nội bộ, GD111 chỉ có đối tác.",
      "Ví dụ ghi nhật ký: “GD104, lệch +50.000 VND, vận hành kiểm tra chứng từ gốc. GD109 và GD111 cần kiểm tra thời điểm ghi nhận hai bên. GD110 cần xác minh có ghi lặp hay có hai bút toán thực sự.”",
      "Nguyên nhân chênh lệch vẫn cần được xác minh. Sau khi nhận phản hồi, lưu bằng chứng và chạy lại cùng quy tắc trên bản dữ liệu cập nhật."
    ]
  },
  {
    id: "dashboard", title: "Thiết kế dashboard cho trưởng phòng", tag: "Power BI", minutes: 50,
    intro: "Quản lý muốn nhìn trong một trang xem tỷ lệ đúng hạn đang tăng hay giảm và chi nhánh nào cần xem lại. Bạn có thể làm trong Power BI Desktop hoặc dùng hai PivotTable cùng biểu đồ trong Excel.",
    files: [{ label: "Hồ sơ vận hành · 24 dòng (CSV)", path: "data/ho-so-van-hanh.csv" }],
    steps: [
      "Trong Power BI Desktop, chọn Get data → Text/CSV → Transform Data, đặt tên bảng HoSo. Đặt MaHS, ChiNhanh, TrangThai, NghiepVu, LyDoTre là Text, NgayNhan là Date, các cột Tuan, XuLyPhut và SLAPhut là Whole Number. Mỗi MaHS xuất hiện một lần.",
      "Trong Power Query, chọn Add Column → Custom Column. Đặt tên DaDong và nhập if [TrangThai] = \"Đã đóng\" then 1 else 0. Thêm DatSLA với if [DaDong] = 0 then null else if [XuLyPhut] <= [SLAPhut] then 1 else 0. Chọn Whole Number cho hai cột mới, sau đó Close & Apply.",
      "Tạo hai measure qua Modeling → New measure: SoDaDong = SUM(HoSo[DaDong]) và TyLeSLA = DIVIDE(SUM(HoSo[DatSLA]), [SoDaDong]). Đặt TyLeSLA thành Percentage. Trong Excel, tính tỷ lệ bằng tổng hồ sơ đạt chia tổng số đã đóng theo từng nhóm.",
      "Tạo biểu đồ cột với Tuan trên trục ngang và TyLeSLA trên trục dọc, biểu đồ thanh theo ChiNhanh và hai thẻ chỉ số SoDaDong, TyLeSLA. Thêm slicer NghiepVu. Đặt tiêu đề “Tỷ lệ đạt SLA theo tuần tiếp nhận” và giữ trục tỷ lệ trong khoảng 0–100%.",
      "Xóa bộ lọc để kiểm tra tổng 20 hồ sơ đã đóng. Lần lượt chọn từng tuần rồi đối chiếu biểu đồ với số đếm gốc. Viết một nhận xét gồm trị số, độ thay đổi theo điểm phần trăm và bước cần kiểm chứng."
    ],
    questions: [
      { prompt: "Trong nhóm hồ sơ tiếp nhận tuần 2, tỷ lệ đạt SLA là bao nhiêu phần trăm? Nhập số.", answer: 60, explain: "Nhóm tuần 2 có 6 hồ sơ đạt trên 10 hồ sơ đã đóng." },
      { prompt: "Từ tuần 1 sang tuần 2, tỷ lệ đạt SLA giảm bao nhiêu điểm phần trăm?", answer: 20, explain: "80% − 60% = 20 điểm phần trăm. Mức giảm tương đối là 25%." },
      { prompt: "Riêng Hà Nội trong tuần 2 có bao nhiêu hồ sơ đã đóng bị trễ?", answer: 3, explain: "HS013, HS016 và HS021 ở Hà Nội đều vượt giới hạn SLA của hồ sơ thẻ." }
    ],
    solution: [
      "Tuần 1 có 8/10 hồ sơ đã đóng đạt SLA, tuần 2 có 6/10. Cả kỳ có 14/20. So sánh theo tuần tiếp nhận vì dữ liệu chỉ cung cấp ngày tiếp nhận.",
      "Lọc tuần 2: Hà Nội đạt 1/4, Đà Nẵng đạt 2/3, Cần Thơ đạt 3/3. Hiển thị mẫu số ngay cạnh tỷ lệ để quản lý thấy quy mô từng nhóm.",
      "Nhận xét mẫu: “Tỷ lệ đúng hạn giảm từ 80% xuống 60%. Hà Nội có 3 hồ sơ thẻ bị trễ và đều được ghi lý do thiếu chứng từ. Cần kiểm tra hồ sơ gốc trước khi kết luận nguyên nhân.”"
    ]
  },
  {
    id: "cai-tien", title: "Đề xuất cải tiến và báo cáo bằng tiếng Anh", tag: "Cải tiến vận hành", minutes: 35,
    intro: "Bạn được giao đề xuất một thử nghiệm nhỏ sau khi báo cáo phát hiện hồ sơ trễ. Hãy chọn việc ưu tiên bằng dữ liệu, xác định cách đo và soạn email ngắn cho quản lý.",
    files: [{ label: "Hồ sơ và lý do trễ (CSV)", path: "data/ho-so-van-hanh.csv" }],
    steps: [
      "Lọc TrangThai = Đã đóng. So sánh XuLyPhut với SLAPhut để tìm các hồ sơ trễ. LyDoTre là lý do nhân viên ghi nhận cho hồ sơ trễ. Nhóm theo LyDoTre và đếm MaHS, sau đó kiểm tra theo NghiepVu và ChiNhanh.",
      "Tính đường cơ sở cho nhóm sẽ thử nghiệm: trong tất cả hồ sơ thẻ đã đóng ở Hà Nội, đếm số có LyDoTre là Thiếu chứng từ rồi chia cho tổng hồ sơ thẻ đã đóng tại Hà Nội. Ghi cả tử số và mẫu số.",
      "Phác thảo ba bước của thử nghiệm: người tiếp nhận kiểm danh mục chứng từ, hệ thống nhắc mục còn thiếu, nhân viên xác nhận trước khi chuyển thẩm định. Đề xuất ai theo dõi ngoại lệ và cách xử lý nếu công cụ nhắc sai.",
      "Lập kế hoạch theo dõi trong hai tuần: ghi số hồ sơ thiếu chứng từ, số hồ sơ thẻ đã đóng và thời gian xử lý. So sánh cùng nghiệp vụ và chi nhánh. Nếu số mẫu ít, ghi rõ độ bất định và tiếp tục theo dõi.",
      "Soạn email tiếng Anh 3 câu: một câu mô tả bằng chứng, một câu đề xuất thử nghiệm, một câu nêu cách đo. Dùng completed cases (hồ sơ đã đóng), missing documents (thiếu chứng từ), pilot (thử nghiệm) và monitor (theo dõi)."
    ],
    questions: [
      { prompt: "Có bao nhiêu hồ sơ trễ được ghi lý do “Thiếu chứng từ” trong cả hai tuần?", answer: 4, explain: "Bốn mã là HS003, HS013, HS016 và HS021. Hai hồ sơ trễ khác được ghi nhận lỗi hệ thống." },
      { prompt: "Trong cả hai tuần, có tổng cộng bao nhiêu hồ sơ thẻ đã đóng ở Hà Nội?", answer: 5, explain: "Các mã HS003, HS010, HS013, HS016 và HS021 tạo thành mẫu số của nhóm thử nghiệm." },
      { prompt: "Tỷ lệ hồ sơ thẻ đã đóng tại Hà Nội bị trễ do thiếu chứng từ là bao nhiêu phần trăm? Nhập số.", answer: 80, explain: "Có 4 hồ sơ trễ do thiếu chứng từ trên 5 hồ sơ thẻ đã đóng tại Hà Nội, bằng 80%." }
    ],
    solution: [
      "Bằng chứng: 4/6 hồ sơ trễ trên toàn bộ dữ liệu mang lý do “Thiếu chứng từ”, cả 4 đều thuộc nhóm hồ sơ thẻ ở Hà Nội. Trong riêng nhóm dự kiến thử nghiệm, mức cơ sở là 4/5 hồ sơ (80%).",
      "Đề xuất: trưởng nhóm thẻ chọn một người phụ trách danh mục, nhân viên tiếp nhận đánh dấu các mục trước khi chuyển hồ sơ. Đo cùng một tỷ lệ trong hai tuần tiếp theo và kiểm tra xem thời gian tiếp nhận có tăng quá mức hay không.",
      "Email mẫu: “Four of the five completed card cases in Hanoi were late because of missing documents, according to our case log. I suggest a two-week pilot of a document checklist at intake. We will monitor the share of completed card cases delayed by missing documents and review handling time each week.”"
    ]
  }
];
