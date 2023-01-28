# This source aims to create a SVG file
#   containing information about a repository
#   from several json files fetched by GitHub Actions
# The format of is motivated by the one
#   proposed in https://github.com/anuraghazra/github-readme-stats

import json
import math
from datetime import date


def load_json(filename):
    # load a json file and return as a dict
    with open(filename, "r") as fp:
        result = json.load(fp)
    return result

def get_repo_name_and_descr():
    # extract repository name and its description
    #   from a json file
    filename = "get-a-repository.json"
    result = load_json(filename)
    name = result["name"]
    descr = result["description"]
    return name, descr

def get_repo_lang():
    # extract the primary language of a repository
    #   from a json file
    filename = "list-repository-languages.json"
    result = load_json(filename)
    # extract key (primary language) having the biggest value
    if result:
        p_key = None
        p_val = 0
        for k, v in result.items():
            if v > p_val:
                p_key = k
                p_val = v
        return p_key
    else:
        return None

def get_number_of_stars():
    # extract the number of stars
    #   from a json file
    filename = "list-stargazers.json"
    result = load_json(filename)
    # number of stargazers
    result = len(result)
    # convert to string
    #   since number of digits is of interest later
    return str(result)

def get_last_commit():
    # extract the last updated day of a repository
    #   from a json file
    filename = "get-a-branch.json"
    # main branch info
    result = load_json(filename)
    # extract commit date from first commit
    result = result["commit"]["commit"]["author"]["date"]
    # do what https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat does
    # dirty hack before 3.11
    result = result.split("T")[0]
    result = date.fromisoformat(result)
    result = result.strftime("%b %d %Y")
    return result

def get_lang_color_dict(key):
    # language vs color table
    table = load_json("scripts/card/colortable.json")
    if key in table.keys():
        return table[key]
    else:
        # return black if not found
        print("language color is not defined: ", key)
        return "#000000"

def get_header(width, height):
    # header of svg
    string = list()
    string.append((
        f"<svg "
        f"width=\"{width}\" "
        f"height=\"{height}\" "
        f"viewBox=\"0 0 {width} {height}\" "
        f"fill=\"none\" "
        f"xmlns=\"http://www.w3.org/2000/svg\" "
        f"role=\"img\">\n"
    ))
    string = "".join(string)
    return string

def get_footer():
    # footer of svg
    return f"</svg>\n"

def get_styles(font, h_title, h_descr):
    # CSS styles, including font specifier and icon colour
    string = list()
    string = ((
        f"  <style>\n"
        f"    .title-text {{\n"
        f"      font: 600 {h_title}px {font};\n"
        f"      fill: #2f80ed;\n"
        f"    }}\n"
        f"    .descr-text {{\n"
        f"      font: 400 {h_descr}px {font};\n"
        f"      fill: #434d58;\n"
        f"    }}\n"
        f"    .star {{\n"
        f"      stroke: #586069;\n"
        f"      stroke-width: 1.5;\n"
        f"      fill: \"none\";\n"
        f"    }}\n"
        f"    .icon {{\n"
        f"      fill: #586069;\n"
        f"    }}\n"
        f"  </style>\n"
    ))
    string = "".join(string)
    return string

def get_edge_r(width_svg, height_svg):
    # edge rectangle
    offset = 0.5 # px
    corner = offset * 9
    height = height_svg - 2. * offset
    width  = width_svg  - 2. * offset
    string = list()
    string.append((
        f"  <rect "
        f"data-testid=\"card edge\" "
        f"x=\"{offset}\" "
        f"y=\"{offset}\" "
        f"rx=\"{corner}\" "
        f"ry=\"{corner}\" "
        f"width=\"{width}\" "
        f"height=\"{height}\" "
        f"stroke=\"#E4E2E2\" "
        f"fill=\"#FFFEFE\" "
        f"stroke-opacity=\"1\" "
        f"/>\n"
    ))
    string = "".join(string)
    return string

def get_row1st(xoffset, yoffset, iconsize, reponame):
    # first row, repository logo and title
    text_xoffset = 2 * iconsize
    string = list()
    string.append((
        f"  <g data-testid=\"title\" transform=\"translate({xoffset}, {yoffset})\">\n"
        f"    <g data-testid=\"title-icon\" transform=\"translate(0, 0)\">\n"
        f"      <svg\n"
        f"        class=\"icon\"\n"
        f"        x=\"0\"\n"
        f"        y=\"-13\"\n"
        f"        viewBox=\"0 0 {iconsize} {iconsize}\"\n"
        f"        version=\"1.1\"\n"
        f"        width=\"{iconsize}\"\n"
        f"        height=\"{iconsize}\"\n"
        f"      >\n"
        f"        <path fill-rule=\"evenodd\" d=\"M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z\"/>\n"
        f"      </svg>\n"
        f"    </g>\n"
        f"    <g data-testid=\"title-text\" transform=\"translate({text_xoffset}, 0)\">\n"
        f"      <text x=\"0\" y=\"0\" class=\"title-text\">\n"
        f"        {reponame}\n"
        f"      </text>\n"
        f"    </g>\n"
        f"  </g>\n"
    ))
    string = "".join(string)
    return string, yoffset + 2 * iconsize

