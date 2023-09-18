def greeting():
    string = (
            "<h1>\n"
            "<div align=\"center\">\n"
            "Welcome to my repository\n"
            "</div>\n"
            "</h1>\n"
    )
    return string


def cover_image():
    string = (
            "<div align=\"center\">\n"
            "<img\n"
            "  src=\"https://github.com/NaokiHori/NaokiHori/blob/dev/image/cover.png\"\n"
            "  alt=\"cover\"\n"
            "  width=\"95%\"\n"
            "/>\n"
            "</div>\n"
    )
    return string


def preference(header, elements):
    string = ""
    # header
    string += (
            f"<h2>\n"
            f"<div align=\"left\">\n"
            f"{header}\n"
            f"</div>\n"
            f"</h2>\n"
    )
    # elements
    string += (
            "<ul>\n"
    )
    for element in elements:
        string += (
                f"<li>\n"
                f"{element}\n"
                f"</li>\n"
        )
    string += (
            "</ul>\n"
    )
    return string


def preference_0():
    header = "Work"
    elements = [
            "Fluid mechanics (multiphase flows)",
            "High performance computing",
    ]
    return preference(header, elements)


def preference_1():
    header = "Interest"
    elements = [
            "Numerical methods",
            "Software design",
    ]
    return preference(header, elements)


def execute():
    string = ""
    string += greeting()
    string += cover_image()
    string += preference_0()
    string += preference_1()
    return string
