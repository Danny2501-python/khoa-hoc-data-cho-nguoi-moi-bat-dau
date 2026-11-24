-- Chon database thuc hanh truoc khi chay trong SSMS.
SET XACT_ABORT ON;
BEGIN TRANSACTION;
IF OBJECT_ID(N'dbo.DataLabHoSo', N'U') IS NULL
BEGIN
 CREATE TABLE dbo.DataLabHoSo (MaHS varchar(12) PRIMARY KEY, NgayNhan date, Tuan int, ChiNhanh nvarchar(60), NghiepVu nvarchar(60), TrangThai nvarchar(40), XuLyPhut int NULL, SLAPhut int, LyDoTre nvarchar(120));
 INSERT INTO dbo.DataLabHoSo (MaHS,NgayNhan,Tuan,ChiNhanh,NghiepVu,TrangThai,XuLyPhut,SLAPhut,LyDoTre) VALUES
(N'HS001',N'2026-11-02',N'1',N'Hà Nội',N'Chuyển tiền',N'Đã đóng',N'12',N'30',NULL),
(N'HS002',N'2026-11-02',N'1',N'Đà Nẵng',N'Hồ sơ thẻ',N'Đã đóng',N'45',N'60',NULL),
(N'HS003',N'2026-11-03',N'1',N'Hà Nội',N'Hồ sơ thẻ',N'Đã đóng',N'83',N'60',N'Thiếu chứng từ'),
(N'HS004',N'2026-11-03',N'1',N'Cần Thơ',N'Chuyển tiền',N'Đã đóng',N'30',N'30',NULL),
(N'HS005',N'2026-11-04',N'1',N'Đà Nẵng',N'Chuyển tiền',N'Đã đóng',N'18',N'30',NULL),
(N'HS006',N'2026-11-04',N'1',N'Cần Thơ',N'Hồ sơ thẻ',N'Đã đóng',N'48',N'60',NULL),
(N'HS007',N'2026-11-05',N'1',N'Hà Nội',N'Chuyển tiền',N'Đã đóng',N'25',N'30',NULL),
(N'HS008',N'2026-11-05',N'1',N'Cần Thơ',N'Chuyển tiền',N'Đã đóng',N'42',N'30',N'Lỗi hệ thống'),
(N'HS009',N'2026-11-06',N'1',N'Đà Nẵng',N'Hồ sơ thẻ',N'Đã đóng',N'60',N'60',NULL),
(N'HS010',N'2026-11-06',N'1',N'Hà Nội',N'Hồ sơ thẻ',N'Đã đóng',N'36',N'60',NULL),
(N'HS011',N'2026-11-06',N'1',N'Đà Nẵng',N'Chuyển tiền',N'Đang xử lý',NULL,N'30',NULL),
(N'HS012',N'2026-11-06',N'1',N'Cần Thơ',N'Hồ sơ thẻ',N'Đang xử lý',NULL,N'60',NULL),
(N'HS013',N'2026-11-09',N'2',N'Hà Nội',N'Hồ sơ thẻ',N'Đã đóng',N'95',N'60',N'Thiếu chứng từ'),
(N'HS014',N'2026-11-09',N'2',N'Cần Thơ',N'Chuyển tiền',N'Đã đóng',N'24',N'30',NULL),
(N'HS015',N'2026-11-10',N'2',N'Đà Nẵng',N'Chuyển tiền',N'Đã đóng',N'22',N'30',NULL),
(N'HS016',N'2026-11-10',N'2',N'Hà Nội',N'Hồ sơ thẻ',N'Đã đóng',N'78',N'60',N'Thiếu chứng từ'),
(N'HS017',N'2026-11-11',N'2',N'Cần Thơ',N'Hồ sơ thẻ',N'Đã đóng',N'55',N'60',NULL),
(N'HS018',N'2026-11-11',N'2',N'Đà Nẵng',N'Chuyển tiền',N'Đã đóng',N'38',N'30',N'Lỗi hệ thống'),
(N'HS019',N'2026-11-12',N'2',N'Cần Thơ',N'Chuyển tiền',N'Đã đóng',N'16',N'30',NULL),
(N'HS020',N'2026-11-12',N'2',N'Đà Nẵng',N'Hồ sơ thẻ',N'Đã đóng',N'43',N'60',NULL),
(N'HS021',N'2026-11-13',N'2',N'Hà Nội',N'Hồ sơ thẻ',N'Đã đóng',N'74',N'60',N'Thiếu chứng từ'),
(N'HS022',N'2026-11-13',N'2',N'Hà Nội',N'Chuyển tiền',N'Đã đóng',N'28',N'30',NULL),
(N'HS023',N'2026-11-13',N'2',N'Đà Nẵng',N'Hồ sơ thẻ',N'Đang xử lý',NULL,N'60',NULL),
(N'HS024',N'2026-11-13',N'2',N'Cần Thơ',N'Chuyển tiền',N'Đang xử lý',NULL,N'30',NULL);
END;
COMMIT;
SELECT COUNT(*) AS SoHoSo FROM dbo.DataLabHoSo;
