import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const listContainer = style({
  paddingLeft: "10px",
  paddingRight: "10px",
  margin: "0",
  lineHeight: "2",
});

export const listItem = style({
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  columnGap: "10px",
});

export const disc = style({
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "10px",
});

export const circle = style({
  fill: themeColors.foreground,
});

export const listText = style({
  flexGrow: "1",
  flexShrink: "1",
  flexBasis: "auto",
  fontSize: "large",
});
