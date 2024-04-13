// header component at the top of all pages

import React, { JSX } from "react";
import { Page } from "../Page";
import * as style from "./style.css";

function Element({
  page,
  setPage,
}: {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element {
  const handleClick = (newPage: Page): void => {
    setPage(newPage);
  };
  return (
    <div
      className={style.element}
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
  setPage,
}: {
  pages: Page[];
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element {
  return (
    <div className={style.container}>
      {pages.map((page: Page, index: number) => (
        <Element key={index} page={page} setPage={setPage} />
      ))}
    </div>
  );
}
