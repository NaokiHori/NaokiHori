import argparse
parser = argparse.ArgumentParser(description="Create repository cards")
parser.add_argument(
        "--config-dir",
        type=str,
        dest="config_dir",
        help="directory where config json files are contained"
)
parser.add_argument(
        "--out-dir",
        type=str,
        dest="out_dir",
        help="directory where output svg files go"
)
parser.add_argument(
        "--template-svg-file",
        type=str,
        dest="template_svg_file",
        help="template svg file"
)

class Font:
    def __init__(self, h: float):
        # h/w rate for "Courier New"
        rate = 0.607
        self.h = h
        self.w = h * rate

font_title = Font(20)
font_descr = Font(16)

def get_info(name: str):
    def get_lastcommit(data: str):
        # do what
        #   https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat
        # does
        # dirty hack before 3.11
        from datetime import date
        data = data.split("T")[0]
        data = date.fromisoformat(data)
        data = data.strftime("%b %d %Y")
        return data
    import os
    import requests
    info = dict()
    token = os.environ.get(key="GITHUB_TOKEN")
    # extract repository name and its description
    # ref: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
    r = requests.get(
            url=f"https://api.github.com/repos/NaokiHori/{name}",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
    )
    if not r.ok:
        print(r)
        return info
    data = r.json()
    info = {
            "name": name,
            "descr": data["description"],
            "topics": data["topics"],
            "langs": [data["language"]],
            "nstars": str(data["stargazers_count"]),
            "lastcommit": get_lastcommit(data["updated_at"]),
    }
    # try to fetch all languages
    r = requests.get(
            url=data["languages_url"],
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
    )
    if not r.ok:
        print(r)
        return info
    # here "key:value", take out key only, sorted by value
    data = r.json()
    info["langs"] = [k for k, v in sorted(data.items(), reverse=True, key=lambda x: x[1])]
    return info

def make_boxed_items(items: list[str], domain: dict, margin: dict):
    width = domain["width"] - 2 * margin
    x0 = margin + 0.5 * font_descr.w
    h_update = 2. * font_descr.h
    x = x0
    y = domain["height"]
    result = list()
    for item in items:
        dx = (len(item) + 2) * font_descr.w
        if x + dx > width:
            x = x0
            y += h_update
            domain["height"] += h_update
        rect_height = 1.4 * font_descr.h
        result.append({
            "text": {
                "x": x,
                "y": y,
                "text": item,
            },
            "rect": {
                "x": x - 0.5 * font_descr.w,
                "y": y - 0.5 * rect_height,
                "width": (len(item) + 1) * font_descr.w,
                "height": rect_height,
                "round": 4,
            },
        })
        x += dx
    domain["height"] += h_update
    return result

def set_margin(domain: dict) -> float:
    # left-right margin
    margin = 1.5 * font_title.w
    return margin

def get_title(info: dict, domain: dict, margin: float) -> dict:
    domain["height"] += 1.5 * font_title.h
    title = {
        "text": info["name"],
        "x": margin,
        "y": domain["height"],
    }
    domain["height"] += 1.5 * font_title.h
    return title

def get_descrs(info: dict, domain: dict, margin: float) -> list:
    width = domain["width"] - 2 * margin
    chars = info["descr"]
    # split the whole description into multiple lines so that they fit the card horizontally
    texts = list()
    text = ""
    w = 0
    for char in chars:
        if w >= width:
            texts.append(text)
            w = font_descr.w
            text = char
        else:
            text += char
            w += font_descr.w
    else:
        texts.append(text)
    descrs = list()
    for text in texts:
        descrs.append(
            {
                "x": margin,
                "y": domain["height"],
                "text": text,
            },
        )
        domain["height"] += 1.5 * font_descr.h
    domain["height"] += 0.5 * font_descr.h
    return descrs

def get_topics(info: dict, domain: dict, margin: dict) -> list:
    topics = make_boxed_items(info["topics"], domain, margin)
    return topics

