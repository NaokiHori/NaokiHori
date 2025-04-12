import React, { JSX } from "react";
import * as style from "./style.css";

export function IconAndDescription({
  Icon,
  description,
}: {
  Icon: React.NamedExoticComponent<object>;
  description: string;
}): JSX.Element {
  return (
    <div className={style.iconAndDescription}>
      <div className={style.iconWrapper}>
        <Icon />
      </div>
      {description}
    </div>
  );
}
