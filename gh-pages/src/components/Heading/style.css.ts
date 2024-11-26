import { style } from "@vanilla-extract/css";

export const heading1Container = style({
  textAlign: "left",
  margin: "0",
  paddingBottom: "1.5rem",
  paddingTop: "1.5rem",
});

export const heading1Text = style({
  selectors: {
    [`${heading1Container} > &`]: {
      lineHeight: "1.5rem",
      fontWeight: "bold",
      fontSize: "xx-large",
      textDecoration: "underline",
      overflowWrap: "anywhere",
    },
  },
});

export const heading2Container = style({
  textAlign: "left",
  margin: "0",
  paddingBottom: "2rem",
  paddingTop: "2rem",
});

export const heading2Text = style({
  selectors: {
    [`${heading2Container} > &`]: {
      lineHeight: "1rem",
      fontWeight: "bold",
      fontSize: "x-large",
      textDecoration: "none",
      overflowWrap: "anywhere",
    },
  },
});
