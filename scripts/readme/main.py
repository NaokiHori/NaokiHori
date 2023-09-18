import introduction
import skillset
import repository
import platform
import contact


def main():
    string = ""
    string += introduction.execute()
    string += skillset.execute("logo/config.json")
    string += repository.execute("scripts/repositories.json")
    string += platform.execute()
    string += contact.execute()
    with open("README.md", "w") as f:
        f.write(string)


if __name__ == "__main__":
    main()
