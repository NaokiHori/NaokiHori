import { JSX } from "react";
import { Heading1, Heading2 } from "../../components/Heading/Heading";
import { CoverImage } from "../CoverImage/CoverImage";
import { Info, SkillInfo, useSkillInfo } from "./info";
import { LanguageStats } from "./LanguageStats/LanguageStats";
import coverImageSrc from "./wave2d.jpg";
import * as style from "./style.css";

function LogoContainer({ info }: { info: Info }): JSX.Element {
  const name: string = info.name;
  const href: string = info.href;
  const image: string = info.image;
  return (
    <div className={style.logoContainer}>
      <a href={href}>
        <img src={image} alt={name} height="48em" />
      </a>
    </div>
  );
}

function LogoListContainer({ infoList }: { infoList: Info[] }): JSX.Element {
  return (
    <div className={style.logoListContainer}>
      {infoList.map((info: Info, index: number) => (
        <LogoContainer key={index} info={info} />
      ))}
    </div>
  );
}

export function Skill(): JSX.Element {
  const skillInfo: SkillInfo = useSkillInfo();
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>Skill</Heading1>
      <Heading2>Languages, libraries, frameworks</Heading2>
      <LogoListContainer infoList={skillInfo.languages} />
      <Heading2>Tools, Platforms</Heading2>
      <LogoListContainer infoList={skillInfo.tools} />
      <Heading2>GitHub Language Statistics</Heading2>
      <LanguageStats />
    </>
  );
}
