import React, { JSX } from "react";
import { Heading1, Heading2 } from "../../components/Heading/Heading";
import { Svg, SvgProps } from "../../components/Svg";
import { CoverImage } from "../CoverImage/CoverImage";
import coverImageSrc from "./hdt2d.jpg";
import * as style from "./style.css";

const Disc: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 10;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const radius: number = 0.25 * size;
    return (
      <Svg svgProps={svgProps}>
        <circle className={style.circle} cx="0" cy="0" r={radius} />
      </Svg>
    );
  },
);

function List({ elements }: { elements: string[] }): JSX.Element {
  return (
    <div className={style.listContainer}>
      {elements.map((element: string, index: number) => (
        <div key={index} className={style.listItem}>
          <div className={style.disc}>
            <Disc />
          </div>
          <div className={style.listText}>{element}</div>
        </div>
      ))}
    </div>
  );
}

export function About(): JSX.Element {
  const introductionElements: string[] = [
    "Modeling and simulating various phenomena using computational methods.",
    "Coding enthusiast (C, Rust, Python, TypeScript, among others) striving for direct, transparent, elegant, and efficient solutions.",
    "Fan of CFD: 'Colorful Fluid Dynamics' - or Computational Fluid Dynamics.",
  ];
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>Naoki HORI, Ph.D.</Heading1>
      <Heading2>About Me</Heading2>
      <List elements={introductionElements} />
    </>
  );
}
