import { style } from "@vanilla-extract/css";
import { wideDisplayLanguageStats } from "./languageStats.css";

export const bar = style({
  selectors: {
    [`${wideDisplayLanguageStats} > &`]: {
      paddingLeft: "0rem",
      paddingRight: "0rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: "0.125rem",
      borderRadius: "0.25rem",
    },
  },
});

export const barText = style({
  selectors: {
    [`${bar} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      flexBasis: "auto",
      marginLeft: "0.5rem",
    },
  },
});
