// header component at the top of all pages

import { JSX } from "react";
import { Page } from "./App";
import * as style from "./header.css";

export function Header({
  pages,
  selectedPage,
  setSelectedPage,
}: {
  pages: Page[];
  selectedPage: Page;
  setSelectedPage: (page: Page) => void;
}): JSX.Element {
  return (
    <div className={style.header}>
      {pages.map((page: Page, key: number) => (
        <button
          key={key}
          className={
            page.title === selectedPage.title
              ? style.button.selected
              : style.button.unselected
          }
          onClick={() => {
            setSelectedPage(page);
          }}
        >
          {page.title}
        </button>
      ))}
    </div>
  );
}
