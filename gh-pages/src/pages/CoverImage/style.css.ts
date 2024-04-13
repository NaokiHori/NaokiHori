import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const placeholder = style({
  width: "100%",
  aspectRatio: "6",
  backgroundColor: themeVars.backgroundColor,
});
