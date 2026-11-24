// Each item stores the prompt, correct choice, two alternatives and its worked explanation.
window.sqlQuestions = function sqlQuestions(day) {
  const d = typeof day === "number" ? window.PROGRAM.days[day - 1] : day;
  const k = d.n - 30;
  const a = 4 + k % 5, b = 2 + k % 3, c = 1 + k % 2;
  const tag = "GD" + (200 + k);
  const q = (stem, right, w1, w2, why) => [stem, right, w1, w2, why].map(String);
  const number = (stem, right, why, ...decoys) => {
    const wrong = [...new Set([...decoys, right+1, right+2])].filter(x=>x!==right);
    return q(stem, right, wrong[0], wrong[1], why);
  };
  const packs = {
    read: [
      q("Trong sổ tiếp nhận, MaHS cho biết điều gì?", "Danh tính của một hồ sơ", "Tổng số khách hàng", "Mã bút toán kế toán", "MaHS nhận diện hồ sơ. Một khách hàng có thể nộp nhiều hồ sơ."),
      q("Một danh sách chọn MaHS và ChiNhanh từ HoSo. Mỗi dòng kết quả mô tả gì khi chưa lọc hay gộp?", "Một dòng hồ sơ ở nguồn", "Một chi nhánh duy nhất", "Một ngày tiếp nhận", "Chọn ít cột giữ nguyên mức chi tiết của từng dòng."),
      number(`Bảng có ${a+b} dòng dữ liệu và một hàng tiêu đề trong CSV. Sau khi đọc đúng tiêu đề, bảng có bao nhiêu bản ghi?`,a+b,"Tiêu đề đặt tên cho các trường và không phải một bản ghi.",a+b+1,a),
      q("ChiNhanh giống nhau ở hai dòng nhưng MaHS khác nhau. Có thể kết luận gì?", "Hai hồ sơ thuộc cùng chi nhánh", "Hai dòng chắc chắn trùng hồ sơ", "Cả hai thuộc cùng một khách hàng", "Tên chi nhánh được phép lặp trên nhiều mã hồ sơ."),
      q("Phút thực tế nên so với cột nào để xét hạn của cùng hồ sơ?", "SLAPhut của dòng đó", "SLAPhut lớn nhất của bảng", "Tuần tiếp nhận", "Ngưỡng có thể khác nhau theo nghiệp vụ và hồ sơ."),
      q("Người nhận cần mã hồ sơ, nghiệp vụ và chi nhánh. Trường nào có thể bỏ khỏi bảng giao cho yêu cầu này?", "LyDoTre", "NghiepVu", "MaHS", "Phạm vi đầu ra chỉ yêu cầu ba trường đã nêu."),
      q("Nguồn có MaGD và SoTienVND. Một dòng phù hợp để đọc theo nghĩa nào?", "Một bản ghi bút toán từ nguồn sổ", "Một hồ sơ xin cấp thẻ", "Một tháng chốt báo cáo", "Mã giao dịch trong mỗi dòng có thể lặp, nên chưa thể gọi mỗi dòng là một mã duy nhất."),
      q("Cần kiểm một mã cụ thể sau khi xuất báo cáo. Thông tin nào giúp lần về nguồn?", "Mã định danh và tên nguồn hoặc phiên bản", "Màu của biểu đồ", "Thứ tự dòng trên màn hình", "Thứ tự hiển thị có thể thay đổi qua các lần chạy.")
    ],
    select: [
      q("Cú pháp nào chọn mã và chi nhánh từ bảng hồ sơ?", "SELECT MaHS, ChiNhanh FROM HoSo", "SELECT HoSo FROM MaHS, ChiNhanh", "FROM ChiNhanh SELECT HoSo", "Danh sách cột nằm sau SELECT, bảng nguồn đứng sau FROM."),
      q("Trong SELECT ChiNhanh, MaHS FROM HoSo, cột kết quả thứ hai là gì?", "MaHS", "ChiNhanh", "Cột thứ hai của tệp nguồn", "Thứ tự cột đầu ra do danh sách SELECT quyết định."),
      number(`Có ${a+b} dòng, chỉ ${b} nhãn chi nhánh. SELECT ChiNhanh FROM HoSo, không có DISTINCT, trả bao nhiêu dòng?`,a+b,"Mỗi dòng nguồn đóng góp một giá trị kể cả khi nhãn trùng.",b,a),
      q("Muốn đặt tiêu đề MaHoSo cho MaHS mà vẫn giữ tên cột trong nguồn, dùng gì?", "SELECT MaHS AS MaHoSo FROM HoSo", "SELECT MaHoSo FROM HoSo dù cột chưa tồn tại", "SELECT MaHS + MaHoSo FROM HoSo", "AS đặt bí danh cho kết quả của truy vấn."),
      q("SELECT * FROM NoiBo dùng dấu * với ý nghĩa gì?", "Lấy mọi cột trong bảng được chọn", "Chỉ lấy số lần xuất hiện của từng mã", "Chỉ lấy dòng có tiền lớn nhất", "Trong danh sách SELECT, dấu * đại diện tất cả cột của bảng nguồn."),
      q("Đổi danh sách SELECT từ MaHS thành MaHS, NghiepVu. Điều gì đúng nếu chưa thêm DISTINCT hoặc phép gom?", "Thêm một cột kết quả, số dòng giữ nguyên", "Chỉ còn các hồ sơ có nghiệp vụ giống nhau", "Tự gộp mỗi nghiệp vụ thành một dòng", "Việc chọn cột tự nó không lọc hay tổng hợp các bản ghi."),
      q("Câu SELECT MaGD FROM HoSo báo không có cột MaGD. Cần kiểm điều gì trước?", "Tên bảng và danh sách cột thực tế", "Đổi tất cả MaHS trong nguồn thành MaGD", "Ép toàn bộ cột sang kiểu số", "HoSo nhận diện hồ sơ bằng MaHS, còn hai sổ giao dịch dùng MaGD."),
      q("Đọc dữ liệu để phân tích nhưng không muốn thay đổi sổ. Chọn thao tác nào?", "SELECT từ bảng nguồn", "UPDATE hàng loạt tên mã", "DELETE những dòng chưa đọc", "SELECT trả tập kết quả mà không sửa dữ liệu bảng.")
    ],
    filter: [
      q("Hai điều kiện phải đồng thời đúng để giữ hồ sơ. Dùng toán tử nào?", "AND", "OR", "NOT", "AND chỉ cho kết quả đúng khi cả hai vế đều đúng."),
      q("Lọc một trong hai chi nhánh Hà Nội hoặc Cần Thơ. Điều kiện nào hợp lý?", "ChiNhanh IN ('Hà Nội','Cần Thơ')", "ChiNhanh='Hà Nội' AND ChiNhanh='Cần Thơ'", "ChiNhanh IS NULL", "IN kiểm giá trị có thuộc một trong các nhãn đã liệt kê."),
      number(`Có ${a+b} hồ sơ ở chi nhánh A, trong đó ${a} hồ sơ thẻ. Khi giữ đồng thời A và hồ sơ thẻ, còn mấy dòng?`,a,"Chỉ giao của hai điều kiện được giữ.",a+b,b),
      q("Biểu thức nào chọn hồ sơ đã đóng của cả hai tuần 1 và 2?", "TrangThai='Đã đóng' AND Tuan IN (1,2)", "TrangThai='Đã đóng' OR Tuan IN (1,2)", "TrangThai='Đã đóng' AND Tuan=1 AND Tuan=2", "Trạng thái phải đúng và tuần là một trong hai giá trị."),
      q("WHERE XuLyPhut > 30 loại trường hợp nào ở đúng biên?", "Hồ sơ mất đúng 30 phút", "Hồ sơ mất 31 phút", "Hồ sơ mất 90 phút", "Dấu > không nhận giá trị bằng 30."),
      q("Bỏ bớt một vế AND khi giữ nguyên nguồn và phép chọn dòng. Số dòng có thể đổi thế nào?", "Giữ nguyên hoặc tăng", "Luôn giảm", "Luôn tăng đúng một dòng", "Điều kiện còn lại ít ràng buộc hơn, số dòng thêm phụ thuộc dữ liệu."),
      q("Muốn lọc tên có dấu cách trong SQLite, cách viết nào rõ ràng nhất?", "WHERE ChiNhanh = 'Hà Nội'", "WHERE ChiNhanh = Hà Nội", "WHERE ChiNhanh = Hà + Nội", "Chuỗi ký tự được viết trong dấu nháy đơn."),
      number(`Có ${a+b} giao dịch ở tuần 1, ${b+c} giao dịch thuộc chi nhánh A, trong đó ${b} giao dịch thuộc cả hai. Lọc tuần 1 HOẶC chi nhánh A nhận mấy giao dịch?`,a+b+c,`Cộng hai số lượng rồi trừ giao bị đếm đôi: ${a+b} + ${b+c} − ${b}.`,a+2*b+c,b)
    ],
    sort: [
      q("Muốn hiển thị thời gian xử lý từ lâu nhất xuống nhanh nhất, chọn gì?", "ORDER BY XuLyPhut DESC", "ORDER BY XuLyPhut ASC", "GROUP BY MaHS", "DESC xếp giá trị lớn trước."),
      q("Hai hồ sơ có cùng thời gian ở ranh giới top 3. Cách chọn kết quả xác định là gì?", "Thêm MaHS vào ORDER BY để phá hòa", "Bỏ tất cả điều kiện sắp xếp", "Đổi LIMIT thành DISTINCT", "Khóa phụ duy nhất quyết định thứ tự giữa các dòng đồng hạng."),
      q("SQLite cần lấy ba dòng đầu sau khi sắp xếp. Đặt gì cuối câu?", "LIMIT 3", "TOP (3)", "HAVING 3", "Trình thực hành SQLite dùng LIMIT, trong khi cú pháp SELECT TOP thuộc SQL Server."),
      number(`Các thời gian đã đóng là ${a}, ${a+4} và ${a+9} phút. Sau ORDER BY XuLyPhut DESC LIMIT 1, giá trị nào đứng đầu?`,a+9,"Sắp giảm dần đưa số lớn nhất lên đầu.",a+4,a),
      q("Không có ORDER BY mà chỉ dùng LIMIT 1. Có chắc lấy được hồ sơ đầu tiên theo ngày nhận không?", "Không, cần sắp theo ngày nhận và khóa phụ", "Có, SQL luôn tự sắp theo ngày", "Có, mọi bảng luôn sắp theo MaHS", "Không nên dựa vào thứ tự vật lý của các bản ghi."),
      q("Muốn lấy hồ sơ đã đóng nhanh nhất. Trình tự logic phù hợp là gì?", "Lọc đã đóng, sắp phút tăng dần, lấy dòng đầu", "Lấy dòng đầu của toàn bảng rồi lọc", "Sắp chi nhánh giảm dần rồi lấy dòng đầu", "Phải xác định tập đủ điều kiện trước khi tìm cực tiểu."),
      q("A mất 70/90 phút, B mất 60/30 phút (thực tế/ngưỡng). Ai vượt SLA nhiều hơn?", "B", "A", "Hai hồ sơ ngang nhau", "A chưa vượt, B vượt 30 phút. Xếp phút thô không đồng nghĩa xếp mức trễ."),
      q("Đặt LIMIT 5 nhưng chỉ có 2 dòng đạt bộ lọc. Có mấy dòng trả về?", "2", "5", "0", "LIMIT đặt giới hạn trên, không thêm dòng cho đủ số lượng.")
    ],
    missing: [
      q("Trong SQL, điều kiện nào tìm hồ sơ thiếu thời gian?", "XuLyPhut IS NULL", "XuLyPhut = NULL", "XuLyPhut = 'NULL'", "IS NULL kiểm giá trị chưa xác định, còn chuỗi 'NULL' là văn bản."),
      number(`Một bảng có ${a+b} dòng và ${b} dòng XuLyPhut là NULL. COUNT(XuLyPhut) bằng bao nhiêu?`,a,`COUNT(cột) đếm các giá trị khác NULL: ${a+b} − ${b}.`,a+b,b),
      q("COUNT(*) khác COUNT(XuLyPhut) trong trường hợp nào?", "Có ít nhất một dòng XuLyPhut là NULL", "Mọi thời gian đều dương và đủ dữ liệu", "Chỉ cần hai giá trị phút trùng nhau", "COUNT(*) đếm dòng, còn COUNT(cột) bỏ giá trị NULL nhưng vẫn đếm các giá trị lặp."),
      q("Vì sao không điền 0 cho mọi thời gian còn thiếu trước khi tính trung bình?", "0 thêm một thời lượng đo được vào mẫu dù thời lượng chưa xác định", "0 luôn làm trung bình tăng", "0 không bao giờ được các hàm đếm", "Điền 0 thay đổi mẫu và có thể kéo trung bình thời gian xuống."),
      q("Một hồ sơ đã đóng thiếu XuLyPhut. Nên xử lý thế nào?", "Đưa vào danh sách lỗi cần xác minh và báo phạm vi thiếu", "Tự gán Trễ", "Tự gán Đạt", "Khi chưa có thời lượng thực tế, không đủ bằng chứng so với ngưỡng."),
      q("Một hồ sơ đúng hạn không ghi lý do trễ. Nên đánh giá thế nào?", "Khoảng trống có thể hợp lệ theo điều kiện nghiệp vụ", "Chắc chắn thiếu toàn bộ hồ sơ", "Chắc chắn số phút bằng 0", "Trường lý do trễ chỉ được yêu cầu cho các hồ sơ trễ theo quy tắc bài."),
      number(`Hai thời gian có giá trị là ${a*2} và ${a*4}, dòng thứ ba chưa có kết quả. Trung bình của thời gian đã biết là bao nhiêu phút?`,a*3,`(${a*2} + ${a*4}) / 2 = ${a*3} phút.`,a*2,a*6),
      q("Một nhóm có 3 hồ sơ và cả 3 thiếu phút. Kết luận nào đúng?", "Đếm được 3 hồ sơ nhưng chưa có trung bình thời lượng quan sát", "Thời lượng trung bình chắc chắn là 0", "Nhóm này không có hồ sơ", "Cỡ nhóm và số quan sát có thời lượng là hai đại lượng khác nhau.")
    ],
    sla: [
      q("Trong ca học này, điều kiện đạt SLA của hồ sơ đã đóng có đủ dữ liệu là gì?", "XuLyPhut <= SLAPhut", "XuLyPhut >= SLAPhut", "XuLyPhut < 30 cho mọi nghiệp vụ", "So thời gian thực tế với ngưỡng riêng, kể cả khi vừa bằng."),
      q("Trong CASE phân loại, nên xét trạng thái đang xử lý khi nào?", "Trước khi gán Đạt hoặc Trễ cho hồ sơ đã đóng", "Sau khi mặc định toàn bộ là Trễ", "Sau khi gán mọi NULL thành 0", "Hồ sơ chưa hoàn tất có thể chưa có thời gian kết thúc."),
      number(`Có ${a+b} hồ sơ đã đóng, ${a} đạt và ${c} hồ sơ khác đang mở. Mẫu số của tỷ lệ đạt trong số đã đóng là bao nhiêu?`,a+b,"Chỉ các hồ sơ đã đóng nằm trong mẫu số đã định nghĩa.",a+b+c,a),
      q("Biểu thức nào giúp tính tỷ lệ theo phần trăm khi mẫu có thể bằng 0 trong SQLite?", "100.0 * Dat / NULLIF(DaDong,0)", "100 * (Dat / DaDong) với hai số nguyên", "100.0 * DaDong / Dat", "100.0 giữ phần lẻ, NULLIF cho mẫu rỗng giá trị NULL."),
      number(`Một nhóm có ${a+b} hồ sơ đã đóng, trong đó ${b} hồ sơ trễ. Biết mọi hồ sơ đều có phút và ngưỡng. Tổng cờ đạt là bao nhiêu?`,a,`Số đạt = ${a+b} − ${b}.`,b,a+b),
      q("Chuyển từ <= sang < sẽ ảnh hưởng hồ sơ đã đóng nào?", "Thời gian đúng bằng ngưỡng", "Tất cả hồ sơ dưới ngưỡng", "Chỉ hồ sơ chưa mở", "Giá trị bằng nhau thỏa <= nhưng không thỏa <."),
      q("Đơn vị A đạt 1/2, B đạt 9/10. Tỷ lệ gộp xấp xỉ bao nhiêu?", "83,3%", "70%", "90%", "Gộp tử và mẫu: (1 + 9)/(2 + 10) = 10/12."),
      q("Nếu bỏ điều kiện trạng thái và xem mọi cờ không đạt là hồ sơ trễ, nhóm nào dễ bị đếm sai?", "Hồ sơ đang mở", "Hồ sơ đóng vượt ngưỡng đã kiểm", "Chỉ hồ sơ có mã số chẵn", "Cờ chưa đạt không đồng nghĩa đã trễ khi còn hồ sơ chưa có kết quả cuối.")
    ],
    group: [
      q("Sau GROUP BY ChiNhanh, một hàng kết quả thể hiện gì?", "Một nhóm chi nhánh có mặt trong dữ liệu sau lọc", "Một bút toán", "Toàn bộ hồ sơ nguồn trên một dòng riêng cho mỗi hồ sơ", "Các dòng có cùng giá trị khóa nhóm được tổng hợp cùng nhau."),
      number(`Có ${a} chi nhánh, mỗi nơi xuất hiện trong cả ${b} tuần. Nhóm theo cặp chi nhánh và tuần tạo mấy nhóm?`,a*b,`Mỗi chi nhánh có ${b} nhóm tuần nên có ${a} × ${b} cặp.`,a+b,a),
      q("Loại các nhóm chỉ có một dòng sau bước gom trong SQL bằng gì?", "HAVING COUNT(*) > 1", "WHERE COUNT(*) > 1 trước GROUP BY", "ORDER BY COUNT(*)", "HAVING kiểm điều kiện trên kết quả nhóm."),
      q("Muốn tổng hợp riêng tuần 2 theo chi nhánh, nên giới hạn tuần ở đâu trước khi gộp?", "WHERE Tuan = 2", "ORDER BY Tuan", "LIMIT 2", "WHERE thu hẹp bản ghi đầu vào của phần gom."),
      number(`Có ${a} hồ sơ mất 10 phút và ${b} hồ sơ mất 20 phút. SUM(XuLyPhut) bằng bao nhiêu?`,10*a+20*b,"Tổng phút bằng số hồ sơ từng nhóm nhân thời lượng rồi cộng.",a+b,30),
      q("Để tính lại trung bình toàn đơn vị từ các nhóm, cần giữ gì?", "Tổng phút và số dòng có phút từng nhóm", "Chỉ trung bình nhóm làm tròn", "Chỉ mã của dòng đầu", "Cộng tổng phút và chia tổng số thời lượng hợp lệ sẽ khôi phục trung bình có trọng số."),
      q("Muốn xác định nhóm nào có nhiều hồ sơ tiếp nhận nhất. Đại lượng nào cần so?", "Số dòng hoặc mã hồ sơ theo đúng mức chi tiết của nguồn", "Tổng số phút", "Tên chi nhánh dài nhất", "Đếm hồ sơ trả lời câu hỏi khối lượng. Tổng phút đo khối lượng thời gian."),
      number(`Hai nhóm loại trừ nhau lần lượt có ${a+b} và ${a+c} hồ sơ. Tổng kiểm của bảng nhóm là bao nhiêu?`,2*a+b+c,"Hai nhóm không giao nhau nên cộng số hồ sơ của chúng.",a+b+c,a)
    ],
    duplicate: [
      q("DISTINCT MaGD, SoTienVND loại trùng theo phạm vi nào?", "Toàn bộ cặp mã và tiền", "Riêng mã", "Riêng số tiền", "Hai dòng cùng mã nhưng khác số tiền vẫn là hai tổ hợp."),
      number(`Có ${a} mã xuất hiện một lần và một mã xuất hiện ${b} lần. Tổng số mã phân biệt là bao nhiêu?`,a+1,"Mã lặp vẫn chỉ đóng góp một giá trị phân biệt.",a+b,b),
      number(`Mã ${tag} xuất hiện ${b+1} lần trong nguồn. Số dòng vượt quá lần đầu là bao nhiêu?`,b,`Trừ một lần đại diện: ${b+1} − 1.`,b+1,1),
      q("Trước khi loại một bút toán trùng, cần kiểm điều gì?", "Mã, số tiền, chứng từ và mức chi tiết nghiệp vụ", "Dòng nào đứng sau thì chắc chắn sai", "Dòng có số thứ tự chẵn thì giữ", "Hai dòng giống khóa có thể là ghi trùng hoặc các dòng nghiệp vụ cần giữ."),
      q("Có 2 dòng cùng MaGD nhưng khác số tiền. SELECT DISTINCT MaGD trả mấy dòng riêng cho mã đó?", "1", "2", "0", "Chỉ cột mã tham gia phép phân biệt."),
      q("Nếu chỉ so tổng tiền và thấy bằng nhau, đã có thể xác nhận khóa không lặp chưa?", "Chưa, cần đếm số lần của từng khóa", "Rồi, tổng bằng chứng minh mọi dòng đúng", "Rồi, nếu tổng tiền dương", "Các chênh lệch có thể bù trừ trong khi khóa vẫn lặp hoặc thiếu."),
      q("Tìm toàn bộ dòng chứa khóa lặp trong pandas, dùng biểu thức nào?", "df[df.duplicated('MaGD', keep=False)]", "df.drop_duplicates('MaGD')", "df.head(1)", "keep=False đánh dấu cả lần đầu và các lần tiếp theo."),
      q("Một bảng tổng hợp chỉ có MaGD, tổng tiền. Thêm trường nào để thấy khóa lặp?", "Số dòng nguồn của mỗi mã", "Số tháng trong năm", "Tên màu trên báo cáo", "COUNT(*) hoặc groupby.size() lưu bằng chứng về số lần xuất hiện.")
    ],
    join: [
      number(`Ở mã ${tag}, nội bộ có ${a} dòng, đối tác có ${b} dòng. INNER JOIN theo mã tạo bao nhiêu cặp ở mã này?`,a*b,`Mỗi dòng trái khớp với từng dòng phải, tức ${a} × ${b}.`,a+b,a),
      q("Mã chỉ có bên trái. INNER JOIN theo mã biểu diễn nó thế nào?", "Không có dòng nào cho mã đó", "Một dòng có cột bên phải là NULL", "Tự thêm dòng đối tác để ghép", "INNER JOIN yêu cầu cả hai phía có dòng khớp."),
      q("LEFT JOIN nội bộ sang đối tác. Mã chỉ có ở nội bộ có kết quả gì?", "Giữ dòng nội bộ, cột phía đối tác là NULL", "Bỏ khỏi kết quả", "Tự gán số tiền đối tác bằng nội bộ", "Bên trái được bảo toàn cả khi không tìm được khóa bên phải."),
      q("Dùng LEFT JOIN từ nội bộ để tìm mã thiếu phía đối tác. Nên kiểm cột nào sau ghép?", "Khóa đối tác IS NULL khi khóa nguồn được đảm bảo không thiếu", "Khóa nội bộ IS NULL", "Số tiền nội bộ > 0", "Cột khóa phải không khớp trở thành NULL, trong khi khóa trái vẫn có mặt."),
      q("Cần thấy cả mã chỉ có ở đối tác lẫn mã chỉ có ở nội bộ. Trong pandas chọn gì?", "merge how='outer' với indicator=True", "merge how='inner' rồi bỏ mọi dòng MoreThan1", "Chỉ chọn các mã có số tiền bằng nhau", "Outer giữ hợp các khóa, indicator nêu nguồn hiện diện."),
      q("Mỗi nguồn đã gộp còn một dòng cho mỗi khóa hợp lệ. Ràng buộc pandas nào kiểm giả định khi ghép?", "validate='one_to_one'", "sort=True", "indicator=False", "validate kiểm số lần xuất hiện của khóa ở hai đầu quan hệ."),
      number(`Đối tác có một dòng ${a*100} nghìn; nội bộ có ${b} dòng cùng mã. Sau JOIN thô, cộng cột tiền đối tác của mã thu được bao nhiêu nghìn?`,a*b*100,"Dòng đối tác được lặp trên mỗi cặp khớp nên tổng sau ghép bị nhân.",a*100,b*100),
      q("Vì sao không dùng số tiền làm một phần của khóa khi mục tiêu là tìm lệch tiền trên cùng MaGD?", "Mã lệch tiền có thể bị tách thành hai dòng trông như thiếu nhau", "Mọi giao dịch đều có số tiền khác nhau", "Số tiền không thể so sánh được bằng SQL", "Ghép theo định danh thích hợp, sau đó so số tiền ở hai phía.")
    ],
    union: [
      q("Gộp hai danh sách mã và loại các dòng trùng nhau trong SQL dùng gì?", "UNION", "UNION ALL", "INNER JOIN", "UNION trả các tổ hợp phân biệt của hai vế."),
      number(`Hai danh sách lần lượt có ${a+b} và ${a+c} dòng. UNION ALL trả mấy dòng?`,2*a+b+c,"UNION ALL nối hai danh sách mà không khử trùng.",a+b+c,a),
      number(`A có ${a+b} mã duy nhất, B có ${a+c} mã duy nhất, chung ${a} mã. Hợp hai tập có bao nhiêu mã?`,a+b+c,`Lấy tổng số mã hai phía rồi trừ ${a} mã đã tính hai lần.`,2*a+b+c,a),
      q("Khi lập tập khóa toàn sổ bằng UNION, nên chọn trường nào từ mỗi nguồn?", "Chỉ MaGD nếu bài định nghĩa một khóa bằng mã", "MaGD và tên nguồn khác nhau ở mỗi vế", "MaGD và số thứ tự dòng vì chúng luôn giống nhau", "Thêm thuộc tính riêng theo nguồn có thể làm một mã trở thành hai tổ hợp."),
      q("Hai nguồn có cùng MaGD nhưng tiền khác nhau. UNION trên cặp mã, tiền tạo bao nhiêu dòng cho mã này nếu mỗi phía đúng một dòng?", "2", "1", "0", "Hai tổ hợp khác tiền nên không bị gộp."),
      q("Hai vế của UNION chọn số lượng cột khác nhau. Điều gì xảy ra trong SQLite?", "Truy vấn bị lỗi vì số cột không khớp", "Cột thừa tự bị bỏ", "Tự ghép cột theo tên", "Phép kết hợp yêu cầu hai phần SELECT có cùng số cột, theo vị trí tương ứng."),
      q("Cần giữ dấu vết từng dòng kèm nguồn phát sinh. Dùng cách nào?", "UNION ALL và thêm cột tên nguồn", "UNION chỉ mã rồi đoán nguồn theo thứ tự", "INNER JOIN chỉ mã có ở cả hai", "Nối nguyên dòng với nhãn nguồn giữ thông tin để truy về sổ gốc."),
      number(`Có ${a} mã có mặt cả hai bên, ${b} chỉ bên trái và ${c} chỉ bên phải. Bao nhiêu mã cần xem chỉ vì thiếu một phía?`,b+c,"Cộng hai nhóm chỉ một phía. Cần kiểm tiền riêng cho nhóm có mặt cả hai.",a+b+c,a)
    ],
    reconcile: [
      number(`Nội bộ ghi ${a*100} nghìn, đối tác ghi ${(a-1)*100} nghìn cho cùng một mã. Theo quy ước NB − ĐT, chênh bằng mấy nghìn?`,100,`Lấy ${a*100} − ${(a-1)*100} = 100 nghìn.`,-100,a*100),
      q("Đổi quy ước từ nội bộ trừ đối tác sang đối tác trừ nội bộ. Kết quả thay đổi thế nào?", "Đảo dấu, độ lớn tuyệt đối giữ nguyên", "Luôn thành 0", "Mất các mã lặp", "Đảo hai số hạng của phép trừ làm đổi dấu."),
      q("Tổng chênh toàn sổ bằng 0. Có thể kết luận gì?", "Tổng đã cân nhưng vẫn phải kiểm theo mã", "Mọi mã đều có số tiền bằng nhau", "Không có mã một phía", "Một mã dương và mã khác âm có thể bù nhau."),
      q("Mã cùng hiện diện, tiền bằng nhau nhưng một phía có 2 dòng. Gắn kết quả nào trước khi kết luận khớp?", "Cần kiểm mã lặp và chứng từ", "Khớp hoàn toàn vì tiền bằng", "Tự xóa tất cả dòng của mã", "Kiểm số lần xuất hiện bảo vệ việc diễn giải đúng cấp dữ liệu."),
      q("Mã right_only trong bảng pandas khi nội bộ ở bên trái có nghĩa gì?", "Chỉ thấy mã ở đối tác", "Chỉ thấy mã ở nội bộ", "Hai bên đều có nhưng lệch tiền", "indicator phản ánh sự hiện diện của khóa, chưa so sánh số tiền."),
      q("Tập mã đã đầy đủ. Cần gì để phân biệt mã thiếu một phía với bút toán có số tiền bằng 0?", "Cờ hiện diện hoặc số dòng của từng nguồn", "Chỉ nhìn chênh tiền", "Chỉ nhìn tên chi nhánh", "Mã vắng không có dòng, nhưng số tiền thực bằng 0 vẫn có bản ghi."),
      q("Trước ghép có 11 mã phân biệt toàn sổ; bảng đã gộp một dòng/mã và outer merge xong có 13 dòng. Nên kiểm gì?", "Khóa phía nguồn, quy tắc chuẩn hóa và số lần khớp", "Chấp nhận 13 vì outer mặc định nhân số dòng", "Chỉ lấy 11 dòng đầu", "Sau khi gộp đúng cấp và cùng chuẩn khóa, kết quả phải khớp số mã hợp."),
      q("Để bàn giao một ngoại lệ cho người xử lý, nên lưu gì?", "Mã, hai giá trị nguồn, quy ước chênh, loại và trạng thái xử lý", "Chỉ số tiền lớn hơn", "Chỉ ảnh chụp tổng chênh", "Đủ hai phía và quy ước giúp tái hiện sai khác trên cùng một mã.")
    ],
    notebook: [
      q("Lệnh nào thường đặt trước pd.read_csv trong một notebook mới?", "import pandas as pd", "from csv import pd", "pd = 'pandas'", "Bí danh pd được gắn cho thư viện pandas bằng import."),
      q("Để nạp tệp CSV thành DataFrame, chọn gì?", "pd.read_csv('ho-so-van-hanh.csv')", "pd.read_excel('ho-so-van-hanh.csv')", "print('ho-so-van-hanh.csv')", "read_csv đọc bản ghi và cột từ tệp văn bản phân cách."),
      q("df.shape trả về hai số theo thứ tự nào?", "Số dòng rồi số cột", "Số cột rồi số dòng", "Số mã rồi số nhãn trống", "shape là cặp kích thước (rows, columns) của DataFrame."),
      q("Muốn xem 5 dòng đầu mà vẫn giữ toàn bộ dữ liệu ở df, dùng gì?", "Xem df.head() mà không gán lại df", "df = df.head()", "df = df.iloc[:1]", "head() trả về bản xem đầu bảng. Gán trở lại sẽ thay biến df bằng bảng rút gọn."),
      number(`df.shape bằng (${a+b}, ${b}). Bao nhiêu bản ghi dữ liệu đã nạp?`,a+b,"Phần tử đầu là số dòng, không bao gồm hàng tên cột.",b,(a+b)*b),
      q("Tệp ở thư mục dữ liệu con nhưng lệnh chỉ ghi tên tệp và báo FileNotFoundError. Kiểm gì trước?", "Thư mục làm việc và đường dẫn tương đối", "Giá trị thiếu ở cuối cột", "Số chữ số thập phân của tiền", "Trình đọc phải tìm được tệp trước khi phân tích dữ liệu."),
      q("Mã 0017 cần giữ nguyên định dạng. Nên làm gì lúc nạp CSV?", "Khai báo dtype văn bản cho cột mã", "Chuyển mọi cột thành float", "Để mất số 0 rồi luôn thêm đúng một số 0 sau khi đọc", "Kiểu văn bản giữ biểu diễn định danh kể cả số 0 đầu."),
      q("Notebook chạy được khi mở lại kết quả cũ nhưng lỗi sau Restart & Run All. Dấu hiệu này gợi ý gì?", "Một số ô phụ thuộc trạng thái hoặc thứ tự chạy cũ", "Tất cả kết quả chắc chắn tái lập được", "CSV đã thay thành một sheet Excel", "Chạy từ phiên trống giúp phát hiện biến chưa được khởi tạo đúng lúc.")
    ],
    frame: [
      q("df.loc[mask, ['MaHS','ChiNhanh']] chọn gì?", "Dòng đúng mask và hai cột đã liệt kê", "Hai dòng đầu và mọi cột", "Mọi dòng chỉ có tên cột là mask", "loc nhận chỉ mục dòng ở trước và bộ chọn cột ở sau dấu phẩy."),
      q("Kết hợp hai điều kiện trên Series để cả hai cùng đúng trong pandas, dùng gì?", "(điều_kiện_1) & (điều_kiện_2)", "(điều_kiện_1) and (điều_kiện_2)", "điều_kiện_1 + điều_kiện_2 > 0", "& thao tác theo phần tử. Ngoặc giữ đúng thứ tự biểu thức."),
      number(`Mask có ${a} True, ${b} False và không có giá trị thiếu. len(df.loc[mask]) bằng bao nhiêu?`,a,"Mỗi True chọn một dòng tương ứng.",a+b,b),
      q("Dùng df.loc[mask, 'MaHS'] thay vì df.loc[mask, ['MaHS']]. Kết quả thứ nhất thường là gì?", "Một Series", "Một DataFrame hai cột", "Một tên tệp", "Tên cột đơn trả Series, danh sách một tên giữ dạng bảng."),
      q("Cần chọn hồ sơ ở Hà Nội hoặc Đà Nẵng. Cách nào kiểm tra đúng từng giá trị?", "df.ChiNhanh.isin(['Hà Nội','Đà Nẵng'])", "df.ChiNhanh == 'Hà Nội,Đà Nẵng'", "df.ChiNhanh.isna()", "isin so sánh mỗi giá trị với từng phần tử trong tập nhãn."),
      q("Cần tạo bộ dữ liệu thử có thể sửa độc lập. Nên bắt đầu bằng gì?", "test = df.copy()", "test = df rồi sửa tùy ý", "Đổi tên tệp nguồn sau mọi lần chạy", "copy tạo bản sao bảng để các thao tác gán trường của bài thử không sửa bảng ban đầu."),
      q("df.loc[df.TrangThai.eq('Đã đóng'), 'XuLyPhut'] trả những giá trị nào?", "Thời lượng của các dòng có trạng thái đã đóng", "Tất cả thời lượng khác NULL dù trạng thái nào", "Chỉ thời lượng trên 60 phút", "Điều kiện ở đây chỉ lọc trạng thái. Kiểm thiếu là bước khác."),
      q("Dùng df.iloc[0] sau khi sắp xếp lại DataFrame. Kết quả là gì?", "Dòng ở vị trí đầu của thứ tự hiện tại", "Luôn là dòng có nhãn index bằng 0", "Luôn là dòng có MaHS nhỏ nhất", "iloc dùng vị trí. Nhãn index và MaHS không nhất thiết trùng vị trí.")
    ],
    clean: [
      q("Hàm nào đếm số giá trị thiếu ở từng cột của df?", "df.isna().sum()", "df.count().sum() cho một tổng duy nhất", "df.head(0)", "isna tạo cờ thiếu, tổng theo cột cho số trường hợp."),
      q("Ở bảng nguồn, 'Hà Nội ' và 'Hà Nội' là hai nhãn khác nhau. Cách chuẩn hóa khoảng trắng ở hai đầu?", "df.ChiNhanh.str.strip()", "df.ChiNhanh.str.len()", "df.ChiNhanh.astype(int)", "strip bỏ khoảng trắng đầu và cuối. Giữ thêm cột gốc để truy vết."),
      q("Đã sửa khoảng trắng nhưng vẫn thấy 'HN' và 'Hà Nội'. Muốn gộp phải có gì?", "Bảng ánh xạ nhãn đã đối chiếu nghiệp vụ", "Tự cắt mọi tên còn hai ký tự", "Dò tên theo độ dài bằng nhau", "Hai chuỗi khác nhau có thể là bí danh, cần xác minh trước khi đồng nhất."),
      number(`Một nhóm có ${a+b} dòng. Sau chuẩn hóa nhãn bằng strip, không lọc hay ghép. Bao nhiêu dòng cần còn lại?`,a+b,"Chuẩn hóa giá trị trên cột không xóa hay nhân dòng.",a,b),
      q("Cột phút chứa chữ 'chưa rõ'. Nếu chuyển bằng pd.to_numeric(errors='coerce'), cần kiểm gì sau đó?", "Các dòng mới thành thiếu và nguyên nhân", "Giả định chữ đó đã thành số 0", "Bỏ toàn bộ hồ sơ đã đóng", "coerce chuyển đầu vào không đọc được sang thiếu; cần truy lại giá trị thô."),
      q("Tại sao giữ cột ChiNhanh_goc khi tạo ChiNhanh_chuan?", "Để xem giá trị nào đã đổi và đối chiếu khi có sai lệch", "Để nhân đôi số hồ sơ", "Để bỏ kiểm số lượng nhãn", "Dấu vết chuyển đổi cho biết dữ liệu nào thay trước khi nhóm."),
      q("So hai cột thời gian ở dạng chuỗi. Vì sao '100' có thể đứng trước '20' khi sắp tăng?", "Trình sắp so ký tự từ trái sang phải", "100 nhỏ hơn 20 về số học", "Tất cả định dạng phút luôn được đổi ngầm thành số", "So văn bản và so số dùng hai quy tắc khác nhau."),
      q("Lọc các dòng đã đóng thiếu phút trong pandas nên kết hợp gì?", "df.TrangThai.eq('Đã đóng') & df.XuLyPhut.isna()", "df.TrangThai.eq('Đã đóng') | df.XuLyPhut.isna()", "df.XuLyPhut.eq(0)", "Cần cả hai điều kiện. OR sẽ lấy cả dòng đã đóng đủ thời gian.")
    ],
    time: [
      q("Khi nhóm theo NgayNhan, một quan sát theo ngày đếm sự kiện nào?", "Hồ sơ tiếp nhận trong ngày đó", "Hồ sơ hoàn tất trong ngày đó", "Mọi giao dịch hạch toán trong ngày đó", "Mốc thời gian quyết định sự kiện. Không có ngày đóng để suy ra khối lượng đóng từng ngày."),
      q("Cột văn bản ngày theo mẫu 31/12/2026. Chuyển kiểu rõ ràng bằng tham số nào?", "pd.to_datetime(cot, format='%d/%m/%Y')", "astype(float)", "str.len()", "format cố định vị trí ngày, tháng, năm."),
      q("Thiếu một ngày trên trục thời gian nhận hồ sơ. Khi nào nên biểu diễn là 0?", "Khi xác nhận dữ liệu đủ cho ngày đó và không có hồ sơ", "Tự động với mọi ngày mất tệp", "Chỉ khi biểu đồ có màu xanh", "Một kỳ thiếu nguồn và một kỳ không phát sinh là hai trường hợp khác nhau."),
      number(`Trong ba ngày có ${a}, ${b}, ${c} hồ sơ. Nếu không trùng MaHS giữa các ngày, tổng nhận trong kỳ là bao nhiêu?`,a+b+c,"Đếm theo NgayNhan chia dữ liệu thành các nhóm ngày không giao nhau.",a+b,a),
      q("So hai tuần nhưng tuần sau mới nhận dữ liệu tới thứ Tư. Bước nào hợp lý?", "So phạm vi ngày tương đương hoặc ghi rõ kỳ chưa đủ", "Gọi phần chênh là mức tăng chắc chắn", "Nhân đôi tuần sau rồi ghi như số chốt", "Độ bao phủ kỳ khác nhau có thể là nguyên nhân của chênh số lượng."),
      q("Ngày 03/04/2026 mơ hồ nếu không rõ format. Sai sót khả dĩ là gì?", "Hoán đổi ngày 3 tháng 4 và ngày 4 tháng 3", "MaHS tự thay đổi", "Tất cả dòng trùng bị xóa", "Cả ngày và tháng đều không vượt 12 nên hai diễn giải có thể hợp lệ."),
      q("Muốn tính thay đổi từ ngày liền trước, nên làm bước nào trước diff()?", "Sắp theo ngày, trong từng nhóm cần so", "Sắp theo số hồ sơ giảm dần", "Chỉ giữ ngày lớn nhất", "diff so các dòng liên tiếp theo thứ tự hiện tại."),
      q("Số tiếp nhận theo ngày ít hơn số dòng nguồn dù mỗi dòng là một hồ sơ. Nên kiểm gì?", "Ngày rỗng/không đọc được và điều kiện lọc", "Tự thêm số còn thiếu vào ngày cuối", "Thay tất cả ngày bằng cùng một giá trị", "Ngày thiếu có thể rơi ngoài phép nhóm, làm mất đóng góp của dòng.")
    ],
    stats: [
      number(`Mẫu thời gian gồm ${a}, ${a+4}, ${a+8}, ${a+30} phút. Trung vị bằng bao nhiêu phút?`,a+6,`Có 4 số đã xếp tăng. Lấy trung bình của ${a+4} và ${a+8}.`,a+4,a+8),
      q("Một hồ sơ mới có thời gian cực lớn so với các mã còn lại. Chỉ tiêu nào thường nhạy với độ lớn đó hơn?", "Trung bình", "Trung vị", "Số mã phân biệt không đổi theo độ lớn", "Trung bình dùng tổng nên độ lớn của ngoại lệ trực tiếp ảnh hưởng kết quả."),
      number(`Mẫu gồm ${a}, ${a+3}, ${a+12} phút. Khoảng biến thiên là mấy phút?`,12,`Giá trị lớn nhất ${a+12} trừ nhỏ nhất ${a} bằng 12.`,3,a+12),
      q("Đánh giá chi nhánh có thực sự trễ nhiều hơn từ thời gian trung bình cao hơn. Thiếu dữ liệu nào để kết luận?", "Ngưỡng theo từng hồ sơ và cơ cấu nghiệp vụ", "Màu của tên chi nhánh", "Vị trí cột trong CSV", "Hồ sơ thuộc loại có ngưỡng dài hơn vẫn có thể đạt hạn."),
      q("Trong bảng chéo ChiNhanh × Trễ, normalize='index' cho gì?", "Tỷ trọng từng trạng thái trong từng chi nhánh", "Tỷ trọng từng chi nhánh trong tổng số trễ", "Danh sách mã trong hàng đầu", "Mỗi hàng được chia cho tổng của chính hàng đó."),
      number(`Trong số ${a*4} hồ sơ đã đóng của A có ${a} hồ sơ trễ. Tỷ lệ trễ tại A theo phần trăm là bao nhiêu?`,25,`${a}/${a*4} = 1/4 = 25%.`,75,4),
      q("Tổng thể có 6 hồ sơ trễ, Hà Nội có 4 hồ sơ trễ trong 8 hồ sơ đã đóng. Tỷ trọng Hà Nội trong NHÓM TRỄ là gì?", "4/6", "4/8", "6/8", "Điều kiện đang xét là trễ, nên mẫu số gồm tất cả 6 hồ sơ trễ."),
      q("Không có hồ sơ đủ điều kiện tại một chi nhánh. Tỷ lệ trễ trong nhóm nên ghi gì?", "Chưa xác định, kèm mẫu số 0", "0% như đã xác nhận không trễ", "100%", "Chia cho 0 không xác định, khác trường hợp mẫu dương mà không có hồ sơ trễ.")
    ],
    verify: [
      q("Phép kiểm nào phù hợp khi mỗi hồ sơ phải có MaHS không rỗng và duy nhất?", "MaHS.notna().all() và MaHS.is_unique", "Chỉ kiểm tổng số phút", "Chỉ kiểm nhãn chi nhánh đầu tiên", "Duy nhất và đầy đủ là hai điều kiện độc lập của khóa."),
      q("Một bản sao được cố tình thêm một dòng trùng. Nếu mọi phép kiểm vẫn đạt, nên làm gì?", "Kiểm lại thiết kế assert và chắc chắn đang chạy trên bản thử", "Gọi trùng lặp là hợp lệ mặc định", "Xóa cả bộ kiểm thử", "Ca âm cần làm phép kiểm liên quan thất bại để chứng minh nó phát hiện lỗi."),
      q("Xuất báo cáo pandas hai cột mà không kèm chỉ mục kỹ thuật bằng cách nào?", "to_csv(..., index=False)", "to_csv(..., index=True)", "to_csv(..., header=False) thay cho bỏ index", "index=False bỏ cột chỉ mục, còn header điều khiển hàng tên cột."),
      q("Sau khi ghi CSV bàn giao nên làm kiểm tra nào?", "Đọc lại và so tiêu đề, cỡ bảng, khóa và tổng", "Chỉ xem tên file có đẹp không", "Xóa nguồn vì đã xuất thành công", "Đọc lại kiểm được kết quả thực sự đã lưu và cách người nhận sẽ đọc."),
      number(`Tệp báo cáo có một dòng cho mỗi chi nhánh trong ${b} chi nhánh. CSV có tiêu đề và không có dòng trống hoặc trường xuống dòng. Có mấy dòng văn bản?`,b+1,"Số dòng bản ghi cộng một hàng tiêu đề.",b,b+2),
      q("Excel và SQL cho cùng 70% nhưng tử/mẫu khác nhau. Kết luận nào hợp lý?", "Cần so lại số đạt và số đủ điều kiện theo nhóm", "Hai phép tính chắc chắn tương đương", "Chỉ cần đổi định dạng phần trăm", "Nhiều cặp tử/mẫu có cùng tỷ lệ."),
      q("Một báo cáo cần cho đồng nghiệp tái chạy. Phần nào nên đi cùng kết quả?", "Phiên bản nguồn, câu lệnh hoặc notebook, quy tắc lọc và số kiểm", "Chỉ đường dẫn đến file đã đổi tên", "Chỉ điểm số của người viết", "Người nhận cần tái tạo đầu vào, chuyển đổi và so kết quả."),
      q("Một điều kiện assert báo lỗi ở nguồn mới. Bước đầu hợp lý nhất?", "Khoanh tập dòng vi phạm, lưu bằng chứng và kiểm quy tắc", "Tắt kiểm và gửi luôn", "Thay mọi giá trị lệch bằng 0", "Phép kiểm phát hiện bất đồng giữa giả định và dữ liệu. Cần xác minh trước khi sửa.")
    ],
 };const order=["select read filter sort verify","filter select read group verify","duplicate group select join verify","sort filter select missing read","missing clean group filter verify","sla missing filter group verify","group stats missing filter verify","group sla filter stats verify","group duplicate filter verify select","join duplicate group reconcile verify","join missing reconcile duplicate filter","union duplicate join reconcile verify","stats filter group select sort","reconcile join duplicate union verify","sla group reconcile filter verify","notebook frame read clean verify","frame filter select missing read","missing clean frame stats verify","clean frame missing duplicate verify","sla frame missing group verify","group time sla frame verify","duplicate group join reconcile verify","join reconcile duplicate union frame","time clean filter group verify","stats group missing sort verify","stats group filter sla verify","verify missing duplicate reconcile clean","verify notebook frame clean reconcile","reconcile join duplicate verify frame","verify reconcile notebook group sla"][k-1];const correct=String(d.answers[0]);const alt={HoSo:["NoiBo","DoiTac"],HS013:["HS003","HS009"],HS009:["HS004","HS003"],GD109:["GD110","GD111"],"Power Query":["PowerPoint","DAX Studio"],NghiepVu:["MaHS","ChiNhanh"],LyDoTre:["SLAPhut","ChiNhanh"],"không":["Có","Chỉ khi chọn tháng 1"],"percentage points":["percent change","basis period"]};const wrong=alt[correct]||[String(Number(correct)+1),String(Number(correct)+2)];const source=["Dựa vào ví dụ hoặc dữ liệu của buổi học: "+d.q,correct,...wrong,d.why];const seen=new Set([source[0]]);const out=[source];for(const name of [...order.split(" "),...Object.keys(packs)]){for(const row of packs[name]){if(!seen.has(row[0])){out.push(row);seen.add(row[0]);}if(out.length===40)return out;}}throw Error("Thiếu câu hỏi ngày "+d.n);
};
