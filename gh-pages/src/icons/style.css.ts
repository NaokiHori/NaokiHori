import { style } from "@vanilla-extract/css";
import { themeColors } from "../styles/theme.css";

export const line = style({
  stroke: themeColors.foreground,
  strokeWidth: "2px",
  strokeLinecap: "round",
  fill: "none",
});

export const fill = style({
  fill: themeColors.foreground,
});
