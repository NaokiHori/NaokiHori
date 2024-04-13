import { JSX } from "react";
import { getDateString } from "../../../util/getDateString";
import { LanguageInfo } from "./models";
import { useLanguageInfo } from "./hooks";
import { Labels } from "./Labels";
import { BarChart, PieChart } from "./Charts";
import * as style from "./style.css";

function Update({ date }: { date: Date }): JSX.Element {
  return <div className={style.update}>Last update: {getDateString(date)}</div>;
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
      <div className={style.wide}>
        <Labels languageInfo={original} />
        <BarChart languageInfo={original} />
        <Update date={date} />
      </div>
      {/* for narrower screen */}
      <div className={style.narrow}>
        <Labels languageInfo={squashed} />
        <PieChart languageInfo={squashed} />
        <Update date={date} />
      </div>
    </>
  );
}
