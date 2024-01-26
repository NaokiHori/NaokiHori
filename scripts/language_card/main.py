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

font_title = Font(24)
font_descr = Font(16)

def fetch() -> dict:
    import os
    import requests
    result = list()
    token = os.environ.get(key="GITHUB_TOKEN")
    # fetch all repositories
    # ref: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
    r = requests.get(
            url=f"https://api.github.com/users/NaokiHori/repos",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": "2022-11-28",
            },
    )
    if not r.ok:
        print(r)
        return result
    result = dict()
    repos = r.json()
    for repo in repos:
        r = requests.get(
                url=repo["languages_url"],
                headers={
                    "Accept": "application/vnd.github+json",
                    "Authorization": f"Bearer {token}",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
        )
        if not r.ok:
            print(r)
            continue
        langs = r.json()
        for k, v in langs.items():
            if k in result:
                result[k] += v
            else:
                result[k] = v
    return {k: v for k, v in sorted(result.items(), reverse=True, key=lambda x: x[1])}

def make_boxed_items(items: dict, domain: dict, margin: float):
    def get_lang_color(key: str):
        import json
        with open(parser.parse_args().config_dir + "/colortable.json", "r") as f:
            table = json.load(f)
        if key in table.keys():
            return table[key]
        else:
            print("language color is not defined: ", key)
            return "#000000"
    # total width
    totalwidth = domain["width"] - 2 * margin
    # distance between neighbouring elements
    h_update = 2. * font_descr.h
    # language name (text), get max length
    textwidth = 0
    for k in items.keys():
        textwidth = max(textwidth, len(k) * font_descr.w)
    # rate " xx.xx%"
    ratewidth = 7 * font_descr.w
    # get max histogram length
    histwidth = totalwidth - textwidth - ratewidth - 2. * font_descr.w
    # normalise hist by the max number
    vmax = 0
    vsum = 0
    for v in items.values():
        vmax = max(vmax, v)
        vsum += v
    # visit each item
    x = margin
    y = domain["height"]
    result = list()
    for k, v in items.items():
        rect_height = 1.4 * font_descr.h
        # inserting multiple whitespaces is tricky
        # take another approach (right-shift start when less than 10%)
        rate_text = "{:.2f}%".format(100. * v / vsum)
        nspace = 6 - len(rate_text)
        result.append({
            # rect around language text
            "lang": {
                "x": x - 0.5 * font_descr.w,
                "y": y - 0.5 * rect_height,
                "width": textwidth + 2. * font_descr.w,
                "height": rect_height,
                "round": 4,
                "stroke": get_lang_color(k),
            },
            # language text
            "text": {
                "x": x,
                "y": y,
                "text": k,
            },
            # percentage
            "rate": {
                "x": x + textwidth + (2.5 + nspace) * font_descr.w,
                "y": y,
                "text": rate_text,
            },
            # histogram
            "hist": {
                "x": x + textwidth + ratewidth + 2. * font_descr.w,
                "y": y - 0.5 * rect_height,
                "width": histwidth * v / vmax,
                "height": rect_height,
                "round": 4,
                "fill": get_lang_color(k),
                "stroke": get_lang_color(k),
            },
        })
        y += h_update
        domain["height"] += h_update
    return result

def set_margin(domain: dict) -> float:
    # left-right margin
    margin = 1.5 * font_title.w
    return margin

def get_title(domain: dict, margin: float, nbytes: int) -> dict:
    domain["height"] += 1.5 * font_title.h
    unit = "B"
    thres = 1024.
    if nbytes > thres:
        nbytes /= thres
        unit = "kB"
    if nbytes > thres:
        nbytes /= thres
        unit = "MB"
    if nbytes > thres:
        nbytes /= thres
        unit = "GB"
    title = {
            "text": f"Language Stats ({nbytes:.1f}{unit})",
            "x": margin,
            "y": domain["height"],
    }
    domain["height"] += 2. * font_title.h
    return title

def get_langs(langs: dict, domain: dict, margin: float) -> list:
    return make_boxed_items(langs, domain, margin)

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
    with open(parser.parse_args().template_svg_file, "r") as f:
        sample = f.readlines()
    sample = "".join(sample)
    template = jinja2.Template(source=sample)
    result = template.render(**keywords)
    with open(filename, "w") as f:
        f.write(result)

def create_card(path_out: str, langs: dict):
    domain = {
        # fixed
        "width": 500,
        # subject to change
        "height": 0,
    }
    margin = set_margin(domain)
    title = get_title(domain, margin, sum(langs.values()))
    langs = get_langs(langs, domain, margin)
    border = get_border(domain)
    dump(
            path_out,
            {
                "domain": domain,
                "border": border,
                "title": title,
                "langs": langs,
            },
    )

def main():
    langs = fetch()
    if not langs:
        return
    create_card(parser.parse_args().out_dir + "/language.svg", langs)

main()

