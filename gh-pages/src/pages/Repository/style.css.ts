import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";
import { WideScreen, NarrowScreen } from "../../styles/responsive";

export const container = {
  wide: style({
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
  }),
  narrow: style({
    width: "100%",
    display: "block",
    "@media": {
      [WideScreen]: {
        display: "none",
      },
    },
  }),
};

export const titleListContainer = style({
  selectors: {
    [`${container.wide} > &, ${container.narrow} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      whiteSpace: "nowrap",
      rowGap: "10px",
      "@media": {
        [NarrowScreen]: {
          flexGrow: "0",
          flexShrink: "0",
        },
      },
    },
  },
});

export const mainTitle = style({
  selectors: {
    [`${titleListContainer} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "auto",
      fontSize: "x-large",
      lineHeight: "2.5",
      color: themeColors.unfocusedText,
      textAlign: "left",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    [`${titleListContainer} > &:hover`]: {
      color: themeColors.focusedText,
    },
  },
});

export const cardListContainer = style({
  selectors: {
    [`${container.wide} > &, ${container.narrow} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "auto",
    },
  },
});

// make it shorter and left-aligned,
//   such that the text does not overlap
//   with a close button on the right-top corner
export const modalTitle = style({
  selectors: {
    [`${cardListContainer} > &`]: {
      width: "80%",
      paddingTop: "1.25rem",
      paddingBottom: "1.25rem",
      fontSize: "x-large",
      fontWeight: "bold",
      color: themeColors.foreground,
      textAlign: "left",
      whiteSpace: "wrap",
    },
  },
});

export const cardContainer = style({
  selectors: {
    [`${cardListContainer} > &`]: {
      paddingTop: "5px",
      paddingBottom: "5px",
    },
  },
});
