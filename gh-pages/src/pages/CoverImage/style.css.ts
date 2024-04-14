import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const placeholder = style({
  width: "100%",
  aspectRatio: "6",
  backgroundColor: themeColors.background,
});
