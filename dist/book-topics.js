/* Học liệu tiếng Việt do DataLab biên soạn cho các chủ đề trong mục lục. */
(() => {
  const readings = {
  "excel": [
    [
      "Nhập bảng hồ sơ và giữ nguyên khóa",
      "Trong tệp hồ sơ, một dòng là một lần tiếp nhận. Dòng đầu chứa tên cột. Mã hồ sơ dùng để tìm lại một bản ghi, còn chi nhánh giúp phân nhóm nhiều bản ghi. Khi nhập CSV trong Excel, kiểm tra dấu phân cách, bảng mã và kiểu dữ liệu ở bước xem trước.",
      "Tệp có dòng 0017,Hà Nội,12. Nhập bằng Data → From Text/CSV, chọn dấu phẩy và đặt cột mã thành Text trước khi nạp. Bạn sẽ giữ được mã 0017 và vẫn có thể cộng cột phút. Nếu đã biến mã thành 17, quay lại bước nhập để đối chiếu chuỗi gốc.",
      "Sheet có 25 dòng kể cả tiêu đề, dòng nào cũng có mã riêng. Có bao nhiêu hồ sơ?",
      "Có 24 hồ sơ. Bỏ dòng tiêu đề, sau đó kiểm tra mã trống và mã trùng trước khi dùng số dòng làm tổng."
    ],
    [
      "Viết công thức kiểm thời hạn",
      "Khi so SLA, đối chiếu số phút thực tế với ngưỡng của chính hồ sơ. Hai cột phải cùng đơn vị. Trong ví dụ này, hồ sơ chạm đúng ngưỡng vẫn đạt, còn hồ sơ chưa có thời gian hoàn tất cần một nhãn riêng.",
      "Cột A là XuLyPhut, cột B là SLAPhut. Công thức =IF(OR(A2=\"\",B2=\"\"),\"Chưa đủ dữ liệu\",IF(A2<=B2,\"Đạt\",\"Trễ\")) xử lý các ô thiếu trước khi so sánh. Sao chép xuống để tham chiếu chuyển sang dòng tiếp theo.",
      "Kết quả với ba cặp (30,30), (61,60) và (trống,30) là gì?",
      "Lần lượt là Đạt, Trễ và Chưa đủ dữ liệu. Nếu bỏ nhánh kiểm tra ô trống, phép so sánh có thể gắn nhầm một hồ sơ chưa hoàn tất vào nhóm đạt."
    ],
    [
      "Từ bảng hồ sơ đến biểu đồ",
      "PivotTable gom các dòng theo trường phân nhóm và tính một đại lượng cho từng nhóm. Chọn Count khi đếm mã hoặc Sum khi cộng số phút. Trước khi vẽ, đối chiếu tổng chung với bảng đầu vào và kiểm tra bộ lọc.",
      "Với năm mã duy nhất thuộc Hà Nội, Hà Nội, Đà Nẵng, Hà Nội, Đà Nẵng, đặt ChiNhanh vào Rows và MaHS vào Values với Count. Bảng cho 3 và 2, tổng 5. Dùng biểu đồ thanh với trục bắt đầu ở 0 để so số lượng.",
      "Nếu một mã xuất hiện hai lần, Count of MaHS còn cho biết số hồ sơ duy nhất không?",
      "Count đếm cả hai dòng có mã. Cần xác minh bản ghi trùng, hoặc đếm mã phân biệt khi câu hỏi thực sự hỏi số hồ sơ."
    ],
    [
      "Đưa kết quả lên slide bàn giao",
      "Một slide báo cáo nên theo một câu hỏi của người nhận. Đặt kết quả trong tiêu đề, thể hiện bằng chứng bằng bảng hoặc biểu đồ và ghi kỳ, đơn vị, phạm vi. Ghi rõ phần nào cần kiểm chứng trước khi đề xuất hành động.",
      "Tuần 1 có 8/10 hồ sơ đóng đạt hạn, tuần 2 có 6/10. Tiêu đề có thể viết “Tỷ lệ đạt hạn giảm 20 điểm phần trăm ở tuần 2”. Đặt hai cột 80% và 60%, thêm số hồ sơ đã đóng ngay dưới từng cột.",
      "Có thể kết luận nguyên nhân là thiếu nhân sự từ slide trên không?",
      "Chưa. Số liệu chỉ cho thấy mức giảm. Cần đối chiếu lịch trực, loại nghiệp vụ và từng hồ sơ trễ trước khi xác định nguyên nhân."
    ]
  ],
  "sql": [
    [
      "Chọn cột, bảng và mức chi tiết",
      "SELECT xác định trường cần trả về, FROM xác định bảng nguồn. Khi chưa lọc hoặc tổng hợp, chọn bớt cột vẫn giữ các dòng ban đầu. ORDER BY mới quy định thứ tự hiển thị.",
      "Chạy SELECT MaHS, ChiNhanh FROM HoSo ORDER BY MaHS. Hai hồ sơ cùng chi nhánh vẫn hiện ở hai dòng. Nếu chỉ muốn danh sách chi nhánh duy nhất, dùng SELECT DISTINCT ChiNhanh FROM HoSo.",
      "SELECT ChiNhanh FROM HoSo trên 24 dòng thuộc ba chi nhánh trả về bao nhiêu dòng?",
      "24 dòng. Chỉ thêm DISTINCT mới thu được ba giá trị khác nhau trong trường hợp cả ba nhãn đều hiện diện."
    ],
    [
      "Lọc từng dòng trước khi tổng hợp",
      "WHERE giữ các dòng có điều kiện đúng. Dùng AND khi cần thỏa đồng thời và đặt ngoặc khi kết hợp với OR. SQL biểu diễn thiếu dữ liệu bằng NULL, nên kiểm bằng IS NULL.",
      "Để tìm hồ sơ thẻ tại Hà Nội, dùng WHERE ChiNhanh = 'Hà Nội' AND NghiepVu = 'Hồ sơ thẻ'. Nếu đổi sang OR, kết quả gồm cả hồ sơ nghiệp vụ khác ở Hà Nội và hồ sơ thẻ ở chi nhánh khác.",
      "Điều kiện XuLyPhut = NULL tìm được hồ sơ chưa có phút xử lý không?",
      "Dùng XuLyPhut IS NULL. So sánh bằng với NULL cho kết quả chưa xác định nên WHERE sẽ không giữ dòng đó."
    ],
    [
      "Ghép hai sổ ở đúng mức chi tiết",
      "JOIN ghép mọi cặp bản ghi thỏa điều kiện. Cần biết khóa có duy nhất ở hai phía hay không. LEFT JOIN giữ các dòng bên trái và điền NULL khi không tìm được bản ghép.",
      "Sổ nội bộ có hai dòng GD110, đối tác cũng có hai dòng GD110. Nối trực tiếp theo mã sẽ ra bốn cặp, dễ làm tổng tiền tăng giả. Nếu đối soát theo mã, hãy cộng tiền và đếm dòng theo mã ở từng sổ trước khi nối.",
      "Muốn tìm mã chỉ có trong sổ nội bộ, làm thế nào?",
      "Đặt sổ nội bộ bên trái, LEFT JOIN với danh sách mã đối tác rồi lọc khóa bên phải IS NULL. Kiểm riêng mã rỗng của nguồn."
    ],
    [
      "Tổng hợp và xác định mẫu số",
      "GROUP BY tạo một dòng kết quả cho mỗi tổ hợp khóa nhóm. COUNT(*) đếm dòng, COUNT(cột) bỏ giá trị NULL và SUM(cột) cộng các giá trị đã biết. HAVING lọc sau khi đã tạo nhóm.",
      "Một chi nhánh có ba hồ sơ với phút xử lý 12, 18 và NULL. GROUP BY ChiNhanh cho COUNT(*) bằng 3, COUNT(XuLyPhut) bằng 2, AVG(XuLyPhut) bằng 15. Mẫu số của trung bình gồm hai hồ sơ có kết quả.",
      "Muốn tìm các mã giao dịch lặp từ hai dòng trở lên, viết điều kiện ở đâu?",
      "Dùng GROUP BY MaGD HAVING COUNT(*) >= 2. Số lần lặp chỉ có sau bước nhóm."
    ],
    [
      "Phân loại bằng CASE",
      "CASE WHEN xét nhánh theo thứ tự. Đưa tình trạng chưa hoàn tất hoặc thiếu dữ liệu lên trước phép so thời hạn để tránh gán sai nhãn. ELSE xử lý phần còn lại.",
      "Với hồ sơ đã đóng và đã đủ phút, CASE WHEN XuLyPhut <= SLAPhut THEN 'Đạt' ELSE 'Trễ' END cho đúng hai nhãn. Trên bảng hỗn hợp, thêm nhánh trạng thái đang mở và nhánh XuLyPhut IS NULL OR SLAPhut IS NULL trước.",
      "Dùng < thay cho <= làm thay đổi trường hợp nào?",
      "Hồ sơ hoàn tất đúng bằng ngưỡng sẽ đổi từ Đạt sang Trễ. Luôn thêm một dòng kiểm đúng biên để phát hiện lỗi này."
    ]
  ],
  "pandas": [
    [
      "Chạy notebook theo thứ tự",
      "Jupyter giữ các biến của những ô đã chạy trong bộ nhớ. Thứ tự trên màn hình có thể khác thứ tự đã thực thi. Tách rõ ô nhập nguồn, ô biến đổi và ô kiểm kết quả để người nhận có thể chạy lại.",
      "Ô đầu import pandas as pd, ô thứ hai đọc CSV thành df, ô sau xem df.shape và df.head(3). Sau khi hoàn tất, khởi động lại kernel và chạy từ đầu để phát hiện biến còn sót từ lần thử trước.",
      "Notebook chạy trên máy người viết nhưng NameError ở máy người nhận. Nên kiểm gì trước?",
      "Tìm ô tạo biến và đặt nó trước ô sử dụng. Chạy lại toàn bộ từ một kernel mới để kiểm tra thứ tự và đường dẫn nguồn."
    ],
    [
      "Chọn trường và bản ghi bằng pandas",
      "DataFrame có dòng và cột. Dùng df.loc[điều_kiện, danh_sách_cột] để chọn phạm vi rõ ràng. Trước khi tính, kiểm df.dtypes và các nhãn trạng thái thực tế.",
      "df.loc[df['ChiNhanh'].eq('Hà Nội'), ['MaHS', 'XuLyPhut']] trả mã và số phút của các dòng tại Hà Nội. Nếu chuẩn bị sửa kết quả mà vẫn cần giữ bảng gốc, tạo bản làm việc bằng .copy().",
      "df.shape bằng (24, 9) có nghĩa gì?",
      "Bảng có 24 dòng dữ liệu và 9 cột. Dòng tiêu đề đã dùng để đặt tên cột nên không tính vào 24."
    ],
    [
      "Đọc CSV và so kết quả sau xuất",
      "Khai báo kiểu mã ngay ở bước đọc để giữ số 0 đầu. Ghi rõ encoding, dấu phân cách và quy ước ngày. Khi xuất bảng, quyết định có cần giữ index thành một cột hay không.",
      "df = pd.read_csv('hoso.csv', dtype={'MaHS':'string'}, encoding='utf-8-sig'). Sau biến đổi, ghi df.to_csv('ketqua.csv', index=False). Đọc lại tệp xuất và so số mã, số dòng và tổng phút.",
      "Vì sao sau mỗi lần xuất lại có thể xuất hiện thêm một cột Unnamed?",
      "Index đã được ghi như cột dữ liệu và được đọc lại ở lần sau. Nếu index không mang ý nghĩa nghiệp vụ, xuất với index=False."
    ],
    [
      "Làm sạch nhưng vẫn truy được nguồn",
      "Chuẩn hóa nhãn, kiểu và biểu diễn thiếu trên bản làm việc. Ghi quy tắc biến đổi và giữ giá trị ban đầu cho các ngoại lệ. Phân biệt thật sự bằng 0 với chưa có giá trị.",
      "Hai chuỗi 'Hà Nội' và 'Hà Nội ' sẽ thành hai nhóm nếu chưa loại dấu cách thừa. Lưu cột gốc rồi dùng .str.strip() trên cột làm việc. Gắn cờ các nhãn ngoài danh mục để kiểm riêng.",
      "Có nên fillna(0) cho mọi dòng XuLyPhut trước khi tính trung bình?",
      "Chỉ điền 0 khi nghiệp vụ xác nhận thời gian thực sự bằng 0. Hồ sơ đang mở chưa có thời gian hoàn tất, đưa 0 vào sẽ kéo trung bình xuống."
    ],
    [
      "Ghép bảng và kiểm quan hệ khóa",
      "merge xác định khóa ghép, loại ghép và có thể kiểm giả định quan hệ bằng validate. indicator=True cho biết một mã có ở hai bên hay chỉ ở một bên. Kiểm khóa rỗng trước khi ghép.",
      "Nếu hai bảng đã tổng hợp thành một dòng/mã, dùng a.merge(b, on='MaGD', how='outer', validate='one_to_one', indicator=True). Một dòng left_only là mã chỉ thấy ở a. Từ đó truy lại bản gốc trước khi xử lý.",
      "Nếu validate='one_to_one' báo lỗi, có nên bỏ tham số để lấy kết quả không?",
      "Trước tiên tìm mã lặp ở cả hai bảng bằng duplicated(..., keep=False). Chỉ thay giả định quan hệ hoặc tổng hợp lại sau khi hiểu ý nghĩa các dòng."
    ],
    [
      "Gom nhóm và tính đúng tỷ lệ chung",
      "groupby chia dữ liệu theo một hay nhiều khóa. agg cho phép đặt phép tính từng trường. Với tỷ lệ, giữ cả tử và mẫu để khi gộp nhóm vẫn tính lại được.",
      "Chi nhánh A có 1/2 hồ sơ đạt hạn, B có 8/8. Gộp tử và mẫu được 9/10 = 90%. Trung bình đơn giản của 50% và 100% chỉ ra 75% vì gán hai chi nhánh trọng số bằng nhau.",
      "Một nhóm không có hồ sơ đã đóng. Nên trả tỷ lệ bao nhiêu?",
      "Mẫu số bằng 0 nên tỷ lệ chưa xác định. Hiện trống hoặc ghi rõ chưa có hồ sơ đủ điều kiện và vẫn công bố số hồ sơ đã đóng bằng 0."
    ]
  ],
  "powerbi": [
    [
      "Từ tệp dữ liệu đến quyết định đầu ca",
      "Bắt đầu bằng một quyết định mà người dùng cần đưa ra. Xác định bảng nguồn, ý nghĩa một dòng và thời điểm cập nhật trước khi chọn biểu đồ. Một chỉ số nên dẫn được đến các hồ sơ giải thích nó.",
      "Trưởng ca cần phân việc cho hồ sơ còn mở. Lấy bảng tiếp nhận, giữ mã và trạng thái, đếm hồ sơ đang mở theo đơn vị, rồi cho phép xem danh sách mã phía sau con số.",
      "Đếm toàn bộ hồ sơ trong kỳ có trả lời được câu hỏi còn bao nhiêu hồ sơ đang mở không?",
      "Cần xét trạng thái ở thời điểm chốt. Nếu bảng chỉ lưu trạng thái hiện tại thì phải nói rõ phạm vi và không suy ngược trạng thái quá khứ."
    ],
    [
      "Nhập dữ liệu vào Power BI Desktop",
      "Chọn Get Data → Text/CSV, kiểm bản xem trước rồi chọn Transform Data. Trong Power Query, xem từng Applied Step, đặt kiểu đúng cho mã, ngày và tiền trước khi Close & Apply.",
      "Mã chi nhánh 0017 cần là Text ngay từ bước đọc. Khi cột ngày ghi 03/04, chọn vùng theo nguồn và kiểm bằng một ngày như 13/04 để phát hiện nhầm ngày với tháng.",
      "Đổi số 17 thành Text sau khi đã nạp có khôi phục được mã 0017 không?",
      "Không thể biết nó từng là 17, 017 hay 0017 từ số 17. Sửa bước chuyển kiểu từ nguồn hoặc áp quy tắc độ dài đã xác nhận."
    ],
    [
      "Chọn Power Query, mô hình hay measure",
      "Power Query chuẩn hóa đầu vào. Quan hệ giữa các bảng truyền bộ lọc. Measure DAX tính kết quả theo bộ lọc hiện tại của báo cáo. Chọn đúng vị trí giúp dễ kiểm và chạy lại.",
      "Đặt quy tắc bỏ khoảng trắng khỏi tên chi nhánh trong Power Query. Tạo quan hệ từ danh mục chi nhánh đến hồ sơ. Measure COUNTROWS(HoSo) sẽ đổi khi người đọc lọc chi nhánh nếu mỗi dòng thực sự là một hồ sơ.",
      "Cần đặt điều kiện sạch nhãn trước hay sau khi thiết lập khóa liên kết?",
      "Làm sạch trước để giá trị khóa ở hai bảng dùng cùng quy ước. Kiểm cả tính duy nhất ở phía danh mục và khóa không khớp ở phía hồ sơ."
    ],
    [
      "Viết yêu cầu và phép thử cho báo cáo",
      "Định nghĩa tên chỉ số, tử số, mẫu số, ngày dùng để lọc và người xác nhận. Chọn một kịch bản có kết quả biết trước để nghiệm thu báo cáo sau mỗi thay đổi.",
      "Thẻ Đã đóng phải đếm hồ sơ nhận trong tuần đã chọn và đã có trạng thái đóng. Mẫu gồm 3 hồ sơ đóng trong tuần, 2 mở trong tuần và 1 đóng ngoài tuần. Thẻ phải cho 3.",
      "Nếu sau khi chọn tuần, thẻ trả 4 thì kiểm gì?",
      "Kiểm quan hệ với bảng ngày và việc measure có bỏ bộ lọc của ngày nhận hay không. Đối chiếu từng mã được đếm để xác định dòng thừa."
    ]
  ],
  "tableau": [
    [
      "Chọn chiều và đại lượng",
      "Dimension chia các quan sát thành nhóm. Measure là giá trị được tổng hợp trong mỗi nhóm. Trường có kiểu số vẫn có thể là chiều nếu nó là nhãn nhận diện.",
      "Đặt ChiNhanh lên Rows và COUNTD(MaHS) lên Columns để so số hồ sơ duy nhất. Mã chi nhánh 101 và 102 có thể làm nhãn. Cộng hai mã không mang ý nghĩa phân tích.",
      "Muốn xem thời lượng xử lý điển hình theo chi nhánh, vẫn dùng COUNTD(MaHS) được không?",
      "COUNTD đo số lượng hồ sơ. Đổi đại lượng thành phút xử lý của hồ sơ đủ điều kiện và chọn trung bình hoặc trung vị theo câu hỏi."
    ],
    [
      "Dùng thanh để so sánh quy mô",
      "Biểu đồ thanh so các nhóm theo chiều dài. Chọn một đơn vị, giữ mốc 0 cho trục số và sắp xếp nếu mục tiêu là xếp hạng. Ghi rõ kỳ và bộ lọc bên cạnh biểu đồ.",
      "Hà Nội có 12 hồ sơ, Đà Nẵng 9 và Cần Thơ 6. Đặt tên chi nhánh cạnh mỗi thanh và gắn giá trị số. Thanh Hà Nội dài gấp đôi thanh Cần Thơ nếu cùng thang đo bắt đầu từ 0.",
      "Từ ba số đếm có thể kết luận Hà Nội xử lý chậm nhất không?",
      "Số đếm đo khối lượng. Muốn so tốc độ cần thời gian xử lý, mẫu hồ sơ đủ điều kiện và kỳ quan sát thống nhất."
    ],
    [
      "Giữ đúng khoảng thời gian trên đường xu hướng",
      "Xác định một điểm trên đường là ngày, tuần hay tháng. Dùng trục thời gian theo đúng thứ tự và phân biệt số 0 đã xác nhận với kỳ thiếu dữ liệu.",
      "Tuần 1 có 8 hồ sơ, tuần 2 chưa nhận tệp, tuần 3 có 11. Thể hiện khoảng trống và ghi chú tuần 2. Nếu hệ thống xác nhận tuần 2 có đủ dữ liệu và thực sự không có hồ sơ mới ghi 0.",
      "Có thể nói số hồ sơ tăng liên tục từ 8 lên 11 không?",
      "Chỉ biết số tuần 3 cao hơn tuần 1. Không có quan sát ở tuần 2 để kết luận xu hướng liên tục."
    ],
    [
      "Kiểm phạm vi của bộ lọc",
      "Bộ lọc có thể áp cho một worksheet hoặc nhiều worksheet liên quan. Khi thiết kế dashboard, chỉ rõ bộ lọc ảnh hưởng thẻ, biểu đồ và bảng chi tiết nào.",
      "Sau khi chọn Hà Nội, thẻ hiện 4 hồ sơ nhưng bảng vẫn còn 7 mã của mọi chi nhánh. Kiểm phạm vi Apply to Worksheets, quan hệ nguồn và các hành động lọc của dashboard.",
      "Kiểm lại sau khi sửa bằng cách nào?",
      "Chọn chi nhánh có số đã đối chiếu, so thẻ với danh sách mã theo cùng định nghĩa rồi xóa bộ lọc để kiểm tổng toàn đơn vị."
    ],
    [
      "Thiết kế dashboard theo nhiệm vụ",
      "Xác định người đọc cần làm gì sau khi thấy số liệu. Đặt tín hiệu tổng hợp cạnh đường dẫn đến chi tiết, giữ nhãn đơn vị và cách trở về phạm vi ban đầu.",
      "Trưởng ca chọn một thanh biểu diễn số hồ sơ trễ, bảng bên dưới chỉ còn mã trễ của chi nhánh đó. Bổ sung thời điểm tiếp nhận và đơn vị phụ trách để người trực có thể phân công.",
      "Nên nghiệm thu dashboard bằng yêu cầu nào?",
      "Giao nhiệm vụ tìm mã của một hồ sơ trễ tại chi nhánh đã biết, rồi khôi phục tổng toàn hệ thống. Ghi thời gian và các bước người dùng gặp khó."
    ]
  ],
  "finance": [
    [
      "Chọn biểu đồ cho số dư và dòng tiền",
      "Số dư mô tả một thời điểm, dòng tiền đo lượng thay đổi trong một kỳ. Ghi rõ đơn vị, đồng tiền và ngày chốt trước khi biểu diễn. Chỉ cộng các trường có cùng ý nghĩa.",
      "Số dư cuối ba ngày là 100, 120 và 90 triệu đồng. Dùng đường theo ngày để thấy ngày cuối giảm 30 triệu. Tổng 310 triệu không phải tổng thu trong ba ngày.",
      "Muốn vẽ tổng tiền thu mỗi ngày, cần bảng nào?",
      "Cần giao dịch tiền vào với ngày ghi nhận và số tiền theo cùng đơn vị. Gom tổng theo ngày rồi đối chiếu phạm vi."
    ],
    [
      "Chuyển tần suất trong chuỗi thời gian",
      "Chuyển trường ngày về kiểu ngày, sắp thứ tự và xác định khoảng quan sát. Khi đổi từ ngày sang tháng, tổng hợp lượng phát sinh theo tổng, còn số dư cần quy ước cuối kỳ.",
      "Nếu hai khoản thu là 20 và 30 triệu, tổng thu là 50 triệu. Nếu 20 và 30 là hai số dư cuối ngày thì số dư ở lần chốt cuối là 30 triệu.",
      "Thiếu dữ liệu ngày cuối tháng, có thể gọi quan sát cuối cùng là số dư đúng cuối tháng không?",
      "Ghi ngày thực tế của quan sát, đối chiếu lịch và trạng thái nguồn. Chỉ chốt số cuối tháng khi đã đủ căn cứ."
    ],
    [
      "Kiểm dữ liệu tài chính khi đọc và ghi",
      "Chọn kiểu chuỗi cho định danh, kiểu số phù hợp cho tiền và quy ước rõ cho ngày. Ghi đồng tiền hoặc đơn vị trong tên trường. Sau khi xuất, đọc lại tệp để đối chiếu.",
      "Hai khoản 120000 và 80000 VND có tổng 200000. Kiểm tổng, số dòng và mã duy nhất trước và sau xuất. Nếu tổng thành chuỗi 12000080000 thì dữ liệu tiền đã bị xử lý như văn bản.",
      "Hai file có cùng tổng tiền thì đã đủ chứng minh giống nhau chưa?",
      "Chưa. Một dòng tăng và một dòng giảm cùng lượng có thể bù nhau. Đối chiếu cả mã, số dòng và giá trị của từng mã."
    ]
  ],
  "ml": [
    [
      "Đặt bài toán dự báo trước khi chọn mô hình",
      "Xác định đối tượng dự đoán, thời điểm cần ra quyết định và nhãn sẽ quan sát sau đó. Viết đường cơ sở đơn giản để so chất lượng mô hình và tính khả thi trong vận hành.",
      "Muốn dự báo hồ sơ sẽ trễ khi vừa tiếp nhận, có thể dùng loại nghiệp vụ và khối lượng đang chờ ở thời điểm đó. Dùng lý do trễ ghi sau đóng hồ sơ sẽ vô tình tiết lộ kết quả.",
      "Nếu kết quả đã có khi mới chạy mô hình, bài toán còn là dự báo lúc tiếp nhận không?",
      "Không. Cần tái dựng đúng ảnh chụp dữ liệu ở thời điểm ra quyết định và tách rõ phần phân tích nguyên nhân sau sự kiện."
    ],
    [
      "Huấn luyện với nhãn đã biết",
      "Học có giám sát dùng cặp đặc trưng và nhãn để học quy luật. Chia tập trước khi học các tham số xử lý dữ liệu. Với bài dự đoán kỳ sau, nên giữ một kỳ sau độc lập để đánh giá.",
      "Dùng hồ sơ tháng 1–3 đã đóng để huấn luyện dự báo trễ, đánh giá trên tháng 4. Học quy tắc điền thiếu từ tập huấn luyện rồi áp dụng cho tập đánh giá.",
      "Vì sao không chọn đi chọn lại ngưỡng tốt nhất bằng kết quả trên tháng 4 rồi báo chính điểm này?",
      "Lựa chọn đã thích nghi với tập tháng 4. Dùng tập xác thực để chọn ngưỡng, giữ tập đánh giá cuối cho phép đo độc lập."
    ],
    [
      "Kiểm tra mẫu có đại diện hay không",
      "Kiểm ngày chốt nhãn, mức thiếu, phân bố trạng thái, chi nhánh và loại hồ sơ. Dữ liệu thiếu ở nhóm nào có thể tạo điểm mù cho mô hình, dù tỷ lệ thiếu chung thấp.",
      "Nếu mọi mẫu đến từ ca sáng, kết quả chưa cho biết hiệu quả ở ca đêm. Tách báo cáo theo ca và thu thêm mẫu ca đêm trước khi dùng cho toàn bộ lịch trực.",
      "Nhân bản hồ sơ trễ rồi chia ngẫu nhiên gây rủi ro gì?",
      "Bản sao có thể xuất hiện ở cả tập huấn luyện và kiểm tra. Chia theo hồ sơ gốc trước, chỉ xử lý mất cân bằng trên tập huấn luyện."
    ],
    [
      "Đánh giá cảnh báo trễ bằng precision và recall",
      "Precision đo tỷ lệ cảnh báo là ca trễ thật. Recall đo tỷ lệ ca trễ thật được phát hiện. Chọn ngưỡng theo hậu quả bỏ sót và số cảnh báo đội vận hành có thể kiểm.",
      "Có 10 cảnh báo, 6 trong số đó thật sự trễ. Toàn kỳ có 15 ca trễ. Precision là 6/10 = 60%, recall là 6/15 = 40%. Chín ca trễ chưa được cảnh báo.",
      "Tại sao tỷ lệ đoán đúng chung có thể gây nhầm khi rất ít ca trễ?",
      "Nếu chỉ 1% ca trễ, mô hình luôn đoán đúng hạn vẫn đạt 99% accuracy nhưng bỏ sót toàn bộ ca trễ. Luôn xem kết quả riêng cho lớp cần hành động."
    ]
  ],
  "cfa1": [
    [
      "Ghi kiểu dữ liệu trước khi tính",
      "Ghi ý nghĩa của một dòng, tên trường, đơn vị và các giá trị hợp lệ. Trường phân loại phù hợp để đếm theo nhóm, trường đo lường mới dùng để tính các đại lượng như tổng hoặc trung bình.",
      "Trong hồ sơ HS004, mã là nhãn nhận diện, Cần Thơ là nhãn nhóm, thời gian xử lý 30 phút là giá trị đo, SLA 30 phút là ngưỡng. Có thể so hai trường phút vì chúng cùng đơn vị và cùng hồ sơ.",
      "Mã chi nhánh gồm toàn chữ số. Lấy trung bình các mã có giúp đánh giá khối lượng không?",
      "Mã chỉ nhận diện chi nhánh. Để đánh giá khối lượng, nhóm theo mã rồi đếm hồ sơ."
    ],
    [
      "Trung bình và trung vị trả lời hai câu hỏi khác nhau",
      "Trung bình bằng tổng chia số quan sát. Trung vị nằm giữa dãy đã sắp xếp. Khi có một số rất lớn, trung bình thay đổi mạnh hơn trung vị. Ghi cả số quan sát khi báo cáo.",
      "Ba thời lượng 10, 12, 80 phút có trung bình (10+12+80)/3 = 34 phút và trung vị 12 phút. Hồ sơ 80 phút cần được tìm nguyên nhân vì nó ảnh hưởng thời gian chung.",
      "Với 10, 12, 16, 80 phút, trung vị là bao nhiêu?",
      "Dãy có bốn giá trị nên lấy trung bình của hai giá trị giữa, (12+16)/2 = 14 phút."
    ],
    [
      "Đọc độ phân tán sau khi xem mức trung tâm",
      "Khoảng biến thiên bằng lớn nhất trừ nhỏ nhất và có cùng đơn vị với dữ liệu. Nó dễ bị ảnh hưởng bởi cực trị. So thêm phân vị hoặc phân bố khi có nhiều quan sát.",
      "Nhóm A có 18, 20, 22 phút, nhóm B có 5, 20, 35 phút. Hai nhóm cùng trung bình 20 phút nhưng khoảng biến thiên lần lượt là 4 và 30 phút.",
      "Có thể kết luận quy trình nhóm B luôn kém ổn định chỉ từ ba hồ sơ không?",
      "Chỉ mô tả được ba quan sát này. Cần thêm mẫu, thời kỳ và loại nghiệp vụ tương đương để kết luận về quy trình."
    ],
    [
      "Xác suất có điều kiện và mẫu số",
      "Xác định chính xác điều kiện đang hỏi. Tỷ lệ trễ trong một chi nhánh và tỷ lệ một chi nhánh trong số ca trễ dùng hai mẫu số khác nhau dù có chung tử số.",
      "A có 2 hồ sơ trễ trong 8 hồ sơ đóng. Toàn hệ thống có 3 hồ sơ trễ trong 20 hồ sơ đóng. Trong A, tỷ lệ trễ là 2/8 = 25%. Trong nhóm trễ, A chiếm 2/3.",
      "Chọn ngẫu nhiên một hồ sơ đã đóng từ toàn hệ thống. Xác suất nó bị trễ theo mẫu là bao nhiêu?",
      "3/20 = 15%. Mẫu số là toàn bộ hồ sơ đã đóng vì chưa có điều kiện về chi nhánh."
    ],
    [
      "Lấy mẫu theo nhóm và hiểu trọng số",
      "Xác định tổng thể mục tiêu, đơn vị chọn và cách chọn trong từng nhóm. Khi tỷ lệ chọn khác nhau giữa các nhóm, cần cân theo quy mô thực để ước lượng chỉ tiêu chung.",
      "A có 90 hồ sơ, B có 10. Chọn ngẫu nhiên mỗi nơi 5 hồ sơ. Nếu tỷ lệ lỗi mẫu tại A bằng 0%, tại B bằng 20%, ước lượng phân tầng cho toàn bộ là 0,9 × 0% + 0,1 × 20% = 2%.",
      "Vì sao lấy trung bình hai tỷ lệ bằng 10% lại khác?",
      "Trung bình đơn giản coi mỗi chi nhánh chiếm nửa tổng thể. Trong thực tế B chỉ chiếm 10%. Cỡ mẫu nhỏ vẫn cần được nêu khi diễn giải."
    ]
  ],
  "cfa2": [
    [
      "Phân loại tài sản và nghĩa vụ theo góc nhìn",
      "Đọc số liệu theo đơn vị lập báo cáo và ngày chốt. Tài sản là nguồn lực, nghĩa vụ là khoản phải thực hiện. Theo phương trình kế toán, tài sản bằng nợ phải trả cộng vốn chủ sở hữu.",
      "Ngân hàng nhận tiền gửi 100 triệu đồng và giữ tiền nhận được. Trong ví dụ giản lược, tài sản tiền tăng 100 triệu và nghĩa vụ với người gửi tăng 100 triệu. Đây không phải doanh thu 100 triệu.",
      "Người gửi nhìn khoản tiền gửi như thế nào?",
      "Người gửi có quyền đòi tiền từ ngân hàng. Cùng một quan hệ có cách phân loại khác nhau ở hai phía."
    ],
    [
      "Đối chiếu dòng tiền trong kỳ",
      "Ghi số đầu kỳ, từng khoản tiền vào hoặc ra, và số cuối kỳ theo cùng đồng tiền. Thu trừ chi bằng dòng tiền thuần. Mốc ghi nhận doanh thu, chi phí có thể khác thời điểm thực thu hoặc chi.",
      "Đầu kỳ 80 triệu, thực thu 30 và thực chi 20. Số cuối kỳ dự kiến là 80 + 30 − 20 = 90 triệu. Nếu kết quả khác, kiểm ngày chốt và quy ước dấu trước khi so từng giao dịch.",
      "Khoản phí đã ghi doanh thu nhưng khách hàng chưa trả có làm dòng tiền vào tăng ngay không?",
      "Chưa. Dòng tiền phản ánh tiền đã thu. Cần phân biệt khoản phải thu với khoản thực thu."
    ],
    [
      "Định nghĩa tử số và mẫu số của tỷ số",
      "Ghi công thức, đơn vị và thời kỳ của từng đại lượng. Khi so sánh chi nhánh, giữ cùng phạm vi. Nếu gộp hai đơn vị, cộng tử và mẫu trước khi chia.",
      "Chi phí 12 triệu cho 300 hồ sơ là 40.000 đồng/hồ sơ. Chi nhánh khác chi 6 triệu cho 100 hồ sơ là 60.000 đồng/hồ sơ. Toàn bộ có chi phí 18 triệu cho 400 hồ sơ.",
      "Chi phí bình quân chung có phải 50.000 đồng/hồ sơ không?",
      "18.000.000/400 = 45.000 đồng/hồ sơ. Hai đơn vị có số hồ sơ khác nhau nên hai tỷ lệ riêng có trọng số khác nhau."
    ]
  ],
  "cfa3": [
    [
      "Phân công trách nhiệm kiểm soát",
      "Quản trị cần xác định người tạo dữ liệu, người rà soát, người phê duyệt và cách lưu bằng chứng. Một kết quả kiểm chứng được phải truy được nguồn, phép tính và bản đã công bố.",
      "Nhân viên đối soát mở hồ sơ lệch với mã giao dịch và hai bản nguồn. Người soát độc lập xem chứng từ, ghi ngày và kết luận. Chỉ đổi trạng thái sang đã xử lý khi có bằng chứng theo quy trình.",
      "Vì sao không chỉ giữ tệp cuối cùng sau khi sửa?",
      "Cần giữ bản nguồn, phiên bản trước sửa và lịch sử thay đổi để tái hiện khoản lệch và kiểm người đã phê duyệt."
    ],
    [
      "Lập bản đồ người dùng báo cáo",
      "Liệt kê bên liên quan, quyết định họ cần đưa ra và mức dữ liệu cần thiết. Cùng một báo cáo có thể có lớp tổng hợp cho quản lý và lớp chi tiết cho người được phân công.",
      "Trưởng ca cần mã hồ sơ tồn để giao việc, quản lý khu vực cần tỷ lệ theo đơn vị, người soát cần bằng chứng xử lý. Thiết kế từng chế độ xem theo mục đích và quyền truy cập.",
      "Một người chỉ cần so xu hướng giữa các tháng. Có cần gửi toàn bộ chi tiết khách hàng không?",
      "Báo cáo tổng hợp theo tháng với định nghĩa và phạm vi đã đủ cho nhu cầu này. Chỉ cấp trường chi tiết khi mục đích và quyền truy cập phù hợp."
    ],
    [
      "Đọc nợ và vốn chủ sở hữu",
      "Ghi rõ công thức trước khi so sánh đòn bẩy. Nợ trên vốn chủ và nợ trên tổng nguồn vốn dùng mẫu số khác nhau. Đối chiếu các khoản theo cùng ngày chốt và đơn vị.",
      "Doanh nghiệp giả lập có nợ 60 tỷ và vốn chủ 40 tỷ. Nợ/vốn chủ = 60/40 = 1,5 lần. Nợ/(nợ + vốn chủ) = 60/100 = 60%.",
      "Vì sao không thể lấy 1,5 lần rồi ghi thành 60% mà không nói rõ công thức?",
      "1,5 lần tương đương 150% trên vốn chủ. Con số 60% ở đây dùng tổng nợ và vốn chủ làm mẫu số, nên phải ghi đúng tên tỷ lệ."
    ]
  ],
  "cfa4": [
    [
      "Đọc các trường của một trái phiếu",
      "Xác định tổ chức phát hành, mệnh giá, lãi suất coupon, tần suất trả và ngày đáo hạn. Mệnh giá, giá giao dịch và số tiền lãi là ba trường có ý nghĩa riêng.",
      "Trái phiếu giả lập có mệnh giá 100 triệu, coupon cố định 6% mỗi năm, trả một lần cho năm đủ kỳ. Coupon năm bằng 6 triệu. Giá giao dịch có thể là 98 triệu hoặc 102 triệu.",
      "Nếu hôm nay giá giao dịch giảm còn 98 triệu, coupon cố định ở ví dụ này có tự đổi không?",
      "Coupon vẫn tính theo mệnh giá và điều khoản nên vẫn là 6 triệu cho năm đủ kỳ. Giá mua thay đổi sẽ ảnh hưởng lợi suất của nhà đầu tư."
    ],
    [
      "Lập lịch kỳ trả tiền",
      "Từ điều khoản của từng mã, xác định kỳ trả, lãi suất, cơ sở tính ngày và mốc đáo hạn. Khi lập bảng, để ngày thanh toán và số tiền ở hai trường riêng để dễ tổng hợp theo kỳ.",
      "Giả sử 100 triệu mệnh giá, coupon 6% năm trả thành hai kỳ bằng nhau, đủ kỳ. Mỗi kỳ nhận 100 × 6% / 2 = 3 triệu. Gốc hoàn trả ở mốc quy định riêng.",
      "Có thể dùng luôn công thức chia hai cho trái phiếu trả lãi không đều không?",
      "Cần đọc lịch kỳ thực tế và quy ước tính ngày của mã. Công thức chia hai trong ví dụ phụ thuộc giả định hai kỳ bằng nhau."
    ],
    [
      "Nhận diện điều khoản có thể đổi dòng tiền",
      "Đọc điều kiện mua lại, quyền của bên phát hành hay nhà đầu tư, mốc kích hoạt và cách xác định giá thanh toán. Lập kịch bản thay vì giả định mọi dòng tiền luôn kéo dài đến đáo hạn.",
      "Một mã giả lập đáo hạn năm thứ năm, nhưng tổ chức phát hành có quyền mua lại từ cuối năm thứ ba theo điều kiện ghi trong hồ sơ. Lập hai lịch dòng tiền theo trường hợp có và không thực hiện quyền.",
      "Có thể ghi ba năm là kỳ hạn danh nghĩa của mã này không?",
      "Kỳ hạn danh nghĩa trong ví dụ vẫn là năm năm. Mốc được mua lại sớm là một trường riêng, việc thực hiện phụ thuộc điều khoản và sự kiện thực tế."
    ]
  ],
  "cfa5": [
    [
      "Tính lợi suất của một kỳ nắm giữ",
      "Lợi suất đơn giản của một kỳ lấy thay đổi giá cộng tiền nhận trong kỳ, chia giá đầu kỳ. Ghi rõ giả định về phí và thuế. Để so rủi ro cần nhiều quan sát hoặc kịch bản, không chỉ một mức lợi suất.",
      "Mua một đơn vị ở 100, cuối kỳ giá 103 và đã nhận 2 tiền mặt. Bỏ qua phí và thuế, lợi suất là (103 − 100 + 2)/100 = 5%.",
      "Nếu cuối kỳ giá là 98 và tiền nhận vẫn bằng 2, lợi suất bao nhiêu?",
      "(98 − 100 + 2)/100 = 0%. Khoản tiền nhận bù đúng mức giảm giá trong giả định của bài."
    ],
    [
      "Theo dõi rủi ro vận hành",
      "Một sự cố có tần suất, mức ảnh hưởng và thời gian phục hồi. Ghi đối tượng bị tác động, dấu hiệu phát hiện, người xử lý và bằng chứng khôi phục. Chỉ số đếm sự cố riêng lẻ dễ che mất mức độ nghiêm trọng.",
      "Kênh A có 2 sự cố tách biệt, mỗi sự cố gián đoạn 30 phút. Kênh B chỉ có 1 sự cố nhưng kéo dài 180 phút. Tổng thời gian gián đoạn lần lượt là 60 và 180 phút.",
      "Trước khi ưu tiên xử lý cho B, nên xem thêm dữ liệu gì?",
      "Xem số giao dịch và khách hàng bị ảnh hưởng, mức độ thiết yếu và phương án thay thế trong từng khoảng thời gian. Số phút là một bằng chứng, chưa phải toàn bộ tác động."
    ],
    [
      "Trình bày bằng chứng và giới hạn của kết luận",
      "Phân biệt kết quả quan sát, giả thuyết và nguyên nhân đã kiểm chứng. Ghi nguồn, thời điểm chốt, định nghĩa và mọi thay đổi phạm vi. Chỉ dùng dữ liệu được phép chia sẻ với người nhận.",
      "Tỷ lệ trễ giảm từ 20% xuống 10% sau thay đổi quy trình, nhưng tuần sau thiếu tệp của một chi nhánh. Hãy báo phần thiếu và tính lại trên tập đơn vị có dữ liệu ở cả hai tuần.",
      "Nếu được đề nghị bỏ hồ sơ trễ để làm đẹp chỉ số, nên xử lý thế nào?",
      "Giữ định nghĩa đã thống nhất và lưu bằng chứng. Nếu có lý do nghiệp vụ để đổi phạm vi, công bố rõ điều kiện, tác động và kết quả theo cả hai cách trước khi chốt."
    ]
  ]
};

  window.bookTopic = (id, page) => {
    if (!Object.hasOwn(readings, id)) return null;
    const toc = window.PROGRAM.books[id][7];
    const selected = Number(page);
    let index = 0;
    for (let i = 1; i < toc.length; i++) {
      if (toc[i][0] <= selected) index = i;
    }
    const [title, concept, example, question, answer] = readings[id][index];
    return {title, concept, example, question, answer};
  };
})();
