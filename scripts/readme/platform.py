def execute():
    elements = [
            {
                "title": "GitLab (smaller projects)",
                "href": "https://gitlab.com/NaokiHori",
            },
            {
                "title": "YouTube (gallery)",
                "href": "https://www.youtube.com/@NaokiHori",
            },
            {
                "title": "Qiita (articles in Japanese)",
                "href": "https://qiita.com/NaokiHori",
            },
    ]
    string = ""
    string += (
            "<h2>\n"
            "Platform\n"
            "</h2>\n"
    )
    string += (
            "<ul>\n"
    )
    for element in elements:
        title = element["title"]
        href = element["href"]
        string += (
                f"<li>\n"
                f"<a href=\"{href}\" target=\"_blank\">\n"
                f"{title}\n"
                f"</a>\n"
                f"</li>\n"
        )
    string += (
            "</ul>\n"
    )
    return string
