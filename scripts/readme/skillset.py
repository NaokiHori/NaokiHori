import json


def header():
    string = (
        "<h2>\n"
        "My Skill Set\n"
        "</h2>\n"
    )
    return string


def skillset(path):
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
            "<th>DevOps</th>\n"
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
                f"<a href=\"{href}\" target=\"_blank\">\n"
                f"<img\n"
                f"  style=\"margin: 10px\"\n"
                f"  src=\"{image}\"\n"
                f"  onerror=\"this.onerror=null; this.remove();\"\n"
                f"  alt=\"\"\n"
                f"  height=\"50\"\n"
                f"/>\n"
                f"</a>\n"
        )
    string += (
            "</td>\n"
    )
    # devops
    string += (
            "<td>\n"
    )
    for element in elements["devops"]:
        name = element["name"]
        href = element["href"]
        image = element["image"]
        string += (
                f"<a href=\"{href}\" target=\"_blank\">\n"
                f"<img\n"
                f"  style=\"margin: 10px\"\n"
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
    string += skillset(path)
    return string
