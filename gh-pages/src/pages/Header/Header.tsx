// header component at the top of all pages

import { JSX } from "react";
import { Page } from "../App";
import * as style from "./style.css";

function Element({
  page,
  currentPage,
  updatePage,
}: {
  page: Page;
  currentPage: Page;
  updatePage: (newPage: Page) => void;
}): JSX.Element {
  const handleClick = (newPage: Page): void => {
    updatePage(newPage);
  };
  return (
    <div
      className={style.element}
      style={{
        textDecoration: page.title === currentPage.title ? "underline" : "none",
      }}
      onClick={() => {
        handleClick(page);
      }}
    >
      {page.title}
    </div>
  );
}

export function Header({
  pages,
  currentPage,
  updatePage,
}: {
  pages: Page[];
  currentPage: Page;
  updatePage: (newPage: Page) => void;
}): JSX.Element {
  return (
    <div className={style.container}>
      {pages.map((page: Page, index: number) => (
        <Element
          key={index}
          page={page}
          currentPage={currentPage}
          updatePage={updatePage}
        />
      ))}
    </div>
  );
}