def get_row2nd(xoffset, yoffset, width, h_descr, w_descr, descr):
    # second row: repository description
    # maximum number of characters allowed
    # subtract left / right margins (2 x xoffset)
    maxchar = (width - 2 * xoffset) // w_descr
    words = descr.split(" ")
    rows = list()
    row  = list()
    cntr = 0
    for word in words:
        cntr += len(word) + 1
        if cntr > maxchar:
            rows.append(row)
            row = list()
            cntr = len(word) + 1
        row.append(word)
    if row:
        rows.append(row)
    string = list()
    string.append((
        f"  <g data-testid=\"description\" transform=\"translate({xoffset}, {yoffset})\">\n"
    ))
    for cntr, row in enumerate(rows):
        words = " ".join(row)
        dy = 2. * h_descr * cntr
        row = f"    <text class=\"descr-text\" x=\"0\" y=\"{dy}\">{words}</text>\n"
        string.append((row))
    string.append((
        f"  </g>\n"
    ))
    string = "".join(string)
    return string, yoffset + 2.5 * h_descr * len(rows)

def draw_star(size):
    offset = 0.75 * size
    # star center
    x0 = 0.5 * size
    y0 = 0.5 * size
    # radii for each 5 points
    ro = 0.425 * size
    ri = 0.500 * ro
    # coordinates
    xs = list()
    ys = list()
    for cnt in range(10):
        # theta
        t = 2. * math.pi * cnt / 10 - 0.5 * math.pi
        # radius
        r = ro if cnt % 2 == 0 else ri
        xs.append(x0 + r * math.cos(t))
        ys.append(y0 + r * math.sin(t))
    # svg path tag
    path = list()
    for c, (x, y) in enumerate(zip(xs, ys)):
        prefix = "M" if c ==           0 else "L"
        suffix = "Z" if c == len(xs) - 1 else " "
        path.append(f"{prefix} {x: .1f} {y: .1f} {suffix}")
    path = "".join(path)
    string = (
        f"    <g data-testid=\"star-icon\" transform=\"translate(-{offset}, -{offset})\">\n"
        f"      <svg\n"
        f"        class=\"star\"\n"
        f"        x=\"0\"\n"
        f"        y=\"0\"\n"
        f"        viewBox=\"0 0 {size} {size}\"\n"
        f"        version=\"1.1\"\n"
        f"        width=\"{size}\"\n"
        f"        height=\"{size}\"\n"
        f"      >\n"
        f"        <path d=\"{path}\"/>\n"
        f"      </svg>\n"
        f"    </g>\n"
    )
    return string

def get_row3rd(xoffset, yoffset, lang, iconsize, w_descr, h_title):
    # third row: primary language, number of stars, last update date
    string = list()
    # language, can be None
    if lang:
        string.append((
            f"  <g data-testid=\"language\" transform=\"translate({xoffset}, {yoffset})\">\n"
        ))
        x = 0
        dx = 5
        x += dx
        radius = 0.5 * iconsize
        langcolor = get_lang_color_dict(lang)
        string.append((
            f"    <circle cx=\"{x}\" cy=\"-5\" r=\"{radius}\" fill=\"{langcolor}\" />\n"
        ))
        dx = iconsize
        x += dx
        string.append((
            f"    <text class=\"descr-text\" x=\"{x}\" y=\"0\">\n"
            f"      {lang}\n"
            f"    </text>\n"
            f"  </g>\n"
        ))
        dx = (len(lang) + 4) * w_descr
        x += dx
        xoffset += x
    # star
    string.append((
        f"  <g data-testid=\"star\" transform=\"translate({xoffset}, {yoffset})\">\n"
    ))
    string.append(draw_star(1.25 * iconsize))
    dx = iconsize
    xoffset += dx
    string.append((
        f"    <g data-testid=\"star-text\" transform=\"translate({dx}, 0)\">\n"
        f"      <text class=\"descr-text\">\n"
        f"        {nstars}\n"
        f"      </text>\n"
        f"    </g>\n"
        f"  </g>\n"
    ))
    dx = (len(nstars) + 4) * w_descr
    xoffset += dx
    # date
    string.append((
        f"  <g data-testid=\"date\" transform=\"translate({xoffset}, {yoffset})\">\n"
        f"    <text class=\"descr-text\">\n"
        f"      Last update: {lastcommit}\n"
        f"    </text>\n"
        f"  </g>\n"
    ))
    string = "".join(string)
    return string, yoffset + h_title

def create_card(reponame, descr, lang, nstars, lastcommit):
    # width is fixed,
    #   while height can vary
    #   depending on the number of rows of
    #   the repository description
    width = 500
    ## styles
    # use Courier font, which is a monospace font
    font = "Courier"
    # width-height ratio, font-specific,
    #   which is used to compute string width
    rate = 0.607
    # font size in terms of height, in pixels
    h_title = 18 # px
    h_descr = 13 # px
    w_title = h_title * rate # px
    w_descr = h_descr * rate # px
    # icon size in pixel
    iconsize = 16 # px
    # x offset (left edge)
    xoffset = 25
    # first row: repository logo and title
    yoffset = 35
    row1st, yoffset = get_row1st(xoffset, yoffset, iconsize, reponame)
    # second row: repository description
    row2nd, yoffset = get_row2nd(xoffset, yoffset, width, h_descr, w_descr, descr)
    # third row: primary language, number of stars, last update date
    row3rd, height = get_row3rd(xoffset, yoffset, lang, iconsize, w_descr, h_title)
    # Now all parameters are ready
    # get all svg elements using the computed parameters
    header = get_header(width, height)
    footer = get_footer()
    styles = get_styles(font, h_title, h_descr)
    edge_r = get_edge_r(width, height)
    # open file and create svg
    with open(f"{reponame}.svg", "w") as f:
        f.write(header)
        f.write(styles)
        f.write(edge_r)
        f.write(row1st)
        f.write(row2nd)
        f.write(row3rd)
        f.write(footer)

if __name__ == "__main__":
    reponame, descr = get_repo_name_and_descr()
    lang = get_repo_lang()
    nstars = get_number_of_stars()
    lastcommit = get_last_commit()
    create_card(reponame, descr, lang, nstars, lastcommit)

