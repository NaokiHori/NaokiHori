
elements = (
    "introduction",
    "skillset",
    "repository",
    "connect",
    "acknowledgement",
)

string = list()

for element in elements:
    with open(f"{element}.html", "r") as f:
        s = f.readlines()
        string.append("".join(s))
    string.append("\n")
string = "".join(string)

with open("README.md", "w") as f:
    f.write(string)

