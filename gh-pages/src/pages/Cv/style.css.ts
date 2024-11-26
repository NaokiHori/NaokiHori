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
      columnGap: "1rem",
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
  selectors: {
    [`${main} > &`]: {
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
    },
  },
});

export const container = style({
  selectors: {
    [`${educationOrExperience} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "1rem",
    },
  },
});

export const card = style({
  selectors: {
    [`${container} > &`]: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      borderStyle: "solid",
      borderColor: themeColors.foreground,
      borderWidth: "0.2rem",
      borderRadius: "0.2rem",
    },
  },
});

export const title = style({
  selectors: {
    [`${card} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      fontSize: "x-large",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      color: themeColors.foreground,
      textAlign: "left",
    },
  },
});

export const element = style({
  selectors: {
    [`${card} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      columnGap: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      whiteSpace: "wrap",
    },
  },
});

export const iconWrapper = style({
  selectors: {
    [`${element} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  },
});
