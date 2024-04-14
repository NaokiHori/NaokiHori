import { JSX } from "react";
import { Svg, SvgProps } from "../../../components/Svg";
import { Info, LanguageInfo } from "./models";
import { themeColors } from "../../../styles/theme.css";
import * as style from "./labels.css";

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

function Label({ info }: { info: Info }): JSX.Element {
  return (
    <div className={style.label}>
      <Circle radius={5} color={info.color} />
      {info.name}
    </div>
  );
}

export function Labels({
  languageInfo,
}: {
  languageInfo: LanguageInfo;
}): JSX.Element {
  return (
    <div className={style.labels}>
      {languageInfo.infoList.map((info: Info, index: number) => (
        <Label key={index} info={info} />
      ))}
    </div>
  );
}
