import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { lineStyle, fillStyle } from "../style.css";

type HandType = "small" | "big";

const angles: [number, number] = [0.0, (2 * Math.PI * 7) / 8];

function Arc({ radius }: { radius: number }): JSX.Element {
  const start: [number, number] = [
    radius * Math.cos(angles[0]),
    radius * Math.sin(angles[0]),
  ];
  const end: [number, number] = [
    radius * Math.cos(angles[1]),
    radius * Math.sin(angles[1]),
  ];
  const d = `
    M${start[0].toString()} ${start[1].toString()}
    A${radius.toString()} ${radius.toString()} 0 1 1
    ${end[0].toString()} ${end[1].toString()}
  `;
  return <path className={lineStyle} d={d} />;
}

function ArrowHead({ radius }: { radius: number }): JSX.Element {
  const radii: [number, number] = [0.5 * radius, 1.5 * radius];
  const start: [number, number] = [
    radii[0] * Math.cos(angles[1]),
    radii[0] * Math.sin(angles[1]),
  ];
  const end: [number, number] = [
    radii[1] * Math.cos(angles[1]),
    radii[1] * Math.sin(angles[1]),
  ];
  const points = `
    ${start[0].toString()} ${start[1].toString()}
    ${end[0].toString()} ${start[1].toString()}
    ${end[0].toString()} ${end[1].toString()}
  `;
  return <polygon className={fillStyle} points={points} />;
}

function Hand({
  handType,
  size,
}: {
  handType: HandType;
  size: number;
}): JSX.Element {
  const x1 = 0;
  const y1 = 0;
  const x2: number = handType === "small" ? 0.2 * size : 0;
  const y2: number = handType === "big" ? -0.3 * size : 0;
  return <line className={lineStyle} x1={x1} y1={y1} x2={x2} y2={y2} />;
}

export const Clock: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const radius: number = 0.4 * size;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    return (
      <Svg svgProps={svgProps}>
        <Arc radius={radius} />
        <ArrowHead radius={radius} />
        <Hand handType="small" size={size} />
        <Hand handType="big" size={size} />
      </Svg>
    );
  },
);
