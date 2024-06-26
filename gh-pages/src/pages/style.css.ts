import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../styles/responsive";

export const app = style({
  margin: "auto",
  position: "relative",
  "@media": {
    [WideScreen]: {
      width: "80%",
    },
    [NarrowScreen]: {
      width: "100%",
    },
  },
});
