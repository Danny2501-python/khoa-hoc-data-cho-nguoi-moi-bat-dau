const fs = require("node:fs");
const vm = require("node:vm");
const context = vm.createContext({});
vm.runInContext(fs.readFileSync("dist/advanced-track.js", "utf8") + ";this.lessons=advancedTrack", context);

const definitions = {
  HoSo: "MaHS ChiNhanh NgayNhan TrangThai XuLyPhut:INTEGER SLAPhut:INTEGER Kenh",
  LichSu: "MaHS ThoiDiem SuKien:INTEGER TrangThai NgayNap",
  DimCN: "ChiNhanh Vung",
  SoNoiBo: "MaGD ChiNhanh NgayGD SoTienVND:INTEGER Loai Batch",
  SaoKe: "MaGD ChiNhanh NgayGD SoTienVND:INTEGER Loai Batch",
  Lich: "Ngay LamViec:INTEGER",
  Marketing: "MaQuanSat Job Education Contact Month Campaign:INTEGER Duration:INTEGER Y NgayQuanSat",
  CreditCard: "MaHoSo DiemRuiRo:INTEGER DefaultNextMonth:INTEGER DuNo:INTEGER",
  KeHoach: "ChiNhanh NgayGD MucTieu:INTEGER",
  Quyen: "NguoiDung ChiNhanh",
  NhatKy: "Batch NgayGD SoDongKyVong:INTEGER SoDongDaNap:INTEGER TrangThai",
  KhoaCu: "MaCu MaGD",
};

const intermediate = [
  "HoSo LichSu", "HoSo", "HoSo", "SoNoiBo SaoKe DimCN", "HoSo DimCN Lich", "HoSo DimCN Lich",
  "Marketing", "Marketing", "Marketing", "Marketing", "Marketing", "SoNoiBo SaoKe",
  "SoNoiBo SaoKe", "SoNoiBo SaoKe", "SoNoiBo", "SoNoiBo", "SoNoiBo Lich", "SoNoiBo", "SoNoiBo Lich",
  "Marketing", "Marketing", "SoNoiBo DimCN", "HoSo Lich", "HoSo DimCN", "Marketing", "SoNoiBo SaoKe DimCN",
  "SoNoiBo", "SoNoiBo DimCN", "HoSo LichSu", "HoSo DimCN Lich",
];
const advanced = [
  "LichSu HoSo", "SoNoiBo HoSo DimCN Lich", "HoSo Lich DimCN", "SoNoiBo DimCN Lich", "LichSu NhatKy",
  "HoSo SoNoiBo KeHoach DimCN Lich Quyen", "SoNoiBo", "SoNoiBo Lich", "SoNoiBo DimCN", "SoNoiBo KhoaCu",
  "SoNoiBo Lich", "LichSu Lich", "LichSu HoSo", "SoNoiBo SaoKe NhatKy", "SoNoiBo NhatKy",
  "LichSu NhatKy", "Marketing", "Marketing", "CreditCard", "Marketing", "SoNoiBo DimCN", "HoSo DimCN Lich",
  "SoNoiBo Lich", "SoNoiBo DimCN Quyen", "SoNoiBo NhatKy", "LichSu HoSo", "SoNoiBo DimCN Lich",
  "SoNoiBo DimCN", "SoNoiBo SaoKe DimCN Lich NhatKy", "SoNoiBo SaoKe DimCN Lich NhatKy Quyen KeHoach",
];

