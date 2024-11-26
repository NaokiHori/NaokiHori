import { style } from "@vanilla-extract/css";

export const logoListContainer = style({
  margin: "auto",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "0.25rem",
  columnGap: "0.25rem",
});

export const logoContainer = style({
  selectors: {
    [`${logoListContainer} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      flexBasis: "auto",
    },
  },
});
