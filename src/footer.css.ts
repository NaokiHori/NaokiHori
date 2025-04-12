import { style } from "@vanilla-extract/css";
import { themeColors } from "./global.css";
import { app } from "./app.css";

export const footer = style({
  selectors: {
    [`${app} > &`]: {
      height: "2rem",
    },
  },
});

export const fixedElement = style({
  selectors: {
    [`${footer} > &`]: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      margin: "auto",
      backgroundColor: themeColors.foreground,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "flex-start",
      alignItems: "stretch",
      paddingBlockStart: "0.25rem",
      paddingBlockEnd: "0.25rem",
    },
  },
});

export const anchor = style({
  selectors: {
    [`${fixedElement} > &`]: {
      color: themeColors.background,
      fontSize: "medium",
    },
  },
});
