import { JSX } from "react";
import * as style from "./footer.css";

export function Footer(): JSX.Element {
  const href = "https://github.com/NaokiHori/NaokiHori";
  // a container is used to put an empty space
  //   such that the footer and the bottom of the page contents do not overlap
  return (
    <div className={style.footer}>
      <div className={style.fixedElement}>
        <a href={href} className={style.anchor}>
          &copy; 2024, Naoki Hori
        </a>
      </div>
    </div>
  );
}
