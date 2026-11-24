const MODULES = [
{title:"Nền tảng phân tích dữ liệu",desc:"Đọc một bảng số liệu và đặt đúng câu hỏi vận hành.",icon:"layers",tone:"mint",output:"Phiếu định nghĩa một chỉ số vận hành"},
{title:"Excel cho báo cáo vận hành",desc:"Làm sạch dữ liệu, viết công thức và tổng hợp bằng PivotTable.",icon:"table",tone:"blue",output:"Bảng hiệu suất theo đơn vị kèm số kiểm tra"},
{title:"Đối soát & chất lượng dữ liệu",desc:"Ghép hai nguồn, tìm sai lệch và lập danh sách ngoại lệ.",icon:"compare",tone:"orange",output:"Nhật ký ngoại lệ có bằng chứng và người xử lý"},
{title:"Dashboard & cải tiến vận hành",desc:"Trực quan hóa KPI, đề xuất cải tiến và trình bày kết quả.",icon:"chart",tone:"purple",output:"Dashboard một trang và bản tóm tắt cho quản lý"}
];
const COURSE = [
{
title:"Đọc bảng dữ liệu đầu tiên",min:25,goal:"Giải thích được mỗi dòng đại diện cho điều gì, nhận ra mã định danh và đọc đúng đơn vị.",
story:"Đầu ca, quản lý gửi bạn một bảng giao dịch và hỏi hôm qua đội đã xử lý bao nhiêu giao dịch. Trước khi đếm, hãy xác định bảng ghi một dòng cho mỗi giao dịch hay một dòng cho mỗi lần cập nhật.",
theory:"Một cột mô tả một thuộc tính, chẳng hạn số tiền. Một dòng ghi một quan sát. “Mức chi tiết” (grain) cho biết chính xác quan sát ấy là gì. Mã giao dịch cho phép lần về bản ghi gốc. Mã trông giống số vẫn nên lưu kiểu văn bản để giữ số 0 ở đầu.",
table:[["Mã GD","Lần ghi","Trạng thái","Số tiền (VND)"],["001","09:00","Chờ","200.000"],["001","09:05","Xong","200.000"],["002","09:10","Xong","300.000"]],
steps:["Đọc tiêu đề và đơn vị. Viết bên cạnh bảng: mỗi dòng là một lần ghi trạng thái của một giao dịch.","Khoanh các mã khác nhau. Mã 001 xuất hiện hai lần vì có hai lần ghi nhận. Bảng có ba dòng nhưng chỉ có hai giao dịch.","Lấy lần ghi cuối theo từng mã nếu câu hỏi là trạng thái hiện tại. Tổng số tiền của hai giao dịch là 500.000 VND."],
task:"Nếu có thêm dòng 002 lúc 09:12, số tiền 300.000 VND, trạng thái Xong, số giao dịch duy nhất và số dòng là bao nhiêu?",
answer:"Vẫn có 2 giao dịch duy nhất. Số dòng tăng từ 3 lên 4. Cộng tiền cả bốn dòng sẽ đếm lại các lần cập nhật.",
q:["Muốn đếm giao dịch từ bảng lịch sử trạng thái, bạn làm gì?",["Đếm tất cả dòng có số tiền","Đếm mã giao dịch phân biệt sau khi kiểm tra mã trống","Chia số dòng cho hai"],1,"Một giao dịch có thể có nhiều lần cập nhật. Chỉ mã hợp lệ, phân biệt mới đại diện cho từng giao dịch."]
},
{
title:"Từ câu hỏi quản lý đến KPI",min:30,goal:"Viết được định nghĩa KPI với tử số, mẫu số, phạm vi và thời điểm chốt.",
story:"Quản lý muốn biết đội có xử lý hồ sơ đúng hạn không. Hai báo cáo có thể ra số khác nhau nếu một bên đưa cả hồ sơ còn mở vào mẫu số.",
theory:"KPI là chỉ số gắn với một mục tiêu. SLA là cam kết về mức dịch vụ, ví dụ hoàn tất trong 30 phút. Trong bài này, tỷ lệ đúng SLA của hồ sơ đã đóng bằng số hồ sơ đóng trong 30 phút hoặc sớm hơn chia cho tổng hồ sơ đã đóng trong kỳ.",
table:[["Hồ sơ","Tình trạng","Phút xử lý"],["HS01","Đã đóng","30"],["HS02","Đã đóng","45"],["HS03","Đang mở","—"],["HS04","Đã đóng","18"]],
steps:["Ghi rõ ai dùng chỉ số và để quyết định gì. Ví dụ trưởng ca xem tỷ lệ đúng hạn theo ngày để phân bổ người.","Đếm ba hồ sơ đã đóng. Trong đó HS01 và HS04 đạt điều kiện ≤ 30 phút. Tỷ lệ bằng 2/3, xấp xỉ 66,7%.","Ghi kèm giờ chốt và số đang mở. Nếu không có hồ sơ đóng, hiển thị “Chưa có dữ liệu” để người đọc hiểu mẫu số bằng 0."],
task:"Viết một dòng định nghĩa KPI để người khác tính lại đúng 66,7% từ bảng.",
answer:"Tỷ lệ đúng SLA của các hồ sơ đã đóng tại giờ chốt = số hồ sơ đóng có thời gian xử lý ≤ 30 phút / tổng hồ sơ đã đóng. Hồ sơ đang mở được theo dõi riêng.",
q:["HS01 mất đúng 30 phút. Theo quy ước bài này, xử lý thế nào?",["Xếp đúng SLA","Xếp trễ SLA","Loại khỏi cả tử số và mẫu số"],0,"Ngưỡng quy định là nhỏ hơn hoặc bằng 30 phút. Cần thống nhất cách xử lý điểm biên trước khi so sánh."]
},
{
title:"Đọc biến động và viết nhận xét",min:30,goal:"Phân biệt số lượng, tỷ lệ và điểm phần trăm khi so sánh hiệu suất.",
story:"Tuần này số hồ sơ trễ cao hơn tuần trước. Quản lý cần biết đội xử lý kém đi hay chỉ đang nhận khối lượng lớn hơn.",
theory:"Số lượng thể hiện khối lượng công việc. Tỷ lệ đặt số đó trên một mẫu số. Chênh lệch giữa hai tỷ lệ được biểu thị bằng điểm phần trăm. Nhận xét tốt gồm kỳ so sánh, số liệu, phạm vi và một bước xác minh.",
table:[["Kỳ","Hồ sơ đã đóng","Hồ sơ trễ","Tỷ lệ trễ"],["Tuần 1","100","10","10%"],["Tuần 2","200","16","8%"]],
steps:["Tính riêng từng tuần. Tuần 1 là 10/100 = 10%. Tuần 2 là 16/200 = 8%.","Diễn đạt cả hai chiều: khối lượng trễ tăng 6 hồ sơ, tỷ lệ trễ giảm 2 điểm phần trăm.","Đặt giả thuyết có thể kiểm tra. Lọc theo loại hồ sơ, ca làm và chi nhánh để xem cơ cấu khối lượng có thay đổi."],
task:"Viết hai câu cho trưởng ca, gồm một phát hiện và một đề xuất kiểm tra.",
answer:"Số hồ sơ trễ tăng từ 10 lên 16 trong khi tỷ lệ trễ giảm từ 10% xuống 8% do khối lượng đã đóng tăng gấp đôi. Em sẽ xem nhóm hồ sơ nào đóng góp nhiều nhất vào sáu trường hợp trễ tăng thêm.",
q:["Tỷ lệ trễ giảm từ 10% còn 8%. Chênh lệch tuyệt đối là bao nhiêu?",["Giảm 20 điểm phần trăm","Giảm 8 điểm phần trăm","Giảm 2 điểm phần trăm"],2,"10% − 8% = 2 điểm phần trăm. Nếu nói mức giảm tương đối thì (10 − 8)/10 = 20%."]
},
{
title:"Nhập và làm sạch dữ liệu trong Excel",min:35,goal:"Nhập đúng kiểu cột và tạo một bảng sạch có thể kiểm tra lại.",
story:"Tệp CSV có mã chi nhánh 001 và tên chi nhánh bị thừa dấu cách. Nếu mở nhanh rồi lưu đè, số 0 đầu có thể biến mất và cùng một nhóm bị tách thành hai.",
theory:"CSV là tệp văn bản chứa các trường được phân tách. Excel Table là vùng dữ liệu có tiêu đề và bộ lọc. Giữ một bản nguồn rồi xử lý trên bản sao giúp bạn truy lại mọi thay đổi.",
table:[["Trường","Kiểu nên chọn","Ví dụ"],["MaCN","Văn bản","001"],["Ngay","Ngày","2026-11-02"],["SoTien","Số nguyên","1500000"],["DonVi","Văn bản","CN A "]],
steps:["Giữ nguyên CSV nguồn. Trong Excel chọn Data → From Text/CSV, xem trước dấu phân cách và mã hóa UTF-8. Chọn Transform Data, đặt MaCN thành Text trước khi nạp.","Chọn vùng dữ liệu rồi Insert → Table và xác nhận hàng đầu là tiêu đề. Tạo thêm cột DonViSach với =TRIM([@DonVi]) để bỏ khoảng trắng dư thông thường.","So sánh số dòng và tổng tiền trước/sau. Lọc dòng trống, lỗi kiểu và mã trùng sang một danh sách cần kiểm tra. Chỉ loại dòng sau khi biết nguyên nhân."],
task:"Một mã hiển thị là 1 thay vì 001. Bạn sẽ sửa quy trình ở đâu và kiểm tra lại như thế nào?",
answer:"Mở lại từ tệp nguồn còn nguyên mã 001, đặt cột mã là Text ngay khi nhập rồi so với nguồn. Không tự thêm số 0 nếu chưa biết quy ước độ dài mã.",
q:["Kiểm tra nào hữu ích ngay sau khi chuẩn hóa tên đơn vị?",["Chỉ đổi màu tiêu đề","So sánh số dòng, tổng tiền và danh sách tên trước/sau","Xóa hết các dòng trông gần giống nhau"],1,"Chuẩn hóa nhãn không nên làm mất giao dịch hoặc đổi số tiền. Danh sách tên cho biết việc gom nhóm đã đúng chưa."]
},
{
title:"Tính chỉ số với IF, COUNTIFS và SUMIFS",min:40,goal:"Viết công thức phân loại SLA, đếm hồ sơ và cộng số tiền theo điều kiện.",
story:"Trưởng ca yêu cầu một dòng báo cáo gồm số hồ sơ đã đóng ở CN A, số đúng hạn và tổng giá trị của nhóm đã đóng.",
theory:"IF chọn kết quả theo điều kiện. COUNTIFS đếm dòng thỏa tất cả điều kiện. SUMIFS cộng một cột số cho các dòng đạt điều kiện. Các vùng điều kiện phải cùng kích thước. Nếu Excel dùng dấu chấm phẩy, hãy đổi dấu phẩy phân cách đối số cho phù hợp.",
table:[["A · Đơn vị","B · Trạng thái","C · Phút","D · VND"],["CN A","Đã đóng","25","100000"],["CN A","Đã đóng","40","200000"],["CN A","Đang mở","","50000"],["CN B","Đã đóng","20","90000"]],
code:'=IF(B2<>"Đã đóng","Chưa đóng",IF(C2="","Thiếu thời gian",IF(C2<=30,"Đúng hạn","Trễ")))\n=COUNTIFS(A2:A5,"CN A",B2:B5,"Đã đóng")\n=SUMIFS(D2:D5,A2:A5,"CN A",B2:B5,"Đã đóng")',
steps:["Chép bảng với tiêu đề ở dòng 1. Nhập công thức IF vào E2, kéo xuống E5. Kết quả lần lượt là Đúng hạn, Trễ, Chưa đóng, Đúng hạn.","Nhập hai công thức tổng hợp vào các ô trống ngoài bảng. Số hồ sơ đã đóng của CN A là 2 và tổng tiền là 300.000 VND.","Thêm điều kiện E2:E5 bằng Đúng hạn vào COUNTIFS để lấy tử số. CN A có 1/2 hồ sơ đúng hạn, đạt 50%."],
task:"Nếu hồ sơ 40 phút của CN A chuyển thành 29 phút thì chỉ số nào thay đổi?",
answer:"Tỷ lệ đúng hạn của CN A tăng từ 50% lên 100%. Số hồ sơ đã đóng vẫn là 2 và tổng giá trị vẫn là 300.000 VND.",
q:["Cần cộng số tiền của riêng CN A với trạng thái Đã đóng. Dùng hàm nào?",["COUNTIFS","TRIM","SUMIFS"],2,"SUMIFS cộng cột tiền sau khi kiểm tra đồng thời điều kiện chi nhánh và trạng thái."]
},
{
title:"Lập báo cáo hiệu suất bằng PivotTable",min:40,goal:"Tạo một bảng tổng hợp theo đơn vị và tính đúng tỷ lệ toàn hệ thống.",
story:"Hai chi nhánh có số lượng hồ sơ rất khác nhau. Quản lý muốn một dòng tổng vừa phản ánh tỷ lệ toàn bộ, vừa cho biết nơi có nhiều hồ sơ trễ.",
theory:"PivotTable nhóm dữ liệu theo trường bạn đặt vào Rows. Values quyết định đếm hay cộng. Với một dòng cho mỗi hồ sơ, cột cờ 1/0 cho phép cộng số hồ sơ đúng hạn. Tỷ lệ toàn hệ thống lấy tổng tử số chia tổng mẫu số.",
table:[["Đơn vị","Đã đóng","Đúng hạn"],["CN A","10","9"],["CN B","2","1"]],
steps:["Từ dữ liệu chi tiết có một dòng cho mỗi hồ sơ và cột cờ đúng hạn, chọn Insert → PivotTable → New Worksheet. Lọc trạng thái Đã đóng.","Kéo đơn vị vào Rows, mã hồ sơ vào Values ở chế độ Count và cờ đúng hạn vào Values ở chế độ Sum. So Grand Total với dữ liệu nguồn.","Tính tỷ lệ bên cạnh bảng. CN A đạt 90%, CN B đạt 50%. Toàn bộ đạt (9 + 1)/(10 + 2) = 83,3%. Sau khi thêm dữ liệu, chọn Refresh và kiểm tra kỳ báo cáo."],
task:"Một đồng nghiệp lấy (90% + 50%)/2 = 70%. Vì sao khác 83,3%?",
answer:"70% cho hai chi nhánh trọng số như nhau. Câu hỏi về tỷ lệ toàn bộ hồ sơ cần lấy 10 hồ sơ đúng hạn trên 12 hồ sơ đã đóng.",
q:["Trong Values, cột cờ đúng hạn nhận giá trị 1 hoặc 0 nên tổng hợp thế nào để đếm số đúng hạn?",["Sum","Count mọi ô có số","Max"],0,"Tổng của cờ 1/0 đếm đúng số dòng có cờ bằng 1."]
},
{
title:"Chọn khóa và chốt phạm vi đối soát",min:35,goal:"Kiểm tra hai nguồn có cùng kỳ, đơn vị và mức chi tiết trước khi ghép.",
story:"Hệ thống vận hành ghi giao dịch theo lúc tiếp nhận, còn sổ ghi nhận theo lúc hạch toán. Giao dịch cuối ngày có thể xuất hiện ở hai ngày khác nhau.",
theory:"Đối soát là so cùng một tập nghiệp vụ giữa hai nguồn độc lập. Khóa ghép là trường hoặc tổ hợp trường nhận diện giao dịch. Một khóa lặp ở cả hai bảng có thể nhân số dòng sau khi ghép.",
table:[["Nguồn","Mã","Thời điểm","VND"],["Vận hành","GD07","Ngày 1 · 23:59","400.000"],["Sổ","GD07","Ngày 2 · 00:01","400.000"]],
steps:["Ghi phạm vi: ngày nghiệp vụ, múi giờ, giờ chốt, trạng thái được tính và loại tiền. Thống nhất cách xử lý giao dịch đi qua giờ chốt.","Đếm mã trống và số lần xuất hiện từng mã ở mỗi nguồn. Nếu một giao dịch có nhiều dòng phí, thống nhất mức chi tiết hoặc tổng hợp theo mã trước.","Ghi số dòng, số mã phân biệt và tổng tiền của mỗi nguồn. Với GD07, kiểm tra kỳ kế tiếp rồi ghi nguyên nhân chênh thời điểm nếu tìm thấy bằng chứng."],
task:"Hai nguồn có cùng tổng tiền. Bạn đã đủ bằng chứng để ký xác nhận từng giao dịch khớp chưa?",
answer:"Cần kiểm tra theo mã. Một chênh +100.000 và một chênh −100.000 có thể triệt tiêu trong tổng. Cũng cần tìm mã chỉ xuất hiện ở một phía.",
q:["Một mã xuất hiện hai lần ở mỗi nguồn. Ghép tất cả theo mã tạo mấy cặp cho riêng mã đó?",["2 cặp","4 cặp","1 cặp"],1,"Mỗi dòng của nguồn thứ nhất khớp hai dòng của nguồn thứ hai, tạo 2 × 2 = 4 cặp."]
},
{
title:"Tìm giao dịch lệch và thiếu hai chiều",min:45,goal:"Dùng bảng tra để phân loại khớp, lệch tiền và thiếu ở từng nguồn.",
story:"Bạn nhận hai danh sách đã thống nhất kỳ và đã xác nhận khóa duy nhất. Công việc tiếp theo là tìm chính xác từng mã cần kiểm tra.",
theory:"Tra cứu chỉ từ A sang B sẽ bỏ sót mã chỉ có ở B. Hãy lập danh sách hợp tất cả mã rồi kiểm tra sự hiện diện và giá trị ở cả hai phía. Giá trị 0 là số tiền hợp lệ, khác với mã không tồn tại.",
table:[["Mã","Nguồn A (VND)","Nguồn B (VND)"],["G01","100.000","100.000"],["G02","250.000","200.000"],["G03","80.000","—"],["G04","—","30.000"]],
code:'=COUNTIF(NguonB[Ma],A2)\n=XLOOKUP(A2,NguonB[Ma],NguonB[SoTien],"Thiếu ở B",0)',
steps:["Tạo hai Excel Table đặt tên NguonA, NguonB với cột Ma và SoTien. Chép cột mã từ cả hai bảng sang sheet mới, dùng Remove Duplicates trên bản danh sách này.","Dùng COUNTIF để xác nhận mã tồn tại. Dùng XLOOKUP khớp chính xác để lấy tiền cho từng nguồn. Excel thiếu XLOOKUP có thể dùng VLOOKUP khớp chính xác với FALSE.","Khi cả hai bên có mã, tính A trừ B. G02 lệch +50.000 VND. G03 chỉ ở A, G04 chỉ ở B. Có ba mã ngoại lệ cần theo dõi."],
task:"Tổng A trừ tổng B là bao nhiêu? Giải thích bằng đúng ba ngoại lệ.",
answer:"430.000 − 330.000 = 100.000 VND. Ba thành phần là +50.000 của G02, +80.000 của G03 và −30.000 của G04.",
q:["Mã G04 chỉ xuất hiện ở nguồn B. Cách nào sẽ phát hiện mã này?",["Chỉ lọc các mã của A có tiền âm","Chỉ tra A sang B","Đối chiếu danh sách hợp mã của A và B"],2,"Danh sách hợp giữ cả mã riêng của mỗi phía, nên G04 có thể được phân loại."]
},
{
title:"Theo dõi ngoại lệ đến khi đóng",min:35,goal:"Tạo một nhật ký có bằng chứng, người phụ trách, hạn phản hồi và tiêu chí đóng.",
story:"Bạn đã tìm thấy giao dịch lệch 50.000 VND. Quản lý cần biết giao dịch này đang ở bước nào, mức ảnh hưởng và ai sẽ xác minh.",
theory:"Kiểm soát chất lượng dữ liệu thường kiểm tra tính đầy đủ, duy nhất, hợp lệ và nhất quán. Mỗi ngoại lệ cần có mã theo dõi, nguồn bằng chứng và lịch sử xử lý. Nguyên nhân ban đầu nên ghi là giả thuyết cho đến khi xác minh.",
table:[["Mã","Loại","A − B","Phụ trách","Trạng thái"],["G02","Lệch tiền","+50.000","Tổ đối soát","Đang xác minh"],["G03","Thiếu ở B","+80.000","Tổ hạch toán","Chờ chứng từ"]],
steps:["Ghi mã, ngày phát hiện, số thực tế hai nguồn, mức chênh, loại lỗi và liên kết tới bằng chứng tại nơi được phép.","Giao người xác minh và hạn phản hồi. Ghi riêng nguyên nhân dự kiến, hành động đã làm và kết quả đối chiếu lại.","Khi có bản ghi sửa hoặc bằng chứng chênh giờ chốt, chạy đối soát lại đúng phạm vi. Ghi kết quả, thời điểm, người kiểm tra và lưu lịch sử trước khi đóng."],
task:"Người phụ trách nhắn “đã sửa”. Bạn cần thêm bằng chứng gì?",
answer:"Yêu cầu mã tham chiếu cho thay đổi, lấy hai nguồn cập nhật, chạy lại cùng quy tắc và lưu kết quả mới. Nếu còn chênh, giữ trạng thái đang xử lý.",
q:["Phát hiện hai dòng có cùng mã trong nguồn được quy ước mỗi mã một dòng. Đây là lỗi gì?",["Tính duy nhất","Độ dài báo cáo","Định dạng màu"],0,"Vi phạm quy ước một mã một dòng là vấn đề về tính duy nhất. Cần điều tra nguyên nhân trước khi bỏ bản ghi."]
},
{
title:"Thiết kế dashboard vận hành một trang",min:45,goal:"Xây dựng trang Power BI thể hiện khối lượng, tỷ lệ đúng hạn và nhóm cần xử lý.",
story:"Trưởng vận hành có hai phút trước cuộc họp sáng. Một trang báo cáo cần trả lời khối lượng bao nhiêu, chất lượng ra sao và nên xem đơn vị nào trước.",
theory:"Dashboard là trang tóm tắt chỉ số để hỗ trợ quyết định. Trong bài, bạn xây một trang báo cáo tương tác trong Power BI Desktop. Measure là phép tính thay đổi theo bộ lọc. Có thể tập bố cục và đối chiếu các con số bằng PivotTable trong Excel.",
table:[["Trường ví dụ","Ý nghĩa"],["MaHS","Một mã duy nhất cho mỗi hồ sơ"],["DaDong","1 nếu đã đóng, 0 nếu còn mở"],["DungHan","1 nếu đã đóng đúng hạn, 0 nếu còn lại"],["DonVi","Đơn vị xử lý"]],
code:'HS đã đóng = SUM(HoSo[DaDong])\nHS đúng hạn = SUM(HoSo[DungHan])\nTỷ lệ đúng hạn = DIVIDE([HS đúng hạn], [HS đã đóng])',
steps:["Nhập bảng HoSo qua Get data. Trong Transform data, đặt MaHS và DonVi là Text, hai cột cờ là Whole number. Chọn Close & Apply. Tạo từng measure riêng bằng New measure.","Tạo hai Card cho số đã đóng và tỷ lệ đúng hạn. Định dạng tỷ lệ dưới dạng Percentage. Tạo biểu đồ cột theo đơn vị và một bộ lọc đơn vị.","Chọn một đơn vị trong bộ lọc. Tính lại tử và mẫu từ Excel để xác nhận biểu đồ đúng. Thêm kỳ báo cáo, định nghĩa chỉ số và đơn vị vào tiêu đề."],
task:"Nếu một đơn vị chưa đóng hồ sơ nào, tỷ lệ nên hiện ra sao?",
answer:"DIVIDE trả về BLANK khi mẫu số bằng 0 nếu không đặt kết quả thay thế. Ghi rõ “Chưa có hồ sơ đóng” trong chú thích để phân biệt với hiệu suất 0%.",
q:["Muốn tỷ lệ thay đổi khi chọn đơn vị, nên ưu tiên cách tính nào?",["Gõ tay tỷ lệ toàn hệ thống vào tiêu đề","Measure chia hai tổng theo bộ lọc","Lấy trung bình mọi tỷ lệ hiển thị"],1,"Measure được tính theo ngữ cảnh bộ lọc. Hai tổng phải cùng phạm vi."]
},
{
title:"Chuẩn hóa báo cáo và thử tự động hóa",min:35,goal:"Mô tả quy trình lặp lại và thiết kế thử nghiệm cải tiến có số đo.",
story:"Mỗi sáng một nhân viên tốn thời gian đổi tên cột, sửa kiểu dữ liệu và cộng lại cùng một báo cáo. Một quy trình lặp lại có thể được chuẩn hóa và kiểm tra tự động.",
theory:"Quy trình có đầu vào, biến đổi, chốt kiểm tra, đầu ra và người chịu trách nhiệm. Power Query có thể lưu chuỗi bước làm sạch để chạy lại. AI có thể gợi ý công thức hoặc bản nháp giải thích trên ví dụ giả lập, sau đó người làm báo cáo kiểm tra bằng kết quả đã biết.",
table:[["Chỉ tiêu thử nghiệm","Trước","Sau"],["Phút cho mỗi báo cáo","45","20"],["Số báo cáo so với bản chuẩn","10","10"],["Báo cáo có tổng đúng","10","10"]],
steps:["Vẽ quy trình hiện tại bằng năm bước: nhận tệp, kiểm tra cấu trúc, chuẩn hóa, đối soát, phát hành. Bấm giờ ít nhất vài lần cho một đường cơ sở.","Trong Power Query thử đổi kiểu, chuẩn tên cột, rồi Refresh với tệp mẫu khác có cùng cấu trúc. Tạo tình huống thiếu một cột để kiểm tra báo lỗi.","Chạy song song với cách cũ. Trong ví dụ, tiết kiệm 25 phút/báo cáo; 10/10 báo cáo có tổng đúng. Vẫn cần kiểm tra từng ngoại lệ và xác định ai phê duyệt trước khi dùng chính thức."],
task:"Viết một yêu cầu cho AI để nhờ gợi ý cách kiểm tra cột mã mà không đưa dữ liệu khách hàng vào bài.",
answer:"“Cho bảng giả lập gồm MaGD, Ngay, SoTien. Hãy đề xuất công thức đánh dấu MaGD trống hoặc bị lặp và minh họa bằng bốn dòng tự tạo.” Sau đó thử cả dữ liệu sạch, trống và trùng để kiểm tra gợi ý.",
q:["Chỉ số nào đo được lợi ích mà vẫn theo dõi chất lượng?",["Số màu thêm vào báo cáo","Số lần mở tệp","Thời gian mỗi báo cáo cùng tỷ lệ kết quả đạt bộ kiểm tra"],2,"Cần đo thời gian và kết quả kiểm tra trên cùng phạm vi để tránh đánh đổi độ tin cậy."]
},
{
title:"Trình bày kết quả bằng Việt ngữ và tiếng Anh",min:35,goal:"Tóm tắt một phát hiện trong 60 giây với con số, hành động và hạn cập nhật.",
story:"Đầu cuộc họp, quản lý chỉ cần biết điểm cần chú ý, mức ảnh hưởng và ai sẽ xử lý tiếp. Khi trao đổi bằng tiếng Anh, hãy giữ nguyên kỳ, đơn vị và mức độ chắc chắn.",
theory:"Một bản tóm tắt vận hành gồm bối cảnh, phát hiện, bằng chứng, hành động và mốc cập nhật. Khi phỏng vấn, có thể kể chính bài tập này theo STAR: tình huống, nhiệm vụ, hành động, kết quả. Nói rõ đây là tình huống thực hành.",
table:[["Thông tin","Ví dụ giả lập"],["Phạm vi","50 mã trong ca sáng"],["Kết quả","47 khớp, 3 ngoại lệ"],["Bước tiếp","Gửi danh sách cho tổ vận hành, phản hồi lúc 15:00"]],
steps:["Tính tỷ lệ ngoại lệ: 3/50 = 6%. Ghi rõ 3 mã đang chờ xác minh, chưa kết luận là tổn thất.","Soạn hai câu tiếng Việt: “Ba trong 50 mã có sai lệch ở ca sáng. Em đã gửi danh sách cho tổ vận hành để kiểm tra và sẽ cập nhật lúc 15 giờ.”","Nói thành tiếng: “I reconciled 50 transaction IDs this morning. Three need further review. I shared the exceptions with Operations and will provide an update by 3 p.m.”"],
task:"Tự ghi âm 60 giây. Trả lời thêm bằng tiếng Anh: How did you check the result?",
answer:"“I checked the reporting period and verified that the transaction IDs were unique. I compared each ID across both sources, then reconciled the item-level differences to the overall total.” Đối chiếu lời nói với các bước bạn thực sự đã làm.",
q:["Cách trình bày nào phản ánh đúng dữ kiện trên?",["6% số mã cần xác minh, đã giao đầu mối và hẹn giờ cập nhật","Ngân hàng chắc chắn mất tiền ở ba giao dịch","Tất cả giao dịch đều có lỗi"],0,"Danh sách ngoại lệ mới cho biết cần xác minh. Kết luận nguyên nhân hoặc thiệt hại cần thêm bằng chứng."]
}
];
