import { style } from "@vanilla-extract/css";
import { themeColors } from "../../../styles/theme.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  rowGap: "10px",
  borderColor: themeColors.foreground,
  borderStyle: "solid",
  borderWidth: "2px",
  borderRadius: "4px",
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
});

export const title = style({});

export const titleAnchor = style({
  selectors: {
    [`${title} > &`]: {
      fontSize: "x-large",
      color: themeColors.foreground,
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
  columnGap: "5px",
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
  columnGap: "15px",
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
  color: themeColors.foreground,
  fontSize: "small",
});

export const iconAndTextContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  columnGap: "5px",
});

export const textAfterIcon = style({
  fontSize: "medium",
  color: themeColors.foreground,
});
