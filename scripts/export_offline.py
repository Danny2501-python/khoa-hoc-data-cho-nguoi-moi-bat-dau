"""Build the self-contained student edition, including SQLite and sample files."""
from base64 import b64encode
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parents[1] / "dist"
def data_url(path, mime):
    return "data:" + mime + ";base64," + b64encode(path.read_bytes()).decode("ascii")

source = (root / "index.html").read_text()
source = re.sub(r'<meta http-equiv="Content-Security-Policy" content="[^"]*">', "", source)
def inline_style(match):
    return "<style>" + (root / match.group(1)).read_text() + "</style>"
source = re.sub(r'<link rel="stylesheet" href="([\w-]+\.css)">', inline_style, source)
types = {".csv":"text/csv;charset=utf-8", ".db":"application/vnd.sqlite3", ".zip":"application/zip", ".sql":"text/plain;charset=utf-8", ".txt":"text/plain;charset=utf-8"}
csvs = {f.relative_to(root).as_posix(): data_url(f, types[f.suffix]) for f in sorted((root / "data").rglob("*")) if f.is_file() and f.suffix in types}
engine = data_url(root / "vendor/sql-asm.js", "text/javascript")
prefix = "<script>window.OFFLINE_CSV="+json.dumps(csvs)+";window.OFFLINE_ENGINE="+json.dumps(engine)+";</script>"
source = source.replace('<script src="course.js">',prefix+'<script src="course.js">')
hero = data_url(root / "hero-art.webp", "image/webp")
def inline_script(match):
    script = (root / match.group(1)).read_text().replace('src="hero-art.webp"', 'src="' + hero + '"')
    return '<script>' + script.replace('</script', '<\\/script') + '</script>'
source = re.sub(r'<script src="([\w-]+\.js)"></script>', inline_script, source)
(root / "DataLab_offline.html").write_text(source)

