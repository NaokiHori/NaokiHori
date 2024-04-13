import { JSX } from "react";
import { getDateString } from "../../../util/getDateString";
import { useCard } from "./hooks";
import { Info } from "./models";
import { Star as StarIcon } from "../../../icons/Star/Star";
import { Clock as ClockIcon } from "../../../icons/Clock/Clock";
import { themeVars } from "../../../styles/theme.css";
import * as style from "./style.css";

function Topic({ topic }: { topic: string }): JSX.Element {
  return (
    <div className={style.borderedBox} style={{ borderColor: themeVars.color }}>
      {topic}
    </div>
  );
}

function Language({
  language,
}: {
  language: { name: string; size: number; color: string };
}): JSX.Element {
  return (
    <div className={style.borderedBox} style={{ borderColor: language.color }}>
      {language.name}
    </div>
  );
}

function Star({ nStars }: { nStars: number }): JSX.Element {
  return (
    <div className={style.iconAndTextContainer}>
      <StarIcon />
      <div className={style.textAfterIcon}>{nStars}</div>
    </div>
  );
}

function LastUpdate({ lastUpdate }: { lastUpdate: Date }): JSX.Element {
  return (
    <div className={style.iconAndTextContainer}>
      <ClockIcon />
      <div className={style.textAfterIcon}>{getDateString(lastUpdate)}</div>
    </div>
  );
}

export function Card({
  repositoryName,
}: {
  repositoryName: string;
}): JSX.Element {
  const [isLoaded, info]: [boolean, Info] = useCard(repositoryName);
  if (isLoaded) {
    const href = `https://github.com/NaokiHori/${info.name}`;
    return (
      <div className={style.card}>
        {/* title */}
        <div className={style.title}>
          <a href={href} className={style.titleAnchor}>
            {info.name}
          </a>
        </div>
        {/* description */}
        <div className={style.descr}>{info.descr}</div>
        {/* topics */}
        <div className={style.topicsAndLanguages}>
          {info.topics.map((topic: string, index: number) => (
            <Topic key={index} topic={topic} />
          ))}
        </div>
        {/* languages */}
        <div className={style.topicsAndLanguages}>
          {info.languages.map(
            (
              language: { name: string; size: number; color: string },
              index: number,
            ) => (
              <Language key={index} language={language} />
            ),
          )}
        </div>
        {/* stars and update date */}
        <div className={style.starsAndUpdateDate}>
          <Star nStars={info.nStars} />
          <LastUpdate lastUpdate={info.lastUpdate} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
