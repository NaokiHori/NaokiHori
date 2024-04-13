import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";
import { WideScreen, NarrowScreen } from "../../../styles/responsive";
import { BORDER_WIDTH } from "./constants";

export const label = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "first",
  alignItems: "center",
  gap: "10px",
  color: themeVars.color,
  borderColor: themeVars.backgroundColor,
  borderStyle: "solid",
  borderWidth: BORDER_WIDTH,
  marginBottom: "5px",
  marginTop: "5px",
  marginLeft: "5px",
  marginRight: "5px",
  paddingLeft: "5px",
  paddingRight: "5px",
});

export const labels = style({
  "@media": {
    [WideScreen]: {
      flexGrow: "0",
      flexShrink: "0",
    },
    [NarrowScreen]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "left",
    },
  },
});
