import introduction
import skill
import repository
import platform
import contact


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Create readme.md")
    parser.add_argument(
            "--config-dir",
            type=str,
            dest="config_dir",
            help="directory where config json files are contained"
    )
    string = ""
    string += introduction.execute()
    string += skill.execute(parser.parse_args().config_dir + "/logo.json")
    string += repository.execute(parser.parse_args().config_dir + "/repositories.json")
    string += platform.execute()
    string += contact.execute()
    with open("README.md", "w") as f:
        f.write(string)


if __name__ == "__main__":
    main()
