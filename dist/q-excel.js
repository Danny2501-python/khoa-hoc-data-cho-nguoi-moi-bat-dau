/* Three choices per question. The UI shuffles choices and separates review from assessment. */
window.excelQuestions = function excelQuestions(day) {
  const d = typeof day === "number" ? window.PROGRAM.days[day-1] : day;
  const k = d.n, a = 8 + k, b = 4 + k % 5, c = 2 + k % 3;
  const q = (...items) => items.map(String);
  const n = (stem, right, why, step = 1) => q(stem, right, right+step, right+2*step, why);
  const pack = (s) => s.trim().split("\n").map(row => row.trim().split("|"));
  const packs = {};
  packs.fields = pack(`
Mã chi nhánh 0012 cần giữ số 0 đầu. Khi nhập CSV nên chọn kiểu nào?|Văn bản|Số nguyên|Ngày|0012 là định danh. Đổi thành số 12 làm mất cách viết gốc.
Cột nào trong bảng hồ sơ dùng để xác định nghiệp vụ tiếp nhận?|NghiepVu|ChiNhanh|MaHS|NghiepVu mô tả loại công việc, chẳng hạn hồ sơ thẻ hay chuyển tiền.
Trường NgayNhan ghi 2026-11-02. Giá trị này biểu thị gì?|Ngày tiếp nhận hồ sơ|Số phút chờ|Ngày chắc chắn đã đóng|Ngày nhận là một thời điểm. Nó không cho biết mất bao lâu để hoàn tất.
Phép tổng hợp nào có ý nghĩa đối với ChiNhanh?|Đếm số hồ sơ theo từng nhãn chi nhánh|Tính trung bình tên chi nhánh|Cộng tất cả mã chi nhánh|Tên chi nhánh dùng chia nhóm. Số lượng được đếm từ các hồ sơ trong nhóm.
Trong một dòng, XuLyPhut bằng 28 và SLAPhut bằng 30. Trường nào là quan sát thực tế?|XuLyPhut|SLAPhut|Cả hai đều là thời gian đã dùng|28 phút là thời gian đã xử lý. 30 phút là mức cho phép trên chính dòng ấy.
Tuan có giá trị 1 và 2 tương ứng hai kỳ. Muốn xem khối lượng theo kỳ, nên làm gì?|Nhóm theo Tuan rồi đếm hồ sơ|Tính tổng Tuan|Lấy trung bình Tuan thay cho số hồ sơ|Tuan đóng vai trò nhãn kỳ. Cộng chỉ số tuần không cho biết số hồ sơ.
Với LyDoTre, trường hợp nào hợp lý để ô trống?|Hồ sơ đạt hạn nên không có lý do trễ|Mọi hồ sơ đều phải ghi 0 phút|Mọi giá trị trống đều hiểu là thiếu chứng từ|LyDoTre mô tả nguyên nhân trễ. Phải đọc trạng thái và kết quả để hiểu giá trị trống.
Một hồ sơ đóng có XuLyPhut trống. Trước khi tính bình quân, cần làm gì?|Đánh dấu thiếu và kiểm lại nguồn|Điền 0 vì tính nhanh hơn|Điền SLAPhut vì hai cột cùng đơn vị|Cùng đơn vị phút không có nghĩa hai trường cùng đo một đại lượng.
`);
  packs.source = pack(`
Nên đặt công thức làm sạch ở sheet nào trong bộ Nguon, XuLy, KiemTra?|XuLy|Nguon|Thay thẳng tệp CSV gốc|XuLy giữ thao tác biến đổi và cho phép so lại với Nguon.
Một cột mã thành số sau khi mở CSV. Nên lấy lại mã ban đầu từ đâu?|Tệp nguồn được giữ nguyên|Bản đã ghi đè sau chuyển kiểu|Kết quả trung bình các mã|Nguồn nguyên trạng còn giữ ký tự và số 0 đầu nếu có.
Sau khi tải lại dữ liệu, số dòng bằng lần trước. Điều đó xác nhận được gì?|Chỉ xác nhận số dòng bằng nhau|Mọi số tiền đều như cũ|Mọi mã đều đúng vị trí cũ|Cùng số dòng vẫn có thể thay mã hoặc thay giá trị.
Muốn đối chiếu một ô báo cáo với dòng gốc sau khi sắp xếp, dùng gì?|Mã định danh và phiên bản tệp|Số dòng hiển thị sau khi sắp|Màu nền của ô|Thứ tự có thể đổi khi sắp xếp, còn khóa giúp lần về cùng hồ sơ.
Tên cột đầu tiên bị nhập thành một hồ sơ. Cần sửa gì khi nạp bảng?|Khai báo dòng đầu là tiêu đề|Đổi tất cả trường sang số|Sắp ngày giảm dần|Hàng tiêu đề mô tả các trường chứ không phải một quan sát.
Tệp nhận lại có ngày lớn nhất sớm hơn lần trước. Bước nào phù hợp?|Xác minh kỳ trích xuất và nguồn|Gộp hai tệp ngay rồi công bố|Tự điền thêm các ngày còn thiếu|Biên ngày thay đổi có thể báo hiệu khác phạm vi nguồn.
Cần bàn giao bản có công thức, nhiều sheet và Excel Table. Nên lưu dạng nào?|XLSX|CSV đơn|TXT phân cách bởi tab|XLSX giữ cấu trúc workbook, công thức và nhiều sheet.
Nhật ký nhập tối thiểu nên ghi gì?|Tên phiên bản nguồn, thời điểm và số kiểm|Màu của biểu tượng Excel|Số lần mở cửa sổ|Nhật ký giúp người khác tái tạo và phát hiện nguồn thay đổi.
`);
  packs.filter = [
    q("Bộ lọc ChiNhanh = Hà Nội và NghiepVu = Hồ sơ thẻ giữ những dòng nào?","Các dòng thỏa đồng thời cả hai điều kiện","Mọi dòng thỏa ít nhất một điều kiện","Chỉ các dòng có mã nhỏ nhất","Hai điều kiện trên hai trường được kết hợp bằng AND."),
    n(`Có ${a} hồ sơ thẻ, trong đó ${b} ở Hà Nội. Lọc thẻ và Hà Nội còn bao nhiêu?`,b,"Chỉ phần giao của hai điều kiện được giữ lại."),
    n(`Có ${a} hồ sơ ở A, ${b} trong số đó đã đóng. Lọc A và đang mở còn mấy hồ sơ nếu chỉ có hai trạng thái?`,a-b,`Tổng tại A trừ số đã đóng là ${a} − ${b}.`),
    n(`Bảng có ${a+b} dòng dữ liệu. Sau khi lọc còn ${b} dòng nhìn thấy. Xóa hết bộ lọc sẽ hiện bao nhiêu dòng?`,a+b,"Lọc chỉ ẩn các dòng ngoài điều kiện."),
    q("Cần cộng chỉ các dòng hiển thị sau khi lọc trong Excel. Hàm nào phù hợp?","SUBTOTAL với mã hàm 109","COUNT mọi mã trên sheet nguồn","MIN của cột tiền","SUBTOTAL(109, vùng) cộng các dòng hiển thị, bỏ qua dòng bị lọc và dòng ẩn thủ công."),
    q("Lọc bằng Hà Nội nhưng một số dòng có nhãn 'Hà Nội ' bị bỏ sót. Nên kiểm gì?","Khoảng trắng cuối và quy tắc chuẩn hóa","Giá trị SLA","Thứ tự nhãn trên biểu đồ","Hai nhãn có thể khác chuỗi dù hiển thị giống nhau. Giữ bản gốc trước khi chuẩn hóa."),
    q("Khi lưu kết quả lọc để người khác kiểm lại, cần kèm gì?","Phiên bản nguồn và từng điều kiện lọc","Chỉ màu tiêu đề","Chỉ số thứ tự dòng cuối","Muốn tái tạo danh sách phải có cùng dữ liệu và cùng tiêu chí."),
    q("Lọc đang mở mà thấy 0 dòng ở một chi nhánh. Điều gì có thể giải thích kết quả ngoài việc thật sự không có?","Một bộ lọc tuần khác vẫn đang bật","Bộ lọc tự xóa tệp nguồn","Tên sheet ngắn hơn năm chữ","Kiểm tất cả điều kiện đang áp trước khi diễn giải số 0.")
  ];
  packs.count = [
    n(`CN A có ${b} hồ sơ đã đóng và ${c} hồ sơ mở. COUNTIF đếm đúng nhãn chi nhánh A được bao nhiêu?`,b+c,`Cả hai trạng thái đều thuộc A nên cộng ${b} + ${c}.`),
    n(`Trong ${a} hồ sơ đã đóng, ${b} thuộc CN B. COUNTIFS theo Đã đóng và CN B là bao nhiêu?`,b,"Chỉ đếm các dòng đồng thời đạt hai tiêu chí."),
    q("Công thức nào đếm hồ sơ đã đóng theo chi nhánh ghi ở A2?","COUNTIFS(HoSo[ChiNhanh],A2,HoSo[DaDong],1)","COUNTIF(HoSo[ChiNhanh],1)","SUM(HoSo[DaDong])","COUNTIFS kiểm cặp vùng–điều kiện cho cả nhãn và cờ trạng thái."),
    q("Hàm COUNT trên cột MaHS toàn chuỗi HS001, HS002 trả về gì?","0","2","Một mã bất kỳ","COUNT đếm giá trị số. Với mã văn bản luôn có giá trị, có thể dùng COUNTA."),
    q("Hai vùng trong COUNTIFS phải có thuộc tính nào?","Cùng số hàng và số cột tương ứng","Cùng màu nền","Cùng kiểu dữ liệu ở mọi ô","Các điều kiện phải được kiểm tra trên những vị trí tương ứng."),
    q("Đếm số mã khác nhau trong danh sách có mã lặp cần làm gì?","Loại lặp trên bản danh mục rồi đếm mã hợp lệ","Đếm tất cả các dòng","Cộng tiền của mọi dòng","Số mã duy nhất và số dòng chỉ bằng nhau khi mọi dòng có khóa riêng."),
    n(`Ba nhóm loại trừ nhau lần lượt có ${a}, ${b}, ${c} hồ sơ. Số hồ sơ ở cả ba nhóm là bao nhiêu?`,a+b+c,"Các nhóm bao phủ tổng thể và không trùng nhau nên cộng tần số."),
    q("Tỷ trọng ba nhóm hiển thị đều 33,3%. Vì sao tổng hiển thị là 99,9%?","Từng tỷ trọng đã được làm tròn","Chắc chắn mất một hồ sơ","Một phần trăm phải bằng 1 hồ sơ","Tổng từ giá trị đầy đủ vẫn có thể bằng 100%.")
  ];
  packs.sla = [
    q("Hồ sơ mới tiếp nhận cần được xử lý thế nào trong KPI đạt hạn của nhóm đã đóng?","Theo dõi riêng và chưa đưa vào mẫu số","Mặc định đạt hạn","Mặc định trễ hạn","Chưa biết thời gian hoàn tất, nên chưa xác định được kết quả."),
    q("Ngày chốt có hồ sơ mất đúng 60 phút với SLA 60 phút, đã đóng. DatSLA bằng bao nhiêu?","1","0","Trống","Quy ước đúng hạn gồm cả bằng ngưỡng."),
    n(`Tổ A đã đóng ${a} hồ sơ trong đó ${b} bị trễ. Tổng cờ đạt của tổ là bao nhiêu?`,a-b,`Lấy ${a} hồ sơ đã đóng trừ ${b} hồ sơ trễ.`),
    n(`Hồ sơ mất ${a+b} phút so với SLA ${a} phút. Số phút vượt hạn là bao nhiêu?`,b,`Thực tế trừ ngưỡng là ${a+b} − ${a}.`),
    q("Thẻ có SLA 60 phút và hoàn tất sau 45 phút. Nếu dùng một ngưỡng chung 30 phút thì lỗi gì xảy ra?","Hồ sơ đạt bị gắn nhãn trễ","Hồ sơ trễ bị gắn nhãn đạt","Trạng thái hồ sơ chuyển thành đang mở","45 nhỏ hơn 60 nhưng lớn hơn ngưỡng 30 bị dùng sai."),
    q("Tại sao nên xét DaDong trước khi so sánh hai số phút?","Ô chưa có thời gian hoàn tất không được xếp vào đạt hoặc trễ","Mọi hồ sơ mở phải tính là trễ","Ô trống luôn có nghĩa là 0 phút","Trạng thái giúp xác định hồ sơ đủ điều kiện trước phép so sánh."),
    q("Tất cả hồ sơ trong nhóm đều đang mở. KPI đúng hạn trên nhóm đã đóng nên hiện gì?","Chưa có hồ sơ đủ điều kiện","0% vì tất cả đều trễ","100% vì chưa ghi nhận trễ","Mẫu số bằng 0 nên tỷ lệ chưa xác định."),
    q("Kiểm thử dấu <= trong công thức phân loại cần ca nào?","Hồ sơ đã đóng có số phút bằng đúng ngưỡng","Chỉ hồ sơ nhanh nhất","Chỉ hồ sơ đang mở","Ca ở biên phát hiện sự khác nhau giữa < và <=.")
  ];
  packs.rate = [
    n(`Có ${a} hồ sơ đạt trong ${a+b} hồ sơ đóng. Mẫu số để tính tỷ lệ đạt hạn là số nào?`,a+b,"KPI xét trên tất cả hồ sơ đã đóng của phạm vi này."),
    q("Trong hai nhóm, nhóm A đạt 4/5, nhóm B đạt 6/15. Tỷ lệ chung là bao nhiêu?","50%","60%","80%","Cộng tử và mẫu cho 10/20. Trung bình đơn giản sẽ cho mỗi nhóm trọng số bằng nhau."),
    q("Tỷ lệ từ 40% lên 50% tăng bao nhiêu điểm phần trăm?","10 điểm phần trăm","25 điểm phần trăm","90 điểm phần trăm","Chênh tuyệt đối bằng 50 trừ 40."),
    q("Tỷ lệ từ 40% lên 50% tăng tương đối bao nhiêu so với kỳ đầu?","25%","10%","5%","Độ tăng 10 điểm chia mức đầu 40, tức 0,25."),
    q("Nhóm A có 9/10 hồ sơ đúng hạn. Chọn phân số biểu thị tỷ lệ trễ trong nhóm đã đóng này.","1/10","9/10","1/9","Một trong mười hồ sơ đã đóng bị trễ."),
    q("Chi nhánh nhỏ có 1/1 hồ sơ đạt. Khi trình bày 100%, cần ghi thêm gì?","Mẫu chỉ gồm một hồ sơ đã đóng","Khẳng định mọi kỳ đều đạt","Gộp thêm hồ sơ chưa đóng","Quy mô mẫu cho biết tỷ lệ dựa trên bao nhiêu quan sát."),
    n(`Hai nhóm đã đóng ${a} và ${b} hồ sơ. Muốn tính tỷ lệ chung, tổng trọng số bằng bao nhiêu?`,a+b,"Trọng số là số hồ sơ đủ điều kiện trong từng nhóm."),
    q("Tỷ lệ ban đầu bằng 0%, kỳ sau bằng 10%. Chỉ số nào vẫn xác định được?","Tăng 10 điểm phần trăm","Tăng tương đối 10%","Tăng tương đối 100%","Biến động tuyệt đối vẫn tính được. Phép chia cho mức đầu bằng 0 không xác định.")
  ];
  packs.stats = [
    n(`Ba ca mất ${a-2}, ${a}, ${a+2} phút. Trung bình là bao nhiêu phút?`,a,"Ba giá trị cách đều và đối xứng quanh giá trị giữa."),
    n(`Sắp xếp ba số ${a+8}, ${a-3}, ${a}. Trung vị bằng bao nhiêu?`,a,"Trung vị của ba số là giá trị đứng thứ hai sau khi sắp."),
    n(`Một ca có thời gian nhỏ nhất ${b} và lớn nhất ${a+b} phút. Khoảng biến thiên là bao nhiêu?`,a,`Khoảng biến thiên là ${a+b} − ${b} phút.`),
    q("Mẫu nào cho thấy xử lý kém ổn định hơn nếu chỉ xét phân tán?","5, 20, 35 phút","19, 20, 21 phút","20, 20, 20 phút","Ba mẫu có cùng trung bình 20. Mẫu 5 đến 35 có khoảng biến thiên lớn nhất."),
    q("Một thời gian 10 phút được thay bằng 1000 phút trong dãy 7, 8, 9, 10, 12. Chỉ số nào vẫn giữ nguyên?","Trung vị","Trung bình","Khoảng biến thiên","Dãy mới là 7, 8, 9, 12, 1000. Phần tử giữa vẫn bằng 9."),
    q("Dữ liệu có một hồ sơ thật sự mất 600 phút. Nên làm gì khi báo cáo?","Xác minh và trình bày ảnh hưởng kèm thống kê phù hợp","Xóa ngay vì cao hơn trung bình","Đổi thành số trung vị mà không ghi nhận","Ngoại lệ đã được xác nhận là dữ liệu thật có thể phản ánh một sự cố quan trọng."),
    q("Bốn hồ sơ mất 5, 7, 13, 31 phút. Trung vị bằng bao nhiêu?","10 phút","7 phút","14 phút","Với số quan sát chẵn, lấy trung bình của hai số giữa là 7 và 13."),
    q("Khi mọi số phút được nhân với 60 để đổi sang giây, đại lượng nào giữ nguyên giá trị số?","Số quan sát","Trung bình thời gian","Khoảng biến thiên thời gian","Đơn vị thời gian thay đổi còn số lượng hồ sơ vẫn giữ nguyên.")
  ];
  packs.audit = [
    q("Tệp có hai dòng cùng MaHS. Phát hiện này kiểm quy tắc nào?","Tính duy nhất","Tính không âm của phút","Đúng hạn SLA","Một mã dự kiến nhận diện một hồ sơ, nên cần xác minh nguyên nhân lặp."),
    q("Trong tệp đã đóng, điều kiện nào giúp phát hiện hồ sơ chưa đủ dữ liệu để tính SLA?","XuLyPhut hoặc SLAPhut trống","MaHS được nhập dưới dạng văn bản","NgayNhan khác hôm nay","Thiếu một trong hai số phút sẽ làm phép so chưa đủ bằng chứng."),
    q("Muốn kiểm quy tắc số phút không âm, chọn ca lỗi nào?","XuLyPhut = −3","XuLyPhut = 1","XuLyPhut = 60","Thời lượng âm không phù hợp định nghĩa trong bộ hồ sơ này."),
    q("Bản sao đã sửa thử một mã để tạo lỗi. Trước khi áp dụng kết quả vào báo cáo chính, cần gì?","Dùng lại nguồn chuẩn và chạy lại bộ kiểm","Lấy luôn dữ liệu lỗi làm nguồn mới","Xóa cột kiểm tra trước khi chạy","Lỗi nhân tạo dùng kiểm thử quy tắc và không phải sự kiện phát sinh thực tế."),
    n(`Trong ${a} mã có ${b} mã trống và các mã còn lại hợp lệ. Có bao nhiêu mã có giá trị?`,a-b,`Lấy tổng ${a} trừ ${b} mã trống.`),
    n(`Bộ kiểm có ${a} tình huống. ${c} tình huống cho kết quả khác mong đợi. Có mấy tình huống khớp?`,a-c,"Trừ số khác mong đợi khỏi số đã thử."),
    q("Cột cờ toàn 1 nhưng nguồn có hồ sơ mở. Kiểm tra nào sát nhất?","Đối chiếu vài mã mở với điều kiện IF và tham chiếu từng dòng","Đổi kiểu biểu đồ","Sắp MaHS giảm dần rồi chấp nhận kết quả","Phải kiểm từ điều kiện và tham chiếu đầu vào của cờ."),
    q("Hai lỗi cùng xuất hiện trên một dòng. Đếm số dòng có lỗi nên tính dòng đó mấy lần?","Một lần","Hai lần","Không tính","Một dòng có thể vi phạm nhiều quy tắc nhưng chỉ là một dòng lỗi.")
  ];
  packs.recon = [
    n(`Mã X có ${c} dòng ở nội bộ và ${b} dòng ở đối tác. Ghép trực tiếp trên X tạo bao nhiêu cặp?`,b*c,`Mỗi dòng nội bộ khớp mọi dòng bên kia nên có ${c} × ${b} cặp.`),
    q("XLOOKUP trả một khoản 560000 cho mã lặp hai lần. Muốn biết tổng nội bộ theo mã, dùng gì?","SUMIFS theo MaGD và kiểm thêm COUNTIF","Giữ lần khớp đầu là tổng","Nhân mọi khoản với 2 bất kể số dòng","SUMIFS cộng đủ các dòng khớp, còn số lần xuất hiện giúp nhận biết mã lặp."),
    q("Chỉ dò từ danh sách mã nội bộ sang đối tác sẽ bỏ qua loại nào?","Mã chỉ có ở đối tác","Mọi mã có ở nội bộ","Mã có ở cả hai bảng","Các mã vắng ở bảng xuất phát sẽ không có dòng để dò."),
    n(`Nội bộ có ${a} mã, đối tác có ${a+c} mã, cả hai cùng có ${a-b} mã. Hợp hai danh mục có mấy mã?`,a+b+c,`${a} + ${a+c} − ${a-b} để tránh đếm đôi phần giao.`),
    q("Một mã có tổng tiền bằng nhau ở hai bảng nhưng số dòng là 2 và 1. Nên kết luận gì?","Tổng khớp nhưng cấp dòng cần xác minh","Đã chắc chắn khớp từng bút toán","Chắc chắn đối tác gian lận","So tổng không đủ chứng minh số dòng, khóa và nghĩa nghiệp vụ trùng khớp."),
    q("Nội bộ ghi 950000, đối tác ghi 1000000. NB trừ DT bằng bao nhiêu VND?","−50000","+50000","1950000","950000 − 1000000 = −50000. Dấu âm cho biết nội bộ thấp hơn."),
    q("Hai mã lệch +80000 và −80000 VND. Tổng chênh của hai mã là 0. Suy ra gì?","Hai lệch đã bù nhau ở tổng và vẫn cần kiểm cả hai","Hai mã đều khớp","Có đúng một mã sai","Chênh ở từng mã vẫn tồn tại dù tổng có dấu bằng 0."),
    q("Mã vắng ở đối tác có nên được ghi đơn thuần là giao dịch 0 VND bên đối tác?","Giữ cả cờ vắng để phân biệt với có giao dịch bằng 0","Luôn đánh dấu khớp","Thêm một dòng 0 vào nguồn gốc","Vắng bản ghi và có bản ghi giá trị 0 có ý nghĩa kiểm soát khác nhau.")
  ];
  packs.pivot = [
    q("Muốn so số hồ sơ giữa các chi nhánh, nên đặt trường nào vào Rows?","ChiNhanh","XuLyPhut","Tổng thời gian xử lý","Rows tạo nhóm theo danh mục, ở đây là chi nhánh."),
    q("Để đếm hồ sơ khi mỗi dòng có một MaHS duy nhất và không trống, chọn gì trong Values?","Count of MaHS","Sum of SLAPhut","Average of XuLyPhut","Count đếm các mã có giá trị. Hai phép tính thời gian trả đại lượng khác."),
    q("Trong bảng chéo chi nhánh × trạng thái, ô Cần Thơ × Đã đóng đếm gì?","Hồ sơ thỏa cả hai điều kiện","Mọi hồ sơ Cần Thơ cộng mọi hồ sơ đóng","Tất cả hồ sơ ngoại trừ hai nhóm đó","Một ô giao chỉ chứa các quan sát thuộc đồng thời nhãn dòng và cột."),
    n(`Dòng chi nhánh có ${b} hồ sơ đóng, ${c} hồ sơ mở và chỉ có hai trạng thái. Row Total là bao nhiêu?`,b+c,"Tổng hàng bằng tổng các ô trên cùng hàng."),
    n(`Một cột trạng thái có Grand Total ${a}. Hai chi nhánh đầu lần lượt có ${b} và ${c} hồ sơ. Chi nhánh thứ ba có bao nhiêu?`,a-b-c,"Cột chỉ có ba chi nhánh. Lấy tổng cột trừ hai nhóm đầu."),
    q("Vừa thêm dòng hợp lệ vào Excel Table nguồn của Pivot. Việc gì cần làm để xem kết quả mới?","Refresh Pivot và kiểm vùng nguồn","Chỉ đổi màu biểu đồ","Chỉ sửa nhãn Grand Total","Pivot có thể vẫn đang hiển thị dữ liệu từ lần cập nhật trước."),
    q("Một hồ sơ bị lặp thành hai dòng có cùng MaHS. Count of MaHS xử lý ra sao?","Đếm cả hai ô mã có giá trị","Chỉ đếm mã đầu tiên","Loại cả hai khỏi báo cáo","Count không tự loại mã trùng. Cần kiểm cấp chi tiết trước tổng hợp."),
    q("Row Total khớp tổng nguồn nhưng số ở từng chi nhánh bị đổi chỗ. Nên kiểm gì tiếp?","Mở chi tiết ô và so mã, nhãn chi nhánh với nguồn","Chỉ xem tổng cột","Xóa hàng tổng","Tổng toàn bảng có thể vẫn đúng khi phân bổ sai giữa các nhóm.")
  ];
  packs.report = pack(`
Muốn thấy xu hướng tỷ lệ đạt theo các tuần liên tiếp nên dùng dạng nào?|Biểu đồ đường với tuần theo thứ tự|Biểu đồ thanh xếp tuần theo tỷ lệ giảm|Biểu đồ tròn cho từng hồ sơ|Trục thời gian có thứ tự giúp đọc thay đổi giữa các mốc.
Thẻ KPI ghi 70%. Chi tiết nào giúp kiểm kết quả trực tiếp?|14 đạt trên 20 hồ sơ đã đóng, kèm kỳ chốt|Chỉ màu xanh trên thẻ|Tên người sửa phông chữ|Tử số, mẫu số và kỳ chốt cho biết con số được tính trên đối tượng nào.
Để so số hồ sơ của ba chi nhánh, cách thể hiện nào phù hợp?|Ba thanh cùng thang đo có đơn vị hồ sơ|Ba đường nối các chi nhánh ngẫu nhiên|Ba số phần trăm không có mẫu|Độ dài thanh trên cùng trục giúp so khối lượng của các nhóm độc lập.
Bộ lọc tuần đã đổi nhưng biểu đồ ngoại lệ vẫn giữ nguyên. Khi nào đây có thể là thiết kế hợp lý?|Ngoại lệ theo kỳ chốt sổ riêng và có nhãn phạm vi rõ|Mọi biểu đồ đều được phép lệch mà không giải thích|Chỉ khi số ngoại lệ bằng 0|Hai nguồn có thể có thời gian và cấp chi tiết riêng, nên phải ghi phạm vi rõ ràng.
Báo cáo nói rằng sửa quy trình chắc chắn gây tăng SLA sau hai tuần quan sát. Kết luận cần chỉnh thế nào?|Nêu thay đổi quan sát được và kiểm thêm các yếu tố khác|Xác nhận quan hệ nhân quả ngay|Bỏ toàn bộ số liệu đã quan sát|So sánh trước–sau chưa loại được thay đổi về mẫu, ca và nghiệp vụ.
Một mã cần theo dõi nên có những thông tin hành động nào?|Bằng chứng, người phụ trách, hạn xác minh và trạng thái|Chỉ màu đỏ và thứ tự trên màn hình|Chỉ tên người nhập Excel|Người nhận phải biết xem chứng cứ ở đâu và ai làm bước tiếp.
Nên dùng tiêu đề nào cho biểu đồ tỷ lệ đúng hạn?|Tỷ lệ đúng hạn trên hồ sơ đã đóng theo tuần tiếp nhận|Hiệu quả toàn ngân hàng mọi thời kỳ|Số tiền xử lý trong ngày|Tiêu đề cụ thể nêu chỉ số, mẫu số và cách chia kỳ.
Người kiểm muốn tái tạo báo cáo. Tài liệu nào giúp được việc này?|Phiên bản tệp, quy tắc, bộ lọc và thao tác cập nhật|Ảnh chụp trang tổng quan duy nhất|Một bản chỉ còn màu và bố cục|Bằng chứng tái tạo gồm dữ liệu, định nghĩa và các bước xử lý.
`);
  packs.sample = [
    n(`Có ${a} hồ sơ đã đóng tại A, ${b} hồ sơ trong số này trễ. Trong P(trễ | A và đã đóng), mẫu số bằng mấy?`.replace(" | "," khi biết "),a,"Đã đặt điều kiện tại A và đã đóng, nên dùng toàn bộ nhóm này làm mẫu số."),
    n(`Cả hệ thống có ${a+b} hồ sơ trễ, trong đó ${b} từ A. Khi hỏi A chiếm bao nhiêu trong nhóm trễ, mẫu số là gì?`,a+b,"Điều kiện chọn nhóm trễ trên toàn hệ thống."),
    q("Chỉ lấy hồ sơ có khiếu nại để ước lượng tỷ lệ trễ toàn chi nhánh. Rủi ro nào nổi bật?","Mẫu có thể thiên về trường hợp bất thường","Mẫu chắc chắn đại diện vì dễ lấy","Mẫu tự động đủ tất cả nghiệp vụ","Việc có khiếu nại có thể liên quan trực tiếp đến việc xử lý chậm."),
    q("Muốn cả chi nhánh lớn lẫn chi nhánh nhỏ đều có mặt trong mẫu, nên chọn gì?","Chia tầng theo chi nhánh rồi lấy trong từng tầng","Chỉ lấy chi nhánh nhiều hồ sơ nhất","Chỉ lấy ca sáng gần nhất","Phân tầng bảo đảm các nhóm mục tiêu có quan sát để đánh giá."),
    q("Một nhóm chỉ có 2 hồ sơ và đều đạt. Phát biểu nào sát bằng chứng?","Trong 2 hồ sơ quan sát có 2 hồ sơ đạt","Chi nhánh sẽ luôn đạt 100%","Nhóm chắc chắn tốt hơn mọi chi nhánh","Cỡ mẫu nhỏ cho kết quả mô tả, chưa đủ để bảo đảm các kỳ khác."),
    q("A có 90% khối lượng và B có 10%. Lấy 10 hồ sơ mỗi nơi rồi ước lượng tỷ lệ chung cần chú ý gì?","Dùng trọng số theo tổng thể nếu muốn đại diện mọi hồ sơ","Luôn cho hai chi nhánh cùng trọng số","Chỉ dùng kết quả B","Tỷ trọng trong mẫu khác tỷ trọng trong tổng thể nên cần gộp theo mục tiêu ước lượng."),
    q("Báo cáo trễ trong hai tuần tăng, nhưng nhóm nghiệp vụ phức tạp cũng tăng mạnh. Nên kiểm thêm gì?","Tỷ lệ theo từng nghiệp vụ và tỷ trọng cơ cấu","Chỉ thứ tự bảng chữ cái của chi nhánh","Đổi sang biểu đồ 3D","Biến động cơ cấu có thể làm kết quả tổng thay đổi dù hiệu suất từng nhóm tương tự."),
    n(`Chọn ${c} hồ sơ ở mỗi kết hợp của 3 chi nhánh và 2 tuần, không trùng mã. Mẫu có mấy mã?`,6*c,`Có 3 × 2 tầng, mỗi tầng lấy ${c} hồ sơ.`)
  ];
  packs.formula = [
    q("Trong Excel Table, [@TrangThai] trong công thức IF tham chiếu giá trị nào?","TrangThai của dòng hiện tại","Toàn bộ các mã hồ sơ","Mọi trạng thái của cả workbook","Dấu @ chỉ phần tử của dòng hiện tại."),
    q("DaDong bằng 1 nếu đã đóng, các dòng khác bằng 0. SUM(DaDong) có ý nghĩa gì khi mỗi dòng là một hồ sơ?","Số hồ sơ đã đóng","Tổng mọi hồ sơ","Số hồ sơ đang mở","Mỗi hồ sơ đóng góp 1 khi và chỉ khi nó đã đóng."),
    n(`Có ${a} dòng dữ liệu, tổng DaDong bằng ${b}. Có bao nhiêu cờ 0 nếu chỉ có 0 và 1?`,a-b,"Số cờ 0 bằng số dòng trừ tổng cờ 1."),
    q("Công thức Excel mẫu dùng dấu phẩy nhưng máy yêu cầu dấu chấm phẩy. Cần sửa phần nào?","Dấu phân cách đối số theo thiết lập vùng","Đổi <= thành >","Đổi nhãn Đã đóng thành 1 ở nguồn","Thay ký hiệu phân cách phù hợp giữ nguyên logic công thức."),
    q("SUMIFS(NB[SoTienVND],NB[MaGD],A2) dùng vùng nào để cộng?","NB[SoTienVND]","NB[MaGD]","A2","Đối số đầu của SUMIFS là vùng tổng. Vùng MaGD được kiểm bằng tiêu chí A2."),
    n(`Hai dòng mã X lần lượt có ${a} và ${b} nghìn đồng. SUMIFS theo mã X bằng bao nhiêu nghìn đồng?`,a+b,"Cả hai dòng có cùng mã nên đều góp vào tổng."),
    q("Kéo công thức xuống nhưng mọi dòng đều so với trạng thái ở C2. Lỗi nào phù hợp nhất?","Tham chiếu tuyệt đối $C$2 đã khóa cả dòng","Bảng có quá nhiều màu","Ô chứa chữ thay cho mã giao dịch","Nếu mỗi dòng dự kiến kiểm trạng thái riêng, tham chiếu dòng phải di chuyển."),
    q("Cờ 0 và ô trống ở DatSLA khác nhau thế nào theo quy ước buổi học?","0 là đã đóng nhưng trễ, trống là chưa có kết quả trong nhóm mở","Cả hai đều là hồ sơ đạt đúng hạn","Ô trống nhất định là lỗi nhập liệu","Cần phân biệt kết quả đánh giá với trạng thái chưa đủ điều kiện.")
  ];

  const extras = {};
  extras.fields = pack(`
Hai tệp có XuLy bằng 2 và 90, một tệp dùng giờ và tệp kia dùng phút. Tổng đúng theo phút là bao nhiêu?|210 phút|92 phút|120 phút|Đổi 2 giờ thành 120 phút rồi cộng 90 phút.
Giá trị 03/04/2026 có thể là hai ngày khác nhau theo thiết lập vùng. Cần ghi gì trong từ điển?|Thứ tự ngày–tháng và định dạng nguồn|Chỉ số thứ tự của hồ sơ|Tên tác giả workbook|Dạng DD/MM và MM/DD cho kết quả khác nhau khi cả hai số không quá 12.
Trường nào phù hợp làm khóa để đi từ một hồ sơ về đúng dòng nguồn trong bảng mẫu?|MaHS|ChiNhanh|Tuan|Mỗi hồ sơ có một MaHS duy nhất. Một tuần hay chi nhánh có nhiều hồ sơ.
Từ điển chỉ ghi “kiểu số” cho SLAPhut. Bổ sung mô tả nào chính xác nhất?|Thời hạn cho phép của hồ sơ, tính bằng phút|Số giao dịch trong ngày|Thời gian đã xử lý của cả chi nhánh|Tên và kiểu chưa đủ để hiểu đơn vị và ý nghĩa nghiệp vụ.
Trường TrangThai xuất hiện nhãn mới Chờ bổ sung. Nên cập nhật gì trước khi phân loại?|Danh mục giá trị hợp lệ và quy tắc ánh xạ được xác nhận|Đổi tất cả thành Đã đóng|Gán mỗi nhãn một số ngẫu nhiên|Ý nghĩa của nhãn quyết định việc đưa hồ sơ vào nhóm mở hay đóng.
Một hàng từ điển ghi XuLyPhut, số, phút, ví dụ 12. Thành phần nào mô tả nghĩa chính xác?|Thời lượng thực tế để xử lý hồ sơ đã hoàn tất|Ngày bắt đầu xử lý|Mã chi nhánh xử lý|Cần mô tả đại lượng quan sát được bên cạnh kiểu, đơn vị và ví dụ.
`);
  const focus = {
    2:"fields audit source filter",3:"source fields audit report",4:"filter count pivot audit",5:"count rate pivot sample",
    6:"sla rate formula audit",7:"report source count audit",8:"formula sla count audit",9:"sla formula rate audit",
    10:"count filter formula pivot",11:"formula recon count audit",12:"stats sample fields rate",13:"rate sla pivot sample",
    14:"audit formula sla source",15:"audit fields source count",16:"source recon audit fields",17:"recon formula audit count",
    18:"recon count audit filter",19:"recon formula audit report",20:"report recon source audit",21:"recon audit report source",
    22:"pivot count filter source",23:"pivot filter count sample",24:"rate pivot sla report",25:"stats fields sample report",
    26:"sample rate pivot filter",27:"sample stats rate report",28:"report pivot rate stats",29:"report sla rate recon",30:"report audit source sla"
  };
  const daily = {
    2:"Trong HS004, XuLyPhut = 30 và SLAPhut = 30. Vì sao cần giữ cả hai trường?|Một trường đo thực tế, một trường ghi ngưỡng cam kết|Hai trường luôn bằng nhau trên mọi hồ sơ|Cả hai đều là mã định danh|Sự bằng nhau ở đúng một hồ sơ không làm cho định nghĩa của hai trường giống nhau.",
    3:"Mở lại workbook và không còn Excel Table đã đặt tên. Kiểm gì trước?|Có lưu đúng bản XLSX chứa bảng HoSo hay chỉ lưu CSV|Tên ứng dụng đọc thư|Điểm trung bình của nhân viên|CSV không lưu tên Excel Table hoặc nhiều sheet.",
    4:"Sau khi lọc hai điều kiện, có HS003 (Hà Nội, hồ sơ thẻ) và HS001 (Hà Nội, chuyển tiền). Mã nào cần loại?|HS001|HS003|Cả hai|HS001 đúng chi nhánh nhưng sai nghiệp vụ thẻ.",
    5:"Trong 24 hồ sơ, một chi nhánh có 8. Tỷ trọng gần đúng là bao nhiêu?|33,3%|8%|66,7%|8 chia 24 bằng một phần ba.",
    6:"Hồ sơ xử lý trong 59 phút với SLA 60 và đã đóng. Nó đóng góp gì vào KPI?|1 ở tử và 1 ở mẫu|0 ở tử và 1 ở mẫu|0 ở cả hai|Hồ sơ này đủ điều kiện và hoàn tất trong hạn.",
    7:"Phiếu bàn giao ghi 20 đã đóng và 4 mở trên 24 mã. Kiểm soát nào đã đạt?|Hai nhóm bao phủ số lượng đầu vào nếu mỗi mã chỉ thuộc một nhóm|Đã chứng minh mọi thời gian đều đúng|Cả 24 mã đều đạt SLA|20 + 4 bằng 24. Kiểm tổng không xác minh từng thời gian.",
    8:"Tại sao DaDong nên chứa số 1 và 0 thay vì chuỗi mô tả khi định dùng SUM?|Phép cộng cờ cho số dòng đóng|SUM tự đếm mọi từ|Quy ước này biến hồ sơ mở thành trễ|Cộng số 1, 0 là cách đếm có điều kiện dựa trên cờ.",
    9:"HS003 đã đóng với 83 phút so ngưỡng 60. Cờ DatSLA phải là gì?|0|1|Trống|83 lớn hơn 60, nên hồ sơ đã đóng bị trễ.",
    10:"Mỗi lần kéo công thức đếm từ Hà Nội sang Cần Thơ, phần nào nên chuyển theo dòng báo cáo?|Ô chứa tên chi nhánh|Tên bảng HoSo|Giá trị cờ 1 của điều kiện đã đóng|Tên bảng và điều kiện đóng giữ nguyên, nhãn nhóm thay đổi.",
    11:"COUNTIF theo GD110 bằng 2, SUMIFS bằng 1120000 VND. Có thể kết luận gì?|Có hai dòng với tổng tiền đó, cần xem chứng từ để biết nguyên nhân|Cả hai dòng chắc chắn đều sai|Chỉ một dòng có tiền|Hai thống kê xác nhận số dòng và tổng, chưa đủ xác định giao dịch hợp lệ hay trùng.",
    12:"Đổi số lớn nhất từ 18 thành 98 trong dãy năm số. Trung bình tăng bao nhiêu phút?|16 phút|80 phút|0 phút|Tổng tăng 80, chia đều 5 quan sát cho mức tăng trung bình 16.",
    13:"Hai chi nhánh có cùng số hồ sơ đã đóng. Khi đó trung bình hai tỷ lệ chi nhánh có đặc điểm gì?|Bằng tỷ lệ gộp vì trọng số bằng nhau|Luôn gấp đôi tỷ lệ gộp|Bằng tổng hai mẫu|Khi mẫu số bằng nhau, hai cách tính sử dụng cùng trọng số.",
    14:"Muốn kiểm ca đang mở, đáp án mong đợi nào phù hợp với DaDong và DatSLA?|0 và trống|1 và 1|0 và 1|Hồ sơ đang mở chưa được đánh giá kết quả thời hạn.",
    15:"Cột MaHS xuất hiện HS001 hai lần nhưng đều có thời gian hợp lệ. Quy tắc nào vẫn báo lỗi?|Duy nhất của MaHS|Phút không âm|Đã đóng phải có thời gian|Từng quy tắc kiểm một thuộc tính. Thời gian hợp lệ không loại trừ trùng mã.",
    16:"Đối tác dùng nghìn VND còn nội bộ dùng VND. Cần xử lý trước khi so số tiền?|Quy đổi cùng đơn vị và lưu hệ số|So số hiển thị nguyên dạng|Chỉ bỏ dấu phân cách hàng nghìn|Lệch đơn vị có thể tạo chênh gấp 1000 lần.",
    17:"Nếu cả hai sổ đều kỳ vọng mỗi mã có một dòng, điều kiện nào cần kiểm trước XLOOKUP?|COUNTIF theo mã bằng 1 ở mỗi bảng liên quan|Mỗi bảng có cùng màu|Hai bảng sắp cùng thứ tự|Thứ tự không chứng minh mỗi mã chỉ có một dòng.",
    18:"GD109 chỉ có trong nội bộ. Cặp số lần (NB, DT) nào phù hợp nếu mã xuất hiện một lần?|1 và 0|0 và 1|1 và 1|Số đếm 0 ở DT cho biết không tìm thấy cùng mã trong sổ đối tác.",
    19:"Nếu đổi quy ước từ NB − DT sang DT − NB thì độ lớn tuyệt đối của một chênh lệch thay đổi thế nào?|Giữ nguyên|Tăng gấp đôi|Luôn thành 0|Đảo phép trừ chỉ đổi dấu.",
    20:"Nhật ký ghi “nghi do nhập trùng”. Điều gì cho phép đóng vụ việc?|Bằng chứng xác minh liên kết với mã và xác nhận xử lý theo quy trình|Chỉ vì sắp hết ca|Chỉ vì dòng được tô xanh|Giả thuyết phải được xác minh và kết luận phải truy vết được.",
    21:"7 mã khớp và 4 mã ngoại lệ có thể cộng thành đủ 11 mã nếu điều kiện nào đúng?|Hai tập không trùng, bao phủ danh mục hợp|Cùng đơn vị VND là đủ|Tổng hai bên lớn hơn 0|Mỗi mã phải thuộc đúng một nhóm trước khi dùng phép cộng kiểm toàn bộ.",
    22:"Trên Pivot, ô Cần Thơ ghi 8. Làm sao kiểm đó thực sự là 8 hồ sơ?|Mở chi tiết ô, đếm và đối chiếu MaHS với nguồn|Chuyển toàn bộ thành phần trăm|Xóa dữ liệu gốc|Danh sách dòng đằng sau ô cho phép kiểm cấp chi tiết.",
    23:"Bảng chéo có tổng cột Đã đóng = 20 và tổng cột Đang xử lý = 4. Grand Total là bao nhiêu?|24|20|4|Mỗi hồ sơ thuộc đúng một trong hai trạng thái.",
    24:"Hai tuần lần lượt đạt 8/10 và 6/10. Số hồ sơ đạt giảm bao nhiêu?|2 hồ sơ|20 hồ sơ|25 hồ sơ|So sánh số lượng ở hai tử, 8 − 6 = 2.",
    25:"Trong dãy 5, 20, 35 phút, giá trị 35 cách trung bình bao nhiêu phút?|15 phút|30 phút|35 phút|Trung bình là 20 nên khoảng cách bằng 35 − 20.",
    26:"Với 4 hồ sơ trễ tại Hà Nội trong 6 hồ sơ trễ toàn kỳ, 4/6 trả lời gì?|Trong các hồ sơ trễ, bao nhiêu phần thuộc Hà Nội|Trong Hà Nội bao nhiêu phần trễ|Trong cả hệ thống bao nhiêu phần đúng hạn|Điều kiện xác định mẫu là trễ, còn nhóm quan tâm là Hà Nội.",
    27:"Mẫu chỉ gồm hồ sơ thẻ của Hà Nội. Khi viết phạm vi kết luận cần ghi gì?|Nghiệp vụ, chi nhánh, kỳ quan sát và cỡ mẫu thực tế|Phạm vi mọi chi nhánh trong năm|Tỷ lệ mục tiêu thay cho cỡ mẫu|Người đọc cần biết đối tượng thực sự được quan sát.",
    28:"Tỷ lệ hai tuần là 80% và 60%. Nhãn trục nào phù hợp cho đường biểu diễn?|Tỷ lệ đạt SLA trên hồ sơ đã đóng (%)|Số tiền (VND)|Thời gian (phút)|Đại lượng vẽ là tỷ lệ, còn tuần là trục thời gian.",
    29:"Thẻ khối lượng là 24 hồ sơ còn mẫu số SLA là 20. Có mâu thuẫn không?|Hai số có phạm vi khác nhau, 4 hồ sơ đang mở|SLA phải chia 24 trong mọi báo cáo|Chắc chắn bị mất 4 mã|Thẻ khối lượng gồm tất cả hồ sơ, KPI chỉ xét nhóm đã đóng.",
    30:"Khi trưởng ca hỏi “70% lấy từ đâu?”, bằng chứng nào thuyết phục nhất?|Danh sách 14 mã đạt trong 20 mã đóng, quy tắc và kỳ chốt|Chỉ đọc lại tiêu đề biểu đồ|Nói đó là số mặc định của Excel|Có thể kiểm độc lập tử, mẫu và phạm vi từ các mã nguồn."
  };
  const ans = String(d.answers[0]);
  const distractors = {
    SLAPhut:["XuLyPhut","NgayNhan"],HS004:["HS001","HS003"],GD110:["GD109","GD111"],GD111:["GD109","GD110"]
  };
  const wrong = distractors[ans] || [String(Number(ans)+1),String(Number(ans)+2)];
  const sourceQ = q("Theo dữ liệu hoặc ví dụ thực hành của buổi này: " + d.q, ans, ...wrong, d.why);
  const groups = focus[k].split(" ");
  const primary = groups[0];
  const warm = [sourceQ, daily[k].split("|"), ...packs[primary]];
  const examTopics = groups.slice(1);
  const extraTopic = { fields:"count",source:"filter",filter:"fields",count:"fields",sla:"filter",rate:"count",formula:"source",audit:"report",recon:"source",report:"rate",pivot:"report",stats:"count",sample:"audit" }[primary];
  const reserve = [extraTopic, "fields", "source", "filter", "report", "sample"].find(x => !groups.includes(x));
  const exam = [...(extras[primary] || packs[reserve]).slice(0,6), ...examTopics.flatMap(name=>packs[name])];
  return warm.concat(exam);
};
