import { JSX } from "react";
import { Info, GlobalStats, LanguageInfo } from "./hooks";
import * as style from "./pieChart.css";

function createPieChart({
  infoList,
  globalStats,
}: {
  infoList: Info[];
  globalStats: GlobalStats;
}): string {
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
}

export function PieChart({
  languageInfo,
}: {
  languageInfo: LanguageInfo;
}): JSX.Element {
  const infoList: Info[] = languageInfo.infoList;
  const globalStats: GlobalStats = languageInfo.globalStats;
  // describe pie chart using conic-gradient
  const background = createPieChart({ infoList, globalStats });
  return <div className={style.pieChart} style={{ background }} />;
}
