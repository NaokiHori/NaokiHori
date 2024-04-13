import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const container = style({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  alignItems: "center",
});

export const element = style({
  padding: "10px",
  color: themeVars.unfocusedTextColor,
  flexGrow: "1",
  flexShrink: "1",
  flexBasis: "auto",
  textAlign: "center",
  fontSize: "20px",
  cursor: "default",
  transition: "color 0.2s",
  ":hover": {
    color: themeVars.focusedTextColor,
    cursor: "pointer",
  },
});
