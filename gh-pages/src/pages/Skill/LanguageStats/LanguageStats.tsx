import React, { JSX } from "react";
import { getDateString } from "../../../utils/getDateString";
import { DisplaySize } from "../../../styles/responsive";
import { Info, LanguageInfo, useLanguageInfo } from "./hooks";
import { Label } from "./Label";
import { Bar } from "./Bar";
import { PieChart } from "./PieChart";
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
        {original.infoList.map((info: Info, index: number) => {
          return (
            <React.Fragment key={index}>
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
          {squashed.infoList.map((info: Info, index: number) => (
            <Label key={index} info={info} />
          ))}
        </div>
        <PieChart languageInfo={squashed} />
        <Update displaySize="Narrow" date={date} />
      </div>
    </>
  );
}
