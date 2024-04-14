import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "flex-start",
  alignItems: "center",
  columnGap: "24px",
});

export const element = style({
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "auto",
});
