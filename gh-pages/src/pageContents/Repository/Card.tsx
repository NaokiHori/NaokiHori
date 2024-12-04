import { JSX } from "react";
import { getDateString } from "../../utils/getDateString";
import { CardInfo, useCardInfo } from "./Card/hooks";
import { Star as StarIcon } from "../../icons/Star";
import { Clock as ClockIcon } from "../../icons/Clock";
import { themeColors } from "../../global.css";
import * as style from "./card.css";

function Topic({ topic }: { topic: string }): JSX.Element {
  return (
    <div
      className={style.borderedBox}
      style={{ borderColor: themeColors.foreground }}
    >
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

function LastUpdate({ lastUpdate }: { lastUpdate: Date | null }): JSX.Element {
  if (lastUpdate) {
    return (
      <div className={style.iconAndTextContainer}>
        <ClockIcon />
        <div className={style.textAfterIcon}>{getDateString(lastUpdate)}</div>
      </div>
    );
  } else {
    return <></>;
  }
}

export function Card({
  repositoryName,
}: {
  repositoryName: string;
}): JSX.Element {
  const {
    isCardInfoLoaded,
    cardInfo,
  }: { isCardInfoLoaded: boolean; cardInfo: CardInfo } =
    useCardInfo(repositoryName);
  const title: string = cardInfo.name;
  const description: string = cardInfo.description;
  const topics: string[] = cardInfo.topics;
  const languages: { name: string; size: number; color: string }[] =
    cardInfo.languages;
  const nStars: number = cardInfo.nStars;
  const lastUpdate: Date | null = cardInfo.lastUpdate;
  const href = `https://github.com/NaokiHori/${title}`;
  // TODO: always show title, while others are displayed once card information is loaded
  if (isCardInfoLoaded) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={style.cardAnchor}
      >
        <div className={style.card}>
          {/* title */}
          <div className={style.title}>{title}</div>
          {/* description */}
          <div className={style.description}>{description}</div>
          {/* topics */}
          <div className={style.topicsAndLanguages}>
            {topics.map((topic: string, key: number) => (
              <Topic key={key} topic={topic} />
            ))}
          </div>
          {/* languages */}
          <div className={style.topicsAndLanguages}>
            {languages.map(
              (
                language: { name: string; size: number; color: string },
                key: number,
              ) => (
                <Language key={key} language={language} />
              ),
            )}
          </div>
          {/* stars and update date */}
          <div className={style.starsAndLastUpdate}>
            <Star nStars={nStars} />
            <LastUpdate lastUpdate={lastUpdate} />
          </div>
        </div>
      </a>
    );
  } else {
    return <></>;
  }
}
