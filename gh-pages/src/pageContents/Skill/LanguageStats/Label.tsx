import { JSX } from "react";
import { Svg, SvgProps } from "../../../components/Svg";
import { Info } from "./hooks";
import { themeColors } from "../../../global.css";
import * as style from "./label.css";

function Circle({
  radius,
  color,
}: {
  radius: number;
  color: string;
}): JSX.Element {
  const svgProps: SvgProps = {
    width: 2 * radius,
    height: 2 * radius,
  };
  return (
    <Svg svgProps={svgProps}>
      <circle r={radius} fill={themeColors.foreground} />
      <circle r={0.8 * radius} fill={color} />
    </Svg>
  );
}

export function Label({ info }: { info: Info }): JSX.Element {
  return (
    <div className={style.label}>
      <Circle radius={5} color={info.color} />
      {info.name}
    </div>
  );
}
