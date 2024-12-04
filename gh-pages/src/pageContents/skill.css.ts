import { style } from "@vanilla-extract/css";
import { page } from "../app.css";

export const skill = style({
  selectors: {
    [`${page} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "0.25rem",
    },
  },
});
