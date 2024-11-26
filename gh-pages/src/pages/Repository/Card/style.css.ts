import { style } from "@vanilla-extract/css";
import { themeColors } from "../../../styles/theme.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  rowGap: "0.5rem",
  borderColor: themeColors.foreground,
  borderStyle: "solid",
  borderWidth: "0.2rem",
  borderRadius: "0.2rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
});

export const title = style({
  selectors: {
    [`${card} > &`]: {},
  },
});

export const titleAnchor = style({
  selectors: {
    [`${title} > &`]: {
      fontSize: "x-large",
      color: themeColors.foreground,
    },
  },
});

export const descr = style({
  selectors: {
    [`${card} > &`]: {
      fontSize: "medium",
    },
  },
});

export const topicsAndLanguages = style({
  selectors: {
    [`${card} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "center",
      rowGap: "0.2rem",
      columnGap: "0.2rem",
      whiteSpace: "nowrap",
    },
  },
});

export const starsAndUpdateDate = style({
  selectors: {
    [`${card} > &`]: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignContent: "flex-start",
      alignItems: "center",
      whiteSpace: "nowrap",
    },
  },
});

export const borderedBox = style({
  selectors: {
    [`${topicsAndLanguages} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      borderStyle: "solid",
      borderWidth: "0.1rem",
      borderRadius: "0.2rem",
      paddingLeft: "0.2rem",
      paddingRight: "0.2rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
      color: themeColors.foreground,
      fontSize: "small",
    },
  },
});

export const iconAndTextContainer = style({
  selectors: {
    [`${starsAndUpdateDate} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
      columnGap: "0.5rem",
    },
  },
});

export const textAfterIcon = style({
  selectors: {
    [`${iconAndTextContainer} > &`]: {
      fontSize: "medium",
      color: themeColors.foreground,
    },
  },
});
