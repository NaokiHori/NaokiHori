import { JSX } from "react";
import * as style from "./style.css";

export function Heading1({ children }: { children: string }): JSX.Element {
  return (
    <div className={style.heading1Container}>
      <div className={style.heading1Text}>{children}</div>
    </div>
  );
}

export function Heading2({ children }: { children: string }): JSX.Element {
  return (
    <div className={style.heading2Container}>
      <div className={style.heading2Text}>{children}</div>
    </div>
  );
}
