import { style } from "@vanilla-extract/css";
import { themeColors } from "../../../global.css";
import { narrowDisplayLanguageStats } from "../languageStats.css";

export const pieChart = style({
  selectors: {
    [`${narrowDisplayLanguageStats} > &`]: {
      margin: "auto",
      width: "90%",
      maxWidth: "20rem",
      aspectRatio: "1",
      borderRadius: "50%",
      borderColor: themeColors.foreground,
      borderStyle: "solid",
      borderWidth: "0.1rem",
    },
  },
});
