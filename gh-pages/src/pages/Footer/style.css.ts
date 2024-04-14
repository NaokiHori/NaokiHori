import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const container = style({
  fontSize: "small",
  height: "2em",
});

export const main = style({
  position: "fixed",
  left: "0",
  right: "0",
  bottom: "0",
  paddingBottom: "0.5em",
  width: "100%",
  margin: "auto",
  backgroundColor: themeColors.background,
  textAlign: "center",
});

export const text = style({
  color: themeColors.foreground,
});
