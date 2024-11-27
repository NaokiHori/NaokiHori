import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../styles/responsive";

export const app = style({
  margin: "auto",
  position: "relative",
  height: "100%",
  "@media": {
    [WideScreen]: {
      width: "80%",
    },
    [NarrowScreen]: {
      width: "95%",
    },
  },
});
