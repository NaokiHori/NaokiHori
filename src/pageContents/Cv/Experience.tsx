import { JSX } from "react";
import { IconAndDescription } from "./IconAndDescription";
import { Company as CompanyIcon } from "../../icons/Company";
import { Clock as ClockIcon } from "../../icons/Clock";
import { World as WorldIcon } from "../../icons/World";
import { Programming as ProgrammingIcon } from "../../icons/Programming";
import * as style from "./style.css";

export interface ExperienceInfo {
  role: string;
  company: string;
  country: string;
  skillList: string[];
  duration: string;
}

export function useExperienceInfoList(): ExperienceInfo[] {
  const experienceInfoList: ExperienceInfo[] = [
    {
      role: "Software engineer (server)",
      duration: "Apr. 2025 -",
      company: "Yumemi Inc.",
      country: "JAPAN",
      skillList: [],
    },
    {
      role: "Software engineer (front / server)",
      duration: "Mar. 2024 - Apr. 2024",
      company: "Polyfit Ltd.",
      country: "JAPAN",
      skillList: ["TypeScript", "React", "PostgreSQL"],
    },
    {
      role: "Internship (ML / software engineer)",
      duration: "Mar. 2018 - Jul. 2018",
      company: "Stockmark Inc.",
      country: "JAPAN",
      skillList: ["Python", "NLP"],
    },
  ];
  return experienceInfoList;
}

export function Experience({ info }: { info: ExperienceInfo }): JSX.Element {
  return (
    <div className={style.card}>
      <div className={style.title}>{info.role}</div>
      <IconAndDescription Icon={CompanyIcon} description={info.company} />
      <IconAndDescription Icon={WorldIcon} description={info.country} />
      {0 < info.skillList.length && (
        <IconAndDescription
          Icon={ProgrammingIcon}
          description={info.skillList.join(", ")}
        />
      )}
      <IconAndDescription Icon={ClockIcon} description={info.duration} />
    </div>
  );
}
