import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const star = style({
  fill: "#ffff00",
  stroke: themeColors.foreground,
});
