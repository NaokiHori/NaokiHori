import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "./global.css";

export const app = style({
  margin: "auto",
  position: "relative",
  height: "100%",
  "@media": {
    [WideScreen]: {
      width: "80%",
    },
    [NarrowScreen]: {
      width: "90%",
    },
  },
});

export const page = style({
  selectors: {
    [`${app} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
    },
  },
});

export const pageHeading = style({
  selectors: {
    [`${page} > &`]: {
      textAlign: "left",
      marginBlockStart: 0,
      marginBlockEnd: 0,
      marginInlineStart: 0,
      marginInlineEnd: 0,
      paddingBlockStart: "1.5rem",
      paddingBlockEnd: "1.5rem",
      paddingInlineStart: 0,
      paddingInlineEnd: 0,
      fontWeight: "bold",
      fontSize: "xx-large",
      textDecoration: "underline",
    },
  },
});
