import { JSX } from "react";
import { School as SchoolIcon } from "../../icons/School";
import { Clock as ClockIcon } from "../../icons/Clock";
import { World as WorldIcon } from "../../icons/World";
import { Award as AwardIcon } from "../../icons/Award";
import * as style from "./style.css";

export interface EducationInfo {
  index: number;
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
      index: 0,
      role: "PhD candidate",
      duration: "May 2020 - Sep. 2024 (expected)",
      group: "Physics of Fluids group",
      university: "University of Twente",
      country: "THE NETHERLANDS",
      misc: "",
    },
    {
      index: 1,
      role: "MSc in Mechanical Engineering",
      duration: "Apr. 2018 - Mar. 2020",
      group: "Fluid Engineering Laboratory",
      university: "The University of Tokyo",
      country: "JAPAN",
      misc: "Miura Award, The Japan Society of Mechanical Engineering",
    },
    {
      index: 2,
      role: "Exchange student",
      duration: "Aug. 2018 - Mar. 2019",
      group: "Linné Flow Center",
      university: "KTH Royal Institute of Technology",
      country: "SWEDEN",
      misc: "",
    },
    {
      index: 3,
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

function Title({ info }: { info: EducationInfo }): JSX.Element {
  return <div className={style.title}>{info.role}</div>;
}

export function Education({ info }: { info: EducationInfo }): JSX.Element {
  const affiliation = `${info.group}, ${info.university}`;
  return (
    <div className={style.card}>
      <Title info={info} />
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <SchoolIcon />
        </div>
        {affiliation}
      </div>
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <WorldIcon />
        </div>
        {info.country}
      </div>
      {info.misc !== "" && (
        <div className={style.element}>
          <div className={style.iconWrapper}>
            <AwardIcon />
          </div>
          {info.misc}
        </div>
      )}
      <div className={style.element}>
        <div className={style.iconWrapper}>
          <ClockIcon />
        </div>
        {info.duration}
      </div>
    </div>
  );
}
