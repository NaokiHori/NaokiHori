import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const container = style({
  fontSize: "small",
  height: "2rem",
});

export const main = style({
  selectors: {
    [`${container} > &`]: {
      position: "fixed",
      left: "0",
      right: "0",
      bottom: "0",
      paddingBottom: "0.25rem",
      paddingTop: "0.25rem",
      width: "100%",
      margin: "auto",
      backgroundColor: themeColors.foreground,
      textAlign: "center",
    },
  },
});

export const text = style({
  selectors: {
    [`${main} > &`]: {
      color: themeColors.background,
    },
  },
});
