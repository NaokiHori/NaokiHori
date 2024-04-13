import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { lineStyle } from "../style.css";

export const Programming: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const paths: [string, string] = [
      `
      M ${(0.05 * size).toString()} ${(0.15 * size).toString()}
      H ${(0.25 * size).toString()}
    `,
      `
      M ${(-0.2 * size).toString()} ${(-0.15 * size).toString()}
      L ${(-0.1 * size).toString()} ${(0 * size).toString()}
      L ${(-0.2 * size).toString()} ${(0.15 * size).toString()}
    `,
    ];
    return (
      <Svg svgProps={svgProps}>
        <rect
          className={lineStyle}
          x={(-0.45 * size).toString()}
          y={(-0.45 * size).toString()}
          width={(0.9 * size).toString()}
          height={(0.9 * size).toString()}
        />
        <path className={lineStyle} d={paths[0]} />
        <path className={lineStyle} d={paths[1]} />
      </Svg>
    );
  },
);
