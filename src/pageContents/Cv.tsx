import { JSX } from "react";
import { Heading2 } from "../components/Heading/Heading";
import { EducationInfo, Education, useEducationInfoList } from "./Cv/Education";
import {
  ExperienceInfo,
  Experience,
  useExperienceInfoList,
} from "./Cv/Experience";
import * as style from "./cv.css";

export function Cv(): JSX.Element {
  const educationInfoList: EducationInfo[] = useEducationInfoList();
  const experienceInfoList: ExperienceInfo[] = useExperienceInfoList();
  return (
    <div className={style.cv}>
      <div className={style.educationOrExperience}>
        <Heading2>Education</Heading2>
        <div className={style.cards}>
          {educationInfoList.map((info: EducationInfo, key: number) => (
            <Education key={key} info={info} />
          ))}
        </div>
      </div>
      <div className={style.educationOrExperience}>
        <Heading2>Experience</Heading2>
        <div className={style.cards}>
          {experienceInfoList.map((info: ExperienceInfo, key: number) => (
            <Experience key={key} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
}
