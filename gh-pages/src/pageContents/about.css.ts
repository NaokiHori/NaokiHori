import { style } from "@vanilla-extract/css";
import { cardItem as cardItemStyle } from "../global.css";
import { page } from "../app.css";

export const sentences = style({
  selectors: {
    [`${page} > &`]: {
      margin: 0,
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

export const sentence = style({
  selectors: {
    [`${sentences} > &`]: {
      fontSize: "large",
      ...cardItemStyle,
    },
  },
});
