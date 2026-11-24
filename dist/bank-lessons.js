(() => {
  const shelf = {
    bian: {
      title: "Service Landscape",
      publisher: "Banking Industry Architecture Network (BIAN)",
      topic: "Kiến trúc ngân hàng",
      url: "https://bian.org/deliverables/service-landscape/",
      how: "Mở bản đồ miền nghiệp vụ, tìm Current Account và các miền thanh toán. Với một lệnh chuyển tiền, ghi lại miền nào quản lý tài khoản, miền nào điều phối thanh toán và nơi bạn cần một quy ước trao đổi."
    },
    napas: {
      title: "Dịch vụ Chuyển nhanh NAPAS 247",
      publisher: "NAPAS",
      topic: "Thanh toán tại Việt Nam",
      url: "https://napas.com.vn/dich-vu-chuyen-tien-nhanh-napas-247-ngan-hang",
      how: "Đọc mục giới thiệu, phương tiện và kênh giao dịch. Thử phân loại một giao dịch phát sinh từ ứng dụng di động, dùng VietQR, ghi có vào tài khoản thụ hưởng."
    },
    rates: {
      title: "Thông tư 14/2017/TT-NHNN về phương pháp tính lãi",
      publisher: "Ngân hàng Nhà nước Việt Nam",
      topic: "Tiền gửi và tín dụng",
      url: "https://vanban.chinhphu.vn/?docid=191944&pageid=27160",
      how: "Mở bản ký, tra quy định về số dư thực tế, thời gian duy trì số dư và lãi suất tính lãi. Viết lại công thức thành các cột đầu vào để kiểm thử khoản tiền gửi hoặc khoản vay."
    },
    early: {
      title: "Văn bản hợp nhất 34/VBHN-NHNN về lãi suất rút trước hạn tiền gửi",
      publisher: "Ngân hàng Nhà nước Việt Nam",
      topic: "Tiền gửi tại Việt Nam",
      url: "https://vanban.chinhphu.vn/?classid=2629&docid=211516&pageid=27160",
      how: "Đọc Điều 5 trong bản hợp nhất ngày 07/10/2024. Tách hai dòng trong bảng quyết định cho số tiền rút và số tiền còn lại. Đối chiếu văn bản áp dụng tại ngày giao dịch khi đặc tả sản phẩm thực tế."
    },
    glossary: {
      title: "CPMI glossary",
      publisher: "Ủy ban Thanh toán và Hạ tầng thị trường (CPMI), BIS",
      topic: "Thanh toán và quyết toán",
      url: "https://www.bis.org/committees/cpmi/glossary",
      how: "Tra clearing, settlement, final settlement và value date. Viết một dòng mô tả bằng chứng bạn cần để phân biệt khi nào lệnh được chấp nhận và khi nào nghĩa vụ thanh toán hoàn tất."
    },
    statement: {
      title: "ISO 20022 Message Definitions · camt.053",
      publisher: "ISO 20022",
      topic: "Sao kê và đối chiếu",
      url: "https://www.iso20022.org/iso-20022-message-definitions?search=camt.053",
      how: "Tra họ điện BankToCustomerStatement và chọn đúng phiên bản khi đọc bộ định nghĩa. Từ một dòng sao kê, xác định trường số tiền, chiều Nợ/Có, đồng tiền và tham chiếu giao dịch."
    },
    oracle: {
      title: "Oracle FLEXCUBE Universal Banking · Savings",
      publisher: "Oracle",
      topic: "Kế toán và cuối ngày",
      url: "https://docs.oracle.com/cd/E51536_01/PDF/Branch/Savings.pdf",
      how: "Tìm “Transaction reconciliation with host”. Dùng các cách so đếm giao dịch, so số tiền và tìm giao dịch thiếu ở từng phía làm ví dụ thiết kế kiểm soát cuối ngày."
    },
    fx: {
      title: "Supervisory guidance for managing risks associated with the settlement of foreign exchange transactions",
      publisher: "Ủy ban Basel về giám sát ngân hàng (BCBS), BIS",
      topic: "Ngoại hối và rủi ro quyết toán",
      url: "https://www.bis.org/publ/bcbs241.htm",
      how: "Tìm principal risk và payment-versus-payment (PvP). Vẽ hai chân tiền của một giao dịch ngoại hối và đánh dấu khoảng thời gian ngân hàng có thể đã trả nhưng chưa nhận đủ tiền."
    },
    data: {
      title: "BCBS 239 · Principles for effective risk data aggregation and risk reporting",
      publisher: "Ủy ban Basel về giám sát ngân hàng (BCBS), BIS",
      topic: "Quản trị dữ liệu",
      url: "https://www.bis.org/publ/bcbs239.htm",
      how: "Đọc các nguyên tắc về tính chính xác, toàn vẹn, đầy đủ và kịp thời của dữ liệu rủi ro. Khi áp dụng vào bài tập, viết rõ chỉ số, ngưỡng, chủ sở hữu và bằng chứng đối soát."
    },
    resilience: {
      title: "Principles for operational resilience",
      publisher: "Ủy ban Basel về giám sát ngân hàng (BCBS), BIS",
      topic: "Vận hành liên tục",
      url: "https://www.bis.org/bcbs/publ/d516.htm",
      how: "Tra phần lập kế hoạch duy trì hoạt động, diễn tập và lập bản đồ phụ thuộc. Dùng một giao dịch chuyển tiền để xác định các dịch vụ phải hoạt động trước khi mở lại kênh."
    },
    uat: {
      title: "Certified Tester Acceptance Testing · tài liệu học CT-AcT",
      publisher: "International Software Testing Qualifications Board (ISTQB)",
      topic: "Kiểm thử nghiệm thu",
      url: "https://istqb.org/certifications/certified-tester-acceptance-testing/",
      how: "Trong mục Download Materials, đọc syllabus và bài mẫu. Thử chuyển quy tắc số dư tối thiểu thành điều kiện nghiệm thu có đầu vào, hành động và kết quả quan sát được."
    },
    wdi: {
      title: "Domestic credit to private sector by banks (% of GDP) · Việt Nam",
      publisher: "World Bank Open Data",
      topic: "Dữ liệu ngân hàng công khai",
      url: "https://data.worldbank.org/indicator/FD.AST.PRVT.GD.ZS?locations=VN",
      how: "Tải dữ liệu từ mục Download. Lọc mã quốc gia VNM và chỉ tiêu FD.AST.PRVT.GD.ZS, giữ đơn vị % GDP và năm quan sát. Ghi nguồn và giấy phép CC BY 4.0 khi sử dụng lại."
    },
    api: {
      title: "API Basic Call Structures",
      publisher: "World Bank Data Help Desk",
      topic: "Khai thác dữ liệu công khai",
      url: "https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures",
      how: "Xem cách đặt quốc gia, chỉ tiêu, dải năm và định dạng JSON. Khi tải theo trang, lưu số trang, thời điểm trích xuất và mã chỉ tiêu để tái lập báo cáo."
    }
  };
  const refs = (...names) => names.map(name => shelf[name].url);
  window.BANK_CORE_LESSONS = [
    {
      title: "Theo dấu một lệnh chuyển tiền qua Thin Core",
      group: "Kiến trúc và thanh toán",
      question: "Khách nhấn chuyển một lần nhưng ứng dụng hết thời gian chờ. Làm sao biết tiền đã được ghi sổ?",
      concept: "Trong mô hình minh họa theo CoreBankX, kênh tiếp nhận ý định của khách, lớp tích hợp chuyển yêu cầu, payment hub theo dõi lệnh và core giữ kết quả ghi sổ. Mỗi hệ thống có mã riêng. response_time phản ánh thời điểm có phản hồi, còn journal_id cho biết đã có một cụm bút toán. Một khoản chuyển ra ngoài ngân hàng còn cần bằng chứng từ phía xử lý thanh toán.",
      flow: [
        "Lưu mã lệnh nghiệp vụ, tài khoản trả tiền, số tiền, đồng tiền và thời điểm tiếp nhận. Giữ cùng một mã nghiệp vụ khi gửi lại cùng ý định chuyển tiền.",
        "Tra bảng liên kết từ mã lệnh đến từng lần gọi và mã bút toán. Kiểm tra bút toán thực sự đã ghi sổ, cùng tham chiếu và cùng số tiền.",
        "Đối chiếu trạng thái ở hub với bản tin hoặc sao kê theo thỏa thuận kết nối. Nếu chưa rõ kết quả bên nhận, đưa vào danh sách chờ xác minh."
      ],
      example: "Lệnh P-270 chuyển 2.000.000 VND. Lần gọi thứ nhất hết thời gian chờ. Lần thứ hai trả về cùng journal_id J-81. Sổ người trả chỉ có một khoản ghi Nợ 2.000.000 VND. Số lệnh là 1, số lần gọi là 2, số lần trích tiền là 1. Trạng thái người thụ hưởng vẫn cần tra ở nguồn thanh toán.",
      check: "Nộp bảng ba dòng cho lệnh, lần gọi và bút toán, chỉ rõ khóa đối chiếu. Nếu có J-81 và J-82 cùng trích tài khoản cho P-270, liệt kê cả hai vào ngoại lệ có khả năng ghi trùng.",
      pitfall: "Đếm số dòng nhật ký gọi API để tính số lệnh thành công làm tăng giả tạo doanh số khi ứng dụng gửi lại.",
      sources: refs("bian","napas","glossary")
    },
    {
      title: "Tính lãi khi rút một phần tiền gửi trước hạn",
      group: "Tiền gửi",
      question: "Một sổ đã dự chi lãi có kỳ hạn 20 ngày. Khách chỉ rút một phần thì cần điều chỉnh bao nhiêu lãi?",
      concept: "Thiết kế hai phép tính riêng cho phần rút và phần giữ lại. Điều 5 của bản hợp nhất 34/VBHN-NHNN nêu mức tối đa của lãi suất phần rút theo lãi suất không kỳ hạn thấp nhất tương ứng tại thời điểm rút. Phần còn lại tiếp tục hưởng mức đang áp dụng cho khoản tiền gửi. Lãi suất, số ngày và điều kiện rút trong ví dụ dưới đây là giả định học tập.",
      flow: [
        "Chụp số dư, lãi đã dự chi, số ngày tính lãi, phiên bản bảng lãi suất và điều kiện cho phép rút một phần.",
        "Tính lãi phải trả trên phần rút. So với lãi đã dự chi trên chính phần gốc đó để xác định chênh lệch chi phí.",
        "Kiểm tra tiền khách nhận, gốc còn lại, lãi đã dự chi trên phần còn lại và kết quả của kỳ cuối ngày tiếp theo."
      ],
      example: "Sổ 100.000.000 VND, lãi suất 5%/năm. Khách rút 36.500.000 VND sau đúng 20 ngày tính lãi. Giả sử phần rút hưởng 0,1%/năm, tính đơn theo số ngày thực tế/365 và chưa trả lãi. Lãi phần rút = 36.500.000 × 0,001 × 20 / 365 = 2.000 VND. Khách nhận 36.502.000 VND. Gốc còn lại 63.500.000 VND tiếp tục ở mức 5%. Phần rút đã dự chi 100.000 VND, nên cần giảm chi phí lãi ròng 98.000 VND.",
      check: "Chứng minh rằng gốc trước giao dịch bằng gốc rút cộng gốc còn lại. Truy vết riêng khoản 2.000 VND trả khách và khoản giảm chi phí ròng 98.000 VND.",
      pitfall: "Áp 0,1% lên toàn bộ sổ sẽ làm giảm cả số lãi khách tiếp tục được hưởng trên 63.500.000 VND.",
      sources: refs("early","rates")
    },
    {
      title: "Dự thu lãi vay khi gốc giảm giữa kỳ",
      group: "Tín dụng",
      question: "Khoản vay trả bớt gốc giữa tháng. Tại sao lấy dư nợ cuối tháng nhân 30 ngày lại sai?",
      concept: "Dư nợ tại một ngày là số dư tại một thời điểm. Tiền lãi của cả kỳ phụ thuộc từng khoảng thời gian giữ nguyên số dư và lãi suất. Với hợp đồng mô phỏng này, dùng lãi đơn, số ngày thực tế/365, lãi suất cố định, không có khoản phí hoặc lãi quá hạn.",
      flow: [
        "Lấy lịch biến động gốc theo ngày giá trị và xác định số dư áp dụng cho từng khoảng. Chốt trước cách tính ngày đầu, ngày cuối của mỗi đoạn.",
        "Tính số tiền lãi từng đoạn bằng dư nợ × lãi suất năm × số ngày / 365. Giữ độ chính xác theo quy ước sản phẩm và cộng các đoạn.",
        "So tổng dự thu với sổ chi tiết khoản vay. Tách riêng gốc đã thu và lãi khách đã trả nếu cần tính lãi còn phải thu."
      ],
      example: "Dư nợ 73.000.000 VND trong 10 ngày, sau đó còn 36.500.000 VND trong 20 ngày. Lãi suất 10%/năm. Hai đoạn lần lượt sinh 200.000 và 200.000 VND, tổng 400.000 VND. Nếu lấy dư nợ cuối tháng cho cả 30 ngày, kết quả chỉ là 300.000 VND, thiếu 100.000 VND.",
      check: "Lập bảng gồm dư nợ, ngày tính lãi, lãi suất và số lãi. Tổng ngày phải bằng 30 và số ngày trước sau lần trả gốc phải phủ kín kỳ.",
      pitfall: "Cộng số dư của các ngày rồi gọi kết quả là dư nợ cuối kỳ, hoặc dùng ngày nhập chứng từ thay cho ngày hiệu lực làm thay đổi kết quả.",
      sources: refs("rates")
    },
    {
      title: "Khóa sổ quầy và tìm bút toán bị gắn sai chi nhánh",
      group: "Kế toán và đối soát",
      question: "Tổng Nợ bằng tổng Có, nhưng kho quỹ một chi nhánh vẫn lệch. Kiểm tra ở đâu?",
      concept: "Một bút toán có thể cân Nợ/Có dù ghi sai chi nhánh hoặc sai tài khoản. Đối soát quầy gồm hai phép thử độc lập: cân bút toán và khớp biến động sổ tiền mặt với kiểm quỹ theo quầy, chi nhánh, đồng tiền và ngày nghiệp vụ.",
      flow: [
        "Từ số dư đầu quầy, cộng tiền nộp và trừ tiền rút đã hoàn tất. Chốt cùng ngày nghiệp vụ cho sổ quầy và GL.",
        "Ghép tham chiếu giao dịch với hai vế hạch toán. Với tiền khách nộp, tiền mặt của ngân hàng tăng bên Nợ, nghĩa vụ tiền gửi với khách tăng bên Có.",
        "So tiền mặt kỳ vọng, kiểm đếm thực tế và GL theo chi nhánh. Truy ngược từng tham chiếu khi có chênh lệch."
      ],
      example: "Quầy A đầu ngày có 40 triệu VND, nhận nộp 12 triệu và chi rút 5 triệu. Thực đếm và sổ quầy cùng ra 47 triệu. GL của A chỉ ra 35 triệu, còn GL của B tăng thêm 12 triệu. Bút toán nộp tiền vẫn đủ hai vế nhưng chân tiền mặt đã nhận mã chi nhánh B. Toàn ngân hàng cộng lại vẫn cân.",
      check: "So theo cả branch_id và currency. Xuất tham chiếu khoản 12 triệu, chi nhánh trên chứng từ gốc và chi nhánh trên dòng GL để kế toán duyệt phương án điều chỉnh.",
      pitfall: "Dùng một số kiểm soát tổng toàn ngân hàng sẽ che khuất sai lệch đối ứng giữa hai đơn vị.",
      sources: refs("oracle")
    },
    {
      title: "Đối chiếu hai chân của một giao dịch ngoại hối",
      group: "Nguồn vốn và ngoại hối",
      question: "Bàn kinh doanh xác nhận đã mua USD. Vì sao bộ phận thanh toán vẫn phải theo dõi riêng hai chân tiền?",
      concept: "Xác nhận giao dịch ghi nhận thỏa thuận về số tiền, tỷ giá và ngày giá trị. Quyết toán là lúc nghĩa vụ chuyển từng đồng tiền được thực hiện. Khi hai chân đi riêng, ngân hàng có thể đã giao toàn bộ đồng tiền bán trong khi đồng tiền mua vẫn chưa đến đủ. Cơ chế PvP ràng buộc việc chuyển giao cuối cùng của một đồng tiền với đồng tiền kia.",
      flow: [
        "Lưu deal_id, ngày giao dịch, ngày giá trị, đồng tiền ngân hàng mua và bán, số tiền hai chân, đối tác và quy ước yết giá.",
        "Tại ngày giá trị, đối chiếu riêng dấu tiền và số tiền kỳ vọng của từng chân với bằng chứng tài khoản thanh toán hoặc sao kê.",
        "Tách khoản phí có chứng từ, sai ngày giá trị và khoản thiếu thực sự. Giữ nguyên mỗi ngoại tệ khi đo chênh lệch."
      ],
      example: "Ngân hàng mua 120.000 USD, bán VND ở tỷ giá giả định 25.100 VND/USD, nên phải trả 3.012.000.000 VND. Sao kê cho thấy đã trả đủ VND nhưng chỉ nhận 119.600 USD. Khi hai bên thỏa thuận không trừ phí, chân USD thiếu 400 USD. Quy đổi theo tỷ giá giao dịch là 10.040.000 VND để tham khảo, còn yêu cầu tra soát ghi 400 USD.",
      check: "Tạo hai dòng cho cùng deal_id với đồng tiền, số tiền kỳ vọng, số tiền đã quyết toán và ngày giá trị. Chỉ đánh dấu hoàn tất khi từng chân đủ điều kiện theo quy ước đã chốt.",
      pitfall: "Cộng USD và VND trước khi đối soát làm mất cả đơn vị đo lẫn dấu hiệu thiếu tiền ở một chân.",
      sources: refs("fx","glossary","statement")
    },
    {
      title: "Chốt ngày báo cáo khi bản ghi đến sau nửa đêm",
      group: "Kế toán và đối soát",
      question: "Giao dịch ghi sổ ngày 8 nhưng kho dữ liệu nhận lúc 00:05 ngày 9. Nên ghi nhận vào báo cáo ngày nào?",
      concept: "Câu trả lời tùy chỉ tiêu. Báo cáo doanh số ghi sổ sử dụng ngày nghiệp vụ của bút toán. Báo cáo độ trễ vận hành dùng thời điểm sự kiện và thời điểm nạp. Ngày giá trị phục vụ quy tắc hiệu lực tài chính của sản phẩm. Cần giữ cả ba trường và múi giờ để tái lập kết quả.",
      flow: [
        "Xác định hạt dữ liệu và định nghĩa ngày của chỉ tiêu. Với doanh số, chọn một dòng mỗi giao dịch đã ghi sổ theo ngày nghiệp vụ.",
        "Đặt mốc nhận dữ liệu cho lần công bố. Lưu phiên bản số liệu cùng thời điểm chụp và số giao dịch đến trễ.",
        "Khi có dòng đến sau mốc, tính lại đúng phân vùng nghiệp vụ, chống nạp trùng bằng mã giao dịch và công bố phiên bản điều chỉnh."
      ],
      example: "Ảnh chụp 23:59 ngày 8 có 99 lệnh, tổng 198 triệu VND. Một lệnh 2 triệu có ngày nghiệp vụ là ngày 8, kho nhận lúc 00:05 ngày 9. Ảnh chụp 00:10 sau nạp đủ có 100 lệnh, tổng 200 triệu VND cho ngày 8. Chỉ tiêu số bản ghi mới nạp ngày 9 vẫn tăng 1. Các mốc đều theo giờ Việt Nam.",
      check: "Ghi cả ngày nghiệp vụ và thời điểm chụp vào tiêu đề báo cáo. Truy vấn lại hai phiên bản phải giải thích được toàn bộ chênh lệch 2 triệu từ đúng một mã lệnh.",
      pitfall: "Cắt ngày từ thời gian nạp để phân bổ doanh số làm ngày 8 thiếu tiền và ngày 9 thừa tiền.",
      sources: refs("data","oracle","glossary")
    },
    {
      title: "Nghiệm thu chuyển đổi CIF và tài khoản tại cùng mốc chốt",
      group: "Chuyển đổi dữ liệu",
      question: "Nguồn và đích có cùng số tài khoản, cùng tổng số dư. Còn điều gì có thể sai?",
      concept: "Khi chuyển dữ liệu giữa hai core, cần giữ danh tính nghiệp vụ, quan hệ khách hàng – tài khoản, trạng thái và số dư chi tiết. Khóa kỹ thuật có thể đổi. Bảng đối chiếu ID phải giải thích được mỗi liên kết mới và mọi trường hợp gộp hồ sơ được phê duyệt.",
      flow: [
        "Chốt cùng thời điểm, phạm vi sản phẩm và đồng tiền. Lưu mã lần chạy, ánh xạ CIF cũ – mới, tài khoản cũ – mới và quy tắc chuyển mã.",
        "So số dòng, số khóa phân biệt, số dư từng tài khoản và số dư tổng. Kiểm tài khoản mồ côi, CIF bị gắn nhầm và khóa nguồn bị ánh xạ nhiều lần.",
        "Với mỗi sai lệch, ghi khóa nguồn, giá trị kỳ vọng và thực tế, phiên bản ánh xạ, người xử lý và kết quả chạy lại."
      ],
      example: "Nguồn G1 thuộc CIF-A có 30 triệu và G2 thuộc CIF-B có 70 triệu VND. Đích vẫn có hai tài khoản tổng 100 triệu nhưng gắn G1 vào khách B và G2 vào khách A. Tỷ lệ khớp tổng tiền là 100%, còn tỷ lệ khớp liên kết chủ tài khoản là 0/2. Cả hai kiểm soát cần có trong biên bản.",
      check: "Đối chiếu bộ ba gồm tài khoản nguồn, chủ sở hữu kỳ vọng sau ánh xạ và chủ sở hữu trên đích. Với tài khoản đồng sở hữu, dùng bảng vai trò của từng bên và thời hạn hiệu lực.",
      pitfall: "Tên giống nhau có thể thuộc hai người khác nhau. Gộp CIF cần căn cứ định danh và phê duyệt nghiệp vụ.",
      sources: refs("data","bian")
    },
    {
      title: "Viết UAT cho giao dịch bị giới hạn bởi số tiền phong tỏa",
      group: "Kiểm thử và vận hành",
      question: "Sổ cái hiển thị 8 triệu VND. Khách có chuyển được trọn 8 triệu hay không?",
      concept: "Số dư ghi sổ phản ánh kết quả hạch toán. Số dư khả dụng còn phụ thuộc phong tỏa và quy tắc sản phẩm. BA cần chuyển điều kiện kinh doanh thành đầu vào, bước thao tác, kết quả tài chính và trạng thái mà giao dịch viên có thể xác nhận.",
      flow: [
        "Giả định tài khoản không có thấu chi, phí hay hạn mức khác. Đặt số dư ghi sổ 8.000.000 VND và khoản phong tỏa còn hiệu lực 1.500.000 VND.",
        "Kiểm thử độc lập từng lần chuyển ở dưới, đúng và trên số dư khả dụng. Khôi phục trạng thái đầu trước mỗi lần.",
        "Với giao dịch thành công, xem số dư, bút toán và màn hình. Với giao dịch bị từ chối, kiểm tra lý do và xác nhận không có bút toán trích tiền."
      ],
      example: "Số dư khả dụng trước chuyển là 6.500.000 VND. Chuyển 6.499.999 VND thì còn 1 VND khả dụng. Chuyển đúng 6.500.000 VND thì còn 0 VND khả dụng, số dư ghi sổ còn 1.500.000 VND. Chuyển 6.500.001 VND thì bị từ chối và hai số dư giữ nguyên.",
      check: "Nộp ba kết quả độc lập kèm ảnh hoặc trích xuất trước – sau. Chạy thêm ca giải tỏa toàn bộ khoản 1.500.000 VND trước giao dịch để kiểm thời điểm hiệu lực.",
      pitfall: "Chạy liên tiếp cả ba ca trên cùng một tài khoản đã bị trích tiền sẽ khiến kết quả ca sau phụ thuộc ca trước.",
      sources: refs("uat")
    },
    {
      title: "Tổ chức diễn tập cutover và ra quyết định mở kênh",
      group: "Kiểm thử và vận hành",
      question: "Đã nạp xong dữ liệu trước giờ mở cửa. Bằng chứng nào còn thiếu để quyết định cho khách giao dịch?",
      concept: "Cutover là giai đoạn chuyển hoạt động từ hệ thống cũ sang hệ thống mới. Kế hoạch cần nêu thứ tự phụ thuộc, người chịu trách nhiệm, cửa sổ thời gian, thời điểm còn có thể quay lại và cách xử lý giao dịch phát sinh quanh mốc chuyển. Các ngưỡng trong bài là giả định cho buổi diễn tập.",
      flow: [
        "Đóng nhận giao dịch theo kịch bản, xác nhận hàng đợi còn bao nhiêu lệnh và chốt ảnh dữ liệu nguồn. Lưu người và thời điểm phê duyệt.",
        "Nạp dữ liệu, đo thời lượng và đối soát. Chạy thử các giao dịch trọng yếu trên môi trường diễn tập, kiểm cả phản hồi kênh và bút toán.",
        "Đối chiếu điều kiện mở kênh với bằng chứng. Nếu thiếu một điều kiện, chủ trì ra quyết định theo phương án đã duyệt trước mốc quay lại."
      ],
      example: "Cửa sổ 180 phút. Chuỗi tác vụ tuần tự mất 35 phút chốt nguồn, 65 phút nạp, 35 phút đối soát và 20 phút kiểm tra kênh, tổng 155 phút, còn 25 phút. Kịch bản yêu cầu khớp 100% tài khoản và không có bút toán lệch. Nếu còn 1 tài khoản lệch 10.000 VND, nhóm chưa đạt điều kiện mở dù vẫn đúng tiến độ.",
      check: "Ghi biên bản gồm thời gian thực tế, sai lệch so kế hoạch, danh sách ngoại lệ, kết quả giao dịch thử và người quyết định. Xác minh thời gian dự phòng còn đủ cho phương án đã duyệt.",
      pitfall: "Nếu đã nhận giao dịch thật trên core mới, việc quay lại cần xử lý cả những giao dịch phát sinh sau chuyển đổi. Khôi phục một ảnh chụp cũ có thể làm mất chúng.",
      sources: refs("resilience","uat","data")
    },
    {
      title: "Đọc đúng tỷ lệ tín dụng trên GDP từ dữ liệu công khai",
      group: "Phân tích dữ liệu ngân hàng",
      question: "Một chỉ tiêu trên World Bank tăng từ 100% lên 110% GDP. Có thể kết luận dư nợ của một ngân hàng tăng 10% không?",
      concept: "Chuỗi FD.AST.PRVT.GD.ZS đo tín dụng ngân hàng dành cho khu vực tư nhân theo tỷ lệ GDP ở cấp quốc gia. Dữ liệu này phù hợp phân tích bối cảnh vĩ mô. Để giải thích một ngân hàng cụ thể, cần thêm số liệu của chính ngân hàng và định nghĩa chỉ tiêu tương ứng.",
      flow: [
        "Mở trang dữ liệu Việt Nam, tải CSV, lưu mã nguồn dữ liệu, mã quốc gia, mã chỉ tiêu và ngày trích xuất.",
        "Nếu các năm nằm trên nhiều cột, chuyển thành các dòng country, indicator, year, value. Dùng bộ ba quốc gia – chỉ tiêu – năm làm khóa.",
        "Sắp xếp theo năm và phân biệt điểm phần trăm với phần trăm thay đổi. Giữ giá trị trống nếu thiếu quan sát."
      ],
      example: "Ví dụ số học giả lập để luyện cách đọc chỉ tiêu: năm A tín dụng toàn hệ thống là 1.000, GDP là 1.000 cùng đơn vị nên tỷ lệ là 100%. Năm B tín dụng 1.210, GDP 1.100 nên tỷ lệ là 110%. Tỷ lệ tăng 10 điểm phần trăm, còn giá trị tín dụng tăng 21%. Bài toán chưa cung cấp dư nợ của một ngân hàng riêng lẻ.",
      check: "Tải chuỗi thật, chọn hai năm liền nhau có dữ liệu, ghi lại hai quan sát và tính chênh lệch theo điểm phần trăm. Ghi rõ nguồn và đơn vị trong tiêu đề biểu đồ.",
      pitfall: "Giá trị 110 đã được biểu diễn theo % GDP. Đặt định dạng Percent trực tiếp trên số 110 trong Excel sẽ hiển thị 11.000%.",
      sources: refs("wdi","api")
    }
  ];
  window.BANK_SOURCES = Object.values(shelf);
})();
