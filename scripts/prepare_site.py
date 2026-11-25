"""Restore the packaged lesson videos into the static DataLab site."""

from pathlib import Path, PurePosixPath
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
BUNDLES = ROOT / "media" / "engineering"
VIDEO_DIR = ROOT / "dist" / "data" / "engineering" / "videos"
COURSES = (0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13)
EXPECTED = {f"{course}/{day:02}.mp4" for course in COURSES for day in range(1, 31)}


def main():
    sources = {}
    for bundle in sorted(BUNDLES.glob("*.zip")):
        with ZipFile(bundle) as archive:
            for name in archive.namelist():
                if name not in EXPECTED or name in sources:
                    raise ValueError(f"Unexpected or duplicate video: {name} in {bundle.name}")
                sources[name] = bundle

    missing = EXPECTED - sources.keys()
    if missing:
        raise ValueError(f"Missing videos: {', '.join(sorted(missing))}")

    for bundle in sorted(set(sources.values())):
        with ZipFile(bundle) as archive:
            for name in archive.namelist():
                target = VIDEO_DIR.joinpath(*PurePosixPath(name).parts)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(archive.read(name))

    print(f"Prepared {len(sources)} lesson videos in dist/.")


if __name__ == "__main__":
    main()
