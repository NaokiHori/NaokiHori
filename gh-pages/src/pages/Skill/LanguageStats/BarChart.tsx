import { JSX } from "react";
import { Info, GlobalStats, LanguageInfo } from "./models";
import { getRate } from "./utils";
import * as style from "./style.css";

function Bar({
  info,
  globalStats,
}: {
  info: Info;
  globalStats: GlobalStats;
}): JSX.Element {
  const rateForChart: string = getRate(info.size, globalStats.maxOfSizes);
  const rateForText: string = getRate(info.size, globalStats.sumOfSizes);
  return (
    <div
      className={style.bar}
      style={{
        borderColor: info.color,
        backgroundColor: info.color,
        width: rateForChart,
      }}
    >
      <div className={style.barText}>{rateForText}</div>
    </div>
  );
}

export function BarChart({
  languageInfo,
}: {
  languageInfo: LanguageInfo;
}): JSX.Element {
  const infoList: Info[] = languageInfo.infoList;
  const globalStats: GlobalStats = languageInfo.globalStats;
  return (
    <div className={style.barChart}>
      {infoList.map((info: Info, index: number) => (
        <Bar key={index} info={info} globalStats={globalStats} />
      ))}
    </div>
  );
}
