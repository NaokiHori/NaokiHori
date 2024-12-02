import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../../../styles/responsive";

// for wider screen, labels and bar charts sit side-by-side
// labels have a fixed width, whilst charts can expand / shrink horizontally
// the updated date comes to the right-bottom corner,
//   which is the reason why "position: 'relative'" is used
export const wideDisplayLanguageStats = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  rowGap: "0.25rem",
  "@media": {
    [NarrowScreen]: {
      display: "none",
    },
  },
});

// for narrower screen, labels, pie chart, updated date align vertically
export const narrowDisplayLanguageStats = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "0.75rem",
  width: "90%",
  margin: "auto",
  "@media": {
    [WideScreen]: {
      display: "none",
    },
  },
});

export const narrowDisplayLabelsContainer = style({
  selectors: {
    [`${narrowDisplayLanguageStats} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      rowGap: "0.5rem",
    },
  },
});

export const update = {
  wide: style({
    selectors: {
      [`${wideDisplayLanguageStats} > &`]: {
        position: "absolute",
        right: "0",
        bottom: "0",
      },
    },
  }),
  narrow: style({
    selectors: {
      [`${narrowDisplayLanguageStats} > &`]: {
        margin: "auto",
      },
    },
  }),
};
