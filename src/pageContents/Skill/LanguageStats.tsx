import React, { JSX } from "react";
import { getDateString } from "../../utils/getDateString";
import { DisplaySize } from "../../global.css";
import { Info, LanguageInfo, useLanguageInfo } from "./LanguageStats/hooks";
import { Label } from "./LanguageStats/Label";
import { Bar } from "./LanguageStats/Bar";
import { PieChart } from "./LanguageStats/PieChart";
import * as style from "./languageStats.css";

function Update({
  displaySize,
  date,
}: {
  displaySize: DisplaySize;
  date: Date;
}): JSX.Element {
  return (
    <div
      className={
        displaySize === "Wide" ? style.update.wide : style.update.narrow
      }
    >
      Last update: {getDateString(date)}
    </div>
  );
}

export function LanguageStats(): JSX.Element {
  const {
    date,
    original,
    squashed,
  }: { date: Date; original: LanguageInfo; squashed: LanguageInfo } =
    useLanguageInfo();
  // show nothing before json fetch is completed
  if (original.infoList.length === 0 || squashed.infoList.length === 0) {
    return <></>;
  }
  return (
    <>
      {/* for wider screen */}
      <div className={style.wideDisplayLanguageStats}>
        {original.infoList.map((info: Info, key: number) => {
          return (
            <React.Fragment key={key}>
              <Label info={info} />
              <Bar info={info} globalStats={original.globalStats} />
            </React.Fragment>
          );
        })}
        <Update displaySize="Wide" date={date} />
      </div>
      {/* for narrower screen */}
      <div className={style.narrowDisplayLanguageStats}>
        <div className={style.narrowDisplayLabelsContainer}>
          {squashed.infoList.map((info: Info, key: number) => (
            <Label key={key} info={info} />
          ))}
        </div>
        <PieChart languageInfo={squashed} />
        <Update displaySize="Narrow" date={date} />
      </div>
    </>
  );
}
