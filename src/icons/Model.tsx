import React, { JSX } from "react";
import { Svg, SvgProps } from "../components/Svg";
import { line } from "./style.css";

export const Model: React.NamedExoticComponent<object> = React.memo(function (): JSX.Element {
  const size = 20;
  const svgProps: SvgProps = {
    width: size,
    height: size,
  };
  const axes = `
      M ${(-0.4 * size).toString()} ${(-0.4 * size).toString()}
      V ${(0.4 * size).toString()}
      H ${(0.4 * size).toString()}
    `;
  const curve = `
      M ${(-0.3 * size).toString()} ${(0.2 * size).toString()}
      C ${(-0.1 * size).toString()} ${(0.3 * size).toString()}, ${(-0.05 * size).toString()} ${(-0.35 * size).toString()}, ${(0.3 * size).toString()} ${(-0.15 * size).toString()}
    `;
  return (
    <Svg svgProps={svgProps}>
      <path className={line} d={axes} />
      <path className={line} d={curve} />
    </Svg>
  );
});