def get_langs(info: dict, domain: dict, margin: float) -> dict:
    def get_lang_color(key: str):
        import json
        with open(parser.parse_args().config_dir + "/colortable.json", "r") as f:
            table = json.load(f)
        if key in table.keys():
            return table[key]
        else:
            print("language color is not defined: ", key)
            return "#000000"
    langs = make_boxed_items(info["langs"], domain, margin)
    for lang in langs:
        lang["rect"]["stroke"] = get_lang_color(lang["text"]["text"])
    return langs

def get_star(info: dict, domain: dict, margin: float) -> (dict, float):
    xmin = 1e100
    yave = 0.
    xs = list()
    ys = list()
    for cnt in range(10):
        import math
        ro = 0.5 * font_descr.h
        ri = 0.5 * ro
        t = 2. * math.pi * cnt / 10 - 0.5 * math.pi
        r = ro if cnt % 2 == 0 else ri
        x = r * math.cos(t)
        y = r * math.sin(t)
        xs.append(x)
        ys.append(y)
        xmin = min(xmin, x)
        yave += y / 10.
    for cnt in range(10):
        xs[cnt] += margin - xmin
        ys[cnt] += domain["height"] - yave
    path = ""
    for cnt, (x, y) in enumerate(zip(xs, ys)):
        prefix = "M" if cnt ==           0 else "L"
        suffix = "Z" if cnt == len(xs) - 1 else " "
        path += f"{prefix} {x} {y} {suffix}"
    margin += 2.5 * ro
    star = {
            "mark": path,
            "text": {
                "x": margin,
                "y": domain["height"],
                "text": info["nstars"],
            },
    }
    margin = margin + (len(info["nstars"]) + 1.5) * font_descr.w
    return (star, margin)

def get_clock(info: dict, domain: dict, margin: float) -> (dict, float):
    def add_domain(size: int, result: dict):
        width  = size
        height = size
        result["domain"] = dict()
        result["domain"]["width"]  = width
        result["domain"]["height"] = height
    def add_outer(size: int, centre: (float, float), result: dict):
        import math
        result["outer"] = dict()
        # circle
        result["outer"]["circle"] = dict()
        stroke_width = 0.125 * size
        r  = 0.4 * size
        a1 =   0
        a2 = 315
        x1 = centre[0] + r * math.cos(math.radians(a1 + 0.00))
        y1 = centre[1] + r * math.sin(math.radians(a1 + 0.00))
        x2 = centre[0] + r * math.cos(math.radians(a2 + 0.01))
        y2 = centre[1] + r * math.sin(math.radians(a2 + 0.01))
        result["outer"]["circle"]["data"] = f"d=\"M{x1} {y1} A{r} {r} {a1} 1 1 {x2} {y2}\""
        result["outer"]["circle"]["stroke_width"] = stroke_width
        # triangle
        result["outer"]["triangle"] = dict()
        r1 = r - 0.2 * size
        r2 = r + 0.2 * size
        x1 = centre[0] + r1 * math.cos(math.radians(a2))
        y1 = centre[1] + r1 * math.sin(math.radians(a2))
        x2 = centre[0] + r2 * math.cos(math.radians(a2))
        y2 = centre[1] + r2 * math.sin(math.radians(a2))
        result["outer"]["triangle"]["data"] = f"points=\"{x1} {y1} {x2} {y1} {x2} {y2}\""
    def add_inner(size: int, centre: (float, float), result: dict):
        result["inner"] = dict()
        stroke_width = 0.1 * size
        result["inner"]["stroke_width"] = stroke_width
        # big hand
        result["inner"]["big"] = dict()
        x1 = centre[0]
        y1 = centre[1] + 0.5 * stroke_width
        x2 = centre[0]
        y2 = centre[1] - 0.3 * size
        result["inner"]["big"]["data"] = f"x1=\"{x1}\" y1=\"{y1}\" x2=\"{x2}\" y2=\"{y2}\""
        # small hand
        result["inner"]["small"] = dict()
        x1 = centre[0] - 0.5 * stroke_width
        y1 = centre[1]
        x2 = centre[0] + 0.2 * size
        y2 = centre[1]
        result["inner"]["small"]["data"] = f"x1=\"{x1}\" y1=\"{y1}\" x2=\"{x2}\" y2=\"{y2}\""
    size = 1.2 * font_descr.h
    centre = (margin + 0.5 * size, domain["height"])
    clock = dict()
    add_domain(size, clock)
    add_outer(size, centre, clock)
    add_inner(size, centre, clock)
    margin += 1.5 * size
    return (clock, margin)

