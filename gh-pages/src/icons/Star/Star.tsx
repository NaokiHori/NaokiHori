import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import * as style from "./style.css";

export const Star: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const nVertices = 10;
    const pathElements: string[] = [...Array(nVertices).keys()].map(
      (index: number) => {
        const theta: number = 2.0 * Math.PI * (-0.25 + index / nVertices);
        const radius: number = index % 2 === 0 ? 0.48 * size : 0.24 * size;
        const x: number = radius * Math.cos(theta);
        const y: number = radius * Math.sin(theta);
        const prefix: string = index === 0 ? "M" : "L";
        const suffix: string = index === nVertices - 1 ? "Z" : " ";
        return `${prefix.toString()} ${x.toString()} ${y.toString()} ${suffix.toString()}`;
      },
    );
    const path: string = pathElements.join("");
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    return (
      <Svg svgProps={svgProps}>
        <path className={style.star} d={path} />
      </Svg>
    );
  },
);
