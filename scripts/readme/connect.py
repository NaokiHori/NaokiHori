# TODO: use templating library?

def main():
    string = (
        f"<h2>Connect with me</h2>\n"
        f"\n"
        f"<div align=\"center\">\n"
        f"  <a href=\"https://github.com/NaokiHori\" target=\"_blank\">\n"
        f"    <img style=\"margin: 10px\" src=\"https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white\" alt=\"GitHub\" height=\"50\" />\n"
        f"  </a>\n"
        f"  <a href=\"https://www.youtube.com/@NaokiHori\" target=\"_blank\">\n"
        f"    <img style=\"margin: 10px\" src=\"https://img.shields.io/badge/youtube-%23EE4831.svg?&style=for-the-badge&logo=youtube&logoColor=white\" alt=\"YouTube\" height=\"50\" />\n"
        f"  </a>\n"
        f"</div>\n"
        f"\n"
        f"<div align=\"center\">\n"
        f"  Bug reports, etc. (also looking for a job, 05/2024-, academia / industry)\n"
        f"  <img style=\"margin: 10px\" src=\"https://github.com/NaokiHori/NaokiHori/blob/dev/logo/mad.png\" alt=\"mad\" height=\"25\" />\n"
        f"</div>\n"
    )
    return string

if __name__ == "__main__":
    string = list()
    string.append(main())
    string = "\n".join(string)
    with open("connect.html", "w") as f:
        f.write(string)

