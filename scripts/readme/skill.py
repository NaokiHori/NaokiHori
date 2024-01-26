import json


def header():
    string = (
        "<h2>\n"
        "Skills\n"
        "</h2>\n"
    )
    return string


def skill(path):
    with open(path, "r") as fp:
        elements = json.load(fp)
    string = ""
    # div and table headers
    string += (
            "<div align=\"center\">\n"
            "<table>\n"
    )
    # table head
    string += (
            "<thead>\n"
            "<tr>\n"
            "<th>Languages etc.</th>\n"
            "<th>Tools</th>\n"
            "</tr>\n"
            "</thead>\n"
    )
    # start table body
    string += (
            "<tbody>\n"
    )
    # languages etc
    string += (
            "<td>\n"
    )
    for element in elements["languages"]:
        name = element["name"]
        href = element["href"]
        image = element["image"]
        string += (
                f"<a href=\"{href}\">\n"
                f"<img\n"
                f"  src=\"{image}\"\n"
                f"  alt=\"\"\n"
                f"  height=\"50\"\n"
                f"/>\n"
                f"</a>\n"
        )
    string += (
            "</td>\n"
    )
    # tools
    string += (
            "<td>\n"
    )
    for element in elements["tools"]:
        name = element["name"]
        href = element["href"]
        image = element["image"]
        string += (
                f"<a href=\"{href}\">\n"
                f"<img\n"
                f"  src=\"{image}\"\n"
                f"  alt=\"{name}\"\n"
                f"  height=\"50\"\n"
                f"/>\n"
                f"</a>\n"
        )
    string += (
            "</td>\n"
    )
    # end table body
    string += (
            "</tbody>\n"
    )
    # div and table footers
    string += (
            "</table>\n"
            "</div>\n"
    )
    return string


def execute(path):
    string = ""
    string += header()
    string += skill(path)
    return string