function makeDataset(level, number) {
  const isAdvanced = level === "A";
  const id = level + String(number).padStart(2, "0");
  let state = (isAdvanced ? 89209 : 30113) + number * 1429;
  function sample(n) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return (state >>> 9) % n;
  }
  const dates = Array.from({length: 35}, (_, i) =>
    new Date(Date.UTC(isAdvanced ? 2026 : 2025, (number - 1) % 12, ((number - 1) / 12 | 0) * 7 + i + 1)).toISOString().slice(0, 10));
  const branch = ["Hà Nội", "Đà Nẵng", "TP.HCM", "Cần Thơ"];
  const branches = branch.map(city => city + " " + id);
  const size = isAdvanced ? (number === 19 ? 1200 : 220 + 17 * number) :
    (number === 14 ? 3000 : number === 11 ? 2400 : 38 + 9 * number);
  const ref = (kind, i) => id + "-" + kind + String(i + 1).padStart(5, "0");
  const caseRows = Array.from({length: size}, (_, i) => [
    ref("HS", i), branches[i % 4], dates[(i * 5 + sample(21)) % 35],
    (i % 7 === 0 || (!isAdvanced && number === 24 && i % 4 === 3)) ? "Mở" : "Đã đóng",
    i % 7 === 0 ? null : 20 + sample(20) * 5, 60 + 15 * sample(4), ["Quầy", "Ứng dụng", "Web"][sample(3)],
  ]);
  const bookRows = Array.from({length: size}, (_, i) => [
    ref("GD", i), branches[i % 4], dates[(i * 3 + sample(22)) % 34],
    i % 19 === 0 ? 1000000 : (20 + sample(60)) * 50000,
    ["Chuyển khoản", "Thu nợ", "Tiền gửi", "Phí dịch vụ"][sample(4)], i < Math.ceil(size / 2) ? id + "-B1" : id + "-B2",
  ]);
  const history = caseRows.flatMap(([key, , day, status], i) => [
    [key, day + " 09:00:00", 2 * i + 1, "Mở", day],
    [key, day + (i % 5 === 0 ? " 09:00:00" : " 16:00:00"), 2 * i + 2, status,
      i % 6 === 0 ? dates[Math.min(34, dates.indexOf(day) + 4)] : day],
  ]);
  const statement = bookRows.filter((r, i) =>
    (isAdvanced && number === 14 ? r[5].endsWith("B1") : i % 23 !== 0)).map((row, i) =>
    row.map((value, field) => field === 3 && i % 17 === 0 ? value + 25000 : value));
  statement.push([ref("EXT", 0), branches[1], dates[5], 355000, "Chuyển khoản", id + "-B1"]);
  const names = (isAdvanced ? advanced : intermediate)[number - 1].split(" ");
  const records = {
    HoSo: caseRows.map(row => row[3] === "Mở" ? row.map((value, column) => column === 4 ? null : value) : row),
    LichSu: history,
    SoNoiBo: isAdvanced && number === 15 ? [...bookRows, ...bookRows.slice(0, 14)] :
      isAdvanced && number === 25 ? bookRows.filter(row => row[5].endsWith("B1")) : bookRows,
    SaoKe: statement,
    DimCN: branches.map((name, i) => [name, ["Bắc", "Trung", "Nam", "Tây Nam"][i]]),
    Lich: dates.map(day => [day, new Date(day).getUTCDay() % 6 === 0 ? 0 : 1]),
    Marketing: Array.from({length: size}, (_, i) => {
      const day = dates[Math.floor(i * dates.length / size)];
      const yes = sample(100) < (i % 4 === 0 ? 45 : 24);
      return [ref("QS", !isAdvanced && number === 21 && i % 41 === 40 ? i - 1 : i), ["admin", "sales", "services", "technical"][i % 4],
        sample(isAdvanced && number === 20 && i >= size / 2 ? 3 : 8) === 0 ? "unknown" : ["basic", "university"][sample(2)],
        ["cellular", "telephone"][sample(2)], ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"][sample(12)],
        i % 17 === 0 && [20,21].includes(number) ? null : 1 + sample(8),
        yes ? 170 + sample(380) : 30 + sample(260), yes ? "yes" : "no", day];
    }),
    CreditCard: Array.from({length: size}, (_, i) => {
      const score = sample(1000);
      return [ref("TD", i), score, Number(sample(1100) < score * 0.65), 2000000 + sample(900) * 100000];
    }),
    KeHoach: dates.filter((_, i) => i % 7 === 0).flatMap(day => branches.map(city => [city, day, 5 + sample(15)])),
    Quyen: [["multi-" + id, branches[0]], ["multi-" + id, branches[2]], ["one-" + id, branches[1]]],
    NhatKy: [0, 1].map(i => {
      const expected = i ? Math.floor(size / 2) : Math.ceil(size / 2);
      const missing = i && [14, 25, 29, 30].includes(number);
      return [id + "-B" + (i + 1), dates[i * 7], expected, missing ? 0 : expected, missing ? "Thiếu" : "Hoàn tất"];
    }),
    KhoaCu: bookRows.map(([id], i) => [String(i + 1).padStart(7, "0"), id]),
  };
  const tables = Object.fromEntries(names.map(name => {
    const fields = definitions[name].split(" ").map(field => field.split(":"));
    return [name, {cols: fields.map(f => f[0]), types: fields.map(f => f[1] || "TEXT"), rows: records[name]}];
  }));
  return {id, tables};
}

const tracks = Object.fromEntries(context.lessons.map(([level, n]) => [level + n, makeDataset(level, Number(n))]));
const csvCell = value => value == null ? "" : '"' + String(value).replaceAll('"', '""') + '"';
for (const {id, tables} of Object.values(tracks)) {
  const folder = "dist/data/track/" + id;
  fs.mkdirSync(folder, {recursive: true});
  for (const [name, {cols, rows}] of Object.entries(tables)) {
    const delimiter = ["I08", "I20"].includes(id) ? ";" : ",";
    fs.writeFileSync(folder + "/" + name + ".csv", "\uFEFF" + [cols, ...rows].map(row => row.map(csvCell).join(delimiter)).join("\r\n") + "\r\n");
  }
}
fs.writeFileSync("dist/advanced-data.js", "const trackDatasets = " + JSON.stringify(tracks) + ";\n");
