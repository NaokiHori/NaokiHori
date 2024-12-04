import { style } from "@vanilla-extract/css";
import { themeColors } from "../global.css";

export const placeholder = style({
  width: "100%",
  display: "block",
  aspectRatio: "6",
  backgroundColor: themeColors.background,
});

export const container = style({
  borderWidth: "0.125vw",
  borderStyle: "solid",
  borderColor: themeColors.background,
  transition: "border-color 0.4s",
  ":hover": {
    borderColor: themeColors.focused,
  },
});

export const anchor = style({
  selectors: {
    [`${container} > &`]: {},
  },
});

export const image = style({
  selectors: {
    [`${anchor} > &`]: {
      width: "100%",
      display: "block",
    },
  },
});
