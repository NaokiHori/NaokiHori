import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";
import { BORDER_WIDTH } from "./constants";

export const pieChart = style({
  margin: "auto",
  width: "90%",
  maxWidth: "480px",
  aspectRatio: "1",
  borderRadius: "50%",
  borderColor: themeVars.color,
  borderStyle: "solid",
  borderWidth: "2px",
});

// bar chart can grow and shrink horizontally
export const barChart = style({
  flexGrow: "1",
  flexShrink: "1",
});

export const barContainer = style({
  marginBottom: "5px",
  marginTop: "5px",
  paddingLeft: "5px",
  borderStyle: "solid",
  borderRadius: "2.5px",
  borderWidth: BORDER_WIDTH,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
});
