import { globalStyle, createVar } from "@vanilla-extract/css";

const threshold = 768;
export type DisplaySize = "Wide" | "Narrow";
export const WideScreen = `screen and (min-width: ${(threshold + 1).toString()}px)`;
export const NarrowScreen = `screen and (max-width: ${threshold.toString()}px)`;

export const themeColors = {
  background: createVar(),
  foreground: createVar(),
  focused: createVar(),
  unfocused: "#888888",
};

export const cardItem = {
  borderColor: themeColors.unfocused,
  borderStyle: "solid",
  borderWidth: "0.2rem",
  borderRadius: "0.2rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
};

globalStyle(":root", {
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: themeColors.foreground,
  backgroundColor: themeColors.background,
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  "@media": {
    // colors for light theme
    "(prefers-color-scheme: light)": {
      vars: {
        [themeColors.focused]: "#ffff00",
        [themeColors.background]: "#242424",
        [themeColors.foreground]: "#ffffff",
      },
    },
    // colors for dark theme
    "(prefers-color-scheme: dark)": {
      vars: {
        [themeColors.focused]: "#ffff00",
        [themeColors.background]: "#242424",
        [themeColors.foreground]: "#ffffff",
      },
    },
  },
});
