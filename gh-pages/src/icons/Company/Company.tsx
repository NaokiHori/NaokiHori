import React, { JSX } from "react";
import { Svg, SvgProps } from "../../components/Svg";
import { line } from "../style.css";

export const Company: React.NamedExoticComponent<object> = React.memo(
  function (): JSX.Element {
    const size = 20;
    const svgProps: SvgProps = {
      width: size,
      height: size,
    };
    return (
      <Svg svgProps={svgProps}>
        <rect
          className={line}
          x={-0.35 * size}
          y={-0.45 * size}
          width={0.7 * size}
          height={0.9 * size}
        />
        <rect
          className={line}
          x={-0.1 * size}
          y={0.15 * size}
          width={0.2 * size}
          height={0.3 * size}
        />
      </Svg>
    );
  },
);
