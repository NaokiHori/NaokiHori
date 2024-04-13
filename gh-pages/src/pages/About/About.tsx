import { JSX } from "react";
import { Heading1, Heading2 } from "../../components/Heading/Heading";
import { CoverImage } from "../CoverImage/CoverImage";
import coverImageSrc from "./hdt2d.jpg";
import * as style from "./style.css";

function UnorderedList({ elements }: { elements: string[] }): JSX.Element {
  return (
    <ul className={style.unorderedList}>
      {elements.map((element: string, index: number) => (
        <li key={index}>{element}</li>
      ))}
    </ul>
  );
}

export function About(): JSX.Element {
  const workElements: string[] = [
    "Fluid mechanics (turbulent multiphase flows)",
    "High performance computing",
  ];
  const interestElements: string[] = ["Numerical methods", "Software design"];
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>Naoki HORI</Heading1>
      <div className={style.descr}>
        Ph.D. candidate at University of Twente.
      </div>
      <Heading2>Work</Heading2>
      <UnorderedList elements={workElements} />
      <Heading2>Interest</Heading2>
      <UnorderedList elements={interestElements} />
    </>
  );
}
