import { JSX } from "react";
import { Info, GlobalStats } from "./hooks";
import { getRate } from "./utils";
import * as style from "./bar.css";

export function Bar({
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
