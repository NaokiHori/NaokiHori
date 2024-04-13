import { JSX } from "react";
import { getDateString } from "../../../util/getDateString";
import { Clock as ClockIcon } from "../../../icons/Clock/Clock";
import * as style from "./style.css";

export function LastUpdate({ lastUpdate }: { lastUpdate: Date }): JSX.Element {
  return (
    <div className={style.iconAndTextContainer}>
      <ClockIcon />
      <div className={style.textAfterIcon}>{getDateString(lastUpdate)}</div>
    </div>
  );
}
