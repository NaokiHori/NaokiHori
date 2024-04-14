import React, { JSX } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { About } from "./About/About";
import { Skill } from "./Skill/Skill";
import { Repository } from "./Repository/Repository";
import { Cv } from "./Cv/Cv";
import { Contact } from "./Contact/Contact";
import * as style from "./style.css";

// each page: the title and the JSX element
export interface Page {
  title: string;
  component: JSX.Element;
}

export function App(): JSX.Element {
  const pages: Page[] = [
    { title: "About", component: <About /> },
    { title: "Skill", component: <Skill /> },
    { title: "Repository", component: <Repository /> },
    { title: "CV", component: <Cv /> },
    { title: "Contact", component: <Contact /> },
  ];
  const [currentPage, setPage] = React.useState<Page>(pages[0]);
  return (
    <div className={style.app}>
      <Header pages={pages} currentPage={currentPage} setPage={setPage} />
      {pages.map((page: Page, index: number) => {
        if (page.title === currentPage.title) {
          return <React.Fragment key={index}>{page.component}</React.Fragment>;
        } else {
          return <React.Fragment key={index} />;
        }
      })}
      <Footer />
    </div>
  );
}
