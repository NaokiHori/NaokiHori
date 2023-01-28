# TODO: use templating library?

def main():
    string = (
        f"<h2>Acknowledgements</h2>\n"
        f"\n"
        f"This profile is based on the format offered by <a href=\"https://profilinator.rishav.dev/\">Github Profilinator</a>.\n"
        f"\n"
        f"Repository descriptions are based on the format offered by <a href=\"https://github.com/anuraghazra/github-readme-stats\">GitHub Readme Stats</a>.\n"
    )
    return string

if __name__ == "__main__":
    string = list()
    string.append(main())
    string = "\n".join(string)
    with open("acknowledgement.html", "w") as f:
        f.write(string)

