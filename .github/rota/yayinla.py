"""Bu ayın rota paketlerini standby/config.json'a yazar ve artık kullanılmayan eski sürümleri siler.

Kullanım: python3 yayinla.py <etiket>   (ör. rota-2026-12-03; GH_TOKEN ve GITHUB_REPOSITORY gerekir)
Bu ay üretilemeyen ülke önceki aydaki paketiyle kalır; ulkeler.txt'den çıkarılan ülke listeden düşer.
Silinen sürüm yalnızca ne yeni ne de eski config.json'ın gösterdiği sürümdür (yarıda kalan indirmeler bozulmasın).
"""
import json, os, subprocess, sys

TAG = sys.argv[1]
REPO = os.environ["GITHUB_REPOSITORY"]
CONFIG = "standby/config.json"
HERE = os.path.dirname(os.path.abspath(__file__))


def gh(*args):
    return subprocess.run(["gh", *args, "-R", REPO], check=True, capture_output=True, text=True).stdout


def tag_of(url):
    return url.split("/releases/download/")[1].split("/")[0]


ids = [l.split()[0] for l in open(os.path.join(HERE, "ulkeler.txt"), encoding="utf-8")
       if l.strip() and not l.startswith("#")]
assets = {a["name"][:-4]: a["size"] for a in json.loads(gh("release", "view", TAG, "--json", "assets"))["assets"]
          if a["name"].endswith(".zip")}

config = json.load(open(CONFIG, encoding="utf-8"))
old = {p["id"]: p for p in config.get("routingPacks", [])}
packs = []
for i in ids:
    if i in assets:
        packs.append({"id": i, "url": f"https://github.com/{REPO}/releases/download/{TAG}/{i}.zip",
                      "bytes": assets[i], "version": TAG.removeprefix("rota-")})
    elif i in old:
        print(f"{i}: bu ay üretilemedi, önceki paket kalıyor", file=sys.stderr)
        packs.append(old[i])
config["routingPacks"] = packs
with open(CONFIG, "w", encoding="utf-8", newline="\n") as f:
    json.dump(config, f, ensure_ascii=False, indent=2)
    f.write("\n")

keep = {tag_of(p["url"]) for p in packs} | {tag_of(p["url"]) for p in old.values()}
for t in json.loads(gh("release", "list", "--limit", "100", "--json", "tagName")):
    name = t["tagName"]
    if name.startswith("rota-") and name not in keep:
        print(f"siliniyor: {name}")
        gh("release", "delete", name, "--yes", "--cleanup-tag")

print(f"{len(packs)} paket: " + ", ".join(p["id"] for p in packs))
missing = [i for i in ids if i not in assets]
if missing:
    print(f"Bu ay üretilemeyenler: {', '.join(missing)} (iş günlüğündeki kırmızı adımlara bakın)", file=sys.stderr)
