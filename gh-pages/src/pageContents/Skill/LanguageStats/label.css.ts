import { style } from "@vanilla-extract/css";
import { themeColors } from "../../../global.css";
import {
  wideDisplayLanguageStats,
  narrowDisplayLabelsContainer,
} from "../languageStats.css";

export const label = style({
  selectors: {
    [`${wideDisplayLanguageStats} > &, ${narrowDisplayLabelsContainer} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: "0.5rem",
      color: themeColors.foreground,
      fontSize: "1.2rem",
      margin: "0",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
    },
  },
});
