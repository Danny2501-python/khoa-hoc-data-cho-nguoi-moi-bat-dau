window.BANK_DATA_LAB = {
  "intro": "Theo dõi một lệnh chuyển tiền đi từ kênh qua Payment Hub đến sổ chi tiết Core, sổ cái GL, bảng kê quyết toán và số dư EOD. Bộ dữ liệu giả lập có 800 lệnh từ 04–13/05/2026 và bảng kê đến hết 14/05. Mọi số tiền là đồng Việt Nam, thời gian theo giờ Việt Nam (UTC+7). Quy ước riêng của bài: không có phí, lãi, hoàn tiền hay phát sinh Có trên tài khoản nguồn; lệnh từ 17:00 được quyết toán ngày kế tiếp, kể cả cuối tuần. Các trường hợp lệch được cài có chủ đích để luyện đối soát. Mã tài khoản, sơ đồ GL và giờ cắt chỉ dùng cho bài tập.",
  "tables": [
    {
      "name": "customer",
      "grain": "Mỗi dòng là một hồ sơ khách hàng giả lập.",
      "key": "cif_id",
      "fields": [
        {
          "name": "cif_id",
          "description": "Khóa hồ sơ khách hàng giả lập; một CIF có thể sở hữu nhiều tài khoản."
        },
        {
          "name": "segment",
          "description": "RETAIL là khách hàng cá nhân; SME là doanh nghiệp vừa và nhỏ."
        },
        {
          "name": "home_branch",
          "description": "Mã chi nhánh quản lý hồ sơ trong bài tập."
        }
      ],
      "rows": 120,
      "file": "customer.csv",
      "preview": [
        {
          "cif_id": "C0001",
          "segment": "RETAIL",
          "home_branch": "CN01"
        },
        {
          "cif_id": "C0002",
          "segment": "RETAIL",
          "home_branch": "CN02"
        },
        {
          "cif_id": "C0003",
          "segment": "RETAIL",
          "home_branch": "CN03"
        },
        {
          "cif_id": "C0004",
          "segment": "RETAIL",
          "home_branch": "CN04"
        },
        {
          "cif_id": "C0005",
          "segment": "SME",
          "home_branch": "CN05"
        }
      ]
    },
    {
      "name": "account",
      "grain": "Mỗi dòng là một tài khoản CASA gửi lệnh chuyển tiền.",
      "key": "account_id",
      "fields": [
        {
          "name": "account_id",
          "description": "Khóa tài khoản giả lập."
        },
        {
          "name": "cif_id",
          "description": "CIF sở hữu tài khoản. Mô hình giả định mỗi tài khoản có một chủ."
        },
        {
          "name": "currency",
          "description": "Đơn vị tiền của tài khoản, toàn bộ là VND."
        },
        {
          "name": "opening_vnd",
          "description": "Số dư sổ sách đầu ngày 04/05/2026 trước mọi phát sinh, đơn vị đồng."
        }
      ],
      "rows": 160,
      "file": "account.csv",
      "preview": [
        {
          "account_id": "A0001",
          "cif_id": "C0001",
          "currency": "VND",
          "opening_vnd": 120025000
        },
        {
          "account_id": "A0002",
          "cif_id": "C0002",
          "currency": "VND",
          "opening_vnd": 120050000
        },
        {
          "account_id": "A0003",
          "cif_id": "C0003",
          "currency": "VND",
          "opening_vnd": 120075000
        },
        {
          "account_id": "A0004",
          "cif_id": "C0004",
          "currency": "VND",
          "opening_vnd": 120100000
        },
        {
          "account_id": "A0005",
          "cif_id": "C0005",
          "currency": "VND",
          "opening_vnd": 120125000
        }
      ]
    },
    {
      "name": "payment_order",
      "grain": "Mỗi dòng là một lệnh chuyển tiền đi do kênh tạo.",
      "key": "order_id",
      "fields": [
        {
          "name": "order_id",
          "description": "Khóa nghiệp vụ xuyên suốt từ kênh đến quyết toán."
        },
        {
          "name": "account_id",
          "description": "Tài khoản nguồn bị ghi Nợ."
        },
        {
          "name": "channel",
          "description": "Kênh nhận lệnh: APP, WEB hoặc TELLER."
        },
        {
          "name": "submitted_at",
          "description": "Thời điểm tạo lệnh, giờ Việt Nam, dạng YYYY-MM-DD HH:MM:SS."
        },
        {
          "name": "amount_vnd",
          "description": "Số tiền khách hàng yêu cầu chuyển, đồng nguyên, chưa có phí."
        }
      ],
      "rows": 800,
      "file": "payment_order.csv",
      "preview": [
        {
          "order_id": "P0001",
          "account_id": "A0038",
          "channel": "APP",
          "submitted_at": "2026-05-04 15:11:00",
          "amount_vnd": 1769000
        },
        {
          "order_id": "P0002",
          "account_id": "A0075",
          "channel": "WEB",
          "submitted_at": "2026-05-04 09:22:00",
          "amount_vnd": 388000
        },
        {
          "order_id": "P0003",
          "account_id": "A0112",
          "channel": "TELLER",
          "submitted_at": "2026-05-04 16:33:00",
          "amount_vnd": 2107000
        },
        {
          "order_id": "P0004",
          "account_id": "A0149",
          "channel": "APP",
          "submitted_at": "2026-05-04 10:44:00",
          "amount_vnd": 726000
        },
        {
          "order_id": "P0005",
          "account_id": "A0026",
          "channel": "WEB",
          "submitted_at": "2026-05-04 17:55:00",
          "amount_vnd": 2445000
        }
      ]
    },
    {
      "name": "hub_attempt",
      "grain": "Mỗi dòng là kết quả một lần Payment Hub xử lý cùng một lệnh; một lệnh có thể được thử lại.",
      "key": "(order_id, attempt_no)",
      "fields": [
        {
          "name": "order_id",
          "description": "Khóa nối về lệnh ở kênh."
        },
        {
          "name": "attempt_no",
          "description": "Số thứ tự lần thử, bắt đầu từ 1; số lớn nhất là kết quả sau cùng."
        },
        {
          "name": "observed_at",
          "description": "Thời điểm nhận kết quả của lần thử, giờ Việt Nam."
        },
        {
          "name": "status",
          "description": "TIMEOUT: chưa nhận phản hồi; ACCEPTED: Hub chấp nhận; REJECTED: từ chối lệnh."
        }
      ],
      "rows": 873,
      "file": "hub_attempt.csv",
      "preview": [
        {
          "order_id": "P0001",
          "attempt_no": 1,
          "observed_at": "2026-05-04 15:11:02",
          "status": "ACCEPTED"
        },
        {
          "order_id": "P0002",
          "attempt_no": 1,
          "observed_at": "2026-05-04 09:22:02",
          "status": "ACCEPTED"
        },
        {
          "order_id": "P0003",
          "attempt_no": 1,
          "observed_at": "2026-05-04 16:33:02",
          "status": "ACCEPTED"
        },
        {
          "order_id": "P0004",
          "attempt_no": 1,
          "observed_at": "2026-05-04 10:44:02",
          "status": "ACCEPTED"
        },
        {
          "order_id": "P0005",
          "attempt_no": 1,
          "observed_at": "2026-05-04 17:55:02",
          "status": "ACCEPTED"
        }
      ]
    },
    {
      "name": "core_posting",
      "grain": "Mỗi dòng là một lần Core ghi Nợ tài khoản tiền gửi cho lệnh đi.",
      "key": "posting_id",
      "fields": [
        {
          "name": "posting_id",
          "description": "Khóa bút toán ở sổ chi tiết Core."
        },
        {
          "name": "order_id",
          "description": "Lệnh gốc ở kênh. Nhiều lần ghi Nợ cho một lệnh là ngoại lệ trong mô hình."
        },
        {
          "name": "booked_at",
          "description": "Thời điểm hạch toán tại Core, giờ Việt Nam."
        },
        {
          "name": "debit_vnd",
          "description": "Số tiền Core trừ khỏi tài khoản khách hàng, ghi số dương theo đơn vị đồng."
        }
      ],
      "rows": 758,
      "file": "core_posting.csv",
      "preview": [
        {
          "posting_id": "B0001-1",
          "order_id": "P0001",
          "booked_at": "2026-05-04 15:11:04",
          "debit_vnd": 1769000
        },
        {
          "posting_id": "B0002-1",
          "order_id": "P0002",
          "booked_at": "2026-05-04 09:22:04",
          "debit_vnd": 388000
        },
        {
          "posting_id": "B0003-1",
          "order_id": "P0003",
          "booked_at": "2026-05-04 16:33:04",
          "debit_vnd": 2107000
        },
        {
          "posting_id": "B0004-1",
          "order_id": "P0004",
          "booked_at": "2026-05-04 10:44:04",
          "debit_vnd": 726000
        },
        {
          "posting_id": "B0005-1",
          "order_id": "P0005",
          "booked_at": "2026-05-04 17:55:04",
          "debit_vnd": 2445000
        }
      ]
    },
    {
      "name": "gl_line",
      "grain": "Mỗi dòng là một vế của bút toán GL gắn với một lần hạch toán Core.",
      "key": "(posting_id, line_no)",
      "fields": [
        {
          "name": "posting_id",
          "description": "Khóa nối về lần ghi sổ chi tiết."
        },
        {
          "name": "line_no",
          "description": "Thứ tự dòng của bút toán trong bài."
        },
        {
          "name": "gl_code",
          "description": "Mã minh họa: DEP_CASA = tiền gửi khách hàng, PAY_CLEAR = phải trả chờ quyết toán, SUSPENSE = tài khoản treo."
        },
        {
          "name": "side",
          "description": "Phía ngân hàng: DR = Nợ, CR = Có."
        },
        {
          "name": "amount_vnd",
          "description": "Số tiền dương của vế bút toán, đơn vị đồng."
        }
      ],
      "rows": 1516,
      "file": "gl_line.csv",
      "preview": [
        {
          "posting_id": "B0001-1",
          "line_no": 1,
          "gl_code": "DEP_CASA",
          "side": "DR",
          "amount_vnd": 1769000
        },
        {
          "posting_id": "B0001-1",
          "line_no": 2,
          "gl_code": "PAY_CLEAR",
          "side": "CR",
          "amount_vnd": 1769000
        },
        {
          "posting_id": "B0002-1",
          "line_no": 1,
          "gl_code": "DEP_CASA",
          "side": "DR",
          "amount_vnd": 388000
        },
        {
          "posting_id": "B0002-1",
          "line_no": 2,
          "gl_code": "PAY_CLEAR",
          "side": "CR",
          "amount_vnd": 388000
        },
        {
          "posting_id": "B0003-1",
          "line_no": 1,
          "gl_code": "DEP_CASA",
          "side": "DR",
          "amount_vnd": 2107000
        }
      ]
    },
    {
      "name": "settlement_line",
      "grain": "Mỗi dòng là một lệnh mà đối tác xác nhận đã quyết toán.",
      "key": "settlement_id",
      "fields": [
        {
          "name": "settlement_id",
          "description": "Mã dòng trên bảng kê bên ngoài, độc lập với posting_id."
        },
        {
          "name": "order_id",
          "description": "Mã tham chiếu lệnh gốc để ghép hai phía."
        },
        {
          "name": "settled_on",
          "description": "Ngày ghi nhận trên bảng kê của đối tác, theo ngày địa phương."
        },
        {
          "name": "amount_vnd",
          "description": "Số tiền đối tác ghi nhận đã quyết toán, đơn vị đồng."
        }
      ],
      "rows": 756,
      "file": "settlement_line.csv",
      "preview": [
        {
          "settlement_id": "S0001",
          "order_id": "P0001",
          "settled_on": "2026-05-04",
          "amount_vnd": 1769000
        },
        {
          "settlement_id": "S0002",
          "order_id": "P0002",
          "settled_on": "2026-05-04",
          "amount_vnd": 388000
        },
        {
          "settlement_id": "S0003",
          "order_id": "P0003",
          "settled_on": "2026-05-04",
          "amount_vnd": 2107000
        },
        {
          "settlement_id": "S0004",
          "order_id": "P0004",
          "settled_on": "2026-05-04",
          "amount_vnd": 726000
        },
        {
          "settlement_id": "S0005",
          "order_id": "P0005",
          "settled_on": "2026-05-05",
          "amount_vnd": 2445000
        }
      ]
    },
    {
      "name": "eod_balance",
      "grain": "Mỗi dòng là số dư sổ sách của một tài khoản cuối một ngày.",
      "key": "(account_id, as_of_date)",
      "fields": [
        {
          "name": "account_id",
          "description": "Tài khoản trong bảng account."
        },
        {
          "name": "as_of_date",
          "description": "Ngày chốt sau các lần Core ghi Nợ trong ngày."
        },
        {
          "name": "closing_vnd",
          "description": "Số dư sổ sách cuối ngày trích từ hệ thống đích, dùng để hậu kiểm, đơn vị đồng."
        }
      ],
      "rows": 1600,
      "file": "eod_balance.csv",
      "preview": [
        {
          "account_id": "A0001",
          "as_of_date": "2026-05-04",
          "closing_vnd": 120025000
        },
        {
          "account_id": "A0002",
          "as_of_date": "2026-05-04",
          "closing_vnd": 118656000
        },
        {
          "account_id": "A0003",
          "as_of_date": "2026-05-04",
          "closing_vnd": 118731000
        },
        {
          "account_id": "A0004",
          "as_of_date": "2026-05-04",
          "closing_vnd": 118109000
        },
        {
          "account_id": "A0005",
          "as_of_date": "2026-05-04",
          "closing_vnd": 117487000
        }
      ]
    }
  ],
  "cases": [
    {
      "title": "Một khách hàng có bao nhiêu tài khoản?",
      "question": "Đội báo cáo đếm được 160 dòng trong danh mục tài khoản. Có bao nhiêu khách hàng sở hữu một và hai tài khoản nếu đếm từ danh mục CIF?",
      "method": "Bắt đầu từ customer và LEFT JOIN sang account để vẫn giữ được CIF chưa mở tài khoản. Đếm account_id theo CIF trước, sau đó đếm số CIF theo nhóm.",
      "sql": "WITH ownership AS (\n  SELECT c.cif_id, COUNT(a.account_id) AS accounts\n  FROM customer c\n  LEFT JOIN account a ON a.cif_id = c.cif_id\n  GROUP BY c.cif_id\n)\nSELECT accounts, COUNT(*) AS customers\nFROM ownership\nGROUP BY accounts\nORDER BY accounts;",
      "result": "80 CIF sở hữu một tài khoản và 40 CIF sở hữu hai tài khoản: 120 khách hàng, 160 tài khoản.",
      "why": "Dùng số dòng sau khi nối để báo cáo số khách hàng sẽ đếm lặp các CIF có hai tài khoản."
    },
    {
      "title": "Đếm đúng tỷ lệ chấp nhận khi Hub thử lại",
      "question": "Có bao nhiêu lệnh được chấp nhận, bị từ chối và phải thử lại trong toàn kỳ?",
      "method": "Xếp lần thử mới nhất của mỗi order_id lên đầu. Độ hạt phục vụ KPI là một lệnh; bảng gốc lại có một dòng cho mỗi lần thử.",
      "sql": "WITH ranked AS (\n  SELECT h.*,\n         ROW_NUMBER() OVER (\n           PARTITION BY order_id ORDER BY attempt_no DESC\n         ) AS rn\n  FROM hub_attempt h\n)\nSELECT COUNT(*) AS orders,\n       SUM(status = 'ACCEPTED') AS accepted,\n       SUM(status = 'REJECTED') AS rejected,\n       SUM(attempt_no > 1) AS retried_orders,\n       SUM(attempt_no) AS attempts\nFROM ranked\nWHERE rn = 1;",
      "result": "800 lệnh: 758 được chấp nhận, 42 bị từ chối. 73 lệnh đã thử lại, tạo tổng cộng 873 lượt xử lý.",
      "why": "Trong mẫu này các lần thử được đánh liên tục từ 1. TIMEOUT mô tả thiếu phản hồi ở thời điểm thử; chỉ kết quả sau cùng mới được dùng để phân loại lệnh."
    },
    {
      "title": "Lệnh đã nhận có được ghi Nợ đúng một lần?",
      "question": "Theo dõi các lệnh cuối cùng được Hub chấp nhận. Lệnh nào bị bỏ sót, ghi hai lần hoặc ghi sai số tiền tại Core?",
      "method": "Chọn đích đến bằng trạng thái cuối. Tổng hợp bút toán theo order_id trước khi LEFT JOIN để tìm cả các lệnh có 0 bút toán.",
      "sql": "WITH last_try AS (\n  SELECT order_id, MAX(attempt_no) AS attempt_no\n  FROM hub_attempt GROUP BY order_id\n), posted AS (\n  SELECT order_id, COUNT(*) AS n, SUM(debit_vnd) AS debited\n  FROM core_posting GROUP BY order_id\n)\nSELECT o.order_id, COALESCE(p.n, 0) AS postings,\n       o.amount_vnd, COALESCE(p.debited, 0) AS debited_vnd\nFROM payment_order o\nJOIN last_try t ON t.order_id = o.order_id\nJOIN hub_attempt h ON h.order_id = t.order_id\n                  AND h.attempt_no = t.attempt_no\nLEFT JOIN posted p ON p.order_id = o.order_id\nWHERE h.status = 'ACCEPTED'\n  AND (COALESCE(p.n, 0) <> 1 OR p.debited <> o.amount_vnd)\nORDER BY o.order_id;",
      "result": "P0011 thiếu ghi Nợ; P0013 ghi hai bút toán với tổng 1.394.000 VND cho một lệnh 697.000 VND; P0017 ghi thừa 10.000 VND.",
      "why": "P0013 đã được thử lại tại Hub. Trong bộ này, mỗi order_id được chấp nhận chỉ cho phép một lần ghi Nợ, kể cả sau khi kênh gửi lại."
    },
    {
      "title": "Bút toán nào mất cân đối Nợ – Có?",
      "question": "Kế toán cần đối chiếu từng bút toán trước khi khóa ngày. Mã bút toán nào có chênh lệch và lệch về phía nào?",
      "method": "Tính tổng Nợ và Có theo posting_id, tính chênh Nợ trừ Có. Xuất dòng chi tiết của posting_id tìm được để đối chiếu với sự kiện ghi sổ.",
      "sql": "WITH totals AS (\n  SELECT posting_id,\n         SUM(CASE WHEN side = 'DR' THEN amount_vnd ELSE 0 END) AS dr,\n         SUM(CASE WHEN side = 'CR' THEN amount_vnd ELSE 0 END) AS cr\n  FROM gl_line GROUP BY posting_id\n)\nSELECT posting_id, dr, cr, dr - cr AS diff_vnd\nFROM totals WHERE dr <> cr\nORDER BY posting_id;",
      "result": "B0031-1 có tổng Nợ 639.000 VND và tổng Có 635.000 VND. Vế Có thiếu 4.000 VND.",
      "why": "Ngay cả khi tổng ròng toàn hệ thống nhỏ, hai bút toán lệch trái dấu có thể bù trừ nhau. Kiểm soát này thực hiện ở cấp từng bút toán."
    },
    {
      "title": "Tìm bút toán cân tiền nhưng sai tài khoản GL",
      "question": "Quy tắc sản phẩm là Nợ DEP_CASA và Có PAY_CLEAR. Có vế nào được đưa vào tài khoản khác dù hai phía của bút toán vẫn cân?",
      "method": "So từng vế với mã GL được phép. Giữ order_id và posting_id trong kết quả để truy ngược từ sổ cái về giao dịch gốc.",
      "sql": "SELECT p.order_id, g.posting_id, g.side, g.gl_code, g.amount_vnd\nFROM gl_line g\nJOIN core_posting p ON p.posting_id = g.posting_id\nWHERE (g.side = 'DR' AND g.gl_code <> 'DEP_CASA')\n   OR (g.side = 'CR' AND g.gl_code <> 'PAY_CLEAR')\nORDER BY p.order_id;",
      "result": "P0041 / B0041-1 ghi Có 2.329.000 VND vào SUSPENSE. Theo sơ đồ hạch toán của sản phẩm mẫu, phải ghi Có PAY_CLEAR. Bút toán này vẫn cân Nợ – Có.",
      "why": "Đối chiếu Nợ – Có và kiểm tra mapping trả lời hai câu hỏi khác nhau. Mã GL ở đây được đặt riêng cho bài tập."
    },
    {
      "title": "Tách chênh lệch do giờ cắt và lệnh thiếu thực sự",
      "question": "Với lệnh ngày 04/05/2026 đã vào Core, bao nhiêu lệnh lên bảng kê cùng ngày, bao nhiêu lệnh lên đúng ngày kế do cut-off và bao nhiêu vẫn thiếu?",
      "method": "Mô hình giả định đối tác chốt lúc 17:00 giờ Việt Nam mỗi ngày, kể cả cuối tuần. Dùng EXISTS để một lệnh có hai bút toán Core vẫn chỉ được đếm một lần. Đối chiếu hết bảng kê đến 14/05.",
      "sql": "WITH due AS (\n  SELECT o.order_id, DATE(o.submitted_at) AS order_day,\n         CASE WHEN TIME(o.submitted_at) >= '17:00:00'\n              THEN DATE(o.submitted_at, '+1 day')\n              ELSE DATE(o.submitted_at) END AS due_on\n  FROM payment_order o\n  WHERE DATE(o.submitted_at) = '2026-05-04'\n    AND EXISTS (SELECT 1 FROM core_posting p\n                WHERE p.order_id = o.order_id)\n)\nSELECT SUM(CASE WHEN s.settled_on = d.order_day\n                AND s.settled_on = d.due_on THEN 1 ELSE 0 END) AS same_day,\n       SUM(CASE WHEN d.due_on > d.order_day\n                AND s.settled_on = d.due_on THEN 1 ELSE 0 END) AS next_day,\n       SUM(s.order_id IS NULL) AS missing_at_end\nFROM due d LEFT JOIN settlement_line s ON s.order_id = d.order_id;",
      "result": "Trong các lệnh ngày 04/05 có bút toán Core, 53 lệnh quyết toán cùng ngày, 21 lệnh quyết toán đúng lịch ngày 05/05, 1 lệnh chưa có dòng bảng kê tại cuối kỳ (P0023).",
      "why": "Khi vận hành thật phải xác nhận lịch nghỉ, múi giờ, kênh và quy tắc giờ cắt. Nếu chỉ ghép theo ngày 04/05, các lệnh đúng lịch ngày hôm sau sẽ bị báo lỗi."
    },
    {
      "title": "Đối soát Core với bảng kê quyết toán",
      "question": "Đến hết ngày 14/05/2026, có lệnh nào số tiền giữa hai nguồn không bằng nhau hoặc chỉ xuất hiện ở một phía?",
      "method": "Tổng hợp riêng mỗi nguồn theo order_id rồi lấy tập hợp khóa từ cả hai nguồn. Giữ trạng thái NULL để nhìn thấy ghi nhận thiếu ở từng phía.",
      "sql": "WITH c AS (\n  SELECT order_id, SUM(debit_vnd) AS amt\n  FROM core_posting GROUP BY order_id\n), s AS (\n  SELECT order_id, SUM(amount_vnd) AS amt\n  FROM settlement_line WHERE settled_on <= '2026-05-14'\n  GROUP BY order_id\n), keys AS (\n  SELECT order_id FROM c UNION SELECT order_id FROM s\n)\nSELECT k.order_id, c.amt AS core_vnd, s.amt AS partner_vnd,\n       COALESCE(c.amt, 0) - COALESCE(s.amt, 0) AS diff_vnd\nFROM keys k\nLEFT JOIN c ON c.order_id = k.order_id\nLEFT JOIN s ON s.order_id = k.order_id\nWHERE c.amt IS NULL OR s.amt IS NULL OR c.amt <> s.amt\nORDER BY k.order_id;",
      "result": "Chênh Core trừ đối tác: P0013 +697.000 VND, P0017 +10.000 VND, P0023 +2.387.000 VND (thiếu bảng kê), P0029 +25.000 VND.",
      "why": "P0011 thiếu ở cả Core và đối tác nên không xuất hiện trong hai nguồn này. Đối chiếu Hub với Core ở bài trước mới phát hiện được lệnh đó."
    },
    {
      "title": "Tái lập số dư cuối ngày để nghiệm thu migration",
      "question": "Từ số dư đầu 04/05 và tất cả các lần ghi Nợ, tái lập số dư cuối mỗi ngày cho từng tài khoản. Tài khoản nào trên snapshot đích bị lệch?",
      "method": "Trong phạm vi lab chỉ có chuyển tiền đi, không có lãi, phí hay phát sinh Có. Tổng hợp ghi Nợ theo tài khoản và ngày, sau đó cộng dồn và lấy số dư đầu kỳ trừ tổng đã ghi Nợ. Ngày không có giao dịch được tính 0.",
      "sql": "WITH activity AS (\n  SELECT o.account_id, DATE(p.booked_at) AS d,\n         SUM(p.debit_vnd) AS debits\n  FROM core_posting p\n  JOIN payment_order o ON o.order_id = p.order_id\n  GROUP BY o.account_id, DATE(p.booked_at)\n), rebuilt AS (\n  SELECT e.account_id, e.as_of_date, e.closing_vnd,\n         a.opening_vnd - SUM(COALESCE(x.debits, 0)) OVER (\n           PARTITION BY e.account_id ORDER BY e.as_of_date\n           ROWS UNBOUNDED PRECEDING) AS expected\n  FROM eod_balance e JOIN account a ON a.account_id = e.account_id\n  LEFT JOIN activity x ON x.account_id = e.account_id\n                        AND x.d = e.as_of_date\n)\nSELECT account_id, as_of_date, expected, closing_vnd,\n       closing_vnd - expected AS diff_vnd\nFROM rebuilt WHERE closing_vnd <> expected\nORDER BY account_id, as_of_date;",
      "result": "A0037 ngày 13/05 có số dư tính lại 113.042.000 VND, số dư snapshot 113.049.000 VND. Snapshot cao hơn 7.000 VND.",
      "why": "Bài này kiểm tra giá trị số dư trên các snapshot hiện diện. Trước khi áp dụng ngoài mẫu, cần kiểm thêm đủ mọi cặp tài khoản–ngày và đưa đầy đủ nghiệp vụ phát sinh vào công thức."
    },
    {
      "title": "Chọn đúng chỉ tiêu cho dashboard vận hành",
      "question": "Khi nhóm Power BI hỏi “đã xử lý bao nhiêu”, hãy trả riêng số lệnh đã vào Core, số lần ghi Nợ và tổng số tiền thực sự bị trừ trong toàn kỳ.",
      "method": "Bảng fact phù hợp cho tác động đến số dư là core_posting. Đếm riêng order_id để có số lệnh, đếm posting_id để có số bút toán và cộng debit_vnd để có tiền.",
      "sql": "SELECT COUNT(DISTINCT order_id) AS posted_orders,\n       COUNT(posting_id) AS debit_postings,\n       SUM(debit_vnd) AS actual_debit_vnd\nFROM core_posting;",
      "result": "757 lệnh thực sự đã vào Core, 758 lần ghi Nợ, tổng số tiền ghi Nợ sổ chi tiết 1.219.765.000 VND. Số liệu bao gồm lần ghi thừa của P0013.",
      "why": "Khi đưa gl_line vào mô hình, một bút toán có hai dòng GL. Nếu cộng debit_vnd sau khi nối thẳng xuống gl_line, báo cáo sẽ nhân đôi số tiền."
    }
  ],
  "files": [
    {
      "file": "corebankx-lab.zip",
      "label": "Tải bộ thực hành đầy đủ (.zip)"
    },
    {
      "file": "corebankx-payments.db",
      "label": "Cơ sở dữ liệu SQLite đã nạp (.db)"
    },
    {
      "file": "exercises.sql",
      "label": "9 truy vấn kèm đáp án (.sql)"
    },
    {
      "file": "data-dictionary.csv",
      "label": "Từ điển trường dữ liệu (.csv)"
    },
    {
      "file": "README.txt",
      "label": "Hướng dẫn thực hành (.txt)"
    }
  ]
};
