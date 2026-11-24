window.DayOne = {
 "rows": [
  [
   "MaHS",
   "ChiNhanh",
   "TrangThai",
   "XuLyPhut",
   "SLAPhut"
  ],
  [
   "HS001",
   "Hà Nội",
   "Đóng",
   "12",
   "30"
  ],
  [
   "HS002",
   "Đà Nẵng",
   "Đóng",
   "45",
   "60"
  ],
  [
   "HS003",
   "Hà Nội",
   "Đóng",
   "83",
   "60"
  ],
  [
   "HS004",
   "Cần Thơ",
   "Đóng",
   "30",
   "30"
  ],
  [
   "HS005",
   "Đà Nẵng",
   "Mở",
   "",
   "30"
  ],
  [
   "HS006",
   "Cần Thơ",
   "Đóng",
   "48",
   "60"
  ]
 ],
 "intro": "Dành 5 phút đọc tên cột và đơn vị, 5 phút lần theo hai hồ sơ đầu, 5 phút làm bài ôn 10 câu ngay bên dưới. Mỗi dòng ứng với một hồ sơ. MaHS là mã nhận diện. Thời gian xử lý và thời hạn cam kết (SLA) đều tính bằng phút. Trong bài này, tỷ lệ đạt hạn bằng số hồ sơ đã đóng có thời gian xử lý nhỏ hơn hoặc bằng SLA chia cho tổng số hồ sơ đã đóng.",
 "example": "Đọc ngang dòng HS001 để thấy Hà Nội hoàn tất hồ sơ trong 12 phút. So với SLA 30 phút, hồ sơ sớm 18 phút. HS005 đang mở nên ô thời gian hoàn tất để trống. Giữ nguyên ô trống khi nhập Excel.",
 "steps": [
  "Phút 0–4. Chép bảng trên vào Excel từ A1 đến E7. Kiểm tra còn đủ sáu mã và ô D6 của HS005 đang trống.",
  "Phút 4–9. Gõ KetQua tại F1. Tại F2 nhập =IF(C2=\"Mở\",\"Đang mở\",IF(D2<=E2,\"Đạt\",\"Trễ\")), rồi kéo xuống F7. Nếu Excel của bạn dùng dấu chấm phẩy để phân tách đối số, đổi các dấu phẩy trong công thức thành dấu chấm phẩy. Công thức này dùng cho bảng mẫu có đủ thời gian ở các hồ sơ đóng.",
  "Phút 9–12. Đếm tử số bằng =COUNTIF(F2:F7,\"Đạt\"). Đếm mẫu số bằng =COUNTIF(C2:C7,\"Đóng\"). Chia hai kết quả và định dạng Percentage.",
  "Phút 12–15. Lọc cột F lấy nhãn Trễ. Ghi lại mã hồ sơ và số phút vượt SLA. Tự đối chiếu: HS003 vượt 23 phút, toàn bảng có 4/5 hồ sơ đóng đạt hạn."
 ],
 "questions": [
  [
   "Trong bảng sáu hồ sơ, một dòng đại diện cho gì?",
   "Một hồ sơ tiếp nhận",
   "Một chi nhánh",
   "Một phút xử lý",
   "MaHS nhận diện hồ sơ trên từng dòng."
  ],
  [
   "Trường nào phù hợp để nhận diện hồ sơ?",
   "MaHS",
   "ChiNhanh",
   "TrangThai",
   "Chi nhánh và trạng thái có thể lặp lại."
  ],
  [
   "SLA trong bài có đơn vị nào?",
   "Phút",
   "Giờ",
   "Ngày",
   "SLA là thời hạn xử lý theo phút."
  ],
  [
   "Hồ sơ đang mở có XuLyPhut trống. Nên ghi nhận thế nào?",
   "Chưa có thời gian hoàn tất",
   "Hoàn tất trong 0 phút",
   "Đã trễ hạn",
   "Thiếu thời điểm kết thúc thì chưa xác định được thời gian hoàn tất."
  ],
  [
   "Điều kiện đạt hạn khi hồ sơ đã đóng là gì?",
   "XuLyPhut ≤ SLAPhut",
   "XuLyPhut > SLAPhut",
   "XuLyPhut = 0",
   "Đúng bằng ngưỡng vẫn đạt."
  ],
  [
   "Mẫu số của tỷ lệ đạt hạn trong bài gồm nhóm nào?",
   "Hồ sơ đã đóng",
   "Tất cả hồ sơ",
   "Chỉ hồ sơ trễ",
   "Quy ước bài học chỉ đánh giá hồ sơ đã hoàn tất."
  ],
  [
   "Khi nhập HS001, nên đặt kiểu dữ liệu nào?",
   "Text",
   "Date",
   "Percentage",
   "Mã là nhãn định danh."
  ],
  [
   "Muốn biết hồ sơ nào trễ, cần đối chiếu hai cột nào trên cùng dòng?",
   "XuLyPhut và SLAPhut",
   "MaHS và ChiNhanh",
   "ChiNhanh và TrangThai",
   "Hai cột cùng đơn vị và cùng hồ sơ."
  ],
  [
   "Từng hồ sơ có thể có SLA khác nhau. Cách kiểm đúng là gì?",
   "So với SLA của chính hồ sơ",
   "Dùng SLA lớn nhất",
   "Dùng SLA nhỏ nhất",
   "Dùng một ngưỡng cho mọi hồ sơ có thể phân loại sai."
  ],
  [
   "Một hồ sơ xuất hiện hai lần. Bước đầu nên làm gì?",
   "Đánh dấu và tìm nguyên nhân lặp",
   "Xóa cả hai dòng",
   "Đếm thành hai khách hàng",
   "Cần xác định lặp do nhập trùng hay ghi nhận hai sự kiện khác nhau."
  ],
  [
   "Có bao nhiêu hồ sơ trong bảng?",
   "6",
   "5",
   "7",
   "Đếm sáu mã từ HS001 đến HS006."
  ],
  [
   "Có bao nhiêu hồ sơ đã đóng?",
   "5",
   "4",
   "6",
   "HS005 đang mở, năm hồ sơ còn lại đã đóng."
  ],
  [
   "Hồ sơ nào đang mở?",
   "HS005",
   "HS004",
   "HS006",
   "Dòng HS005 ghi trạng thái Mở."
  ],
  [
   "Hồ sơ nào hoàn tất đúng bằng thời hạn?",
   "HS004",
   "HS002",
   "HS006",
   "HS004 mất 30 phút với SLA 30 phút."
  ],
  [
   "HS003 trễ bao nhiêu phút?",
   "23",
   "60",
   "83",
   "83 − 60 = 23 phút."
  ],
  [
   "HS001 hoàn tất sớm bao nhiêu phút?",
   "18",
   "12",
   "30",
   "30 − 12 = 18 phút."
  ],
  [
   "HS002 và HS006 có chung đặc điểm nào?",
   "Cùng SLA 60 phút và đều đạt",
   "Cùng chi nhánh",
   "Cùng thời gian xử lý",
   "Hai hồ sơ lần lượt mất 45 và 48 phút."
  ],
  [
   "Có bao nhiêu hồ sơ đã đóng đạt hạn?",
   "4",
   "5",
   "3",
   "HS001, HS002, HS004 và HS006 đều đạt."
  ],
  [
   "Tỷ lệ đạt hạn toàn bảng theo quy ước là bao nhiêu?",
   "4/5",
   "4/6",
   "5/6",
   "4 trong 5 hồ sơ đã đóng đạt, bằng 80%."
  ],
  [
   "Tỷ lệ trễ trong nhóm đã đóng?",
   "20%",
   "16,7%",
   "25%",
   "1/5 = 20%."
  ],
  [
   "Hà Nội có bao nhiêu hồ sơ trễ?",
   "1",
   "2",
   "0",
   "HS003 trễ, HS001 đạt."
  ],
  [
   "Tỷ lệ đạt hạn của Hà Nội?",
   "50%",
   "100%",
   "66,7%",
   "1/2 hồ sơ đóng đạt."
  ],
  [
   "Đà Nẵng có mẫu số bằng bao nhiêu khi tính tỷ lệ đạt hạn?",
   "1",
   "2",
   "0",
   "Chỉ HS002 đã đóng."
  ],
  [
   "Cần Thơ có tỷ lệ đạt hạn bao nhiêu?",
   "100%",
   "50%",
   "0%",
   "HS004 và HS006 đều đạt."
  ],
  [
   "Tổng số phút xử lý của năm hồ sơ đóng?",
   "218",
   "208",
   "228",
   "12+45+83+30+48 = 218."
  ],
  [
   "Thời gian xử lý trung bình của nhóm đã đóng?",
   "43,6 phút",
   "36,3 phút",
   "45 phút",
   "218/5 = 43,6 phút."
  ],
  [
   "Trung vị thời gian xử lý của nhóm đã đóng?",
   "45 phút",
   "43,6 phút",
   "48 phút",
   "Sắp xếp 12, 30, 45, 48, 83. Giá trị giữa là 45."
  ],
  [
   "Khoảng biến thiên thời gian xử lý?",
   "71 phút",
   "83 phút",
   "95 phút",
   "83 − 12 = 71 phút."
  ],
  [
   "Nếu HS005 đóng ở phút thứ 28, tỷ lệ đạt hạn mới là gì?",
   "5/6",
   "4/6",
   "5/5",
   "HS005 có SLA 30 nên cả tử và mẫu đều tăng một."
  ],
  [
   "Nếu HS005 đóng ở phút thứ 31, tỷ lệ đạt hạn mới là gì?",
   "4/6",
   "5/6",
   "4/5",
   "Hồ sơ mới đóng bị trễ, chỉ mẫu số tăng."
  ],
  [
   "Nếu ghi nhầm điều kiện thành thời gian < SLA, hồ sơ nào bị đổi nhãn?",
   "HS004",
   "HS003",
   "HS005",
   "HS004 nằm đúng tại ngưỡng."
  ],
  [
   "Nếu HS001 bị nhân đôi và cả hai dòng đều được đếm, tỷ lệ đạt sai là gì?",
   "5/6",
   "4/6",
   "4/5",
   "Bản sao của hồ sơ đạt khiến tử số thành 5, mẫu số thành 6."
  ],
  [
   "Ô F2 là cột kết quả mới. Chọn quy tắc xét trước tiên.",
   "Kiểm tra trạng thái đã đóng",
   "So chi nhánh với Hà Nội",
   "Đếm tất cả ô trống",
   "Kiểm tra trạng thái trước để tránh tính hồ sơ mở là đạt."
  ],
  [
   "Bản ghi mới đã đóng nhưng thiếu XuLyPhut. Nên làm gì trước khi công bố KPI?",
   "Đưa vào danh sách thiếu dữ liệu để xác minh",
   "Điền 0",
   "Điền SLA",
   "Không đủ số liệu để gán đạt hoặc trễ."
  ],
  [
   "Quản lý hỏi có bao nhiêu hồ sơ chưa xong. Nên trả chỉ số nào?",
   "Số hồ sơ đang mở",
   "Số hồ sơ trễ",
   "Trung vị thời gian",
   "Chỉ số tồn tại thời điểm chốt là số hồ sơ mở."
  ],
  [
   "Muốn đếm hồ sơ theo chi nhánh bằng PivotTable, chọn gì?",
   "Rows = ChiNhanh, Values = Count of MaHS",
   "Rows = XuLyPhut, Values = Sum of SLAPhut",
   "Values = Sum of MaHS",
   "Chi nhánh là chiều phân nhóm, MaHS là trường dùng để đếm sau kiểm trùng."
  ],
  [
   "Khi tổng hợp ba chi nhánh, công thức đúng là gì?",
   "Tổng số đạt chia tổng số đã đóng",
   "Lấy tỷ lệ cao nhất",
   "Lấy trung bình cộng ba tỷ lệ",
   "Mẫu số của các chi nhánh lần lượt là 2, 1 và 2."
  ],
  [
   "Muốn phân tích nguyên nhân HS003 trễ, cần bổ sung gì?",
   "Các mốc xử lý và lý do chờ của hồ sơ",
   "Màu nền của ô",
   "Tổng số chi nhánh",
   "Biết số phút vượt hạn chưa đủ để quy kết nguyên nhân."
  ],
  [
   "Hồ sơ đang mở có thể đánh giá nguy cơ quá hạn nếu có thêm gì?",
   "Giờ nhận, giờ chốt và quy tắc tính thời gian",
   "Tên màu trạng thái",
   "Mã khách hàng bất kỳ",
   "Có thể tính thời gian đã trôi qua đến mốc chốt theo cùng quy tắc SLA."
  ],
  [
   "Câu báo cáo nào đủ tử số, mẫu số và ngoại lệ?",
   "4/5 hồ sơ đã đóng đạt hạn. HS003 trễ 23 phút. Còn 1 hồ sơ mở.",
   "Tỷ lệ rất tốt",
   "Có sáu hồ sơ đạt",
   "Câu cuối giúp kiểm lại cả tỷ lệ lẫn phạm vi."
  ]
 ]
};
