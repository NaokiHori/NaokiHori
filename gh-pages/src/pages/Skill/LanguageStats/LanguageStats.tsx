import { JSX } from "react";
import { getDateString } from "../../../utils/getDateString";
import { DisplaySize } from "../../../styles/responsive";
import { LanguageInfo } from "./models";
import { useLanguageInfo } from "./hooks";
import { Labels } from "./Labels";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import * as style from "./style.css";

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
        <Labels displaySize="Wide" languageInfo={original} />
        <BarChart languageInfo={original} />
        <Update displaySize="Wide" date={date} />
      </div>
      {/* for narrower screen */}
      <div className={style.narrowDisplayLanguageStats}>
        <Labels displaySize="Narrow" languageInfo={squashed} />
        <PieChart languageInfo={squashed} />
        <Update displaySize="Narrow" date={date} />
      </div>
    </>
  );
}
