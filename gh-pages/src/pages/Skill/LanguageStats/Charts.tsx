import { JSX } from "react";
import { Info, GlobalStats, LanguageInfo } from "./models";
import { getRate } from "./utils";
import * as style from "./charts.css";

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
      className={style.barContainer}
      style={{
        borderColor: info.color,
        backgroundColor: info.color,
        width: rateForChart,
      }}
    >
      {rateForText}
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

export function PieChart({
  languageInfo,
}: {
  languageInfo: LanguageInfo;
}): JSX.Element {
  const infoList: Info[] = languageInfo.infoList;
  const globalStats: GlobalStats = languageInfo.globalStats;
  // describe pie chart using conic-gradient
  const createPieChart = (): string => {
    const nitems: number = infoList.length;
    let chart = "conic-gradient(";
    let cumulativeSize = 0.0;
    for (const [index, info] of infoList.entries()) {
      const color: string = info.color;
      const bef: number = cumulativeSize;
      const aft: number = cumulativeSize + info.size / globalStats.sumOfSizes;
      chart += `${color} ${bef.toString()}turn ${aft.toString()}turn`;
      if (nitems - 1 !== index) {
        chart += ",";
      }
      cumulativeSize = aft;
    }
    chart += ")";
    return chart;
  };
  return (
    <div className={style.pieChart} style={{ background: createPieChart() }} />
  );
}
