import { style } from "@vanilla-extract/css";

export const heading2Container = style({
  textAlign: "left",
  margin: "0",
  paddingBottom: "1rem",
  paddingTop: "1rem",
});

export const heading2Text = style({
  selectors: {
    [`${heading2Container} > &`]: {
      fontWeight: "bold",
      fontSize: "x-large",
      textDecoration: "none",
    },
  },
});
