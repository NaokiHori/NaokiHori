# TODO: use templating library?

def header():
    string = (
        f"<h2>Repositories</h2>\n"
    )
    return string

def kernel(title, elements):
    string = list()
    string.append((
        f"<h3>{title}</h3>\n"
    ))
    for element in elements:
        name = element["name"]
        imageurl = element["imageurl"]
        repourl = f"https://github.com/NaokiHori/{name}"
        cardurl = f"https://github.com/NaokiHori/NaokiHori/blob/card/card/{name}.svg"
        # repo card
        string.append((
            f"<div align=\"left\">\n"
            f"  <a href=\"{repourl}\" target=\"_blank\">\n"
            f"    <img src=\"{cardurl}\" />\n"
            f"  </a>\n"
            f"</div>\n"
        ))
        # image
        if imageurl:
            string.append((
                f"<div align=\"left\">\n"
                f"  <a href=\"{repourl}\" target=\"_blank\">\n"
                f"    <img src=\"{imageurl}\" width=\"75%\" />\n"
                f"  </a>\n"
                f"</div>\n"
            ))
    string = "".join(string)
    return string

def fluid():
    title = "Fluid dynamics"
    elements = [
        {
            "name": "SimpleNavierStokesSolver",
            "imageurl": "https://github.com/NaokiHori/SimpleNavierStokesSolver/blob/main/docs/source/snapshot2d.png",
        },
        {
            "name": "SimpleIBMSolver",
            "imageurl": "https://github.com/NaokiHori/SimpleIBMSolver/blob/main/docs/source/snapshot2d.png",
        },
        {
            "name": "SimpleVOFSolver",
            "imageurl": "https://github.com/NaokiHori/SimpleVOFSolver/blob/main/docs/source/snapshot2d.png",
        },
        {
            "name": "SimpleTCSolver",
            "imageurl": "https://github.com/NaokiHori/SimpleTCSolver/blob/main/docs/source/thumbnail.png",
        },
    ]
    return kernel(title, elements)

def hpc():
    title = "High performance computing"
    elements = [
        {
            "name": "SimpleDecomp",
            "imageurl": "https://naokihori.github.io/SimpleDecomp/_images/transpose_3d.png",
        },
    ]
    return kernel(title, elements)

def auxiliary():
    title = "Auxiliary libraries"
    elements = [
        {
            "name": "SimpleNpyIO",
            "imageurl": None,
        },
    ]
    return kernel(title, elements)

def others():
    title = "Others"
    elements = [
        {
            "name": "Collision",
            "imageurl": "https://github.com/NaokiHori/Collision/blob/main/.github/snapshot2d.png",
        },
        {
            "name": "Pendulum",
            "imageurl": "https://github.com/NaokiHori/Pendulum/blob/main/docs/source/thumbnail.png",
        },
    ]
    return kernel(title, elements)

if __name__ == "__main__":
    string = list()
    string.append(header())
    string.append(fluid())
    string.append(hpc())
    string.append(auxiliary())
    string.append(others())
    string = "\n".join(string)
    with open("repository.html", "w") as f:
        f.write(string)

