import React, { JSX } from "react";
import { Svg, SvgProps } from "../components/Svg";
import { line } from "./style.css";

export const Mesh: React.NamedExoticComponent<object> = React.memo(function (): JSX.Element {
  const size = 20;
  const svgProps: SvgProps = {
    width: size,
    height: size,
  };
  const frame = `
      M ${(-0.4 * size).toString()} ${(-0.4 * size).toString()}
      H ${(0.4 * size).toString()}
      V ${(0.4 * size).toString()}
      H ${(-0.4 * size).toString()}
      Z
    `;
  const gridLines: [string, string] = [
    `
      M 0 ${(-0.4 * size).toString()}
      V ${(0.4 * size).toString()}
    `,
    `
      M ${(-0.4 * size).toString()} 0
      H ${(0.4 * size).toString()}
    `,
  ];
  const curve = `
      M ${(-0.4 * size).toString()} ${(0.15 * size).toString()}
      C ${(-0.15 * size).toString()} ${(0.15 * size).toString()}, ${(-0.15 * size).toString()} ${(-0.25 * size).toString()}, 0 ${(-0.25 * size).toString()}
      C ${(0.15 * size).toString()} ${(-0.25 * size).toString()}, ${(0.15 * size).toString()} ${(0.05 * size).toString()}, ${(0.4 * size).toString()} ${(0.05 * size).toString()}
    `;
  return (
    <Svg svgProps={svgProps}>
      <path className={line} d={frame} />
      <path className={line} d={gridLines[0]} />
      <path className={line} d={gridLines[1]} />
      <path className={line} d={curve} />
    </Svg>
  );
});
