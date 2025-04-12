import { JSX } from "react";
import { IconAndDescription } from "./IconAndDescription";
import { School as SchoolIcon } from "../../icons/School";
import { Clock as ClockIcon } from "../../icons/Clock";
import { World as WorldIcon } from "../../icons/World";
import { Award as AwardIcon } from "../../icons/Award";
import * as style from "./style.css";

export interface EducationInfo {
  role: string;
  group: string;
  university: string;
  country: string;
  duration: string;
  misc: string;
}

export function useEducationInfoList(): EducationInfo[] {
  const educationInfoList = [
    {
      role: "PhD in Applied Physics",
      duration: "May 2020 - Sep. 2024",
      group: "Physics of Fluids group",
      university: "University of Twente",
      country: "THE NETHERLANDS",
      misc: "",
    },
    {
      role: "MSc in Mechanical Engineering",
      duration: "Apr. 2018 - Mar. 2020",
      group: "Fluid Engineering Laboratory",
      university: "The University of Tokyo",
      country: "JAPAN",
      misc: "Miura Award, The Japan Society of Mechanical Engineering",
    },
    {
      role: "Exchange student",
      duration: "Aug. 2018 - Mar. 2019",
      group: "Linné Flow Center",
      university: "KTH Royal Institute of Technology",
      country: "SWEDEN",
      misc: "",
    },
    {
      role: "BSc in Mechanical Engineering",
      duration: "Apr. 2014 - Mar. 2018",
      group: "Fluid Engineering Laboratory",
      university: "The University of Tokyo",
      country: "JAPAN",
      misc: "",
    },
  ];
  return educationInfoList;
}

export function Education({ info }: { info: EducationInfo }): JSX.Element {
  const affiliation = `${info.group}, ${info.university}`;
  return (
    <div className={style.card}>
      <div className={style.title}>{info.role}</div>
      <IconAndDescription Icon={SchoolIcon} description={affiliation} />
      <IconAndDescription Icon={WorldIcon} description={info.country} />
      {info.misc !== "" && (
        <IconAndDescription Icon={AwardIcon} description={info.misc} />
      )}
      <IconAndDescription Icon={ClockIcon} description={info.duration} />
    </div>
  );
}
