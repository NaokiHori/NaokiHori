import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";
import { WideScreen, NarrowScreen } from "../../styles/responsive";

export const mainTitle = style({
  flexGrow: "1",
  flexShrink: "1",
  flexBasis: "auto",
  fontSize: "x-large",
  color: themeVars.unfocusedTextColor,
  textAlign: "left",
  cursor: "pointer",
  transition: "color 0.2s",
  ":hover": {
    color: themeVars.focusedTextColor,
  },
});

// make it shorter and leeft-aligned,
//   such that the text does not overlap
//   with a close button on the right-top corner
export const modalTitle = style({
  width: "80%",
  paddingTop: "0.75em",
  fontSize: "x-large",
  fontWeight: "bold",
  color: themeVars.color,
  textAlign: "left",
  whiteSpace: "wrap",
});

export const cardListContainer = style({
  flexGrow: "1",
  flexShrink: "1",
  flexBasis: "auto",
});

export const cardContainer = style({
  paddingTop: "10px",
  paddingBottom: "10px",
});

export const titleListContainer = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  whiteSpace: "nowrap",
  gap: "10px",
  "@media": {
    [NarrowScreen]: {
      flexGrow: "0",
      flexShrink: "0",
    },
  },
});

export const wideContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  columnGap: "10px",
  "@media": {
    [NarrowScreen]: {
      display: "none",
    },
  },
});

export const narrowContainer = style({
  width: "100%",
  display: "block",
  "@media": {
    [WideScreen]: {
      display: "none",
    },
  },
});
