import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../../styles/responsive";
import { themeColors } from "../../styles/theme.css";

// stores both education and experience
// for wider screen they sit side-by-side,
// for narrower screen they align vertically
export const main = style({
  "@media": {
    [WideScreen]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "flex-start",
      alignItems: "flex-start",
      columnGap: "20px",
    },
    [NarrowScreen]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
    },
  },
});

export const educationOrExperience = style({
  "@media": {
    [WideScreen]: {
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "50%",
    },
    [NarrowScreen]: {
      flexGrow: "0",
      flexShrink: "0",
      flexBasis: "auto",
      width: "100%",
    },
  },
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "stretch",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "stretch",
  rowGap: "10px",
});

export const card = style({
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  borderStyle: "solid",
  borderColor: themeColors.foreground,
  borderWidth: "2px",
  borderRadius: "4px",
});

export const element = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "stretch",
  columnGap: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  whiteSpace: "wrap",
});

export const iconWrapper = style({
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "20",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
});

export const title = style({
  flexGrow: "1",
  flexShrink: "1",
  flexBasis: "auto",
  fontSize: "x-large",
  color: themeColors.foreground,
  textAlign: "left",
});
