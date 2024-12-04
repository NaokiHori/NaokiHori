import { JSX } from "react";
import { Svg, SvgProps } from "../Svg";
import * as style from "./style.css";

export function CloseButton({
  handleClick,
}: {
  handleClick: () => void;
}): JSX.Element {
  const size = 24;
  const svgProps: SvgProps = {
    width: size,
    height: size,
  };
  const edges: [number, number] = [-0.5 * size, 0.5 * size];
  return (
    <div
      className={style.closeButton}
      onClick={() => {
        handleClick();
      }}
    >
      <Svg svgProps={svgProps}>
        <line
          className={style.closeButtonLine}
          x1={edges[0]}
          y1={edges[0]}
          x2={edges[1]}
          y2={edges[1]}
        />
        <line
          className={style.closeButtonLine}
          x1={edges[1]}
          y1={edges[0]}
          x2={edges[0]}
          y2={edges[1]}
        />
      </Svg>
    </div>
  );
}
