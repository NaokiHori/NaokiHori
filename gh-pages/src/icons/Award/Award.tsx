import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { lineStyle } from "../style.css";

export const Award: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const radius: number = 0.25 * size;
    const path = `
      M ${(-0.125 * size).toString()}, ${(0.09375 * size).toString()}
      V ${(0.375 * size).toString()}
      l ${(0.125 * size).toString()} ${(-0.0625 * size).toString()}, ${(0.125 * size).toString()}, ${(0.0625 * size).toString()}
      V ${(0.09375 * size).toString()}
    `;
    return (
      <Svg svgProps={svgProps}>
        <path className={lineStyle} d={path} />
        <circle className={lineStyle} cx="0" cy={-0.5 * radius} r={radius} />
      </Svg>
    );
  },
);
