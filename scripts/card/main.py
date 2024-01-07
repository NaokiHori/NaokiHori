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
    # extract repository name and its description
    # ref: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
    import os
    import requests
    token = os.environ.get(key="GITHUB_TOKEN")
    r = requests.get(
            url=f"https://api.github.com/repos/NaokiHori/{name}",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
    )
    data = r.json()
    info = {
            "name": name,
            "descr": data["description"],
            "topics": data["topics"],
            "lang": data["language"],
            "nstars": str(data["stargazers_count"]),
            "lastcommit": get_lastcommit(data["updated_at"]),
    }
    return info

def set_margin(domain: dict) -> float:
    # left-right margin
    result = 1.5 * font_title.w
    return result

def get_title(info: dict, domain: dict, margin: float) -> dict:
    domain["height"] += 1.5 * font_title.h
    result = {
        "text": info["name"],
        "x": margin,
        "y": domain["height"],
    }
    domain["height"] += 1.5 * font_title.h
    return result

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
            w = 0
            text = char
        else:
            text += char
            w += font_descr.w
    else:
        texts.append(text)
    result = list()
    for text in texts:
        result.append(
            {
                "x": margin,
                "y": domain["height"],
                "text": text,
            },
        )
        domain["height"] += 1.5 * font_descr.h
    domain["height"] += 0.5 * font_descr.h
    return result

def get_topics(info: dict, domain: dict, margin: dict) -> list:
    topics = info["topics"]
    width = domain["width"] - 2 * margin - 3. * font_descr.w
    x = margin + 0.5 * font_descr.w
    y = domain["height"]
    result = list()
    for topic in topics:
        dx = (len(topic) + 2) * font_descr.w
        if x + dx > width:
            x = margin + 0.5 * font_descr.w
            y += 1.5 * font_descr.h
            domain["height"] += 1.5 * font_descr.h
        result.append({
            "text": {
                "x": x,
                "y": y,
                "text": topic,
            },
            "rect": {
                "x": x - 0.5 * font_descr.w,
                "y": y - 0.6 * font_descr.h,
                "width": (len(topic) + 1) * font_descr.w,
                "height": 1.2 * font_descr.h,
                "round": 4,
            },
        })
        x += dx
    domain["height"] += 1.5 * font_title.h
    return result

def get_3rd(info, domain: dict, margin: float) -> (dict, dict, dict):
    distance = 2. * font_descr.w
    def get_lang(domain: dict, x: float) -> (dict, float):
        def get_lang_color_dict(key):
            import os
            import json
            filename = f"{os.path.dirname(__file__)}/colortable.json"
            with open(filename, "r") as fp:
                table = json.load(fp)
            if key in table.keys():
                return table[key]
            else:
                # return black if not found
                print("language color is not defined: ", key)
                return "#000000"
        r = 0.5 * font_descr.h
        lang = dict()
        lang["mark"] = {
            "cx": x + r,
            "cy": domain["height"],
            "r": r,
            "fill": get_lang_color_dict(info["lang"]),
        }
        x += 2.5 * r
        lang["text"] = {
            "x": x,
            "y": domain["height"],
            "text": info["lang"],
        }
        x += (len(info["lang"]) + 2) * font_descr.w
        return (lang, x)
    def get_star(domain: dict, x0: float) -> (dict, float):
        ro = 0.5 * font_descr.h
        y0 = domain["height"]
        ri = 0.5 * ro
        xs = list()
        ys = list()
        for cnt in range(10):
            import math
            t = 2. * math.pi * cnt / 10 - 0.5 * math.pi
            r = ro if cnt % 2 == 0 else ri
            xs.append(x0 + r * math.cos(t))
            ys.append(y0 + r * math.sin(t))
        path = ""
        for cnt, (x, y) in enumerate(zip(xs, ys)):
            prefix = "M" if cnt ==           0 else "L"
            suffix = "Z" if cnt == len(xs) - 1 else " "
            path += f"{prefix} {x} {y} {suffix}"
        x0 += 1.5 * ro
        star = {
            "mark": path,
            "text": {
                "x": x0,
                "y": domain["height"],
                "text": info["nstars"],
            },
        }
        x = x0 + (len(info["nstars"]) + 1.5) * font_descr.w
        return (star, x)
    def get_last_update(domain: dict, x: float) -> (dict, float):
        last_update = {
            "x": x,
            "y": domain["height"],
            "text": info["lastcommit"],
        }
        x += len(last_update["text"]) * font_descr.w
        return (last_update, x)
    x = margin
    lang, x = get_lang(domain, x)
    star, x = get_star(domain, x)
    last_update, x = get_last_update(domain, x)
    domain["height"] += 1.5 * font_title.h
    return lang, star, last_update

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
    import os
    import jinja2
    tempname = f"{os.path.dirname(__file__)}/template.svg"
    with open(tempname, "r") as f:
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
    lang, star, last_update = get_3rd(info, domain, margin)
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
            "lang": lang,
            "star": star,
            "last_update": last_update,
        },
    )

def main():
    import sys
    import json
    argv = sys.argv
    assert 2 == len(argv)
    path_json = argv[1]
    with open(path_json, "r") as f:
        categories = json.load(f)
    names = list()
    for category in categories:
        repositories = category["elements"]
        for repository in repositories:
            names.append(repository["name"])
    # for each repo,
    #   1. collect information using GitHub REST API,
    #   2. generate an svg card based on it
    for name in names:
        info = get_info(name)
        path_out = f"card/{info['name']}.svg"
        create_card(path_out, info)

def debug():
    info = {
        "name": "MyDebugRepository",
        "descr": "Here is a description of this repository, which can be arbitrary long and thus if the sentence is properly new-line-d should be checked.",
        "lang": "TypeScript",
        "nstars": "10",
        "lastcommit": "Jan 01 1970",
        "topics": [
            "cfd",
            "fluid-dynamics",
            "hpc",
            "navier-stokes",
        ],
    }
    path_out = "debug.svg"
    create_card(path_out, info)

main()
# debug()

