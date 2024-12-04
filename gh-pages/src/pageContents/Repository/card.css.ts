import { style } from "@vanilla-extract/css";
import { themeColors, cardItem as cardItemStyle } from "../../global.css";

export const cardAnchor = style({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
});

export const card = style({
  selectors: {
    [`${cardAnchor} > &`]: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      rowGap: "0.5rem",
      ...cardItemStyle,
      transition: "border-color 0.2s",
    },
    [`${cardAnchor} > &:hover`]: {
      borderColor: themeColors.focused,
    },
  },
});

export const title = style({
  selectors: {
    [`${card} > &`]: {
      fontSize: "x-large",
      color: themeColors.foreground,
    },
  },
});

export const description = style({
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
      whiteSpace: "normal",
    },
  },
});

export const starsAndLastUpdate = style({
  selectors: {
    [`${card} > &`]: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignContent: "flex-start",
      alignItems: "center",
    },
  },
});

export const borderedBox = style({
  selectors: {
    [`${topicsAndLanguages} > &`]: {
      flexGrow: "0",
      flexShrink: "1",
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
    [`${starsAndLastUpdate} > &`]: {
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
