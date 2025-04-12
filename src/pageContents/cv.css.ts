import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../global.css";
import { page } from "../app.css";

// stores both education and experience
// for wider screen they sit side-by-side,
// for narrower screen they align vertically
export const cv = style({
  selectors: {
    [`${page} > &`]: {
      "@media": {
        [WideScreen]: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignContent: "flex-start",
          alignItems: "flex-start",
          columnGap: "1rem",
        },
        [NarrowScreen]: {
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        },
      },
    },
  },
});

export const educationOrExperience = style({
  selectors: {
    [`${cv} > &`]: {
      "@media": {
        [WideScreen]: {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "50%",
        },
        [NarrowScreen]: {
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          width: "100%",
        },
      },
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
    },
  },
});

export const cards = style({
  selectors: {
    [`${educationOrExperience} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "0.5rem",
    },
  },
});
