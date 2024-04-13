import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  gap: "10px",
  borderColor: "#aaaaaa",
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "4px",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "15px",
});

export const title = style({});

export const titleAnchor = style({
  selectors: {
    [`${title} > &`]: {
      fontSize: "x-large",
      color: "#a9ceec",
    },
  },
});

export const descr = style({
  fontSize: "medium",
});

export const topicsAndLanguages = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "center",
  gap: "5px",
  whiteSpace: "nowrap",
});

export const starsAndUpdateDate = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignContent: "flex-start",
  alignItems: "center",
  gap: "15px",
  whiteSpace: "nowrap",
});

export const borderedBox = style({
  flexGrow: "0",
  flexShrink: "0",
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "4px",
  paddingLeft: "5px",
  paddingRight: "5px",
  color: themeVars.color,
  fontSize: "small",
});

export const iconAndTextContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  gap: "5px",
});

export const textAfterIcon = style({
  fontSize: "medium",
  color: themeVars.color,
});
