# TODO: use templating library?

def greeting():
    string = (
        f"<h1>\n"
        f"  <div align=\"center\">\n"
        f"    Welcome to my repository\n"
        f"  </div>\n"
        f"</h1>\n"
    )
    return string

def cover_image():
    string = (
        f"<div align=\"center\">\n"
        f"  <img src=\"https://github.com/NaokiHori/NaokiHori/blob/dev/cover.png\" alt=\"cover\" width=\"95%\" />\n"
        f"</div>\n"
    )
    return string

def preference(header, elements):
    assert(len(elements) > 0)
    string = list()
    # header
    string.append((
        f"<h2>\n"
        f"  <div align=\"left\">\n"
        f"    {header}\n"
        f"  </div>\n"
        f"</h2>\n"
    ))
    # elements
    string.append((
        f"<ul>\n"
    ))
    for element in elements:
        string.append((
            f"  <li>\n"
            f"    {element}\n"
            f"  </li>\n"
        ))
    string.append((
        f"</ul>\n"
    ))
    string = "".join(string)
    return string

def preference_0():
    header = "I am interested in"
    elements = (
        "Numerical methods",
        "Software design (robustness, readability, portability)",
        "Code efficiency",
    )
    return preference(header, elements)

def preference_1():
    header = "I like"
    elements = (
        "Coding",
        "Visualisation techniques",
    )
    return preference(header, elements)

def preference_2():
    header = "I am currently working on"
    elements = (
        "Physics (fluid mechanics among others)",
        "High performance computing",
    )
    return preference(header, elements)

if __name__ == "__main__":
    string = list()
    string.append(greeting())
    string.append(cover_image())
    string.append(preference_0())
    string.append(preference_1())
    string.append(preference_2())
    string = "\n".join(string)
    with open("introduction.html", "w") as f:
        f.write(string)

