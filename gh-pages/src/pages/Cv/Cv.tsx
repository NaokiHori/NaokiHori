import { JSX } from "react";
import { Heading1, Heading2 } from "../../components/Heading/Heading";
import { CoverImage } from "../CoverImage/CoverImage";
import { EducationInfo, Education, useEducationInfoList } from "./Education";
import {
  ExperienceInfo,
  Experience,
  useExperienceInfoList,
} from "./Experience";
import coverImageSrc from "./collision.png";
import * as style from "./style.css";

export function Cv(): JSX.Element {
  const educationInfoList: EducationInfo[] = useEducationInfoList();
  const experienceInfoList: ExperienceInfo[] = useExperienceInfoList();
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>Curriculum Vitae</Heading1>
      <div className={style.main}>
        <div className={style.educationOrExperience}>
          <Heading2>Education</Heading2>
          <div className={style.container}>
            {educationInfoList.map((info: EducationInfo, index: number) => (
              <Education key={index} info={info} />
            ))}
          </div>
        </div>
        <div className={style.educationOrExperience}>
          <Heading2>Experience</Heading2>
          <div className={style.container}>
            {experienceInfoList.map((info: ExperienceInfo, index: number) => (
              <Experience key={index} info={info} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
