/* Các tình huống độc lập dưới đây dùng dữ liệu giả lập. Câu định lượng ghi số liệu ngay trong đề. */
(() => {
  const rows = value => value.trim().split("\n").map(line => line.trim().split("|"));
  const packs = {
    import: rows(`
CSV mở ra chỉ có một cột dù có chín tiêu đề. Cần kiểm gì trước?|Dấu phân cách trong bước nhập|Quan hệ giữa hai bảng|Màu sắc của thẻ|Trình đọc phải tách đúng trường trước khi đặt kiểu.
Mã chi nhánh 0017 cần nhận kiểu nào?|Text|Whole Number|Date|Số 0 đầu thuộc cách biểu diễn mã. Chuyển sang số làm mất thông tin đó.
Ngày 04/05/2026 của nguồn dùng ngày/tháng. Khi nhập theo tháng/ngày thì lỗi nào có thể lọt qua?|Ngày bị hiểu là 5 tháng 4|Giá trị luôn thành null|Cột chuyển thành mã duy nhất|Hai cách hiểu đều cho ngày hợp lệ. Cần dùng đúng thiết lập vùng và đối chiếu với nguồn.
Muốn bỏ khoảng trắng đầu cuối của nhãn chi nhánh, thao tác nào phù hợp?|Trim trong Power Query|Sum trong visual|Thay mọi giá trị thành chữ hoa rồi cộng|Trim bỏ khoảng trắng ngoài. Sau đó kiểm danh sách nhãn còn lại.
HoSo có 24 dòng trước nạp, 23 dòng sau nạp. Kiểm ở đâu để tìm bước gây hụt?|So số dòng sau từng Applied Step|Đổi thang trục thời gian|Tạo measure phần trăm|Đi qua từng bước sẽ tìm được bước đầu tiên làm thay đổi số dòng.
Trước khi Close & Apply, thấy Hà Nội hiển thị sai dấu ngay ở bản xem trước. Nên thử gì?|Đọc lại với đúng bảng mã UTF-8|Sắp xếp tên tăng dần|Dùng màu đỏ cho nhãn|Lỗi giải mã ký tự xảy ra ở bước đọc tệp.
Một tệp thêm hai cột mới, số dòng và tổng tiền giữ nguyên. Phép kiểm nào phát hiện thay đổi này?|So tên và kiểu cột với danh mục nguồn|Chỉ đếm số dòng|Chỉ cộng tiền|Kiểm cấu trúc bảng phát hiện thay đổi mà các tổng kiểm có thể bỏ lọt.
Muốn bước chuẩn hóa được áp lại sau mỗi lần nạp thì nên làm thế nào?|Lưu phép biến đổi thành các bước Power Query|Sửa vài số trên ảnh chụp báo cáo|Đổi tên file kết quả sau mỗi lần chạy|Các bước truy vấn được dùng lại khi làm mới nguồn cùng cấu trúc.
`),
    quality: rows(`
Trong bảng nguồn, hồ sơ đang mở có XuLyPhut trống. Cờ đạt hạn nên mang giá trị nào theo quy ước bài?|null|1|0 tương đương một hồ sơ đã đóng trễ|Chưa có thời gian hoàn tất để so ngưỡng. Quy tắc dùng null cho dòng đang mở.
Một hồ sơ đã đóng trong 60 phút với SLA 60 phút. DatSLA bằng bao nhiêu?|1|0|null vì đúng bằng ngưỡng|Điều kiện đạt là thời gian thực tế nhỏ hơn hoặc bằng ngưỡng.
Đã đóng nhưng XuLyPhut thiếu do lỗi nhập. Nên xử lý thế nào trước khi chốt báo cáo?|Tách dòng vào danh sách cần xác minh|Điền 0 để cho đạt|Tự điền bằng SLA|Thiếu thời gian khiến kết quả đúng hạn chưa xác định. Cần làm rõ quy tắc xử lý dữ liệu thiếu.
Các nhãn “Hà Nội” và “Hà Nội ” cùng chỉ một nơi. Cách sửa có thể truy vết là gì?|Giữ nhãn gốc và chuẩn hóa vào trường dùng báo cáo|Xóa mọi dòng có nhãn dài hơn|Đổi cả hai thành mã của nơi khác|Giữ dấu vết giúp đối chiếu nguồn khi kiểm nguyên nhân phân nhóm sai.
Ba ca kiểm nào phân biệt nhánh của công thức hạn?|Đang mở, đóng đúng biên, đóng vượt ngưỡng|Ba hồ sơ cùng đóng sớm|Ba chi nhánh cùng tên|Ba tình huống kiểm cách xử lý null, dấu bằng và trường hợp trễ.
Tổng cờ DaDong là 20 nhưng COUNT(DaDong) là 24 khi cột chỉ có 0 và 1. Vì sao?|COUNT đếm cả giá trị 0 có mặt|COUNT luôn đếm mã duy nhất|SUM bỏ mọi giá trị 1|SUM cộng cờ 1 còn COUNT đếm tất cả giá trị số có mặt, kể cả 0.
Hai dòng cùng MaGD và cùng tiền trong sổ. Cần giữ bằng chứng nào trước khi quyết định loại?|Mã dòng, chứng từ nguồn và quy ước một dòng|Chỉ màu dùng để tô ngoại lệ|Tên máy của người đọc|Hai dòng giống nhau có thể là nhiều bút toán thật. Cần xác minh cấp chi tiết.
Sau khi chuẩn hóa, số dòng đúng nhưng tổng tiền giảm. Kiểm gì?|Các lỗi chuyển kiểu, giá trị null và dòng bị sửa|Chỉ cỡ chữ báo cáo|Thêm một slicer trạng thái|Số dòng giữ nguyên không bảo đảm các giá trị tiền được bảo toàn.
`),
    model: rows(`
DimCN có ba chi nhánh, HoSo có nhiều hồ sơ mỗi nơi. Phía “1” nên là bảng nào?|DimCN|HoSo|Cả hai đều phải là phía nhiều|Bảng chiều có một dòng cho mỗi khóa chi nhánh.
Muốn slicer chi nhánh lọc hồ sơ, hướng lọc đơn giản nào phù hợp?|Từ DimCN tới HoSo|Từ HoSo tới DimCN duy nhất|Tạo hai bản sao rời của HoSo|Bộ lọc bắt đầu ở danh mục và truyền qua quan hệ tới các dòng hồ sơ.
MaGD hiện hai lần bên nội bộ và ba lần bên đối tác. Nối thẳng từng dòng theo mã sẽ ra mấy cặp cho mã này?|6|5|3|Hai dòng bên trái đều khớp ba dòng bên phải, tạo 2 × 3 cặp.
Tạo DimGD để bao phủ mã chỉ có ở một sổ. Lấy khóa thế nào?|Gộp hai danh sách mã rồi lấy giá trị phân biệt|Chỉ lấy giao của hai danh sách|Đánh số thứ tự hai bảng rồi ghép|Tập hợp mã của hai bên chứa cả mã chỉ xuất hiện ở một phía.
Bảng chiều lặp tên chi nhánh sau chuẩn hóa. Trước khi nối, kiểm gì?|Khóa nghiệp vụ có thực sự duy nhất ở cấp chi nhánh không|Mã có cùng màu trong hai bảng không|Có thể lấy tổng tên chi nhánh không|Quan hệ một–nhiều đòi hỏi phía một có khóa duy nhất đúng nghĩa.
Khi lọc GD109, bảng đối tác trống. Dữ liệu này có thể cho biết gì?|Mã không có bản ghi đối tác trong phạm vi lọc|Số tiền đối tác chắc chắn bằng 0 trong nghiệp vụ thật|Phải xóa mã khỏi DimGD|Dòng thiếu là thông tin đối soát. Cần phân biệt vắng bản ghi với số tiền bằng 0.
Nếu thêm NghiepVu vào bảng tổng theo ChiNhanh thì cấp chi tiết thành gì?|Một hàng cho mỗi tổ hợp chi nhánh và nghiệp vụ có dữ liệu|Một hàng cho mỗi giao dịch đối tác|Một hàng cho mỗi toàn hệ thống|Chiều bổ sung chia từng nhóm chi nhánh thành nhóm nhỏ hơn.
HoSo dùng MaHS, hai sổ dùng MaGD và chưa có bảng liên kết. Có thể quy lệch GD104 về một hồ sơ cụ thể không?|Chưa có căn cứ ghép hai đối tượng|Có, ghép theo số thứ tự dòng|Có, dựa vào số ký tự của mã|Cần khóa ánh xạ được xác minh. Hai loại mã biểu diễn hai đối tượng khác nhau.
`),
    kpi: rows(`
Định nghĩa đạt hạn là đúng hạn trên số đã đóng. Trong 12 hồ sơ có 8 đã đóng, 6 đạt. Giá trị đúng là gì?|75%|50%|66,7%|Tử là 6, mẫu là 8. Bốn hồ sơ đang mở không thuộc mẫu số.
Measure TyLeSLA nên dùng biểu thức nào với hai measure đếm hợp lệ?|DIVIDE([DatCount], [DaDongCount])|[DatCount] + [DaDongCount]|DIVIDE([DaDongCount], [DatCount])|Tỷ lệ bằng tổng đạt chia tổng đã đóng trong cùng ngữ cảnh lọc.
Một nhóm chưa có hồ sơ đóng. DIVIDE(tử,mẫu) mặc định trả gì nếu mẫu bằng 0?|BLANK|100%|Số hồ sơ đang mở|Mẫu bằng 0 làm tỷ lệ chưa xác định. Có thể hiển thị chú thích để người đọc hiểu.
Đơn vị A đạt 1/2, B đạt 9/10. Toàn bộ đạt bao nhiêu?|10/12, khoảng 83,3%|70% là trung bình hai tỷ lệ|100% vì cộng hai tử được 10|Tổng tử bằng 10 và tổng mẫu bằng 12. Hai đơn vị có cỡ nhóm khác nhau.
Mô hình cần cập nhật tỷ lệ theo chi nhánh vừa chọn. Nên tính tỷ lệ chính ở đâu?|Trong measure tính theo ngữ cảnh hiện hành|Trong một ô văn bản cố định|Trong tiêu đề tĩnh|Measure tính lại sau khi người dùng thay bộ lọc.
Với 8/10 tuần đầu và 6/10 tuần sau, mức giảm tuyệt đối là gì?|20 điểm phần trăm|25 điểm phần trăm|2 điểm phần trăm|80% trừ 60% bằng 20 điểm phần trăm. Mức giảm tương đối là 25%.
Chỉ số 30 hồ sơ trễ ở đơn vị lớn và 5 ở đơn vị nhỏ. Muốn so tỷ lệ trễ cần thêm gì?|Số hồ sơ đủ điều kiện ở từng đơn vị|Mã chi nhánh dài bao nhiêu ký tự|Màu nhấn của thẻ|Hai tử số riêng lẻ không cho biết tỷ lệ nếu chưa biết quy mô hai nhóm.
Nhóm có 4 hồ sơ đạt trong 5 đã đóng. Một hồ sơ trễ mới được đóng. Kết quả mới là gì?|4/6|5/6|4/5|Hồ sơ mới tăng mẫu số một đơn vị và không làm tăng tử số.
`),
    filter: rows(`
Slicer chọn Hà Nội, cột Matrix là tuần 2. Ô giao điểm đo phạm vi nào?|Hà Nội trong tuần 2|Mọi tuần của Hà Nội|Mọi chi nhánh trong tuần 2|Hai điều kiện cùng tác động lên ô giao của ma trận.
Khi phải xác minh tỷ lệ 25% cho 4 hồ sơ đóng, cần truy tới mấy hồ sơ đạt?|1|2|3|Một trong bốn hồ sơ tương ứng 25%. Có thể lần ngược từng mã để kiểm.
Muốn xác định visual B đang lọc hay chỉ tô nổi khi bấm visual A, nên kiểm gì?|Các tương tác giữa visual và số dòng ở bảng chi tiết|Tên người tạo theme|Đơn vị tiền mặc định của máy|Lọc giới hạn phạm vi dữ liệu hiển thị, còn tô nổi vẫn giữ phần so sánh.
Thẻ đã đổi theo slicer nhưng bảng chi tiết giữ nguyên. Nguyên nhân nào cần kiểm?|Tương tác của slicer với bảng hoặc quan hệ truyền lọc|Cỡ chữ trong tiêu đề thẻ|Thứ tự chữ cái của tên trang|Một visual có thể bị tắt tương tác hoặc dùng bảng không nhận cùng bộ lọc.
Người xem muốn trở về số toàn kỳ sau khi chọn hai slicer. Thiết kế nào dễ kiểm nhất?|Có cách xóa bộ lọc và hiển thị lại kỳ, chi nhánh hiện hành|Ẩn hai slicer khi chọn|Đổi tên số tổng thành cố định|Người xem cần biết và có thể phục hồi phạm vi phân tích.
Muốn truy ra vì sao HS013 trễ, bảng chi tiết tối thiểu nên thêm cặp trường nào cạnh mã?|XuLyPhut và SLAPhut của cùng hồ sơ|Số dòng của hai sổ giao dịch|Hai màu tương ứng hai tuần|Cặp số thực tế và ngưỡng giúp kiểm trực tiếp điều kiện trễ.
Hai trang dùng bảng hồ sơ và bảng giao dịch chưa liên kết. Khi lọc chi nhánh, chỉ số nào có thể diễn giải chắc chắn?|Chỉ số trên hồ sơ có cột chi nhánh và nhận bộ lọc|Mọi ngoại lệ giao dịch trong chi nhánh đã chọn|Toàn bộ tiền đối tác của chi nhánh|Không có khóa nối để phân bổ giao dịch theo chi nhánh trong bộ dữ liệu này.
Ma trận có tổng theo hai nhóm. Khi nào cộng số mã phân biệt ở hai nhóm có thể cho tổng sai?|Một mã có thể xuất hiện trong cả hai nhóm|Mỗi mã chỉ thuộc đúng một nhóm|Các nhóm được sắp theo tên|DISTINCTCOUNT không cộng được đơn giản nếu các tập mã chồng lấn.
`),
    visual: rows(`
Hai tỷ lệ 80% và 60% vẽ bằng thanh. Chọn trục nào thể hiện chiều dài công bằng?|Cùng trục bắt đầu từ 0|Trục của mỗi thanh bắt đầu từ số riêng|Luôn cắt ở 59%|Độ dài thanh mã hóa độ lớn. Cắt gốc có thể phóng đại chênh lệch.
Một trục ngày chỉ hiện ngày có bản ghi. Cần gì để thấy ngày lịch bị thiếu?|Danh mục ngày đủ kỳ để so với ngày nguồn|Chuyển mọi mã thành kiểu Date|Cộng thời gian xử lý của toàn kỳ|So tập ngày lịch với ngày có dữ liệu sẽ chỉ ra khoảng trống.
Thiếu tệp ngày thứ Bảy. Nên gắn nhãn điểm này thế nào?|Chưa xác nhận dữ liệu ngày|Chắc chắn bằng 0 giao dịch|Bằng số của ngày liền trước|Vắng quan sát khác với xác nhận không có hoạt động.
Bảng in đen trắng cần cho thấy hồ sơ trễ. Thiết kế nào còn đọc được?|Nhãn Trễ và giá trị số cạnh màu nhấn|Chỉ phân biệt hai mức bằng màu đỏ và xanh|Ẩn tiêu đề cột|Mã hóa thêm bằng chữ giúp đọc được khi không phân biệt màu.
Trưởng ca muốn so số hồ sơ giữa các chi nhánh. Cách trình bày nào đơn giản?|Thanh theo chi nhánh trên cùng thang hồ sơ|Đường thời gian không có ngày|Biểu đồ hai trục cho cùng một số đếm|Chi nhánh là danh mục và độ dài thanh cho phép so số lượng trực tiếp.
Tại sao nhãn 1/1 nên xuất hiện cạnh 100%?|Đọc được mức độ nhỏ của mẫu số|Biến dữ liệu nhỏ thành mẫu đại diện|Để cộng 1/1 với mọi tỷ lệ|Cùng 100% có thể dựa trên một hoặc hàng nghìn trường hợp.
Muốn phân biệt hồ sơ nào phải xử lý sau khi thấy số trễ tăng. Nên có gì dưới đồ thị?|Bảng mã hồ sơ, mức vượt và trạng thái|Một bản sao của tiêu đề|Ảnh biểu trưng lớn hơn|Từ chỉ số tổng, người dùng cần đối tượng cụ thể để hành động.
Hai thước đo tiền và phút cùng nằm trên một trục không đơn vị. Sửa gì trước?|Tách cách hiển thị hoặc chú thích rõ thang và đơn vị|Ẩn giá trị trục|Đổi tên tiền thành phút|So sánh hai độ cao có đơn vị khác nhau dễ làm người xem hiểu sai.
`),
    test: rows(`
Một ca nghiệm thu nào đủ thông tin để người khác lặp lại?|Dữ liệu đầu vào, thao tác, kết quả mong đợi và thực tế|Ảnh biểu đồ đẹp nhất|Tên báo cáo và số trang|Các thành phần giúp đối chiếu một cách độc lập.
Báo cáo đúng ở toàn kỳ nhưng sai khi chọn tuần 2. Bài test nào phát hiện lỗi?|Lọc tuần 2 và so cả tử, mẫu với nguồn|Chỉ đọc số toàn kỳ|Đổi kích thước trang|Kiểm bộ lọc là trường hợp độc lập với kiểm tổng.
Khi sửa công thức SLA để xử lý biên, làm gì sau đó?|Chạy lại ca biên và các ca tổng, lọc, mẫu 0|Chỉ kiểm tên mới của measure|Xóa kết quả kiểm lần trước|Sửa một nhánh có thể ảnh hưởng cách tổng hợp ở nhiều phạm vi.
Muốn kiểm tính dễ dùng, phép đo nào gắn trực tiếp với công việc?|Số người tìm đúng mã và thời gian hoàn thành tác vụ|Số màu trên trang|Kích thước file PBIX|Độ đúng và thời gian cho thấy người dùng có thực hiện được tác vụ thực tế hay không.
Một người tìm đúng số nhưng mất 3 phút tìm nút xóa lọc. Nên thử cải tiến gì?|Làm rõ trạng thái bộ lọc và vị trí nút đặt lại|Thêm một biểu đồ tròn|Đổi dữ liệu nguồn để ít dòng hơn|Trở ngại quan sát được nằm ở thao tác khôi phục phạm vi.
Số liệu trong visual khớp bảng tính vì cả hai lấy cùng tệp đã tổng hợp sai. Cách kiểm bổ sung nào tốt?|Tính lại trên các dòng gốc với quy tắc độc lập|Chụp thêm ảnh của cùng visual|Thêm một thẻ dùng cùng measure|Nguồn và cách kiểm độc lập giúp phát hiện lỗi chung.
Đặt một ca thử lọc vào nhóm không có hồ sơ. Kết quả mong đợi nào hợp lý cho tỷ lệ đạt?|Thông báo chưa có mẫu hoặc BLANK|Mặc định 100%|Giữ tỷ lệ của lần lọc trước|Mẫu số bằng 0 không xác định được tỷ lệ.
Kết quả thực tế khác mong đợi. Bằng chứng nào nên ghi vào phiếu lỗi?|Kỳ dữ liệu, bộ lọc, số mong đợi và số thực tế|Chỉ ghi “có lỗi”|Một mô tả không kèm thao tác|Đủ ngữ cảnh giúp tái hiện và xác định nơi sai.
`),
    stats: rows(`
Trong 5 hồ sơ thẻ Hà Nội đã đóng có 4 thiếu chứng từ. Tỷ lệ theo nhóm này là gì?|80%|66,7%|20%|Mẫu số của câu hỏi là 5 hồ sơ thẻ đã đóng tại Hà Nội.
Trong 6 hồ sơ trễ của toàn bộ mẫu, 4 có lý do thiếu chứng từ. Tỷ trọng nguyên nhân này xấp xỉ bao nhiêu?|66,7%|80%|40%|Điều kiện là hồ sơ trễ nên chia 4 cho 6.
Muốn biết tỷ lệ trễ chung, chỉ kiểm hồ sơ đã khiếu nại sẽ gặp vấn đề gì?|Thiên lệch chọn mẫu|Tự động loại được ngoại lệ|Có mẫu đại diện vì đã có lý do|Nhóm khiếu nại có cơ chế lựa chọn khác tổng thể.
Hai kỳ dùng ngưỡng SLA khác nhau cho cùng loại hồ sơ. Việc gì cần làm trước khi so?|Ghi thay đổi, tính lại trên cơ sở so sánh được|Giữ hai số rồi kết luận năng suất thay đổi|Bỏ mọi mã ngoài kỳ mới|Thay định nghĩa có thể làm thay đổi chỉ số dù quy trình thực tế như cũ.
Chọn một hồ sơ từ mỗi tổ hợp 3 chi nhánh và 2 tuần đầy đủ. Tổng số cần chọn là gì?|6|5|9|Có 3 × 2 = 6 tầng theo thiết kế ví dụ.
Hai tổ được lấy 5 hồ sơ mỗi tổ, nhưng tổng thể một tổ lớn gấp 9 lần tổ kia. Ước lượng tỷ lệ chung cần lưu ý gì?|Trọng số theo quy mô của mỗi tổ trong tổng thể|Cứ lấy trung bình hai tỷ lệ nhóm|Phải để tỷ lệ cả hai bằng nhau|Mẫu phân bổ đều không phản ánh tự động tỷ trọng thực tế của mỗi tổ.
Đường cơ sở là 4/5. Nếu thêm một hồ sơ cùng phạm vi và cùng loại lỗi, tỷ lệ thành gì?|5/6|4/6|5/5|Cả tử và mẫu đều tăng thêm một đơn vị.
Thí điểm có tỷ lệ lỗi giảm trong một tuần. Điều gì làm kết luận về nguyên nhân đáng tin hơn?|Kiểm thay đổi cơ cấu hồ sơ và so với nhóm hoặc kỳ đối chiếu phù hợp|Chỉ báo phần trăm giảm và bỏ mẫu số|Dừng thu thập dữ liệu ngay|Cơ cấu, khối lượng và thời kỳ có thể cùng thay đổi với thí điểm.
`),
    ai: rows(`
Mục tiêu dự báo trễ tại lúc tiếp nhận. Đặc trưng nào có nguy cơ tiết lộ nhãn?|Lý do trễ ghi sau khi đóng|Loại nghiệp vụ đã biết lúc nhận|Chi nhánh tiếp nhận|Trường ghi sau sự kiện có thể chứa kết quả cần dự báo.
Muốn thử khả năng áp dụng cho tháng tới. Cách chia mẫu nào sát tình huống?|Huấn luyện trên kỳ trước và đánh giá kỳ sau|Dùng tất cả hồ sơ cho cả hai tập|Đưa kết quả tháng sau vào biến đầu vào|Đánh giá theo thời gian mô phỏng lúc dự báo chưa biết tương lai.
Cảnh báo 10 hồ sơ, chỉ 6 hồ sơ thực sự trễ. Precision là gì?|60%|40%|100%|Có 6 đúng trong 10 cảnh báo được phát ra.
Thực tế có 15 hồ sơ trễ, cảnh báo bắt được 6. Recall là gì?|40%|60%|90%|Mẫu số của recall là toàn bộ ca trễ thực tế, bằng 15.
Một bản sao cùng hồ sơ xuất hiện ở cả huấn luyện và kiểm tra. Điều này có thể gây gì?|Đánh giá quá lạc quan|Tự động tăng tính độc lập của mẫu|Luôn làm giảm accuracy về 0|Mô hình có thể đã nhìn thấy thông tin của ca kiểm tra qua bản sao.
Khi gửi ví dụ vào công cụ AI để luyện viết công thức, nên chọn dữ liệu nào?|Bảng giả lập với trường vừa đủ cho bài|Danh sách định danh khách hàng thật|Mật khẩu tài khoản chạy thử|Bảng giả lập hỗ trợ kiểm logic và hạn chế lộ thông tin.
Mô hình đoán mọi hồ sơ đều đúng hạn khi chỉ 1% hồ sơ trễ. Chỉ số nào phơi bày việc bỏ sót toàn bộ ca trễ?|Recall đối với lớp trễ bằng 0|Số lượng cột nguồn|Accuracy toàn mẫu xấp xỉ 99% nếu xem một mình|Không ca trễ nào được phát hiện. Chỉ số chung có thể che tình trạng này.
Muốn dùng nhãn trễ để huấn luyện. Phương án nào nhất quán với thời điểm dự đoán?|Dùng kết quả sau đóng làm nhãn, chỉ dùng trường đã biết lúc nhận làm đầu vào|Dùng số phút hoàn tất làm đầu vào ở lúc nhận|Dùng chính nhãn làm biến dự báo|Nhãn được biết sau để xây dựng mẫu lịch sử. Đặc trưng phải có khi mô hình được sử dụng.
`),
    finance: rows(`
Trái phiếu giả lập mệnh giá 100 triệu, coupon 6%/năm, trả hằng năm đủ kỳ. Lãi một kỳ là bao nhiêu?|6 triệu VND|60 triệu VND|106 triệu VND|100 triệu × 0,06 = 6 triệu. Mệnh giá và tiền lãi là hai đại lượng riêng.
Khoản chi lãi 5,8 triệu trong khi đến hạn 6 triệu. Lấy đã chi trừ đến hạn, chênh là gì?|−0,2 triệu VND|+0,2 triệu VND|11,8 triệu VND|5,8 − 6 = −0,2 triệu VND theo quy ước dấu của câu.
Khi đối soát coupon theo kỳ, đâu là nhóm khóa hợp lý để tìm đúng nghĩa vụ?|Mã sản phẩm, kỳ lãi và đơn vị tiền|Chỉ số thứ tự dòng sau sắp xếp|Chỉ tên tháng bỏ qua năm|Phải đối chiếu cùng sản phẩm, thời kỳ và đơn vị.
Trong ví dụ coupon cố định, giá giao dịch từ 100 xuống 98 triệu. Trường nào vẫn là cơ sở tính coupon theo điều khoản đã nêu?|Mệnh giá|Giá vừa giao dịch|Tổng tiền của hai bảng|Coupon theo ví dụ tính trên mệnh giá, không thay theo giá giao dịch.
Một nguồn ghi triệu VND, nguồn kia ghi VND. Phải thực hiện bước nào để so số?|Quy về cùng đơn vị rồi so đúng kỳ|So chuỗi chữ số nguyên gốc|Cộng luôn hai trường|Một triệu VND bằng một triệu đơn vị VND. Cần nhất quán đơn vị ở hai phía.
Số dư cuối thứ Hai 100 triệu, thứ Ba 110 triệu. Nếu cần số dư cuối thứ Ba thì báo bao nhiêu?|110 triệu|210 triệu|10 triệu|Số dư là trạng thái tại một thời điểm. 10 triệu là mức thay đổi.
Báo cáo cần giải thích khoản lãi đã đến hạn nhưng chưa thanh toán. Nên tách ngày nào?|Ngày đến hạn và ngày thực chi|Ngày chụp ảnh và ngày in báo cáo|Hai bản sao ngày tạo file|Hai mốc cho phép phân biệt nghĩa vụ đến hạn với dòng tiền thực tế.
Giả định chia đều lãi 8%/năm, trả hai kỳ bằng nhau trên mệnh giá 50 triệu. Lãi mỗi kỳ bao nhiêu?|2 triệu|4 triệu|8 triệu|50 × 8% = 4 triệu cho cả năm, chia hai kỳ được 2 triệu.
`),
    reconcile: rows(`
Nhật ký ngoại lệ theo mã nên giữ gì ngoài số tiền lệch?|Mã, bằng chứng hai phía, người xử lý, hạn và trạng thái|Chỉ tổng số tiền của mọi mã|Chỉ ảnh dashboard|Từng ngoại lệ cần được truy lại và có người chịu trách nhiệm giải quyết.
Nội bộ 1.250.000 VND, đối tác 1.200.000 VND. Nội bộ trừ đối tác bằng bao nhiêu?|+50.000 VND|−50.000 VND|+2.450.000 VND|Quy ước lấy nội bộ trừ đối tác cho kết quả dương 50.000.
Hai mã có chênh +50 và −50 cùng đơn vị. Tổng chênh bằng 0 cho phép kết luận gì?|Hai lệch có thể bù nhau ở cấp tổng|Mọi mã đều đã khớp|Mỗi sổ đều không còn bút toán|Phải đối soát từng mã. Số tổng 0 không loại được lệch bù trừ.
Cần nhìn mã chỉ có nội bộ và mã chỉ có đối tác. Phương án nào bao phủ cả hai?|Outer join trên bảng tổng hợp đúng cấp khóa|Inner join ngay trên hai sổ thô|Lọc bỏ mọi khóa không chung trước tiên|Outer join giữ mã có mặt ở bất kỳ phía nào.
Hai dòng cùng mã được gộp thành một tổng khớp tiền đối tác. Kiểm thêm gì để không bỏ sót ngoại lệ lặp?|Số dòng và bằng chứng cho từng bút toán|Chỉ màu sắc của dòng tổng|Chỉ số chữ số của khoản tiền|Tổng khớp vẫn có thể che việc khác số lần xuất hiện.
Một mã chỉ có ở sổ đối tác trong kỳ. Bước xác minh đầu tiên hợp lý là gì?|So ngày chốt, khóa và chứng từ của hai bên|Tuyên bố chắc chắn mất tiền|Xóa khỏi danh sách vì không đủ hai dòng|Khác biệt có thể do phạm vi thời gian, cơ chế ghi sổ hoặc sai sót.
Sau khi chỉnh số ở bản xử lý, nên lưu gì trước khi đóng ngoại lệ?|Kết quả trước/sau, bằng chứng và xác nhận kiểm lại|Chỉ bản sau cùng, xóa lịch sử|Mỗi tên người sửa|Cần tái hiện nguyên nhân, tác động và việc kiểm chứng.
Muốn đếm số ngoại lệ phân biệt khi một mã có hai dòng ghi chú. Dùng gì?|Đếm mã ngoại lệ phân biệt theo định nghĩa|Đếm mọi dòng ghi chú|Cộng giá trị cột mã|Nhật ký có thể có nhiều sự kiện cho cùng một ngoại lệ.
`),
    trace: rows(`
Bản chụp đầu vào cần thông tin nào để chạy lại đúng dữ liệu?|Tên hoặc phiên bản tệp, thời điểm chốt, số dòng và tổng kiểm|Màu bìa runbook|Chỉ tên người mở tệp lần cuối|Danh mục này nhận diện nguồn và phép kiểm cho từng lần chạy.
Nên đặt bản CSV gốc ở đâu trong quy trình?|Khu vực dữ liệu thô, tách khỏi bản biến đổi|Luôn ghi đè bằng bảng đã sửa|Chỉ lưu ảnh một vài dòng|Giữ bản gốc để đối chiếu và tái tạo phép biến đổi.
Sau khi chạy lại ở phiên trống, notebook báo thiếu biến. Phát hiện này gợi ý gì?|Có bước phụ thuộc thao tác hoặc trạng thái ngoài quy trình|Kết quả chắc chắn đúng vì đã từng chạy|Tệp nguồn chắc chắn bị lỗi mã hóa|Quy trình tái lập cần tạo đầy đủ biến và bảng từ đầu vào đã ghi.
Một tệp giữ nguyên số dòng và tổng tiền nhưng hai giao dịch đổi tiền cho nhau. Cách nào phát hiện?|So nội dung theo từng khóa hoặc dấu nhận diện của toàn tệp|Chỉ so tổng tiền|Chỉ đếm số dòng|Hai phép tổng kiểm đơn giản có thể che sự thay đổi giữa các mã.
Bảng KPI hiển thị 6/10 trong tuần. Điều gì giúp kiểm lại tử số 6?|Danh sách mã đạt với điều kiện lọc và quy tắc tính|Tăng cỡ chữ của nhãn 60%|Đổi nhãn thành “Tốt”|Truy về dòng nguồn giúp tái tạo và giải thích tử số.
Đang chạy lại thì tệp mất cột SLAPhut. Hành vi nào phù hợp?|Dừng bước phụ thuộc, báo rõ tên cột thiếu|Tự đặt SLA cho mọi dòng bằng 0|Bỏ kiểm hạn rồi tiếp tục báo tỷ lệ cũ|Thiếu cột bắt buộc làm kết quả mất cơ sở. Cần phát hiện trước công bố.
Runbook bàn giao cần bổ sung gì cạnh lệnh chạy?|Đầu vào, thứ tự, đầu ra và phép kiểm mong đợi|Chỉ ảnh trang chủ|Tiểu sử người lập|Người khác cần biết điều kiện chạy và cách xác định lần chạy thành công.
Muốn truy nguyên chênh lệch sau khi cập nhật quy tắc, nên ghi gì?|Phiên bản quy tắc, thời điểm áp dụng và ảnh hưởng đến số liệu|Chỉ ngày đổi tên thư mục|Xóa toàn bộ kết quả trước đó|Theo dõi cả dữ liệu và logic giúp phân biệt nguyên nhân của thay đổi.
`),
    handoff: rows(`
Người quản lý cần quyết định ca đến. Câu mở đầu nào cung cấp bằng chứng cụ thể?|Tuần 2 có 6/10 hồ sơ đóng đạt hạn trong bộ giả lập|Hoạt động có vẻ tệ ở mọi nơi|Báo cáo này chắc chắn chứng minh nguyên nhân|Có kỳ, phạm vi, tử số và mẫu số để kiểm chứng.
“The on-time rate fell from 80% to 60%.” Cách nói mức giảm tuyệt đối đúng là gì?|It fell by 20 percentage points.|It fell by 20 cases.|It doubled.|Chênh hai tỷ lệ là 20 điểm phần trăm.
Cách dịch nào giữ đúng ý “cần xác minh nguyên nhân”?|The cause still needs to be verified.|The cause has been confirmed.|All losses have been recovered.|Câu đúng giữ được mức độ chưa chắc chắn của kết luận.
Đề xuất thử checklist trong hai tuần. Mục nào cần có để đánh giá?|Người phụ trách, nhóm áp dụng, KPI cùng mẫu số và ngày xem lại|Một khẩu hiệu chung|Chỉ màu của checklist|Đủ thông tin để biết ai làm, đo trên ai và lúc nào xem kết quả.
Khi được hỏi “How did you validate the result?”, bằng chứng nào trả lời trực tiếp nhất?|I traced four case IDs and recalculated the rate from the source.|The dashboard looks professional.|I renamed the file twice.|Đối chiếu mã và tính lại chỉ số là hành động kiểm chứng cụ thể.
Memo viết “một ngoại lệ chứng minh tổn thất thật”. Với dữ liệu giả lập, nên sửa sao?|Ghi nhận chênh lệch trong bộ giả lập và nêu bước xác minh|Thêm chữ chắc chắn vào kết luận|Xóa toàn bộ chi tiết số liệu|Chênh lệch là quan sát. Thiệt hại thực tế đòi hỏi bằng chứng khác.
Đề bài dự án cần nêu điều gì trước khi vẽ dashboard?|Người dùng, quyết định, phạm vi và tiêu chí nghiệm thu|Số màu được dùng mỗi ngày|Tên viết tắt của tất cả menu|Quyết định và tiêu chí định hướng dữ liệu, phép đo và cách kiểm.
Hai bản memo Việt và Anh khác nhau về số hồ sơ trễ. Việc gì phải làm trước bàn giao?|Đối chiếu cả hai với cùng bảng nguồn và cùng kỳ|Chọn số lớn hơn cho nổi bật|Lấy trung bình hai số|Bản dịch phải giữ đúng định nghĩa, số liệu và mức độ chắc chắn.
`)
  };
 window.biQuestions=function(d){const order=["import model visual test handoff","import quality model trace test","quality import test kpi trace","model filter quality test kpi","model reconcile quality filter test","kpi filter model test stats","filter kpi model test visual","visual filter kpi test handoff","filter visual trace model test","test kpi filter visual trace","model visual kpi filter stats","visual kpi filter stats test","visual quality stats import test","visual model filter test handoff","test visual handoff filter kpi","stats kpi trace quality test","stats quality test trace handoff","ai stats test quality trace","finance reconcile trace quality handoff","handoff stats kpi test trace","handoff trace kpi test visual","trace import quality test reconcile","kpi trace filter reconcile test","reconcile trace quality test handoff","visual filter model kpi test","stats ai quality test handoff","test trace import quality reconcile","handoff trace test quality ai","handoff kpi trace visual reconcile","handoff trace test stats ai"][d.n-61];const correct=String(d.answers[0]);const alt={GD104:["GD109","GD111"],HoSo:["NoiBo","DoiTac"],HS013:["HS003","HS009"],HS009:["HS004","HS003"],GD109:["GD110","GD111"],"Power Query":["PowerPoint","DAX Studio"],NghiepVu:["MaHS","ChiNhanh"],LyDoTre:["SLAPhut","ChiNhanh"],"không":["Có","Chỉ khi chọn tháng 1"],"percentage points":["percent change","basis period"]};const wrong=alt[correct]||[String(Number(correct)+1),String(Number(correct)+2)];const source=["Dựa vào ví dụ hoặc dữ liệu của buổi học: "+d.q,correct,...wrong,d.why];const seen=new Set([source[0]]);const out=[source];for(const name of [...order.split(" "),...Object.keys(packs)]){for(const row of packs[name]){if(!seen.has(row[0])){out.push(row);seen.add(row[0]);}if(out.length===40)return out;}}throw Error("Thiếu câu hỏi ngày "+d.n);};
})();
