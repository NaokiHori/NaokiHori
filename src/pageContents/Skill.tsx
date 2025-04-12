import { JSX } from "react";
import { Heading2 } from "../components/Heading/Heading";
import { SkillInfo, useSkillInfo } from "./Skill/hooks";
import { Logos } from "./Skill/Logos";
import { LanguageStats } from "./Skill/LanguageStats";
import * as style from "./skill.css";

export function Skill(): JSX.Element {
  const {
    languageSkillInfoList,
    toolSkillInfoList,
  }: { languageSkillInfoList: SkillInfo[]; toolSkillInfoList: SkillInfo[] } =
    useSkillInfo();
  return (
    <div className={style.skill}>
      <Heading2>Experience</Heading2>
      <Logos skillInfoList={languageSkillInfoList} />
      <Logos skillInfoList={toolSkillInfoList} />
      <Heading2>GitHub Language Statistics</Heading2>
      <LanguageStats />
    </div>
  );
}
