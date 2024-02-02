import json


def header():
    string = (
            "<h2>\n"
            "Repositories\n"
            "</h2>\n"
    )
    return string


def kernel(category):
    title = category["title"]
    elements = category["elements"]
    align = "center"
    string = ""
    string += (
            f"<h3>\n"
            f"{title}\n"
            f"</h3>\n"
    )
    for element in elements:
        name = element["name"]
        repourl = f"https://github.com/NaokiHori/{name}"
        cardurl = f"https://github.com/NaokiHori/NaokiHori/blob/card/card/{name}.svg"
        # repo card
        string += (
                f"<div align=\"{align}\">\n"
                f"<a href=\"{repourl}\" target=\"_blank\">\n"
                f"<img src=\"{cardurl}\" />\n"
                f"</a>\n"
                f"</div>\n"
        )
    return string


def execute(path):
    with open(path, "r") as f:
        categories = json.load(f)
    string = ""
    string += header()
    for category in categories:
        string += kernel(category)
    return string
