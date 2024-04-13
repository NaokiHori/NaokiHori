import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { lineStyle } from "../style.css";

export const School: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    const polygon: string = [
      -0.4375, -0.125, 0.0, -0.375, 0.4375, -0.125, 0.0, 0.125, -0.4375, -0.125,
    ]
      .map((point: number) => point * size)
      .join(" ");
    const polyline: string = [
      -0.28125, -0.03125, -0.28125, 0.21875, 0.0, 0.375, 0.28125, 0.21875,
      0.28125, -0.03125,
    ]
      .map((point: number) => point * size)
      .join(" ");
    const line1: number[] = [0.4375, 0.21875, 0.4375, -0.125].map(
      (point: number) => point * size,
    );
    const line2: number[] = [0.0, 0.125, 0.0, 0.375].map(
      (point: number) => point * size,
    );
    return (
      <Svg svgProps={svgProps}>
        <polygon className={lineStyle} points={polygon} />
        <polyline className={lineStyle} points={polyline} />
        <line
          className={lineStyle}
          x1={line1[0]}
          y1={line1[1]}
          x2={line1[2]}
          y2={line1[3]}
        />
        <line
          className={lineStyle}
          x1={line2[0]}
          y1={line2[1]}
          x2={line2[2]}
          y2={line2[3]}
        />
      </Svg>
    );
  },
);
