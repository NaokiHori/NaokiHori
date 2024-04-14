import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { line } from "../style.css";

export const World: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const radius: number = 0.45 * size;
    const paths: [string, string] = [
      `M 0 ${(-radius).toString()} Q ${(-radius).toString()} 0 0 ${radius.toString()}`,
      `M 0 ${(-radius).toString()} Q ${radius.toString()} 0 0 ${radius.toString()}`,
    ];
    const angle = Math.PI / 6;
    const hlines = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
    return (
      <Svg svgProps={svgProps}>
        <circle className={line} cx="0" cy="0" r={radius} />
        <path className={line} d={paths[0]} />
        <path className={line} d={paths[1]} />
        <line className={line} x1={-radius} y1="0" x2={radius} y2="0" />
        <line
          className={line}
          x1={-hlines.x}
          y1={hlines.y}
          x2={hlines.x}
          y2={hlines.y}
        />
        <line
          className={line}
          x1={-hlines.x}
          y1={-hlines.y}
          x2={hlines.x}
          y2={-hlines.y}
        />
      </Svg>
    );
  },
);
