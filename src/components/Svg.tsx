// SVG element whose center coincides with the origin

import React, { JSX } from "react";

export interface SvgProps {
  width: number;
  height: number;
}

export function Svg({
  svgProps,
  children,
}: {
  svgProps: SvgProps;
  children: React.ReactNode;
}): JSX.Element {
  const width: number = svgProps.width;
  const height: number = svgProps.height;
  const x: string = (-0.5 * width).toString();
  const y: string = (-0.5 * height).toString();
  const viewBox = `${x} ${y} ${width.toString()} ${height.toString()}`;
  const xmlNameSpace = "http://www.w3.org/2000/svg";
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns={xmlNameSpace}
    >
      {children}
    </svg>
  );
}
