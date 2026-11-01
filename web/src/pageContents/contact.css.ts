import { style } from "@vanilla-extract/css";
import { themeColors } from "../global.css";
import { page } from "../app.css";

export const contactInfoList = style({
  selectors: {
    [`${page} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "flex-start",
      alignItems: "center",
      rowGap: "1rem",
      columnGap: "1rem",
    },
  },
});

export const contactInfo = style({
  selectors: {
    [`${contactInfoList} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderColor: themeColors.background,
      borderWidth: "0.125rem",
      borderStyle: "solid",
      transition: "border-color 0.4s",
    },
    [`${contactInfoList} > &:hover`]: {
      borderColor: themeColors.focused,
    },
  },
});

export const anchor = style({
  selectors: {
    [`${contactInfo} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  },
});

export const image = style({
  selectors: {
    [`${anchor} > &`]: {
      height: "6rem",
    },
  },
});
