import { style } from "@vanilla-extract/css";
import { skill } from "../skill.css";

export const logos = style({
  selectors: {
    [`${skill} > &`]: {
      margin: "auto",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      rowGap: "0.25rem",
      columnGap: "0.25rem",
    },
  },
});

export const logo = style({
  selectors: {
    [`${logos} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const logoAnchor = style({
  selectors: {
    [`${logo} > &`]: {
      height: "100%",
      width: "100%",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const logoImage = style({
  selectors: {
    [`${logoAnchor} > &`]: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      height: "3rem",
    },
  },
});
