# TODO: use templating library?

def load_json(filename):
    import json
    with open(filename, "r") as fp:
        data = json.load(fp)
    return data

def header():
    string = (
        f"<h2>\n"
        f"  My Skill Set\n"
        f"</h2>\n"
    )
    return string

def skillset():
    elements = load_json("logo/config.json")
    string = list()
    # div and table headers
    string.append((
        f"<div align=\"center\">\n"
        f"  <table>\n"
    ))
    # table head
    string.append((
        f"    <thead>\n"
        f"      <tr>\n"
        f"        <th>Languages etc.</th>\n"
        f"        <th>DevOps</th>\n"
        f"      </tr>\n"
        f"    </thead>\n"
    ))
    # start table body
    string.append((
        f"    <tbody>\n"
    ))
    # languages etc
    string.append((
        f"      <td>\n"
    ))
    for element in elements["languages"]:
        name = element["name"]
        href = element["href"]
        image = element["image"]
        string.append((
            f"        <a href=\"{href}\" target=\"_blank\">\n"
            f"          <img style=\"margin: 10px\" src=\"{image}\" alt=\"{name}\" height=\"50\" />\n"
            f"        </a>\n"
        ))
    string.append((
        f"      </td>\n"
    ))
    # devops
    string.append((
        f"      <td>\n"
    ))
    for element in elements["devops"]:
        name = element["name"]
        href = element["href"]
        image = element["image"]
        string.append((
            f"        <a href=\"{href}\" target=\"_blank\">\n"
            f"          <img style=\"margin: 10px\" src=\"{image}\" alt=\"{name}\" height=\"50\" />\n"
            f"        </a>\n"
        ))
    string.append((
        f"      </td>\n"
    ))
    # end table body
    string.append((
        f"    </tbody>\n"
    ))
    # div and table footers
    string.append((
        f"  </table>\n"
        f"</div>\n"
    ))
    string = "".join(string)
    return string


if __name__ == "__main__":
    string = list()
    string.append(header())
    string.append(skillset())
    string = "\n".join(string)
    with open("skillset.html", "w") as f:
        f.write(string)

