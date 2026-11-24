const INTERVIEWS=[
["Nghiệp vụ","Nhận một tệp số liệu lần đầu, bạn kiểm tra những gì?","Tôi hỏi người dùng cần quyết định gì, kỳ và thời điểm chốt là khi nào. Tôi xác định mỗi dòng đại diện cho gì, trường nào là khóa, rồi kiểm số dòng, mã trống, mã trùng và tổng tiền so với nguồn. Tôi ghi lại các quy ước trước khi tổng hợp.","Nêu được ít nhất một trường hợp đếm trùng và cách phát hiện."],
["Excel","Vì sao Grand Total trong PivotTable khác báo cáo nguồn?","Tôi kiểm tra kỳ, bộ lọc, phạm vi nguồn và lần Refresh gần nhất. Sau đó tôi xem trường trong Values đang Count hay Sum, cột tiền có bị đọc thành Text không. Cuối cùng tôi so số dòng và tổng tiền theo từng đơn vị để khoanh vùng chênh.","Minh họa được một lỗi cụ thể và cách tái kiểm tra sau khi sửa."],
["Excel","Điểm SLA toàn hệ thống có bằng trung bình điểm các chi nhánh?","Tôi cộng số hồ sơ đúng hạn của tất cả chi nhánh rồi chia tổng số hồ sơ đã đóng. Nếu một nơi đạt 9/10 và nơi khác đạt 1/2, kết quả là 10/12, khoảng 83,3%. Trung bình hai tỷ lệ sẽ cho 70% vì hai mẫu số khác nhau.","Nói được mẫu số, phép tính và đơn vị."],
["Đối soát","Hai sổ đều có tổng 100 triệu. Bạn có ký xác nhận ngay?","Tôi kiểm tra phạm vi, khóa và mã trùng, rồi so hai chiều theo từng mã. Hai khoản chênh trái dấu có thể bù nhau trong tổng. Tôi trình danh sách ngoại lệ, người xác minh và kết quả chạy lại trước khi đề nghị xác nhận.","Đề cập mã chỉ có ở một phía và ít nhất một lý do chênh."],
["Đối soát","Có một mã lặp hai lần. Bạn xử lý ra sao?","Tôi giữ nguyên hai dòng và truy vết chứng từ. Chúng có thể là bút toán phí, hai lần cập nhật trạng thái hoặc một lần ghi lặp. Sau khi xác định mức chi tiết mong muốn, tôi chọn khóa đủ chi tiết hoặc gom dữ liệu về cùng cấp rồi mới ghép.","Chỉ ra rủi ro nhân dòng khi ghép mã trùng."],
["Nghiệp vụ","Quản lý đòi báo cáo trong 15 phút trong khi một nguồn đến muộn. Bạn làm gì?","Tôi ghi giờ chốt và phần dữ liệu còn thiếu, tính các chỉ số có đủ dữ liệu và đánh dấu phần tạm tính. Tôi báo người nhận phạm vi có thể sử dụng và hẹn thời điểm cập nhật. Khi nguồn đến, tôi chạy lại phép kiểm tra và lưu phiên bản cuối.","Nêu được phần có thể công bố và ai chịu trách nhiệm cập nhật."],
["Power BI","Bạn chọn chỉ số và biểu đồ nào cho trưởng khối vận hành?","Tôi bắt đầu từ ba quyết định: cần bổ sung người ở đâu, nơi nào đang trễ và nhóm ngoại lệ nào cần theo dõi. Tôi hiển thị số hồ sơ đã đóng, tỷ lệ đúng hạn theo tuần và biểu đồ so sánh đơn vị kèm mẫu số. Tôi đối chiếu một tuần và một chi nhánh với Excel.","Giải thích được tác dụng của bộ lọc và việc đối chiếu số."],
["Nghiệp vụ","Bạn sẽ chọn công đoạn nào để tự động hóa đầu tiên?","Tôi chọn thao tác lặp lại, đầu vào ổn định và có cách kiểm tra đầu ra. Ví dụ, lưu các bước chuẩn hóa trong Power Query, chạy song song với báo cáo cũ và đo số phút tiết kiệm cùng số bản ghi sai khác. Nếu thiếu cột nguồn, tôi dừng phát hành để xác minh.","Có chỉ số trước/sau và phương án xử lý lỗi."],
["Tiếng Anh","How would you explain a drop in on-time performance?","The on-time rate fell from 80% to 60% between the two intake weeks. Each week had ten completed cases. I would review the delayed cases by branch and work type before drawing a conclusion about the cause.","Nêu đúng 20 điểm phần trăm và giới hạn của mẫu."],
["Tiếng Anh","Tell me about a data problem you solved in a practice project.","In a practice project, I compared two transaction files. I checked the reporting period, counted duplicate IDs and matched the records in both directions. I found four exception IDs, documented the evidence and proposed a follow-up for each one.","Phân biệt rõ bài tập với kinh nghiệm tại nơi làm việc."]
];
const TERMS=[
["Bản ghi","Record","Một dòng mô tả một quan sát. Trong tệp thực hành, một dòng là một hồ sơ vận hành."],
["Bộ lọc","Filter","Điều kiện giữ lại phần dữ liệu cần xem, ví dụ chỉ lấy hồ sơ của Hà Nội trong tuần 2."],
["Bút toán","Entry","Một lần ghi nhận nghiệp vụ trong sổ. Một giao dịch có thể tạo nhiều bút toán."],
["Chất lượng dữ liệu","Data quality","Mức độ dữ liệu đáp ứng mục đích sử dụng. Có thể kiểm tra mã đủ, không trùng, số tiền hợp lệ và hai nguồn nhất quán."],
["Chênh lệch","Variance","Hiệu giữa hai giá trị. Luôn quy định chiều, ví dụ tiền nội bộ trừ tiền đối tác."],
["Chỉ số hiệu suất","KPI","Thước đo gắn với mục tiêu quản lý, ví dụ tỷ lệ hồ sơ đã đóng đúng hạn."],
["Điểm phần trăm","Percentage point","Đơn vị đo chênh lệch tuyệt đối giữa hai tỷ lệ. Từ 80% xuống 60% là giảm 20 điểm phần trăm."],
["Đối soát","Reconciliation","Đối chiếu hai nguồn cùng phạm vi để tìm mã khớp, lệch hoặc thiếu."],
["Đường cơ sở","Baseline","Giá trị đo trước khi cải tiến. Ví dụ 45 phút để lập một báo cáo."],
["Giờ chốt số liệu","Cut-off","Mốc thời gian xác định dữ liệu thuộc kỳ nào. Một giao dịch qua giờ chốt có thể xuất hiện ở hai kỳ."],
["Khóa ghép","Join key","Trường hoặc nhóm trường dùng để tìm các dòng tương ứng giữa hai bảng, ví dụ MaGD."],
["Mẫu số","Denominator","Số lượng làm cơ sở tính tỷ lệ. Với SLA trong bài, mẫu số là số hồ sơ đã đóng."],
["Mức chi tiết","Grain","Câu trả lời cho “mỗi dòng là gì?”. Một dòng trạng thái khác với một dòng giao dịch."],
["Ngoại lệ","Exception","Trường hợp cần kiểm tra theo quy tắc, ví dụ một mã có ở sổ nội bộ nhưng chưa thấy ở đối tác."],
["Phép đo động","Measure","Phép tính trong Power BI thay đổi theo bộ lọc. Ví dụ tỷ lệ đúng hạn của riêng một chi nhánh."],
["PivotTable","Bảng tổng hợp","Công cụ trong Excel để đếm, cộng và so sánh theo nhóm, ví dụ số hồ sơ theo đơn vị."],
["Power Query","Công cụ biến đổi dữ liệu","Công cụ ghi lại bước nhập và làm sạch để có thể chạy lại khi nhận tệp mới."],
["SLA","Service level agreement","Cam kết mức dịch vụ, ví dụ hoàn tất hồ sơ trong 30 phút. Mỗi nghiệp vụ có thể có ngưỡng khác nhau."],
["Tệp CSV","Comma-separated values","Tệp văn bản dạng bảng. Khi nhập cần chọn mã hóa, dấu phân cách và kiểu dữ liệu."],
["Tử số","Numerator","Số trường hợp thỏa điều kiện. Với tỷ lệ đúng hạn, đây là số hồ sơ đã đóng trong ngưỡng SLA."]
];
const LINKS=[
["Tạo PivotTable trong Excel","Microsoft Support","https://support.microsoft.com/en-us/excel/get-started/create-a-pivottable-to-analyze-worksheet-data"],
["Bắt đầu với Power BI Desktop","Microsoft Learn","https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started"]
];
