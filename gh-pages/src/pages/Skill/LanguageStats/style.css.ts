import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../../../styles/responsive";

// for wider screen, labels and bar charts sit side-by-side
// labels have a fixed width, whilst charts can expand / shrink horizontally
// the updated date comes to the right-bottom corner,
//   which is the reason why "position: 'relative'" is used
export const wide = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  "@media": {
    [NarrowScreen]: {
      display: "none",
    },
  },
});

// for narrower screen, labels, piee chart, updated date align vertically
export const narrow = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "10px",
  width: "90%",
  margin: "auto",
  "@media": {
    [WideScreen]: {
      display: "none",
    },
  },
});

export const update = style({
  "@media": {
    [WideScreen]: {
      position: "absolute",
      right: "0",
      bottom: "0",
    },
    [NarrowScreen]: {
      margin: "auto",
    },
  },
});
