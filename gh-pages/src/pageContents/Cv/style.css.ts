import { style } from "@vanilla-extract/css";
import { themeColors, cardItem as cardItemStyle } from "../../global.css";
import { cards } from "../cv.css";

export const card = style({
  selectors: {
    [`${cards} > &`]: {
      ...cardItemStyle,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "0.5rem",
    },
  },
});

export const title = style({
  selectors: {
    [`${card} > &`]: {
      flexGrow: 1,
      flexShrink: 1,
      fontSize: "x-large",
      color: themeColors.foreground,
      textAlign: "left",
    },
  },
});

export const iconAndDescription = style({
  selectors: {
    [`${card} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      columnGap: "1rem",
      whiteSpace: "wrap",
    },
  },
});

export const iconWrapper = style({
  selectors: {
    [`${iconAndDescription} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  },
});
