import { style, keyframes } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

const fadein = keyframes({
  "0%": {
    opacity: "0",
  },
  "100%": {
    opacity: "1",
  },
});

export const modal = style({
  width: "90%",
  maxHeight: "75vh",
  position: "relative",
  backgroundColor: themeColors.background,
  color: themeColors.foreground,
  borderColor: themeColors.background,
  borderWidth: "2px",
  borderStyle: "solid",
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingBottom: "0px",
  paddingTop: "0px",
  transition: "all 1s",
  "::backdrop": {
    backgroundColor: "#88888888",
  },
  selectors: {
    "&[open]": {
      animation: `${fadein} 0.5s ease-in`,
    },
  },
});

export const closeButtonContainer = style({
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  width: "24px",
  height: "24px",
  marginTop: "24px",
  marginRight: "24px",
  stroke: "#888888",
  ":hover": {
    stroke: themeColors.foreground,
  },
});

export const closeButtonLine = style({
  strokeWidth: "3",
  strokeLinecap: "round",
  transition: "stroke 0.2s",
});
