import React, { JSX } from "react";
import { createRoot, Root } from "react-dom/client";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { About } from "./pageContents/About";
import { Skill } from "./pageContents/Skill";
import { Repository } from "./pageContents/Repository";
import { Cv } from "./pageContents/Cv";
import { Contact } from "./pageContents/Contact";
import { CoverImage } from "./coverImages/CoverImage";
import coverImageHdt2d from "./coverImages/assets/hdt2d.jpg";
import coverImageWave2d from "./coverImages/assets/wave2d.jpg";
import coverImageRb2d from "./coverImages/assets/rb2d.jpg";
import coverImageCollision from "./coverImages/assets/collision.png";
import coverImageKarman from "./coverImages/assets/karman.jpg";
import "./global.css";
import * as style from "./app.css";

export interface Page {
  coverImage: string;
  coverImageHRef: string;
  title: string;
  heading: string;
  pageContents: () => JSX.Element;
}

function PageHeading({ children }: { children: string }): JSX.Element {
  return <h1 className={style.pageHeading}>{children}</h1>;
}

function App(): JSX.Element {
  const pages: Page[] = [
    {
      coverImage: coverImageKarman,
      coverImageHRef: "https://github.com/NaokiHori/WebNSSolver",
      title: "About",
      heading: "Naoki HORI, Ph.D.",
      pageContents: () => <About />,
    },
    {
      coverImage: coverImageWave2d,
      coverImageHRef: "https://github.com/NaokiHori/SimpleBubblyFlowSolver",
      title: "Skill",
      heading: "Skill",
      pageContents: () => <Skill />,
    },
    {
      coverImage: coverImageRb2d,
      coverImageHRef: "https://github.com/NaokiHori/SimpleNSSolver",
      title: "Repository",
      heading: "GitHub Repository",
      pageContents: () => <Repository />,
    },
    {
      coverImage: coverImageCollision,
      coverImageHRef: "https://github.com/NaokiHori/Collision",
      title: "CV",
      heading: "Curriculum Vitae",
      pageContents: () => <Cv />,
    },
    {
      coverImage: coverImageHdt2d,
      coverImageHRef: "https://github.com/NaokiHori/SpectralNSSolver1",
      title: "Contact",
      heading: "Contact",
      pageContents: () => <Contact />,
    },
  ];
  const [selectedPage, setSelectedPage] = React.useState<Page>(pages[0]);
  return (
    <div className={style.app}>
      <Header
        pages={pages}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <div className={style.page}>
        <CoverImage
          src={selectedPage.coverImage}
          href={selectedPage.coverImageHRef}
        />
        <PageHeading>{selectedPage.heading}</PageHeading>
        {selectedPage.pageContents()}
      </div>
      <Footer />
    </div>
  );
}

const id = "root";
const rootElement: HTMLElement | null = document.getElementById(id);
if (rootElement === null) {
  throw new Error(`The root element "${id}" is not found`);
}
const root: Root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
