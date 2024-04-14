import { JSX } from "react";
import { Company as CompanyIcon } from "../../icons/Company/Company";
import { Clock as ClockIcon } from "../../icons/Clock/Clock";
import { World as WorldIcon } from "../../icons/World/World";
import { Programming as ProgrammingIcon } from "../../icons/Programming/Programming";
import * as style from "./style.css";

export interface ExperienceInfo {
  index: number;
  role: string;
  company: string;
  country: string;
  skillList: string[];
  duration: string;
}

export function useExperienceInfoList(): ExperienceInfo[] {
  const experienceInfoList: ExperienceInfo[] = [
    {
      index: 0,
      role: "Software engineer (front / server)",
      duration: "Mar. 2024 - Apr. 2024",
      company: "Polyfit Ltd.",
      country: "JAPAN",
      skillList: ["TypeScript", "React", "PostgreSQL"],
    },
    {
      index: 1,
      role: "Internship (ML / software engineer)",
      duration: "Mar. 2018 - Jul. 2018",
      company: "Stockmark Inc.",
      country: "JAPAN",
      skillList: ["Python", "NLP"],
    },
  ];
  return experienceInfoList;
}

function Title({ info }: { info: ExperienceInfo }): JSX.Element {
  return <div className={style.title}>{info.role}</div>;
}

export function Experience({ info }: { info: ExperienceInfo }): JSX.Element {
  return (
    <div className={style.card}>
      <Title info={info} />
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <CompanyIcon />
        </div>
        {info.company}
      </div>
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <WorldIcon />
        </div>
        {info.country}
      </div>
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <ProgrammingIcon />
        </div>
        {info.skillList.join(", ")}
      </div>
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <ClockIcon />
        </div>
        {info.duration}
      </div>
    </div>
  );
}
