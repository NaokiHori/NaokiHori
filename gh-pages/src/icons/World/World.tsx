import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { lineStyle } from "../style.css";

export const World: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const radius: number = 0.46875 * size;
    const paths: [string, string] = [
      `M 0 ${(-radius).toString()} Q ${(-radius).toString()} 0 0 ${radius.toString()}`,
      `M 0 ${(-radius).toString()} Q ${radius.toString()} 0 0 ${radius.toString()}`,
    ];
    const hlines: [number, number] = [0.375 * size, 0.28125 * size];
    return (
      <Svg svgProps={svgProps}>
        <circle className={lineStyle} cx="0" cy="0" r={radius} />
        <path className={lineStyle} d={paths[0]} />
        <path className={lineStyle} d={paths[1]} />
        <line className={lineStyle} x1={-radius} y1="0" x2={radius} y2="0" />
        <line
          className={lineStyle}
          x1={-hlines[0]}
          y1={hlines[1]}
          x2={hlines[0]}
          y2={hlines[1]}
        />
        <line
          className={lineStyle}
          x1={-hlines[0]}
          y1={-hlines[1]}
          x2={hlines[0]}
          y2={-hlines[1]}
        />
      </Svg>
    );
  },
);
