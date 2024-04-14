// header component at the top of all pages

import React, { JSX } from "react";
import { Page } from "../App";
import * as style from "./style.css";

function Element({
  page,
  currentPage,
  setPage,
}: {
  page: Page;
  currentPage: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element {
  const handleClick = (newPage: Page): void => {
    setPage(newPage);
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
  setPage,
}: {
  pages: Page[];
  currentPage: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element {
  return (
    <div className={style.container}>
      {pages.map((page: Page, index: number) => (
        <Element
          key={index}
          page={page}
          currentPage={currentPage}
          setPage={setPage}
        />
      ))}
    </div>
  );
}
