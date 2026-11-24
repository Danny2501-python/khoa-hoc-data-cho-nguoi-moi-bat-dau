-- 1. Một khách hàng có bao nhiêu tài khoản?
-- Đội báo cáo đếm được 160 dòng trong danh mục tài khoản. Có bao nhiêu khách hàng sở hữu một và hai tài khoản nếu đếm từ danh mục CIF?
WITH ownership AS (
  SELECT c.cif_id, COUNT(a.account_id) AS accounts
  FROM customer c
  LEFT JOIN account a ON a.cif_id = c.cif_id
  GROUP BY c.cif_id
)
SELECT accounts, COUNT(*) AS customers
FROM ownership
GROUP BY accounts
ORDER BY accounts;
-- Đáp án: 80 CIF sở hữu một tài khoản và 40 CIF sở hữu hai tài khoản: 120 khách hàng, 160 tài khoản.

-- 2. Đếm đúng tỷ lệ chấp nhận khi Hub thử lại
-- Có bao nhiêu lệnh được chấp nhận, bị từ chối và phải thử lại trong toàn kỳ?
WITH ranked AS (
  SELECT h.*,
         ROW_NUMBER() OVER (
           PARTITION BY order_id ORDER BY attempt_no DESC
         ) AS rn
  FROM hub_attempt h
)
SELECT COUNT(*) AS orders,
       SUM(status = 'ACCEPTED') AS accepted,
       SUM(status = 'REJECTED') AS rejected,
       SUM(attempt_no > 1) AS retried_orders,
       SUM(attempt_no) AS attempts
FROM ranked
WHERE rn = 1;
-- Đáp án: 800 lệnh: 758 được chấp nhận, 42 bị từ chối. 73 lệnh đã thử lại, tạo tổng cộng 873 lượt xử lý.

-- 3. Lệnh đã nhận có được ghi Nợ đúng một lần?
-- Theo dõi các lệnh cuối cùng được Hub chấp nhận. Lệnh nào bị bỏ sót, ghi hai lần hoặc ghi sai số tiền tại Core?
WITH last_try AS (
  SELECT order_id, MAX(attempt_no) AS attempt_no
  FROM hub_attempt GROUP BY order_id
), posted AS (
  SELECT order_id, COUNT(*) AS n, SUM(debit_vnd) AS debited
  FROM core_posting GROUP BY order_id
)
SELECT o.order_id, COALESCE(p.n, 0) AS postings,
       o.amount_vnd, COALESCE(p.debited, 0) AS debited_vnd
FROM payment_order o
JOIN last_try t ON t.order_id = o.order_id
JOIN hub_attempt h ON h.order_id = t.order_id
                  AND h.attempt_no = t.attempt_no
LEFT JOIN posted p ON p.order_id = o.order_id
WHERE h.status = 'ACCEPTED'
  AND (COALESCE(p.n, 0) <> 1 OR p.debited <> o.amount_vnd)
ORDER BY o.order_id;
-- Đáp án: P0011 thiếu ghi Nợ; P0013 ghi hai bút toán với tổng 1.394.000 VND cho một lệnh 697.000 VND; P0017 ghi thừa 10.000 VND.

-- 4. Bút toán nào mất cân đối Nợ – Có?
-- Kế toán cần đối chiếu từng bút toán trước khi khóa ngày. Mã bút toán nào có chênh lệch và lệch về phía nào?
WITH totals AS (
  SELECT posting_id,
         SUM(CASE WHEN side = 'DR' THEN amount_vnd ELSE 0 END) AS dr,
         SUM(CASE WHEN side = 'CR' THEN amount_vnd ELSE 0 END) AS cr
  FROM gl_line GROUP BY posting_id
)
SELECT posting_id, dr, cr, dr - cr AS diff_vnd
FROM totals WHERE dr <> cr
ORDER BY posting_id;
-- Đáp án: B0031-1 có tổng Nợ 639.000 VND và tổng Có 635.000 VND. Vế Có thiếu 4.000 VND.

-- 5. Tìm bút toán cân tiền nhưng sai tài khoản GL
-- Quy tắc sản phẩm là Nợ DEP_CASA và Có PAY_CLEAR. Có vế nào được đưa vào tài khoản khác dù hai phía của bút toán vẫn cân?
SELECT p.order_id, g.posting_id, g.side, g.gl_code, g.amount_vnd
FROM gl_line g
JOIN core_posting p ON p.posting_id = g.posting_id
WHERE (g.side = 'DR' AND g.gl_code <> 'DEP_CASA')
   OR (g.side = 'CR' AND g.gl_code <> 'PAY_CLEAR')
ORDER BY p.order_id;
-- Đáp án: P0041 / B0041-1 ghi Có 2.329.000 VND vào SUSPENSE. Theo sơ đồ hạch toán của sản phẩm mẫu, phải ghi Có PAY_CLEAR. Bút toán này vẫn cân Nợ – Có.