def get_updated(info: dict, domain: dict, margin: float) -> dict:
    updated = {
            "x": margin,
            "y": domain["height"],
            "text": info["lastcommit"],
    }
    domain["height"] += 1.5 * font_title.h
    return updated

def get_border(domain: dict) -> dict:
    stroke_width = 2
    border = {
            "x": 0.5 * stroke_width,
            "y": 0.5 * stroke_width,
            "width": domain["width"] - stroke_width,
            "height": domain["height"] - stroke_width,
            "round": 10,
            "stroke_width": stroke_width,
    }
    return border

def dump(filename: str, keywords: dict):
    import jinja2
    with open(parser.parse_args().template_svg_file, "r") as f:
        sample = f.readlines()
    sample = "".join(sample)
    template = jinja2.Template(source=sample)
    result = template.render(**keywords)
    with open(filename, "w") as f:
        f.write(result)

def create_card(path_out: str, info: dict):
    domain = {
        # fixed
        "width": 500,
        # subject to change
        "height": 0,
    }
    margin = set_margin(domain)
    title = get_title(info, domain, margin)
    descrs = get_descrs(info, domain, margin)
    topics = get_topics(info, domain, margin)
    langs = get_langs(info, domain, margin)
    star, margin = get_star(info, domain, margin)
    clock, margin = get_clock(info, domain, margin)
    updated = get_updated(info, domain, margin)
    border = get_border(domain)
    dump(
            path_out,
            {
                "domain": domain,
                "border": border,
                "margin": margin,
                "title": title,
                "descrs": descrs,
                "topics": topics,
                "langs": langs,
                "star": star,
                "clock": clock,
                "updated": updated,
            },
    )

def main():
    # get all repository names of which the cards are made
    # json contains nested lists, which is flattened
    config_dir = parser.parse_args().config_dir
    with open(f"{config_dir}/repositories.json", "r") as f:
        import json
        categories = json.load(f)
    names = list()
    for category in categories:
        repositories = category["elements"]
        for repository in repositories:
            names.append(repository["name"])
    # for each repo,
    #   1. collect information using GitHub REST API,
    #   2. generate an svg card based on it
    out_dir = parser.parse_args().out_dir
    for name in names:
        info = get_info(name)
        if not info:
            continue
        create_card(out_dir + "/" + info["name"] + ".svg", info)

def debug():
    info = {
        "name": "MyDebugRepository",
        "descr": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "langs": [
            "C",
            "Python",
            "Rust",
            "Makefile",
            "Shell",
            "HTML",
            "CSS",
            "WebAssembly",
        ],
        "nstars": "10",
        "lastcommit": "Jan 01 1970",
        "topics": [
            "Lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "unbelievably-long-ever-lasting-topic-element",
            "consectetur",
            "adipiscing",
            "elit",
            "sed",
            "do",
            "eiusmod",
            "tempor",
            "incididunt",
            "ut",
            "labore",
            "et",
            "unbelievably-long-ever-lasting-topic-element",
            "dolore",
            "magna",
            "unbelievably-long-ever-lasting-topic-element",
            "aliqua",
        ],
    }
    out_dir = parser.parse_args().out_dir
    create_card(out_dir + "/" + "debug.svg", info)

main()
# debug()

