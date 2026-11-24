// Worked examples use the synthetic data distributed with this course.
(() => {
  const cases = {
    "2": {
      "title": "Đọc HS004 như một dòng từ điển dữ liệu",
      "example": "HS004, Cần Thơ, 30, 30. Hai số 30 có cùng đơn vị phút nhưng trả lời hai câu khác nhau. XuLyPhut là thời gian thực tế của hồ sơ, còn SLAPhut là thời gian được phép.",
      "explain": "Với HS003, hai số lần lượt là 83 và 60. Phép trừ 83 − 60 = 23 cho biết số phút vượt hạn. Nếu đảo nghĩa cột, kết luận sẽ đảo chiều. Trong từ điển, ghi cả ý nghĩa, đơn vị và ví dụ cho mỗi trường."
    },
    "3": {
      "title": "Phục hồi một lần lọc nhầm",
      "example": "Giả sử khi lọc Hà Nội, bạn xóa các dòng đang ẩn rồi lưu đè. Lần mở sau chỉ còn 8 mã. Nếu giữ riêng CSV nguồn, bạn có thể nhập lại đủ 24 mã vào bản làm việc.",
      "explain": "Ghi tên tệp và ngày lấy dữ liệu trên sheet nguồn. Sau mỗi lần nhập, so số dòng, số mã phân biệt và ngày nhỏ nhất/lớn nhất. Hai lần nhập có cùng số dòng vẫn có thể khác ngày hoặc khác mã."
    },
    "4": {
      "title": "Kiểm hai điều kiện cùng lúc",
      "example": "HS003 thuộc Hà Nội và là hồ sơ thẻ. HS001 cũng ở Hà Nội nhưng là chuyển tiền. HS002 là hồ sơ thẻ nhưng thuộc Đà Nẵng. Trong ba mã này, chỉ HS003 thỏa cả hai điều kiện.",
      "explain": "Lọc lần lượt hai cột để thu hẹp tập quan sát. Kiểm tra một mã bị loại vì địa bàn và một mã bị loại vì nghiệp vụ. Khi xóa bộ lọc chi nhánh, tập kết quả có thể mở rộng."
    },
    "5": {
      "title": "Chia đúng tổng khi tính tỷ trọng",
      "example": "Cả ba chi nhánh đều có 8 trên tổng 24 hồ sơ. Từng tỷ trọng bằng 8/24 = 1/3. Hiển thị một chữ số thập phân sẽ cho 33,3% mỗi nơi và tổng số hiển thị là 99,9%.",
      "explain": "Giữ độ chính xác của giá trị trong ô và chỉ làm tròn ở định dạng hiển thị. Nếu tổng tỷ trọng chưa làm tròn khác 100%, kiểm lại phạm vi mẫu số hoặc một mã bị đếm ở nhiều nhóm."
    },
    "6": {
      "title": "Kiểm KPI bằng ba ca khác nhau",
      "example": "HS004 đóng đúng 30 phút trên ngưỡng 30 nên đạt. HS008 đóng trong 42 phút trên ngưỡng 30 nên trễ. HS011 đang mở và chưa có kết quả cuối. Trong ba mã, tỷ lệ đạt của hồ sơ đã đóng là 1/2.",
      "explain": "Viết điều kiện đủ tư cách trước khi tính tử số. Nếu coi ô trống là 0 rồi so với SLA, HS011 có thể bị đếm nhầm thành đạt. Đính kèm cả số đã đóng và số đang mở bên cạnh tỷ lệ."
    },
    "7": {
      "title": "Một bàn giao người nhận kiểm được",
      "example": "Người bàn giao ghi 24 hồ sơ tiếp nhận, 20 đã đóng và 4 đang xử lý. Người nhận cộng 20 + 4 để đối chiếu tổng, rồi tìm HS011 trong danh sách còn mở.",
      "explain": "Con số tổng kiểm tính đầy đủ, danh sách mã cho phép tiếp tục xử lý cụ thể. Ghi thời điểm chốt và người tiếp nhận ca, vì một hồ sơ có thể đổi trạng thái sau lúc trích xuất."
    },
    "8": {
      "title": "Vì sao dùng cờ 0 và 1?",
      "example": "Trong nhóm HS009, HS010, HS011, hai mã đầu đã đóng và mã cuối đang xử lý. Cờ DaDong là 1, 1, 0. Tổng cờ bằng 2, còn số dòng của nhóm là 3.",
      "explain": "Thử thêm một hồ sơ mở trên bản sao. Số dòng tăng một, tổng cờ không đổi. Đây là cách kiểm công thức đang đếm hồ sơ đóng thay vì đếm mọi dòng."
    },
    "9": {
      "title": "Cùng một thời gian, hai kết quả",
      "example": "Giả sử hai hồ sơ đều hoàn tất trong 45 phút. Hồ sơ thẻ có SLA 60 phút sẽ sớm 15 phút. Chuyển tiền có SLA 30 phút sẽ muộn 15 phút.",
      "explain": "Tham chiếu cột SLAPhut trên chính dòng đang tính. Một hằng số chung có thể cho kết quả đúng ở nhóm này nhưng sai ở nhóm khác. Thử thêm một hồ sơ hoàn tất đúng ngưỡng để kiểm phép so sánh."
    },
    "10": {
      "title": "Giải thích số đếm cho Hà Nội",
      "example": "Hà Nội có 8 hồ sơ đã đóng, 4 trong số đó đạt. Tỷ lệ của riêng Hà Nội là 4/8 = 50%. Khi lập bảng COUNTIFS, hai tập đếm phải cùng có điều kiện ChiNhanh = Hà Nội.",
      "explain": "Nếu tử số lọc chi nhánh còn mẫu số lấy cả 20 hồ sơ đóng, kết quả 4/20 = 20% sẽ mô tả một tỷ trọng khác. Gắn nhãn phạm vi bên cạnh từng cột số đếm."
    },
    "11": {
      "title": "Đọc tổng tiền cùng số dòng",
      "example": "GD110 có hai dòng nội bộ, mỗi dòng 560.000 VND. SUMIFS cho 1.120.000 VND, COUNTIF cho 2. Bên đối tác ghi một dòng 560.000 VND.",
      "explain": "Chỉ nhìn tổng một bên sẽ khó phát hiện nguyên nhân cần kiểm. Giữ từng dòng gốc và ghi giả thuyết cần xác minh, vì hai dòng bằng nhau có thể là ghi lặp hoặc hai phát sinh hợp lệ."
    },
    "12": {
      "title": "Một quan sát kéo trung bình đi bao xa?",
      "example": "Dãy 10, 12, 14, 16, 18 có trung bình 14 phút. Khi thay 18 bằng 98, tổng tăng 80 phút và trung bình tăng 80/5 = 16 phút, lên 30. Vị trí giữa vẫn là 14.",
      "explain": "Khi báo thời gian điển hình, trình bày cả số quan sát, trung bình và trung vị. Tra lại hồ sơ 98 phút trước khi quyết định giữ, sửa hay loại nó."
    },
    "13": {
      "title": "Gộp KPI từ số đếm gốc",
      "example": "Hà Nội đạt 4/8, Đà Nẵng 5/6 và Cần Thơ 5/6. Toàn bộ là (4 + 5 + 5)/(8 + 6 + 6) = 70%. Lấy trung bình ba tỷ lệ sẽ ra khoảng 72,2%.",
      "explain": "Lấy trung bình tỷ lệ cho ba chi nhánh cùng trọng số. Để mỗi hồ sơ có trọng số như nhau, cộng tử và mẫu trước khi chia. Hãy giữ cả hai số đếm khi chuyển bảng cho người khác."
    },
    "14": {
      "title": "Một bộ kiểm thử phát hiện lỗi biên",
      "example": "Đặt ba dòng thử đã đóng với SLA 30 phút và thời gian 29, 30, 31. Kết quả mong đợi theo thứ tự là đạt, đạt, trễ. Nếu dòng giữa thành trễ, kiểm xem công thức có dùng dấu nhỏ hơn nghiêm ngặt.",
      "explain": "Thử thêm dòng đang mở chưa ghi số phút. Bốn ca thử giúp phát hiện cả hai lỗi thường gặp là xử lý ranh giới và đưa hồ sơ chưa hoàn tất vào mẫu."
    },
    "15": {
      "title": "Ô trống có phải lúc nào cũng là lỗi?",
      "example": "HS011 đang xử lý và ô XuLyPhut trống là trạng thái hợp lệ của dữ liệu học. Nếu đổi trạng thái của bản sao HS011 thành Đã đóng nhưng vẫn bỏ trống số phút, quy tắc kiểm phải báo mã đó.",
      "explain": "Điều kiện báo lỗi kết hợp trạng thái với tính đầy đủ. Tách danh sách lỗi khỏi dữ liệu gốc để người soát có thể xem mã, quy tắc bị vi phạm và giá trị nguồn."
    },
    "16": {
      "title": "So số dòng trước khi ghép sổ",
      "example": "Sổ nội bộ có 11 dòng nhưng chỉ 10 mã khác nhau. Sao kê có 10 dòng và 10 mã. Việc hai nguồn có cùng số mã duy nhất chưa bảo đảm hai danh sách mã giống nhau.",
      "explain": "Đối chiếu thêm mã chỉ ở một phía, đơn vị VND và phạm vi kỳ được dùng. Ghi các tổng này trước khi ghép để nhận ra ngay nếu một phép nối làm mất hoặc nhân bản dòng."
    },
    "17": {
      "title": "Nhìn số lần ghép trước số tiền",
      "example": "Với GD110, hai dòng nội bộ cùng khớp một dòng đối tác. Nối thô tạo hai cặp. Nếu cộng cột đối tác sau phép nối, 560.000 VND sẽ bị tính thành 1.120.000 VND.",
      "explain": "Tính số dòng và tổng tiền từng bên trước khi ghép theo mã. Giữ cột số lần để người duyệt thấy ngay mã cần kiểm về tính duy nhất."
    },
    "18": {
      "title": "Kiểm danh mục bằng hai chiều",
      "example": "GD109 nằm ở nội bộ, GD111 nằm ở đối tác. Một danh sách khóa khởi đi chỉ từ sổ nội bộ sẽ tìm được GD109 nhưng bỏ sót GD111.",
      "explain": "Xếp hai danh sách MaGD nối tiếp, lấy các mã duy nhất, rồi đối chiếu mỗi mã với cả hai bên. Mã hiện 0 lần ở một phía có nghĩa vắng trong phạm vi tệp đang xét."
    },
    "19": {
      "title": "Giải thích dấu của GD104",
      "example": "Nội bộ ghi 1.250.000 VND, đối tác ghi 1.200.000 VND. Theo quy ước nội bộ trừ đối tác, chênh lệch là +50.000 VND. Nếu đổi thứ tự, số là −50.000 VND.",
      "explain": "Ghi quy ước vào tiêu đề cột. Giá trị tuyệt đối 50.000 giúp sắp thứ tự cần soát, còn dấu cho biết phải truy tìm chiều lệch nào."
    },
    "20": {
      "title": "Mở rồi đóng một phiếu ngoại lệ",
      "example": "Phiếu GD104 ghi hai số nguồn, độ lệch +50.000 VND, trạng thái Chờ xác minh và đầu mối kiểm. Khi có bằng chứng, người soát bổ sung nguyên nhân, ngày xử lý và người xác nhận.",
      "explain": "Không sửa số trên báo cáo chỉ để hai bên cân. Lưu liên kết đến dòng nguồn và bằng chứng giải quyết để lần rà soát sau tái hiện được quyết định."
    },
    "21": {
      "title": "Vì sao tổng lệch chưa đủ để nghiệm thu?",
      "example": "GD109 chỉ có ở nội bộ với 730.000 VND, GD111 chỉ có ở đối tác với 840.000 VND. Hai mã đóng góp +730.000 và −840.000 theo cùng quy ước, nên một phần chênh lệch bù nhau.",
      "explain": "So ở cấp mã trước khi cộng. Báo song song số mã khớp, số mã ngoại lệ và tổng lệch có dấu để người nhận biết cả quy mô công việc lẫn số tiền."
    },
    "22": {
      "title": "Đọc tổng cuối PivotTable",
      "example": "Đặt ChiNhanh ở Rows và MaHS ở Values với phép Count cho ba dòng 8, 8, 8. Grand Total 24 khớp số hồ sơ nguồn. Nếu lọc chỉ Đã đóng, số tổng còn 20.",
      "explain": "Đặt tên rõ là số hồ sơ và ghi bộ lọc hiện hành. Khi thay đổi dữ liệu nguồn, làm mới PivotTable rồi đối chiếu lại tổng theo cùng phạm vi."
    },
    "23": {
      "title": "Lần theo một ô của bảng chéo",
      "example": "Ô Cần Thơ × Đang xử lý có 2 hồ sơ, HS012 và HS024. Hàng Cần Thơ có tổng 8, do đó tỷ lệ mở trong chi nhánh là 2/8 = 25%.",
      "explain": "Nếu hỏi Cần Thơ chiếm bao nhiêu trong toàn nhóm mở, mẫu số đổi thành 4 và tỷ lệ là 50%. Viết câu hỏi ra trước khi chọn phần trăm theo hàng hay theo cột."
    },
    "24": {
      "title": "Diễn đạt biến động hai cách",
      "example": "Từ 8/10 đạt ở tuần 1 xuống 6/10 ở tuần 2, khoảng cách là 20 điểm phần trăm. Tính tương đối theo mức tuần 1, mức giảm là (0,8 − 0,6)/0,8 = 25%.",
      "explain": "Nêu cả hai mẫu số 10 để người đọc biết mức biến động đi cùng bao nhiêu quan sát. Trong báo cáo, dùng đúng đơn vị cho từng cách đo."
    },
    "25": {
      "title": "Hai tổ cùng mức trung bình 20 phút",
      "example": "Tổ A có 18, 20, 22 phút. Tổ B có 5, 20, 35 phút. Khoảng biến thiên của A là 4 phút, của B là 30 phút. Chỉ tiêu trung bình bỏ qua sự khác biệt này.",
      "explain": "Đặt các điểm dữ liệu lên cùng một trục để thấy mức phân tán. Với ba ca mỗi tổ, mô tả mẫu đang quan sát và kiểm thêm kỳ khác trước khi đánh giá độ ổn định dài hạn."
    },
    "26": {
      "title": "Đổi điều kiện là đổi câu trả lời",
      "example": "Từ 4 hồ sơ trễ của Hà Nội, có thể lập 4/8 = 50% trong hồ sơ đóng tại Hà Nội hoặc 4/6 ≈ 66,7% trong tất cả hồ sơ trễ toàn hệ thống.",
      "explain": "Cụm từ sau chữ “trong” xác định mẫu số. Viết mỗi tỷ lệ bằng lời và kèm số đếm trước khi dùng nó để so sánh chi nhánh."
    },
    "27": {
      "title": "Chọn thêm hồ sơ để kiểm giả thuyết",
      "example": "Năm hồ sơ thẻ Hà Nội đã đóng có bốn ca trễ, một ca đạt. Nếu chỉ phỏng vấn người xử lý bốn ca trễ, bạn chưa biết khâu nào cũng xuất hiện ở ca đạt.",
      "explain": "Đưa cả ca đạt vào nhóm đối chiếu. Mở rộng kỳ lấy mẫu theo cùng điều kiện nghiệp vụ và ghi cách chọn để lần sau có thể lặp lại."
    },
    "28": {
      "title": "Chọn hình theo câu người đọc hỏi",
      "example": "Nếu trưởng ca hỏi tuần nào đạt hạn thấp hơn, hai cột 80% và 60% trả lời nhanh. Đặt nhãn 8/10 và 6/10 dưới cột. Nếu hỏi mã nào gây trễ, dùng bảng chi tiết hồ sơ.",
      "explain": "So chiều dài cột trên trục có gốc 0. Tiêu đề ghi tuần tiếp nhận để người xem hiểu các hồ sơ được xếp vào tuần nào."
    },
    "29": {
      "title": "Rà ba số trước khi gửi báo cáo",
      "example": "Trang đầu ghi 24 hồ sơ tiếp nhận, 14/20 đã đóng đạt SLA và 4 mã giao dịch cần đối soát. Con số 4 thuộc hai sổ giao dịch, còn 24 và 20 thuộc bảng hồ sơ.",
      "explain": "Đính tên nguồn và đơn vị quan sát vào từng thẻ. Không lấy 4 mã ngoại lệ chia cho 24 hồ sơ khi chưa có khóa nối giữa hai tập."
    },
    "30": {
      "title": "Trả lời khi quản lý hỏi về mẫu số",
      "example": "Nếu chia 14 hồ sơ đạt cho 24 hồ sơ tiếp nhận, kết quả khoảng 58,3%. Báo cáo SLA dùng 14/20 = 70% vì có 4 hồ sơ đang xử lý ở thời điểm lấy dữ liệu.",
      "explain": "Khi bảo vệ số liệu, mở danh sách 4 mã đang xử lý rồi quay lại cột điều kiện Đã đóng. Người nghe có thể kiểm cả lý do và chênh lệch giữa hai mẫu số."
    },
    "31": {
      "title": "Một SELECT thay đổi chiều rộng của bảng",
      "example": "SELECT MaHS, ChiNhanh FROM HoSo trả 24 dòng với hai cột. Thêm TrangThai vào danh sách SELECT vẫn cho 24 dòng vì chưa có lọc hoặc tổng hợp.",
      "explain": "Dùng MaHS để kiểm hai kết quả đang mô tả cùng tập hồ sơ. Khi truy vấn NoiBo, khóa cần xem đổi thành MaGD và một mã có thể xuất hiện ở nhiều dòng."
    },
    "32": {
      "title": "Bỏ một điều kiện lọc",
      "example": "WHERE NghiepVu = 'Hồ sơ thẻ' trả 12 hồ sơ. Thêm AND ChiNhanh = 'Hà Nội' chỉ còn 5. HS002 bị loại vì thuộc Đà Nẵng dù đúng loại nghiệp vụ.",
      "explain": "Nếu kết quả khi thêm AND lại lớn hơn, kiểm xem hai truy vấn có cùng bảng và có vô tình đổi AND thành OR ở một điều kiện hay không."
    },
    "33": {
      "title": "Đếm khóa khác đếm dòng",
      "example": "Trong NoiBo, COUNT(*) bằng 11 và COUNT(DISTINCT MaGD) bằng 10. Độ chênh bằng 1 vì GD110 xuất hiện hai lần thay cho một lần.",
      "explain": "DISTINCT phù hợp để lập danh sách mã. Khi cần soát bút toán lặp, quay về các dòng gốc và giữ nguyên số tiền, tránh dùng DISTINCT để che đi dấu vết."
    },
    "34": {
      "title": "Danh sách hồ sơ lâu nhất có thể lặp lại",
      "example": "Sắp xếp các hồ sơ đã đóng theo XuLyPhut giảm dần cho HS013 với 95 phút, tiếp đến HS003 với 83 phút và HS016 với 78 phút. LIMIT 3 chỉ lấy ba dòng đầu sau sắp xếp.",
      "explain": "Thêm MaHS vào tiêu chí sắp để xử lý trường hợp bằng phút theo một quy ước ổn định. Sắp xếp theo thời lượng và theo số phút vượt SLA có thể cho thứ tự khác nhau."
    },
    "35": {
      "title": "Bốn thời gian chưa biết",
      "example": "COUNT(*) đếm 24 dòng trong HoSo, còn COUNT(XuLyPhut) đếm 20 giá trị có thời gian. Phép trừ 24 − 20 kiểm nhanh số ô thiếu. Dùng IS NULL để lấy danh sách bốn mã.",
      "explain": "Nếu điền 0, phép COUNT theo cột chuyển thành 24 và AVG sẽ bị kéo xuống. Hãy ghi rõ các hồ sơ đang mở khi trình bày thống kê thời gian."
    },
    "36": {
      "title": "Thứ tự các nhánh CASE",
      "example": "HS011 đang mở và chưa có XuLyPhut. Nếu chỉ xét WHEN XuLyPhut <= SLAPhut THEN 'Đạt' ELSE 'Trễ', điều kiện với NULL không đúng và bị rơi vào ELSE.",
      "explain": "Đặt nhánh hồ sơ mở lên trước, sau đó xử lý hồ sơ đóng thiếu dữ liệu nếu có, cuối cùng mới so ngưỡng. HS009 đúng 60/60 là ca thử cho nhánh Đạt."
    },
    "37": {
      "title": "Kiểm trung bình bằng hai số độc lập",
      "example": "Tổng thời gian của 20 hồ sơ đã đóng là 872 phút. AVG phải bằng 872/20 = 43,6 phút. Dải 12–95 phút cho biết giá trị nhỏ nhất và lớn nhất được đưa vào tính.",
      "explain": "Nếu chia tổng cho cả 24 dòng thì trung bình chỉ còn khoảng 36,3 phút. Đối chiếu COUNT của cột thời gian với mẫu số của phép chia tay."
    },
    "38": {
      "title": "Xác định một dòng sau GROUP BY",
      "example": "GROUP BY ChiNhanh tạo ba dòng. Nếu thêm Tuan, kết quả có sáu dòng ứng với ba chi nhánh trong hai tuần. Hà Nội trong tuần 2 là một nhóm gồm bốn hồ sơ.",
      "explain": "Cộng số hồ sơ trên sáu dòng phải về 24. Muốn tính tỷ lệ từ bảng đã nhóm, giữ cột số đạt và số đóng để tổng hợp theo trọng số thực."
    },
    "39": {
      "title": "Tìm trùng sau khi nhóm",
      "example": "GROUP BY MaGD HAVING COUNT(*) > 1 giữ lại nhóm GD110 trong NoiBo. Nhóm đó có hai dòng 560.000 VND và tổng 1.120.000 VND.",
      "explain": "WHERE lọc các dòng nguồn trước khi đếm. HAVING dùng khi điều kiện cần kết quả đã tổng hợp. Chạy cùng phép kiểm cho DoiTac để biết hiện tượng ở phía nào."
    },
    "40": {
      "title": "Tại sao JOIN có thể làm lớn tổng?",
      "example": "Nếu A có hai dòng mã X và B có ba dòng mã X, JOIN theo mã cho 2 × 3 = 6 cặp. Với GD110 thực tế, số cặp là 2 × 1 = 2.",
      "explain": "Kiểm tần suất khóa trước phép nối rồi đối chiếu lại tổng từng bên. Nếu yêu cầu là một dòng mỗi mã, tạo bảng tổng hợp từng phía trước khi nối."
    },
    "41": {
      "title": "Phép nối trái nhìn thấy phía nào?",
      "example": "Lấy NoiBo bên trái, LEFT JOIN với DoiTac và lọc khóa phía phải IS NULL giữ lại GD109. Đảo chiều hai bảng thì tìm được GD111 với 840.000 VND.",
      "explain": "Một lần nối trái chỉ trả được trường hợp thiếu theo một hướng. Đặt tên đầu ra rõ “chỉ nội bộ” hoặc “chỉ đối tác” để người xử lý mở đúng sổ."
    },
    "42": {
      "title": "Cột thêm vào làm thay đổi UNION",
      "example": "UNION hai danh sách chỉ có MaGD thu được 11 mã. Nếu thêm cột tên nguồn, một mã có ở cả hai tệp có thể hiện hai dòng, vì cặp mã và tên nguồn là hai giá trị khác nhau.",
      "explain": "Chỉ chọn khóa khi lập tập mã chung. Dùng UNION ALL kèm tên nguồn khi mục đích là gom toàn bộ 21 lượt ghi để kiểm số dòng."
    },
    "43": {
      "title": "Chọn ngưỡng toàn kỳ hay từng nhóm",
      "example": "Trung bình 20 hồ sơ đóng là 43,6 phút. HS002 mất 45 phút nên nằm trên trung bình này nhưng vẫn trong SLA 60 phút của hồ sơ thẻ.",
      "explain": "Trong truy vấn con, xác định rõ tập tính AVG. Việc vượt trung bình mô tả vị trí tương đối, còn vi phạm SLA phải so thời gian với cam kết trên chính dòng."
    },
    "44": {
      "title": "Tách đối soát thành bảng trung gian",
      "example": "Tạo một CTE nhóm nội bộ theo MaGD, gồm số lượt và tổng tiền, rồi làm tương tự ở đối tác. Mã GD110 có cặp số lượt 2 và 1, số tiền 1.120.000 và 560.000 VND.",
      "explain": "Ghép hai CTE trên danh mục 11 mã hợp nhất. Ghi riêng cờ thiếu, cờ lặp và số chênh để một loại bất thường không che mất loại còn lại."
    },
    "45": {
      "title": "Trả lời quản lý bằng một bảng SQL",
      "example": "Trưởng ca hỏi tuần nào cần xem lại. Kết quả theo tuần gồm 8 đạt/10 đóng ở tuần 1, 6/10 ở tuần 2. Mức giảm 20 điểm phần trăm dẫn tới việc mở danh sách trễ của tuần 2.",
      "explain": "Để truy vấn tái chạy được, dùng tổng cờ chia cho tổng cờ đã đóng và tránh chia số nguyên. Khi một nhóm không có hồ sơ đóng, kết quả tỷ lệ nên để trống kèm giải thích."
    },
    "46": {
      "title": "Kiểm notebook có đọc đúng tệp",
      "example": "Ngay sau read_csv, df.shape cho (24, 9). Hai con số là dòng dữ liệu và số cột, hàng tiêu đề đã được dùng làm tên trường. df.head(2) hiển thị HS001 và HS002.",
      "explain": "Đối chiếu trường MaHS, NgayNhan, XuLyPhut trước khi viết công thức. Nếu chỉ ra một cột có nhiều dấu phẩy trong tên, kiểm dấu tách cột của lệnh nhập."
    },
    "47": {
      "title": "Cùng lọc bằng mặt nạ và chọn cột",
      "example": "Mặt nạ df['ChiNhanh'].eq('Hà Nội') giữ tám dòng. Dùng .loc với mặt nạ đó và danh sách ['MaHS','NghiepVu'] sẽ cho tám dòng và hai cột.",
      "explain": "Nếu thêm điều kiện hồ sơ thẻ bằng toán tử &, chỉ còn năm dòng. Đặt từng biểu thức so sánh trong ngoặc và kiểm lại một mã nằm ngoài nhóm như HS001."
    },
    "48": {
      "title": "Tách lỗi nhập liệu khỏi thiếu hợp lệ",
      "example": "Nếu bản sao HS001 ghi XuLyPhut là '12 phút', chuyển theo kiểu số với errors='coerce' sẽ tạo giá trị thiếu. Sau chuyển, số thiếu tăng từ 4 lên 5.",
      "explain": "So cột ban đầu với cột đã chuyển. Bốn mã đang xử lý thiếu hợp lệ, còn HS001 đã đóng và có văn bản cần chuẩn hóa. Giữ bản gốc để truy lại sự khác nhau."
    },
    "49": {
      "title": "Một khoảng trắng tách thành hai nhóm",
      "example": "Giả sử một dòng ghi 'Hà Nội ' còn các dòng khác ghi 'Hà Nội'. Trước làm sạch, đếm giá trị duy nhất có thể thấy bốn nhãn chi nhánh. Sau khi bỏ khoảng trắng đầu cuối, còn ba.",
      "explain": "Lưu giá trị gốc và nhãn đã chuẩn hóa vào hai cột. Đối chiếu số dòng 24 và tổng theo mã trước, sau để bảo đảm chỉ thay nhãn."
    },
    "50": {
      "title": "Tạo hai mặt nạ riêng cho SLA",
      "example": "DaDong nhận True cho 20 dòng. DatSLA nhận True khi dòng đã đóng và XuLyPhut không vượt SLAPhut, tổng cộng 14 dòng. HS004 phải nằm trong cả hai tập.",
      "explain": "Phép .mean() trên mặt nạ DatSLA của toàn 24 dòng sẽ ra 58,3%. Để tính tỷ lệ trong hồ sơ đã đóng, chia tổng DatSLA cho tổng DaDong."
    },
    "51": {
      "title": "Tránh trung bình các tỷ lệ con",
      "example": "Sau groupby theo tuần, bảng có số đã đóng lần lượt 10, 10 và số đạt 8, 6. Toàn kỳ 14/20 = 70%. Trong bộ này trung bình hai tỷ lệ cũng là 70% vì mẫu số tình cờ bằng nhau.",
      "explain": "Thử thêm một hồ sơ trễ ở riêng tuần 2 trên bản sao. Lúc này trung bình hai tỷ lệ sẽ khác tỷ lệ tính từ tổng tử và mẫu. Quy tắc cộng số đếm vẫn đúng với cả hai trường hợp."
    },
    "52": {
      "title": "Hai dòng cùng mã cần được xem cùng nhau",
      "example": "duplicated('MaGD', keep=False) đánh dấu cả hai dòng GD110, còn thiết lập mặc định chỉ đánh dấu dòng xuất hiện sau. Nếu chỉ gửi một dòng, người soát khó hiểu nó trùng với dòng nào.",
      "explain": "Sắp xếp danh sách kiểm theo mã và giữ số tiền, vị trí nguồn. Quyết định loại dòng cần bằng chứng nghiệp vụ ngoài việc hai giá trị giống nhau."
    },
    "53": {
      "title": "Giải nghĩa nhãn của outer merge",
      "example": "Ghép hai danh sách mã duy nhất với nội bộ bên trái. GD109 có nhãn left_only, GD111 có nhãn right_only và GD104 là both dù hai số tiền lệch nhau.",
      "explain": "Chỉ báo merge phản ánh sự hiện diện của khóa. Sau khi biết hai phía cùng có mã, tiếp tục so số lần và số tiền để phân loại chênh."
    },
    "54": {
      "title": "Đừng nhầm ngày tiếp nhận với ngày đóng",
      "example": "Ngày 13/11 có HS021–HS024, nên groupby(NgayNhan).size() trả 4 hồ sơ tiếp nhận. Hai trong bốn mã đó vẫn đang xử lý ở thời điểm trích xuất.",
      "explain": "Đặt tiêu đề là hồ sơ tiếp nhận theo ngày. Bảng nguồn thiếu thời điểm đóng, vì thế không thể dùng trường NgayNhan để tính số hồ sơ thực sự hoàn tất trong ngày đó."
    },
    "55": {
      "title": "Giải thích vì sao trung vị bằng 40",
      "example": "Sắp 20 thời gian đã đóng theo thứ tự tăng. Hai vị trí giữa là thứ 10 và 11, tương ứng 38 và 42 phút, nên trung vị là (38 + 42)/2 = 40 phút.",
      "explain": "Trung bình 43,6 phút cao hơn trung vị. Mở các ca 74–95 phút để hiểu đuôi dài của mẫu, sau đó tìm thêm bằng chứng trước khi giải thích nguyên nhân."
    },
    "56": {
      "title": "Đọc hai phiên bản của bảng chéo",
      "example": "Hà Nội có 4 trễ và 4 đạt trong 8 đã đóng. Đà Nẵng và Cần Thơ mỗi nơi có 1 trễ trong 6. Tổng số trễ của bảng là 6 và tỷ lệ theo hàng của Hà Nội là 50%.",
      "explain": "Giữ bảng số đếm cạnh bảng tỷ lệ. Tỷ lệ theo hàng giúp so mức trễ trong từng chi nhánh, còn số đếm cho biết số hồ sơ thực sự cần tra."
    },
    "57": {
      "title": "Một kiểm thử phải phát hiện được lỗi",
      "example": "Trên dữ liệu sạch, df['MaHS'].is_unique là True. Nối thêm bản sao HS001 ở cuối bảng thì kiểm này phải thất bại. Tổng dòng cũng tăng lên 25.",
      "explain": "Chỉ chạy trước trên tệp sạch chưa đủ biết phép kiểm có bắt đúng lỗi dự kiến. Giữ bản thử và nguồn chuẩn riêng, rồi chạy lại từ đầu với nguồn chuẩn."
    },
    "58": {
      "title": "Mở lại chính tệp vừa xuất",
      "example": "Bảng theo chi nhánh có ba dòng, mỗi dòng 8 hồ sơ. Sau to_csv(index=False), đọc lại đầu ra để kiểm tên hai cột, ba khóa khác nhau và tổng SoHoSo bằng 24.",
      "explain": "Nếu quên index=False, tệp có thêm cột chỉ số. Một lần đọc kiểm đầu ra giúp phát hiện cả lỗi cấu trúc lẫn lỗi cộng tổng trước khi gửi."
    },
    "59": {
      "title": "Đối soát bằng pandas ở cấp mã",
      "example": "Khi nhóm theo MaGD từng nguồn trước outer merge, GD110 xuất hiện một hàng kết quả với số lần 2 và 1. GD109 và GD111 vẫn hiện dù thiếu một phía.",
      "explain": "Tạo chỉ báo hiện diện trước khi điền 0 vào cột tiền để tính chênh. Điều đó phân biệt được “không tìm thấy mã” với một giao dịch hợp lệ có giá trị bằng 0."
    },
    "60": {
      "title": "Khoanh vùng bất đồng giữa ba công cụ",
      "example": "Nếu Excel tính 14 hồ sơ đạt nhưng truy vấn SQL chỉ tính 12, đối chiếu danh sách mã thay vì nhìn riêng tổng. HS004 và HS009 đều hoàn tất đúng ngưỡng và sẽ bị loại bởi dấu <.",
      "explain": "Ghi chung quy ước <= vào tài liệu bàn giao, sau đó chạy lại cùng nguồn. So cả tử số, mẫu số và mã khác nhau trước khi ký xác nhận."
    },
    "61": {
      "title": "Theo một hồ sơ qua ba lớp Power BI",
      "example": "HS003 từ CSV mang 83 phút thực tế và SLA 60. Power Query chuẩn hóa hai cột thành số, mô hình tính hồ sơ này là trễ và báo cáo hiển thị nó trong danh sách cần rà.",
      "explain": "Khi thẻ cho kết quả bất ngờ, bắt đầu từ mã hồ sơ ở bảng chi tiết rồi truy ngược qua kiểu dữ liệu và bước nhập. Cách này giúp tách lỗi hiển thị khỏi lỗi nguồn."
    },
    "62": {
      "title": "Kiểm bản xem trước trước khi nạp",
      "example": "Nếu cột tiền '1250000' bị đọc thành text, bạn vẫn thấy con số quen thuộc nhưng sẽ khó tổng hợp đúng. Nếu mã có số 0 đầu bị đọc thành số, đổi sang text sau đó không tự phục hồi số 0.",
      "explain": "Xác lập kiểu dữ liệu ngay gần bước nguồn. Đối soát ba số dòng 24, 11 và 10, kiểm vài nhãn có dấu tiếng Việt, rồi mới nạp vào mô hình."
    },
    "63": {
      "title": "Tạo cờ trong Power Query",
      "example": "Với HS011, nhánh trạng thái đang xử lý trả cờ DaDong = 0 và DatSLA = 0. Với HS009, hồ sơ đã đóng ở 60/60 phút nên cả hai cờ bằng 1. HS013 đã đóng nhưng vượt hạn nên cặp cờ là 1 và 0.",
      "explain": "Mỗi nhánh có một ca kiểm thực tế. Lúc làm mới dữ liệu, tổng cờ hỗ trợ kiểm lại quy tắc nhất quán giữa Power Query và Excel."
    },
    "64": {
      "title": "Lọc tám hồ sơ từ một khóa chi nhánh",
      "example": "DimCN có một dòng cho Hà Nội. Quan hệ một–nhiều từ DimCN sang HoSo cho phép chọn Hà Nội để thu được tám hồ sơ. Nếu DimCN có hai dòng cùng mã, phía “một” mất tính duy nhất.",
      "explain": "Trước khi tạo quan hệ, kiểm khóa trống và lặp ở danh mục. Sau khi nối, chọn lần lượt từng chi nhánh và so số đếm với bảng nguồn."
    },
    "65": {
      "title": "Một danh mục chung cho hai sổ",
      "example": "Chọn GD110 trên DimGD. Ngữ cảnh lọc tới hai dòng nội bộ và một dòng đối tác. Từ cùng lựa chọn, hai tổng tiền vẫn được tính trên từng sổ riêng.",
      "explain": "Đặt hai bảng chi tiết cạnh nhau, ghi số lượt và số tiền. Mã chỉ có ở một bên vẫn phải chọn được từ DimGD, vì danh mục gồm hợp khóa của cả hai sổ."
    },
    "66": {
      "title": "Kết quả measure thay đổi theo tuần",
      "example": "Measure SUM(DatSLA)/SUM(DaDong) cho 14/20 trên toàn kỳ, nhưng còn 6/10 khi lọc tuần 2. Hai kết quả dùng cùng quy tắc và khác nhóm dòng được xét.",
      "explain": "Trong DAX có thể dùng DIVIDE cho phép chia khi mẫu bằng 0. Định dạng dưới dạng phần trăm và hiển thị số đã đóng bên cạnh để giải thích kết quả trống."
    },
    "67": {
      "title": "Đọc một ô ma trận theo hai bộ lọc",
      "example": "Ô Hà Nội × tuần 2 gồm HS013, HS016, HS021 và HS022. Trong đó chỉ HS022 đạt nên measure là 1/4 = 25%. Lọc riêng toàn tuần 2 cho 6/10 = 60%.",
      "explain": "Khi số ở một ô sai, tạm hiện danh sách MaHS để xem những điều kiện nào đang áp dụng. Tổng cuối ma trận phải tính lại từ các hồ sơ đủ điều kiện."
    },
    "68": {
      "title": "Sắp một trang báo cáo ca trực",
      "example": "Đặt thẻ “Tuần 2 · Đạt 6/10 hồ sơ đã đóng” cạnh thẻ “4 hồ sơ đóng bị trễ”. Bên dưới là bảng mã hỗ trợ trưởng ca mở trường hợp cụ thể. Kỳ quan sát vẫn đọc được ngay cả khi in trang.",
      "explain": "Trước khi thêm biểu đồ mới, hỏi nó hỗ trợ quyết định nào. Một thẻ ghi 60% mà thiếu kỳ và mẫu số khiến người nhận khó xác định phạm vi cần hành động."
    },
    "69": {
      "title": "Từ 25% tới ba mã cần xem",
      "example": "Chọn Hà Nội và tuần 2. KPI đạt hạn là 25% trên bốn hồ sơ đóng. Lọc thêm Trễ phải đưa bảng chi tiết về HS013, HS016 và HS021.",
      "explain": "Nếu thẻ đổi số mà bảng chi tiết giữ nguyên, kiểm tương tác giữa hai hình và quan hệ tới bảng nguồn. Thử xóa hết lựa chọn để bảo đảm quay về số toàn kỳ."
    },
    "70": {
      "title": "Lập bảng kết quả mong đợi trước khi bấm",
      "example": "Với toàn kỳ, kỳ vọng 14/20 đạt. Với riêng Hà Nội, kỳ vọng 4/8. Khi chọn một tập không có hồ sơ đóng, tỷ lệ chưa xác định và nên có chú thích cho người xem.",
      "explain": "Ghi bộ lọc, kết quả mong đợi, kết quả thực tế và chênh lệch. Chỉ một ảnh toàn trang chưa chứng minh báo cáo đúng ở các trạng thái lọc khác."
    },
    "71": {
      "title": "Biến một trường thành câu hỏi phân tích",
      "example": "Kéo NghiepVu làm chiều và đếm MaHS làm đại lượng sẽ có hai nhóm 12 hồ sơ. Đổi chiều thành ChiNhanh cho ba nhóm 8. Tổng 24 vẫn giữ nguyên vì vẫn đang đếm cùng tập hồ sơ.",
      "explain": "Vai trò của trường phụ thuộc câu hỏi. Đừng cộng mã định danh có hình thức giống số. Khi bảng có thể lặp mã, kiểm xem mục tiêu là đếm dòng hay đếm hồ sơ khác nhau."
    },
    "72": {
      "title": "Chiều dài thanh phản ánh đúng độ chênh",
      "example": "Thanh 80% và 60% trên trục 0–100% cho thấy thanh thứ hai dài bằng ba phần tư thanh thứ nhất. Nếu cắt gốc trục ở 50%, chiều dài nhìn thấy chỉ còn 30 và 10 đơn vị.",
      "explain": "Ghi rõ 8/10 và 6/10 cạnh thanh. Khi mô tả chênh lệch mức tỷ lệ, dùng 20 điểm phần trăm, để dành 25% cho mức giảm tương đối."
    },
    "73": {
      "title": "Ngày vắng trong tệp được vẽ thế nào?",
      "example": "Từ 02 đến 13/11 gồm 12 ngày lịch. Nguồn chỉ có quan sát ở 10 ngày. Hai ngày 07–08/11 vắng hoàn toàn, nên trục liên tục cần thể hiện được vị trí của chúng.",
      "explain": "Để khoảng trống và ghi chưa có bản ghi, hoặc điền 0 sau khi xác minh dữ liệu đủ và thực sự không có hồ sơ. Hai lựa chọn mang ý nghĩa nghiệp vụ khác nhau."
    },
    "74": {
      "title": "Vẫn đọc được báo cáo khi in đen trắng",
      "example": "Dòng Hà Nội có thể ghi “Trễ 4/8 · 50%” và dùng một ký hiệu cạnh nhãn. Khi mất màu đỏ, người đọc vẫn nhận ra mức độ và số hồ sơ liên quan.",
      "explain": "Giữ bảng chi tiết chỉ gồm các cột cần cho hành động. Khi thêm chi tiết, kiểm tổng vẫn ở cấp hồ sơ, tránh trình bày mỗi thuộc tính như một trường hợp mới."
    },
    "75": {
      "title": "Đo khả năng dùng bằng tác vụ thực",
      "example": "Nhờ người thử tìm tuần giảm SLA, chọn chi nhánh làm chỉ số thấp rồi ghi một mã trễ. Nếu họ tìm số 60% nhưng dừng ở đó vì không biết cách mở bảng mã, vấn đề nằm ở bước truy vết.",
      "explain": "Ghi lại điểm người dùng dừng, thời gian tìm và mã họ trả lời. Đổi nhãn hoặc vị trí bộ lọc, sau đó cho thử lại cùng nhiệm vụ để so hiệu quả thay đổi."
    },
    "76": {
      "title": "Một nhóm có hai đường cơ sở có thể nhầm",
      "example": "Có bốn ca được ghi lý do thiếu chứng từ trong sáu hồ sơ trễ toàn kỳ, tức 4/6. Cả bốn thuộc năm hồ sơ thẻ đã đóng của Hà Nội nên tỷ lệ trong nhóm thử nghiệm là 4/5.",
      "explain": "Nếu thử checklist ở nhóm thẻ Hà Nội, so trước và sau trên cùng nhóm, cùng trạng thái đã đóng. Tỷ trọng nguyên nhân trên toàn bộ ca trễ trả lời câu hỏi khác."
    },
    "77": {
      "title": "Chọn sáu mã theo quy tắc lặp được",
      "example": "Chia hồ sơ đóng thành sáu ô theo ba chi nhánh và hai tuần. Nếu chọn mã nhỏ nhất trong mỗi ô, ví dụ Hà Nội–tuần 1 là HS001, người nhận có thể chạy lại ra đúng tập mẫu.",
      "explain": "Quy tắc chọn có thể lặp lại chưa bảo đảm mẫu đại diện cho mọi hồ sơ. Khi cần ước lượng tỷ lệ chung, xem lại quy mô từng ô và phương pháp chọn trong ô."
    },
    "78": {
      "title": "Nhận biết dữ liệu xuất hiện quá muộn",
      "example": "Tại lúc nhận HS013, chi nhánh và loại hồ sơ đã có. Thời gian 95 phút và lý do Thiếu chứng từ chỉ xuất hiện khi xử lý xong. Nếu mô hình dùng hai trường sau để báo trước nguy cơ, kết quả kiểm thử dễ cao bất thường.",
      "explain": "Chốt thời điểm dự báo trên giấy, đánh dấu từng trường có sẵn tại thời điểm đó và giữ một kỳ sau để đánh giá. Xem cả số lần cảnh báo nhầm và số hồ sơ trễ bị bỏ sót."
    },
    "79": {
      "title": "Phân biệt số tiền gốc với số tiền lãi",
      "example": "Trong ví dụ giả định, số gốc 100 triệu VND, lãi suất đơn 6%/năm, kỳ đủ một năm cho tiền lãi 6 triệu. Tổng gốc cộng lãi theo giả định là 106 triệu.",
      "explain": "Trong từ điển trường, ghi riêng số gốc, tỷ lệ theo năm và số tiền của kỳ. Một con số 6 không kèm đơn vị có thể bị đọc nhầm là 6% hoặc 6 triệu."
    },
    "80": {
      "title": "Viết đề xuất có phép đo sau thử nghiệm",
      "example": "“Trong 5 hồ sơ thẻ Hà Nội đã đóng, 4 hồ sơ trễ được ghi thiếu chứng từ. Đề xuất kiểm danh mục chứng từ lúc tiếp nhận và đo lại trên cùng nhóm trong kỳ sau.” Bản tiếng Anh có thể mở bằng “Four of five closed card cases had a recorded document issue and missed the deadline.”",
      "explain": "Giữ đúng phạm vi giữa hai bản. Chỉ định ai kiểm ngẫu nhiên hồ sơ nguồn, khi nào đọc lại kết quả và thêm thời gian xử lý để theo dõi tác dụng phụ."
    },
    "81": {
      "title": "Đổi yêu cầu chung thành điều kiện nghiệm thu",
      "example": "Yêu cầu “báo cáo vận hành” được làm rõ thành ba câu hỏi: bao nhiêu hồ sơ tiếp nhận, tỷ lệ đạt trong nhóm đã đóng là bao nhiêu và những mã giao dịch nào cần đối soát. Hai câu đầu dùng HoSo, câu cuối dùng NoiBo và DoiTac.",
      "explain": "Chốt kỳ, đơn vị quan sát và phép kiểm cho từng câu. Một bản giao đạt yêu cầu khi người nhận tái tạo được cả tỷ lệ lẫn danh sách mã từ ba tệp đã xác định."
    },
    "82": {
      "title": "Ghi dấu vết để phát hiện tệp bị đổi",
      "example": "Nhật ký trích xuất có thể ghi DoiTac gồm 10 dòng với tổng 14.120.000 VND. Nếu ai thay một số tiền nhưng vẫn giữ 10 dòng, đối chiếu tổng sẽ phát hiện thay đổi mà phép đếm bỏ qua.",
      "explain": "Lưu tên phiên bản, thời điểm nhận, số dòng, số mã và tổng tiền. Đối với HoSo, dùng tổng theo trạng thái hoặc phép kiểm thời gian thay cho tổng tiền."
    },
    "83": {
      "title": "Một bảng KPI kiểm được từ dưới lên",
      "example": "Mỗi dòng đại diện một tổ hợp tuần và chi nhánh. Với Hà Nội tuần 2, cột tiếp nhận = 4, đóng = 4, đạt = 1, trễ = 3. Phép kiểm 1 + 3 = 4 xác nhận hai kết quả đóng đã bao phủ nhóm.",
      "explain": "Cộng sáu dòng rồi tính lại tỷ lệ toàn kỳ từ 14 đạt/20 đóng. Giữ bốn hồ sơ mở trong cột tiếp nhận và ngoài mẫu số SLA để hai chỉ số có đúng ý nghĩa."
    },
    "84": {
      "title": "Đọc một phiếu ngoại lệ hoàn chỉnh",
      "example": "Phiếu GD104 ghi số lần nội bộ 1, đối tác 1, số tiền 1.250.000 và 1.200.000 VND. Ghi nhận lệch +50.000 theo chiều nội bộ trừ đối tác. Người rà dự kiến kiểm tham chiếu chứng từ của cả hai phát sinh.",
      "explain": "Bằng chứng hiện có chỉ xác nhận hai giá trị khác nhau. Ghi trạng thái Chờ xác minh và tách ý kiến giả định nguyên nhân khỏi kết luận đã được duyệt."
    },
    "85": {
      "title": "Kiểm bộ lọc có lan sang sai bảng không",
      "example": "Chọn Hà Nội ở trang hiệu suất sẽ làm đổi số hồ sơ. Mở trang đối soát để tra GD110 vẫn phải thấy hai dòng nội bộ và một dòng đối tác, bởi hai sổ không có trường chi nhánh gắn với MaHS.",
      "explain": "Ghi rõ bộ lọc áp dụng cho từng trang. Nếu muốn phân bổ ngoại lệ giao dịch theo chi nhánh, cần thêm khóa liên kết đáng tin cậy, thay vì ghép theo vị trí dòng."
    },
    "86": {
      "title": "Kiểm độ nhạy của kết luận trên năm hồ sơ",
      "example": "Nhóm thẻ Hà Nội có 4/5 hồ sơ trễ ghi thiếu chứng từ, tức 80%. Nếu thêm một ca đạt, tỷ lệ còn 4/6 ≈ 66,7%. Nếu thêm một ca trễ cùng lý do, tỷ lệ là 5/6 ≈ 83,3%.",
      "explain": "Chỉ một ca làm thay đổi kết quả đáng kể vì mẫu nhỏ. Ghi nhận quan sát trong kỳ và xác định thêm dữ liệu cần thu trước khi khẳng định quy trình đã cải thiện."
    },
    "87": {
      "title": "Diễn tập khi một bước đầu vào hỏng",
      "example": "Trên bản sao, đổi tên SLAPhut thành MucSLA rồi chạy lại từ phiên trống. Bước kiểm cấu trúc cần dừng và báo thiếu cột. Khôi phục tệp chuẩn, lần chạy kế tiếp phải cho 24 hồ sơ, 20 đóng và 14 đạt.",
      "explain": "Ghi nơi tìm log lỗi, cách xác minh tệp đầu vào và tên đầu ra. Mục tiêu là một người khác tái lập được kết quả mà không dựa vào biến hoặc bảng từng sửa tay."
    },
    "88": {
      "title": "Sửa câu kết luận trước nghiệm thu",
      "example": "Câu “Ngân hàng mất 500.000 VND” vượt quá dữ liệu. Viết lại: “Trong hai sổ giả lập, tổng nội bộ cao hơn đối tác 500.000 VND. Có bốn mã cần kiểm vì chênh tiền, thiếu một phía hoặc lặp mã.”",
      "explain": "Câu sửa nêu rõ nguồn, đơn vị, chiều lệch và giới hạn kết luận. Gắn danh sách mã để người nhận truy được bằng chứng trước khi đề xuất bất kỳ xử lý nào."
    },
    "89": {
      "title": "Trả lời câu hỏi kiểm chứng bằng tiếng Anh",
      "example": "“The on-time rate fell from eight out of ten closed cases to six out of ten, a drop of twenty percentage points. I checked the numerator and denominator against the case-level extract for each week.”",
      "explain": "Trong bản tiếng Việt, giữ cả số đạt và số đóng của từng tuần. Ở phần hỏi đáp, mở bảng mã để chứng minh câu “I checked” tương ứng với thao tác nào."
    },
    "90": {
      "title": "Chọn bằng chứng khi trả lời phỏng vấn",
      "example": "Khi được hỏi “Bạn phát hiện sai số báo cáo thế nào?”, có thể trình bày tình huống GD110: so số lần xuất hiện trước khi ghép, phát hiện 2 khớp 1, tổng hợp riêng từng nguồn rồi kiểm lại theo mã.",
      "explain": "Chuẩn bị một bảng trước/sau và một phép kiểm cho người nghe theo dõi. Kết thúc bằng giới hạn của ví dụ giả lập, cách áp dụng vào dữ liệu mới và điểm muốn tiếp tục luyện."
    }
  };
  window.readingCase = n => cases[n];
})();