-- 6. Tách chênh lệch do giờ cắt và lệnh thiếu thực sự
-- Với lệnh ngày 04/05/2026 đã vào Core, bao nhiêu lệnh lên bảng kê cùng ngày, bao nhiêu lệnh lên đúng ngày kế do cut-off và bao nhiêu vẫn thiếu?
WITH due AS (
  SELECT o.order_id, DATE(o.submitted_at) AS order_day,
         CASE WHEN TIME(o.submitted_at) >= '17:00:00'
              THEN DATE(o.submitted_at, '+1 day')
              ELSE DATE(o.submitted_at) END AS due_on
  FROM payment_order o
  WHERE DATE(o.submitted_at) = '2026-05-04'
    AND EXISTS (SELECT 1 FROM core_posting p
                WHERE p.order_id = o.order_id)
)
SELECT SUM(CASE WHEN s.settled_on = d.order_day
                AND s.settled_on = d.due_on THEN 1 ELSE 0 END) AS same_day,
       SUM(CASE WHEN d.due_on > d.order_day
                AND s.settled_on = d.due_on THEN 1 ELSE 0 END) AS next_day,
       SUM(s.order_id IS NULL) AS missing_at_end
FROM due d LEFT JOIN settlement_line s ON s.order_id = d.order_id;
-- Đáp án: Trong các lệnh ngày 04/05 có bút toán Core, 53 lệnh quyết toán cùng ngày, 21 lệnh quyết toán đúng lịch ngày 05/05, 1 lệnh chưa có dòng bảng kê tại cuối kỳ (P0023).

-- 7. Đối soát Core với bảng kê quyết toán
-- Đến hết ngày 14/05/2026, có lệnh nào số tiền giữa hai nguồn không bằng nhau hoặc chỉ xuất hiện ở một phía?
WITH c AS (
  SELECT order_id, SUM(debit_vnd) AS amt
  FROM core_posting GROUP BY order_id
), s AS (
  SELECT order_id, SUM(amount_vnd) AS amt
  FROM settlement_line WHERE settled_on <= '2026-05-14'
  GROUP BY order_id
), keys AS (
  SELECT order_id FROM c UNION SELECT order_id FROM s
)
SELECT k.order_id, c.amt AS core_vnd, s.amt AS partner_vnd,
       COALESCE(c.amt, 0) - COALESCE(s.amt, 0) AS diff_vnd
FROM keys k
LEFT JOIN c ON c.order_id = k.order_id
LEFT JOIN s ON s.order_id = k.order_id
WHERE c.amt IS NULL OR s.amt IS NULL OR c.amt <> s.amt
ORDER BY k.order_id;
-- Đáp án: Chênh Core trừ đối tác: P0013 +697.000 VND, P0017 +10.000 VND, P0023 +2.387.000 VND (thiếu bảng kê), P0029 +25.000 VND.

-- 8. Tái lập số dư cuối ngày để nghiệm thu migration
-- Từ số dư đầu 04/05 và tất cả các lần ghi Nợ, tái lập số dư cuối mỗi ngày cho từng tài khoản. Tài khoản nào trên snapshot đích bị lệch?
WITH activity AS (
  SELECT o.account_id, DATE(p.booked_at) AS d,
         SUM(p.debit_vnd) AS debits
  FROM core_posting p
  JOIN payment_order o ON o.order_id = p.order_id
  GROUP BY o.account_id, DATE(p.booked_at)
), rebuilt AS (
  SELECT e.account_id, e.as_of_date, e.closing_vnd,
         a.opening_vnd - SUM(COALESCE(x.debits, 0)) OVER (
           PARTITION BY e.account_id ORDER BY e.as_of_date
           ROWS UNBOUNDED PRECEDING) AS expected
  FROM eod_balance e JOIN account a ON a.account_id = e.account_id
  LEFT JOIN activity x ON x.account_id = e.account_id
                        AND x.d = e.as_of_date
)
SELECT account_id, as_of_date, expected, closing_vnd,
       closing_vnd - expected AS diff_vnd
FROM rebuilt WHERE closing_vnd <> expected
ORDER BY account_id, as_of_date;
-- Đáp án: A0037 ngày 13/05 có số dư tính lại 113.042.000 VND, số dư snapshot 113.049.000 VND. Snapshot cao hơn 7.000 VND.

-- 9. Chọn đúng chỉ tiêu cho dashboard vận hành
-- Khi nhóm Power BI hỏi “đã xử lý bao nhiêu”, hãy trả riêng số lệnh đã vào Core, số lần ghi Nợ và tổng số tiền thực sự bị trừ trong toàn kỳ.
SELECT COUNT(DISTINCT order_id) AS posted_orders,
       COUNT(posting_id) AS debit_postings,
       SUM(debit_vnd) AS actual_debit_vnd
FROM core_posting;
-- Đáp án: 757 lệnh thực sự đã vào Core, 758 lần ghi Nợ, tổng số tiền ghi Nợ sổ chi tiết 1.219.765.000 VND. Số liệu bao gồm lần ghi thừa của P0013.

