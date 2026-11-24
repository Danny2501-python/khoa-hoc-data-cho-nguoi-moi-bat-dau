// Các ví dụ và số tiền dưới đây được biên soạn riêng cho bài thực hành.
window.BANK_NEW_TERMS = (() => {
  const source = {
    cif: "https://docs.oracle.com/cd/F20443_01/html/CE/CoreEnty_01_B.htm",
    fatf: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html",
    casa: "https://docs.oracle.com/cd/E64763_01/html/CASA/CASA03_B_CustAccount.htm",
    block: "https://docs.oracle.com/en/industries/financial-services/banking-branch/14.7.0.2.0/casau/current-account-and-saving-account-user-guide.pdf",
    td: "https://docs.oracle.com/cd/E70795_01/PDF/Oracle%20Banking%20Term%20Deposits.pdf",
    early: "https://vanban.chinhphu.vn/?classid=2629&docid=211516&pageid=27160",
    loan: "https://docs.oracle.com/en/industries/financial-services/banking-origination/14.7.2.0.0/rloug/retail-loan-user-guide.pdf",
    commitment: "https://docs.oracle.com/cd/F46477_01/html/LN/LN13_Commit.htm",
    amort: "https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/",
    ltv: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-loan-to-value-ratio-in-an-auto-loan-en-769/",
    dti: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/",
    cpmi: "https://www.bis.org/committees/cpmi/glossary",
    pfmi: "https://www.bis.org/committees/cpmi/pfmi/overview",
    swift: "https://www.swift.com/payments/what-unique-end-end-transaction-reference-uetr",
    pacs: "https://www.iso20022.org/iso-20022-message-definitions?search=pacs.008",
    camt: "https://www.iso20022.org/iso-20022-message-definitions?search=camt",
    fx: "https://data.bis.org/help/glossary?item=Foreign+exchange+swap",
    forward: "https://data.bis.org/help/glossary?item=Outright+forwards",
    nostro: "https://docs.oracle.com/cd/E51527_01/PDF/RE/Nr.pdf",
    trade: "https://www.trade.gov/report/trade-finance-guide",
    gl: "https://docs.oracle.com/en/cloud/saas/financials/24d/faugl/using-general-ledger.pdf",
    teller: "https://docs.oracle.com/en/industries/financial-services/banking-branch/14.8.2.0.0/teusg/teller-user-guide.pdf",
    irb: "https://www.bis.org/committees/bcbs/basel-framework/standard/cre?allChapters=true&chapter=50",
    lcr: "https://www.bis.org/publications/fsi-paper-14-basel-iii-liquidity-monitoring-tools.pdf",
    nsfr: "https://www.bis.org/committees/bcbs/basel-framework/standard/nsf?allChapters=true",
    governance: "https://www.bis.org/publications/implementation-principles-effective-risk-data-aggregation-and-risk-reporting-bcbs-239-principles",
    purview: "https://learn.microsoft.com/en-us/purview/data-governance-glossary",
    key: "https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-table-column-constraint-transact-sql?view=sql-server-ver17",
    incremental: "https://learn.microsoft.com/en-us/fabric/data-factory/incremental-copy-job",
    test: "https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf"
  };
  const entries = [];
  function add(group, rows) {
    for (const [term, vi, definition, example, ref] of rows) {
      entries.push({ term, vi, group, definition, example, source: ref ? source[ref] : "" });
    }
  }

  add("Khách hàng và tuân thủ", [
    ["CIF · Customer Information File","Hồ sơ khách hàng","Hồ sơ gốc nối thông tin định danh với các quan hệ sản phẩm. Trong mô hình mẫu, mỗi khách có một mã CIF.","CIF-017 liên kết hai tài khoản và một hợp đồng vay. Đếm khách bằng số CIF phân biệt.","cif"],
    ["Joint account holder","Đồng chủ tài khoản","Người cùng đứng tên trên một tài khoản. Quan hệ khách hàng – tài khoản cần có vai trò và thời gian hiệu lực.","AC-42 có hai đồng chủ. Nối bảng vai trò trước khi cộng số dư sẽ làm 8 triệu thành 16 triệu.","cif"],
    ["Authorized signatory","Người được ủy quyền ký","Cá nhân được phép thực hiện một số giao dịch theo phạm vi ủy quyền của chủ tài khoản.","CIF-22 là người ký cho doanh nghiệp CIF-05. Báo cáo tiền gửi vẫn phân bổ số dư cho doanh nghiệp.","cif"],
    ["Beneficial owner · UBO","Chủ sở hữu hưởng lợi","Cá nhân cuối cùng sở hữu, kiểm soát khách hàng hoặc là người mà giao dịch được thực hiện thay mặt.","Công ty B sở hữu công ty A. Khi lập hồ sơ A, lần theo quan hệ sở hữu và quyền kiểm soát tới cá nhân cuối cùng.","fatf"],
    ["CDD · Customer due diligence","Thẩm định khách hàng","Quá trình nhận biết, xác minh khách hàng và chủ sở hữu hưởng lợi, hiểu quan hệ kinh doanh và theo dõi quan hệ đó.","Khi mở hồ sơ doanh nghiệp, ghi nhận người đại diện, cơ cấu sở hữu, mục đích mở tài khoản và bằng chứng xác minh.","fatf"],
    ["EDD · Enhanced due diligence","Thẩm định tăng cường","Các biện pháp thẩm định bổ sung tương ứng với mức rủi ro cao hơn của quan hệ hoặc giao dịch.","Hồ sơ cần làm rõ nguồn tài sản. Nhật ký ghi người kiểm tra, chứng từ đã xem và kết luận.","fatf"],
    ["PEP · Politically exposed person","Cá nhân có ảnh hưởng chính trị","Người đang hoặc từng được giao chức vụ công quan trọng. Trạng thái này là đầu vào để đánh giá rủi ro.","Hai khách có cùng họ tên với một PEP. Đối chiếu thêm chức vụ và thông tin định danh trước khi kết luận.","fatf"],
    ["Correspondent banking","Quan hệ ngân hàng đại lý","Một ngân hàng cung cấp dịch vụ ngân hàng cho ngân hàng khác, chẳng hạn thực hiện thanh toán bằng ngoại tệ.","Ngân hàng A gửi lệnh chi USD qua ngân hàng B nơi A duy trì tài khoản USD.","fatf"]
  ]);

  add("Tài khoản và tiền gửi", [
    ["CASA · Current account and savings account","Tài khoản thanh toán và tiền gửi tiết kiệm không kỳ hạn","Nhóm tiền gửi thường được dùng khi phân tích nguồn vốn chi phí thấp. Báo cáo cần công bố danh mục mã sản phẩm được tính.","Giả định phạm vi gồm 30 tỷ tiền gửi không kỳ hạn trên tổng 120 tỷ tiền gửi khách hàng, tỷ lệ CASA là 25%.","casa"],
    ["Ledger balance","Số dư ghi sổ","Số dư tài khoản tính theo các bút toán đã ghi nhận tại thời điểm chốt.","Số dư đầu ngày 10 triệu, đã hạch toán chi 2 triệu. Số dư ghi sổ cuối ngày là 8 triệu.","casa"],
    ["Available balance","Số dư khả dụng","Số tiền có thể sử dụng tại thời điểm tra cứu sau các điều chỉnh theo sản phẩm, như phong tỏa và thấu chi được phép.","Tài khoản có 8 triệu đã ghi sổ và 2 triệu phong tỏa, không có thấu chi. Khả dụng là 6 triệu.","block"],
    ["Amount block · Hold","Phong tỏa số tiền","Giữ lại một phần số dư, giới hạn quyền sử dụng số tiền đó trong thời gian phong tỏa.","Ngân hàng phong tỏa 3 triệu đồng tiền ký quỹ. Kiểm thử cả thao tác giải tỏa một phần 1 triệu.","block"],
    ["Overdraft · OD","Thấu chi","Hạn mức cho phép tài khoản chi vượt số dư tiền gửi theo thỏa thuận.","Khách có 2 triệu và hạn mức thấu chi còn dùng 5 triệu. Khoản chi 4 triệu sử dụng 2 triệu thấu chi.","casa"],
    ["Term deposit · TD","Tiền gửi có kỳ hạn","Khoản tiền gửi với kỳ hạn, cách trả lãi và chỉ dẫn xử lý khi đáo hạn đã thỏa thuận.","Mở sổ 100 triệu ngày 01/04, kỳ hạn 3 tháng; lưu riêng ngày mở, ngày đáo hạn và tần suất trả lãi.","td"],
    ["Maturity instruction","Chỉ dẫn đáo hạn","Quyết định áp dụng khi hết kỳ gửi, như tất toán, tái tục gốc hoặc tái tục cả gốc và lãi.","Sổ có 100 triệu gốc và 1,5 triệu lãi, chọn tái tục gốc. Kỳ mới mở 100 triệu; 1,5 triệu chuyển về tài khoản nhận lãi.","td"],
    ["Rollover","Tái tục","Bắt đầu kỳ tiền gửi mới tại ngày đáo hạn theo chỉ dẫn, với số gốc, kỳ hạn và lãi suất của kỳ mới.","Tái tục cả gốc và lãi cho sổ gốc 100 triệu, lãi 1,5 triệu. Số gốc đầu kỳ tiếp theo là 101,5 triệu.","td"],
    ["Partial redemption","Rút một phần tiền gửi trước hạn","Rút một phần gốc trước ngày đáo hạn. Cần tách số tiền rút, số dư còn lại và quy tắc tính lãi tương ứng.","Khách rút 30 triệu từ sổ 100 triệu. Kiểm tra lãi phần rút và xác nhận số gốc còn 70 triệu.","early"],
    ["Sweep","Điều chuyển số dư tự động","Quy tắc tự động điều chuyển tiền giữa những tài khoản được liên kết để đạt số dư mục tiêu.","Cuối ngày, tài khoản thu có 120 triệu và cần giữ 20 triệu. Quy tắc quét phần vượt chuyển 100 triệu tới tài khoản tập trung.","casa"]
  ]);

  add("Tín dụng", [
    ["Credit commitment","Cam kết cấp tín dụng","Thỏa thuận của ngân hàng về việc cung cấp tín dụng theo các điều kiện đã xác định.","Cam kết 2 tỷ, khách mới rút 600 triệu. Tách số tiền cam kết khỏi số đã giải ngân khi dựng báo cáo.","commitment"],
    ["Drawdown","Rút vốn vay","Lần khách sử dụng một phần hoặc toàn bộ khoản tín dụng được cấp.","Một hạn mức có hai lần rút 300 triệu và 200 triệu. Hệ thống giữ hai mã rút vốn dưới cùng mã hạn mức.","commitment"],
    ["Undrawn commitment","Phần cam kết chưa rút","Phần cam kết còn chưa được khách rút vốn, xét theo điều khoản của hạn mức.","Hạn mức 1 tỷ, đã rút 400 triệu, chưa trả gốc hay điều chỉnh hạn mức. Phần chưa rút là 600 triệu.","commitment"],
    ["Outstanding principal","Dư nợ gốc","Phần gốc đã giải ngân còn chưa được hoàn trả tại ngày báo cáo.","Đã giải ngân 500 triệu và thu 60 triệu gốc cùng 5 triệu lãi. Dư nợ gốc còn 440 triệu.","amort"],
    ["Amortization schedule","Lịch trả gốc và lãi","Bảng theo kỳ thể hiện khoản phải trả, phần gốc, phần lãi và dư nợ sau mỗi lần trả.","Kỳ 1 thu 10 triệu gồm 7 triệu gốc và 3 triệu lãi. Dư nợ gốc giảm 7 triệu.","amort"],
    ["Bullet repayment","Trả gốc một lần cuối kỳ","Cấu trúc trong đó toàn bộ gốc đến hạn tại kỳ thanh toán cuối; lịch lãi có thể khác lịch gốc.","Vay 1 tỷ, lãi trả hàng tháng và gốc trả sau 12 tháng. Lịch gốc có một kỳ 1 tỷ.","loan"],
    ["Principal moratorium","Ân hạn gốc","Khoảng thời gian hoãn nghĩa vụ trả gốc theo hợp đồng. Cách xử lý lãi được quy định riêng.","Khoản vay có 3 tháng ân hạn gốc và vẫn trả lãi tháng. Ba dòng lịch đầu có số gốc đến hạn bằng 0.","loan"],
    ["Prepayment","Trả nợ trước hạn","Thanh toán trước một phần hoặc toàn bộ gốc so với lịch hợp đồng, có thể làm thay đổi lịch còn lại.","Khách trả thêm 40 triệu giữa hai kỳ. So sánh dư nợ sau thu, phí theo hợp đồng và lịch mới.","loan"],
    ["LTV · Loan-to-value","Tỷ lệ khoản vay trên giá trị tài sản","Tỷ lệ tiền vay so với giá trị tài sản bảo đảm dùng để định giá tại mốc phân tích.","Vay mua ô tô 600 triệu, xe được định giá 800 triệu đúng kỳ thẩm định. LTV là 75%.","ltv"],
    ["DTI · Debt-to-income","Tỷ lệ nghĩa vụ trả nợ trên thu nhập","Theo cách tính trong ví dụ, tổng tiền trả nợ hằng tháng chia cho thu nhập gộp hằng tháng.","Nghĩa vụ 8 triệu và thu nhập gộp 32 triệu cùng tháng cho DTI bằng 25%.","dti"]
  ]);

  add("Thanh toán và thông điệp", [
    ["Clearing","Bù trừ","Khâu trao đổi, đối chiếu hoặc xác nhận lệnh trước quyết toán; có thể tính nghĩa vụ ròng.","Hệ thống nhận các lệnh A gửi B và B gửi A trong phiên, rồi lập nghĩa vụ cho từng thành viên.","cpmi"],
    ["Settlement","Quyết toán","Hoàn thành nghĩa vụ thanh toán bằng chuyển giao tiền hoặc tài sản theo cơ chế của hệ thống.","Kết quả bù trừ ghi A phải trả 40 triệu. Khi khoản đó được chuyển qua tài khoản quyết toán, lưu tham chiếu quyết toán.","cpmi"],
    ["Settlement finality","Tính chung cuộc của quyết toán","Thời điểm việc chuyển giao trở nên vô điều kiện và không thể hủy ngang theo quy tắc áp dụng.","Kênh tiếp nhận lệnh lúc 10:01. Để điền giờ chung cuộc, tra sự kiện theo quy tắc của hệ thống quyết toán.","pfmi"],
    ["RTGS · Real-time gross settlement","Quyết toán gộp theo thời gian thực","Từng lệnh được quyết toán riêng trong ngày theo thời gian thực, nếu đáp ứng điều kiện xử lý.","A gửi B 100 triệu, sau đó B gửi A 60 triệu. RTGS quyết toán riêng từng lệnh.","cpmi"],
    ["DNS · Deferred net settlement","Quyết toán ròng theo phiên","Hệ thống tính số phải trả hoặc nhận ròng và quyết toán vào các mốc đã định.","Trong cùng phiên, A gửi B 100 triệu, B gửi A 60 triệu. Với hai thành viên, A trả ròng 40 triệu.","cpmi"],
    ["STP · Straight-through processing","Xử lý xuyên suốt tự động","Dữ liệu giao dịch đi qua các bước xử lý theo luồng tự động mà không cần nhập lại hoặc sửa tay.","Trong 1.000 lệnh hoàn tất cùng ngày, 920 đi hết luồng không cần sửa tay. Tỷ lệ STP theo mẫu số này là 92%.","cpmi"],
    ["UETR · Unique end-to-end transaction reference","Mã tham chiếu xuyên suốt giao dịch","Mã 36 ký tự để các thành viên chuỗi thanh toán Swift theo dõi cùng một giao dịch.","Ngân hàng trung gian gắn mã nội bộ khác. Khi tra soát, tìm theo UETR đi cùng lệnh suốt hành trình.","swift"],
    ["pacs.008 · FI to FI Customer Credit Transfer","Điện chuyển tiền khách hàng giữa các định chế","Thông điệp ISO 20022 dùng giữa các định chế tài chính trong luồng chuyển tiền cho khách hàng.","Ngân hàng của bên trả gửi lệnh cho ngân hàng tiếp theo; người phân tích đọc số tiền, loại tiền và định danh các bên.","pacs"],
    ["pacs.002 · FI to FI Payment Status Report","Điện báo trạng thái thanh toán","Thông điệp phản hồi trạng thái của chỉ thị thanh toán giữa các định chế tài chính.","Lệnh mẫu bị từ chối. Ghép tham chiếu lệnh gốc để gắn trạng thái RJCT và lý do vào đúng giao dịch.","pacs"],
    ["camt.053 · Bank to Customer Statement","Sao kê tài khoản theo ISO 20022","Thông điệp sao kê dùng để cung cấp thông tin số dư và các khoản ghi sổ trên tài khoản.","Từ sao kê ngày D, đối chiếu từng dòng ghi sổ và số dư cuối với sổ theo dõi nội bộ.","camt"],
    ["camt.054 · Bank to Customer Debit Credit Notification","Thông báo ghi Nợ hoặc ghi Có","Thông điệp thông báo khoản tài khoản đã hoặc sẽ được ghi Nợ hay ghi Có theo ngữ cảnh sử dụng.","Khách nhận thông báo về một khoản ghi Có; đối chiếu số tham chiếu của khoản đó khi nhận sao kê.","camt"]
  ]);

  add("Tài trợ thương mại và ngoại hối", [
    ["Open account","Thanh toán ghi sổ, trả chậm","Người bán giao hàng trước khi đến hạn thanh toán theo hợp đồng thương mại.","Hợp đồng ghi trả 60 ngày sau ngày hóa đơn. Lưu cả ngày hóa đơn và cách tính ngày đến hạn.","trade"],
    ["L/C · Letter of credit","Thư tín dụng","Cam kết của ngân hàng phát hành thanh toán theo điều kiện của thư tín dụng khi có xuất trình phù hợp.","Khách nộp bộ chứng từ cho lô hàng. Chuyên viên so từng chứng từ với yêu cầu của L/C và ghi lại sai biệt.","trade"],
    ["Confirming bank","Ngân hàng xác nhận","Ngân hàng bổ sung cam kết của chính mình vào thư tín dụng theo yêu cầu hoặc ủy quyền của ngân hàng phát hành.","Nhà xuất khẩu yêu cầu L/C có xác nhận. Hồ sơ cần lưu ngân hàng phát hành và ngân hàng xác nhận ở hai vai trò riêng.","trade"],
    ["D/P · Documents against payment","Nhờ thu trả tiền đổi chứng từ","Theo chỉ thị nhờ thu, ngân hàng giao bộ chứng từ cho người mua khi người mua thanh toán.","Người mua chưa trả tiền. Nhân viên kiểm tra điều kiện giao chứng từ ghi trên chỉ thị D/P.","trade"],
    ["D/A · Documents against acceptance","Nhờ thu chấp nhận đổi chứng từ","Ngân hàng giao bộ chứng từ theo chỉ thị khi người mua chấp nhận hối phiếu kỳ hạn; tiền được thu khi đến hạn.","Người mua đã ký chấp nhận trả sau 60 ngày. Ghi hai sự kiện riêng là chấp nhận và thực thu.","trade"],
    ["Factoring","Bao thanh toán","Hoạt động tài trợ dựa trên việc chuyển nhượng khoản phải thu. Phạm vi ứng trước và truy đòi theo thỏa thuận.","Một hóa đơn 500 triệu được ứng trước 80%. Theo dõi 400 triệu ứng trước riêng với mệnh giá hóa đơn.","trade"],
    ["Nostro account","Tài khoản của ngân hàng mình tại ngân hàng khác","Cách gọi tài khoản nhìn từ phía ngân hàng có tiền gửi tại ngân hàng đại lý.","A giữ USD tại B. Kế toán A đối chiếu sổ theo dõi Nostro USD với sao kê do B gửi.","nostro"],
    ["Vostro account","Tài khoản của ngân hàng khác tại ngân hàng mình","Cùng quan hệ đại lý, tài khoản được gọi là Vostro khi nhìn từ ngân hàng cung cấp tài khoản.","A giữ USD tại B. B nhìn số tiền gửi của A là Vostro và ghi nhận nghĩa vụ đối với A.","nostro"],
    ["FX forward · Outright forward","Giao dịch ngoại tệ kỳ hạn","Hai bên chốt tỷ giá và số lượng để trao đổi hai đồng tiền vào ngày tương lai đã thỏa thuận.","Nhà nhập khẩu khóa tỷ giá mua 100.000 USD sau 90 ngày. Lưu ngày giao dịch và ngày giao tiền riêng.","forward"],
    ["FX swap","Hoán đổi ngoại tệ","Hai bên thỏa thuận đồng thời hai lần đổi ngược chiều cùng cặp tiền, ở hai ngày và theo các tỷ giá đã chốt.","Ngân hàng mua USD ở chân gần và bán lại USD ở chân xa. Kiểm tra đáo hạn cho từng chân.","fx"],
    ["PvP · Payment versus payment","Thanh toán đối ứng hai đồng tiền","Cơ chế liên kết quyết toán hai chân ngoại tệ, sao cho chân này được quyết toán chung cuộc khi và chỉ khi chân kia cũng vậy.","Khi mua USD trả EUR, hai lệnh được liên kết để hạn chế rủi ro đã giao EUR nhưng chưa nhận USD.","cpmi"]
  ]);

  add("Kế toán và vận hành quầy", [
    ["CoA · Chart of accounts","Hệ thống tài khoản kế toán","Danh mục và cấu trúc mã giúp phân loại tài sản, nợ phải trả, vốn, thu nhập và chi phí.","Trước khi chuyển đổi, lập bảng ánh xạ mã tiền gửi cá nhân từ hệ thống cũ sang mã đích trong CoA.","gl"],
    ["General ledger · GL","Sổ cái","Tập hợp các tài khoản kế toán và số liệu hạch toán tổng hợp dùng lập báo cáo.","Đối chiếu số dư tài khoản GL tiền gửi cuối ngày với tổng sổ chi tiết cùng loại tiền và phạm vi.","gl"],
    ["Subledger","Sổ chi tiết","Sổ theo dõi số tiền ở cấp hợp đồng, tài khoản hoặc giao dịch, làm nguồn thông tin cho sổ cái.","Ba sổ tiết kiệm có gốc 30, 40 và 50 triệu. Tổng 120 triệu được đối chiếu với GL tiền gửi tương ứng.","gl"],
    ["Posting","Ghi sổ","Bước cập nhật sổ kế toán từ bút toán đủ điều kiện; cần phân biệt thời điểm lập phiếu, duyệt và ghi sổ.","Phiếu ghi phí được lập 16:55 nhưng ghi sổ 17:03. Tra thời điểm ghi sổ khi lập báo cáo cuối ngày.","gl"],
    ["Trial balance","Bảng cân đối số phát sinh","Bảng tổng hợp theo tài khoản các số dư và phát sinh Nợ, Có trong phạm vi sổ và kỳ đã chọn.","Tổng phát sinh Nợ bằng tổng phát sinh Có nhưng khoản phí vẫn có thể vào nhầm tài khoản. Kiểm tra tiếp theo loại nghiệp vụ.","gl"],
    ["Suspense account","Tài khoản chờ xử lý","Tài khoản tạm đỗ khoản tiền cần xác minh hoặc hoàn thiện phân loại để chuyển về đúng tài khoản.","Một khoản nhận 2 triệu thiếu mã người hưởng. Mở hồ sơ tra soát và theo dõi ngày tiền còn treo.","gl"],
    ["Reversal entry","Bút toán đảo","Bút toán có tác dụng triệt tiêu toàn bộ hoặc một phần ảnh hưởng của bút toán đã ghi, có liên kết về bản gốc.","Thu nhầm phí 20.000 đồng. Lưu mã bút toán đảo và mã thu phí gốc để đối chiếu.","gl"],
    ["Accrued interest payable","Lãi phải trả đã dự chi","Lãi tiền gửi đã phát sinh đến mốc chốt và được ghi nhận là khoản phải trả dù chưa chi tiền.","Sổ thanh toán lãi cuối tháng. Lãi 50.000 đồng ghi nhận hôm nay làm tăng chi phí lãi và lãi phải trả.","td"],
    ["Teller till","Ngăn quỹ giao dịch viên","Điểm quản lý tiền mặt giao cho một giao dịch viên theo ca và loại tiền.","Đầu ca nhận 100 triệu, thu thêm 20 triệu, chi 35 triệu. Số tiền kỳ vọng trong ngăn quỹ là 85 triệu.","teller"],
    ["Cash balancing","Cân quỹ","Đối chiếu số tiền kiểm đếm với số dư quỹ trên hệ thống, theo loại tiền và điểm giữ tiền.","Sổ ngăn quỹ ghi 85 triệu, kiểm đếm được 84,9 triệu. Ghi nhận thiếu 100.000 đồng để điều tra.","teller"]
  ]);

  add("Rủi ro và thanh khoản", [
    ["PD · Probability of default","Xác suất vỡ nợ","Xác suất bên vay rơi vào trạng thái vỡ nợ trong thời hạn được mô hình quy định.","Trong ví dụ một năm, nhóm có PD 2%. Với 1.000 bên vay cùng mức PD, số vỡ nợ kỳ vọng là 20.","irb"],
    ["LGD · Loss given default","Tỷ lệ tổn thất khi vỡ nợ","Tỷ lệ giá trị phơi nhiễm dự kiến bị mất nếu đã xảy ra vỡ nợ, sau xem xét các khoản thu hồi và chi phí theo mô hình.","Giả định EAD 100 triệu và tổn thất cuối cùng 35 triệu theo cùng cơ sở định giá. LGD là 35%.","irb"],
    ["EAD · Exposure at default","Giá trị phơi nhiễm tại thời điểm vỡ nợ","Giá trị ngân hàng có thể phải chịu rủi ro khi khách vỡ nợ, có thể gồm phần hạn mức chưa rút sau quy đổi.","Dư nợ 80 triệu cộng 10 triệu ước tính rút thêm trước vỡ nợ cho EAD minh họa 90 triệu.","irb"],
    ["EL · Expected loss","Tổn thất kỳ vọng","Với ví dụ IRB đơn giản cho khoản chưa vỡ nợ, số tiền EL bằng PD nhân LGD nhân EAD cho cùng phạm vi.","PD 2%, LGD 35%, EAD 100 triệu. Số tiền tổn thất kỳ vọng bằng 700.000 đồng.","irb"],
    ["LCR · Liquidity coverage ratio","Tỷ lệ bao phủ thanh khoản","Theo khung Basel, so sánh tài sản thanh khoản chất lượng cao với dòng tiền ra ròng trong kịch bản căng thẳng 30 ngày.","HQLA đủ điều kiện 120 tỷ, dòng tiền ra ròng theo kịch bản 100 tỷ. LCR minh họa là 120%.","lcr"],
    ["HQLA · High-quality liquid assets","Tài sản thanh khoản chất lượng cao","Nhóm tài sản đạt tiêu chí để chuyển nhanh thành tiền với tổn thất giá trị thấp trong giai đoạn căng thẳng.","Để lập LCR, kiểm tra điều kiện và mức khấu trừ trước khi lấy giá trị từng chứng khoán vào HQLA.","lcr"],
    ["NSFR · Net stable funding ratio","Tỷ lệ nguồn vốn ổn định ròng","Chỉ tiêu Basel so nguồn vốn ổn định sẵn có với vốn ổn định cần thiết, xét kỳ hạn một năm.","ASF 105 tỷ, RSF 100 tỷ cùng ngày báo cáo. NSFR minh họa bằng 105%.","nsfr"],
    ["Haircut","Mức khấu trừ giá trị tài sản","Tỷ lệ giảm áp trên giá trị tài sản khi xác định giá trị được công nhận, chẳng hạn trong bảo đảm.","Tài sản có giá thị trường 100 triệu, áp haircut minh họa 15%. Giá trị sau khấu trừ còn 85 triệu.","cpmi"],
    ["Intraday liquidity","Thanh khoản trong ngày","Khả năng có tiền đúng lúc để thực hiện các nghĩa vụ đến hạn trong ngày.","Ngân hàng cần trả 50 tỷ lúc 10 giờ nhưng đến 14 giờ mới thu 60 tỷ. Phải xử lý khoảng thiếu trong buổi sáng.","cpmi"]
  ]);

  add("Quản trị và chuyển đổi dữ liệu", [
    ["Data lineage","Dòng dữ liệu và lịch sử biến đổi","Mô tả dữ liệu xuất phát từ đâu, đi qua những bước biến đổi nào và được sử dụng ở đâu.","Từ chỉ tiêu dư nợ quá hạn, lần ngược bảng tổng hợp, lịch trả nợ, điều kiện lọc và ngày chốt.","governance"],
    ["Business glossary","Từ điển nghiệp vụ","Danh mục thuật ngữ và định nghĩa nghiệp vụ thống nhất, giúp phòng ban diễn giải cùng một chỉ tiêu.","Mục “khách hoạt động” nêu khoảng quan sát, loại giao dịch hợp lệ và người duyệt định nghĩa.","purview"],
    ["Data catalog","Danh mục tài sản dữ liệu","Kho thông tin mô tả các bộ dữ liệu để người dùng tìm nguồn, hiểu cấu trúc và xác định đầu mối phụ trách.","Tìm “tiền gửi” để thấy bảng snapshot, lịch cập nhật, danh sách trường và đơn vị quản lý.","purview"],
    ["Referential integrity","Toàn vẹn tham chiếu","Ràng buộc yêu cầu khóa tham chiếu hợp lệ phải tìm được bản ghi cha tương ứng.","Tài khoản AC-17 có customer_id = C99 nhưng bảng khách chưa có C99. Tách bản ghi để xử lý trước khi nạp.","key"],
    ["Watermark","Mốc nạp tăng dần","Giá trị cột theo dõi cho biết lần nạp trước đã đọc tới đâu, làm ranh giới cho lần nạp tiếp.","Lần trước đã nạp hết phiên bản 950. Lần sau lấy các phiên bản trên 950 đến mốc chốt mới.","incremental"],
    ["CDC · Change data capture","Thu nhận thay đổi dữ liệu","Cơ chế theo dõi và chuyển các lần thêm, sửa, xóa thay vì sao chép toàn bộ bảng ở mỗi lần chạy.","Tài khoản đổi trạng thái hai lần. Dùng thứ tự sự kiện nguồn để áp đúng hai thay đổi ở đích.","incremental"],
    ["Control total","Tổng kiểm soát","Số tổng tính ở nguồn và đích để phát hiện khác biệt trong cùng phạm vi đối soát.","Nguồn và đích cùng 1.000 tài khoản nhưng tổng VND lệch 200.000 đồng. Chia nhỏ theo sản phẩm để khoanh vùng.",""],
    ["Crosswalk","Bảng đối chiếu mã nguồn – đích","Bảng nối định danh hoặc bộ mã giữa hai hệ thống, kèm điều kiện và thời gian áp dụng khi cần.","Mã sản phẩm cũ TK12M chuyển sang TD12. Tìm tất cả sổ TK12M trước khi kiểm tra điều kiện phát hành ở hệ thống mới.",""],
    ["Cutover","Chuyển sang hệ thống mới","Khoảng thời gian thực hiện chuỗi bước chuyển xử lý nghiệp vụ từ hệ thống đang chạy sang hệ thống đích.","Sau giờ chốt, lấy dữ liệu cuối, nạp phần chênh, đối chiếu, ghi quyết định mở giao dịch và thời điểm mở.",""],
    ["Dress rehearsal","Tổng diễn tập chuyển đổi","Chạy thử chuỗi công việc chuyển đổi theo thứ tự, nhân sự và giới hạn thời gian dự kiến áp dụng thật.","Cửa sổ dự kiến 4 giờ. Buổi diễn tập mất 4 giờ 20 phút, trong đó đối chiếu tiền gửi chiếm 70 phút.",""]
  ]);

  add("Kiểm thử Core Banking", [
    ["Acceptance criteria","Tiêu chí chấp nhận","Các điều kiện có thể kiểm chứng mà kết quả bàn giao phải thỏa theo yêu cầu đã thống nhất.","Khi rút 30 triệu từ sổ 100 triệu, kết quả phải hiển thị gốc còn 70 triệu và ghi được tham chiếu bút toán.","test"],
    ["SIT · System integration testing","Kiểm thử tích hợp hệ thống","Kiểm tra giao tiếp và tương tác giữa các hệ thống, bao gồm dữ liệu, trạng thái và xử lý lỗi.","Kích hoạt chuyển tiền trên kênh, kiểm tra mã tham chiếu và trạng thái phản hồi qua Payment Hub về kênh.","test"],
    ["UAT · User acceptance testing","Kiểm thử chấp nhận của người dùng","Người dùng hoặc đại diện nghiệp vụ đánh giá hệ thống trong các quy trình họ cần thực hiện.","Giao dịch viên nhập lệnh tất toán. Kiểm soát viên duyệt và kiểm tra chứng từ trước khi ký kết quả.","test"],
    ["Regression testing","Kiểm thử hồi quy","Kiểm tra xem thay đổi mới có ảnh hưởng xấu đến các hành vi đã vận hành đúng hay không.","Sau thay đổi cách làm tròn phí, chạy lại thu phí, đảo phí và chốt GL cuối ngày.","test"],
    ["Confirmation testing","Kiểm thử xác nhận sửa lỗi","Chạy lại điều kiện từng gây lỗi để xác nhận bản sửa xử lý đúng lỗi đó.","Lần trước giao dịch rút từng phần làm số dư âm. Chạy lại đúng dữ liệu tái hiện và đối chiếu số dư kỳ vọng.","test"],
    ["Boundary value analysis","Phân tích giá trị biên","Thiết kế kiểm thử tại và sát ranh giới giữa các miền giá trị có hành vi khác nhau.","Quy tắc giữ tối thiểu 10 triệu sau rút. Thử số dư còn lại 9.999.999, 10.000.000 và 10.000.001 đồng.","test"],
    ["Decision table","Bảng quyết định","Bảng liệt kê tổ hợp điều kiện và hành động tương ứng để đặc tả, kiểm thử quy tắc nghiệp vụ.","Kết hợp trạng thái sổ, quyền rút một phần và mức phong tỏa để xác định khi nào cho phép rút.","test"],
    ["State transition testing","Kiểm thử chuyển trạng thái","Thiết kế ca thử dựa trên trạng thái ban đầu, sự kiện và trạng thái đích được phép.","Lệnh đã hủy nhận lại thông điệp duyệt muộn. Kiểm tra hệ thống giữ trạng thái hủy theo đặc tả.","test"],
    ["Idempotency","Tính lũy đẳng","Một thao tác lặp với cùng định danh và nội dung phải giữ nguyên hiệu ứng nghiệp vụ sau lần thành công đầu tiên.","Kênh gửi lại cùng yêu cầu sau khi mất phản hồi. Đếm được một lần trừ tiền và một mã giao dịch gốc.",""],
    ["Parallel run","Chạy song song","Đưa cùng bộ đầu vào qua hai hệ thống hoặc hai phiên bản, rồi so đầu ra theo quy tắc đã chốt.","Chạy tính lãi cuối ngày trên hai Core với cùng số dư, lịch và cách làm tròn. Xuất danh sách sổ lệch lãi.",""]
  ]);
  return entries;
})();
