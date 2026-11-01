import { style, keyframes } from "@vanilla-extract/css";
import { themeColors } from "../../global.css";

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
  maxHeight: "90dvh",
  position: "relative",
  backgroundColor: themeColors.background,
  color: themeColors.foreground,
  border: "none",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingBottom: "0.5rem",
  paddingTop: "0.5rem",
  "::backdrop": {
    backgroundColor: "#88888888",
  },
  selectors: {
    "&[open]": {
      animation: `${fadein} 0.5s ease-in`,
    },
  },
});

export const closeButton = style({
  selectors: {
    [`${modal} > &`]: {
      position: "absolute",
      top: 0,
      right: 0,
      cursor: "pointer",
      width: "1.5rem",
      height: "1.5rem",
      marginTop: "1.75rem",
      marginRight: "1.75rem",
      stroke: themeColors.unfocused,
    },
    [`${modal} > &:hover`]: {
      stroke: themeColors.focused,
    },
  },
});

export const closeButtonLine = style({
  strokeWidth: "3",
  strokeLinecap: "round",
  transition: "stroke 0.2s",
});
