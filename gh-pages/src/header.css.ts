import { style } from "@vanilla-extract/css";
import { themeColors } from "./global.css";
import { app } from "./app.css";

export const header = style({
  selectors: {
    [`${app} > &`]: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

const sharedButtonStyle = {
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingBottom: "0.5rem",
  paddingTop: "0.5rem",
  backgroundColor: themeColors.background,
  border: "none",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "auto",
  fontSize: "x-large",
  transition: "color 0.2s",
};

const onHover = {
  [`${header} > &:hover`]: {
    color: themeColors.focused,
    cursor: "pointer",
  },
};

export const button = {
  selected: style({
    selectors: {
      [`${header} > &`]: {
        ...sharedButtonStyle,
        color: themeColors.foreground,
        textDecoration: "underline",
      },
      ...onHover,
    },
  }),
  unselected: style({
    selectors: {
      [`${header} > &`]: {
        ...sharedButtonStyle,
        color: themeColors.unfocused,
      },
      ...onHover,
    },
  }),
};
