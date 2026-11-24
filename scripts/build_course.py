"""Compile the learner's curriculum and validate its links, pages and SQLite examples."""
from pathlib import Path
import csv
import json
import sqlite3

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "curriculum"
OUT = ROOT / "dist"

def load(name):
    return json.loads((SRC / name).read_text())

books = {b[0]: b for b in load("books.json")}
videos = load("videos.json")
examples = load("examples.json")
days = []
for month in range(1, 4):
    rows = (SRC / f"month{month}.txt").read_text().strip().splitlines()
    assert len(rows) == 30
    for row in rows:
        title, goal, ref, read, steps, output, quiz, answers, why = row.split("|")
        book, pages = ref.split(":")
        assert 1 <= int(pages.split("–")[0]) <= int(pages.split("–")[-1]) <= books[book][3]
        day = len(days) + 1
        days.append(dict(n=day,title=title,goal=goal,book=book,pages=pages,read=read,
            steps=steps.split("~"),output=output,q=quiz,answers=answers.split(";"),why=why,code=examples.get(str(day),"")))
assert len(set(x["title"] for x in days)) == len(days)
assert len(set(x["book"] for x in days)) == 12

tables = {}
db = sqlite3.connect(":memory:")
for table, filename in [("HoSo","ho-so-van-hanh"),("NoiBo","so-noi-bo"),("DoiTac","sao-ke-doi-tac")]:
    with (OUT / "data" / (filename+".csv")).open(encoding="utf-8-sig") as f:
        raw = csv.reader(f)
        columns = next(raw)
        nums = {"Tuan","XuLyPhut","SLAPhut","SoTienVND"}
        rows = [[None if not v else int(v) if c in nums else v for c,v in zip(columns,row)] for row in raw]
    types = ["INTEGER" if c in nums else "TEXT" for c in columns]
    tables[table] = dict(cols=columns,types=types,rows=rows)
    db.execute(f"CREATE TABLE {table} ("+",".join(c+" "+t for c,t in zip(columns,types))+")")
    db.executemany(f"INSERT INTO {table} VALUES ("+",".join("?" for _ in columns)+")", rows)
for day in days[30:45]:
    result = db.execute(day["code"]).fetchall()
    assert result,day["title"]

# Index directly into the verified playlist snapshot, using its own video order.
video_map = {30:("sql",[1,2,3]),31:("sql",[4,7]),32:("sql",[12,13]),33:("sql",[5]),34:("sql",[6,10]),
35:("sql",[18]),36:("sql",[11,13]),37:("sql",[8,9]),38:("sql",[19]),39:("sql",[21]),
40:("sql",[23,26]),41:("sql",[26,27]),42:("sql",[25]),43:("sql",[28,29]),44:("sql",[31]),
45:("sql",[22,30]),54:("sql",[20]),60:("sql",[24]),61:("bi",[1]),62:("bi",[2]),
63:("bi",[3,17]),64:("bi",[4]),65:("bi",[5]),66:("bi",[6]),67:("bi",[8,9]),
68:("bi",[10,15]),69:("bi",[11,16]),70:("bi",[13]),75:("bi",[11]),78:("bi",[12]),
83:("bi",[7]),85:("bi",[14])}
for day,(key,ns) in video_map.items():
    assert all(0<n<=len(videos[key]["items"]) for n in ns)
    days[day-1]["videos"] = [key,ns]
pack = {"days":days,"books":books,"videos":videos,"tables":tables}
(OUT/"program.js").write_text("window.PROGRAM = "+json.dumps(pack,ensure_ascii=False,separators=(",",":"))+";\n")
print("90 days, 12 sources, 2 playlists and 15 SQLite examples verified.")

