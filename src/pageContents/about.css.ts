import { style } from "@vanilla-extract/css";
import {
  cardItem as cardItemStyle,
  WideScreen,
  NarrowScreen,
} from "../global.css";
import { page } from "../app.css";

// three highlight cards: side-by-side on wide screens, stacked on narrow screens
export const sentences = style({
  selectors: {
    [`${page} > &`]: {
      margin: 0,
      display: "grid",
      rowGap: "1rem",
      columnGap: "1rem",
      "@media": {
        [WideScreen]: {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        [NarrowScreen]: {
          gridTemplateColumns: "1fr",
        },
      },
    },
  },
});

export const card = style({
  selectors: {
    [`${sentences} > &`]: {
      ...cardItemStyle,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "0.75rem",
      transition: "border-color 0.2s",
    },
  },
});

export const header = style({
  selectors: {
    [`${card} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: "0.5rem",
    },
  },
});

export const iconWrapper = style({
  selectors: {
    [`${header} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
    },
  },
});

export const title = style({
  selectors: {
    [`${header} > &`]: {
      fontWeight: "bold",
      fontSize: "x-large",
    },
  },
});

export const text = style({
  selectors: {
    [`${card} > &`]: {
      fontSize: "large",
      lineHeight: 1.7,
      paddingLeft: "1rem",
    },
  },
});
