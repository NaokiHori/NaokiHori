import { JSX } from "react";
import * as style from "./style.css";

export function Footer(): JSX.Element {
  const href = "https://github.com/NaokiHori/NaokiHori";
  // container is to put empty space above the main footer
  //   such that the footer and the bottom of the page do not overlap
  return (
    <div className={style.container}>
      <div className={style.main}>
        <a href={href} className={style.text}>
          &copy; 2024, Naoki Hori
        </a>
      </div>
    </div>
  );
}
