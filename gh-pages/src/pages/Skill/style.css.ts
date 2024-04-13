import { style } from "@vanilla-extract/css";

export const logoContainer = style({
  paddingLeft: "2px",
  paddingRight: "2px",
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "auto",
});

export const logoListContainer = style({
  margin: "auto",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
