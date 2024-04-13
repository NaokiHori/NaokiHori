import { JSX } from "react";
import * as style from "./style.css";

export function Heading1({ children }: { children: string }): JSX.Element {
  return <h1 className={style.heading1}>{children}</h1>;
}

export function Heading2({ children }: { children: string }): JSX.Element {
  return <h2 className={style.heading2}>{children}</h2>;
}
