import { JSX } from "react";
import { SkillInfo } from "./hooks";
import * as style from "./logos.css";

function Logo({ skillInfo }: { skillInfo: SkillInfo }): JSX.Element {
  const name: string = skillInfo.name;
  const href: string = skillInfo.href;
  const image: string = skillInfo.image;
  return (
    <div className={style.logo}>
      <a className={style.logoAnchor} href={href}>
        <img className={style.logoImage} src={image} alt={name} />
      </a>
    </div>
  );
}

export function Logos({
  skillInfoList,
}: {
  skillInfoList: SkillInfo[];
}): JSX.Element {
  return (
    <div className={style.logos}>
      {skillInfoList.map((skillInfo: SkillInfo, key: number) => (
        <Logo key={key} skillInfo={skillInfo} />
      ))}
    </div>
  );
}
