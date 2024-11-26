import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const container = style({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  alignItems: "center",
});

export const element = style({
  selectors: {
    [`${container} > &`]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingBottom: "0.5rem",
      paddingTop: "0.5rem",
      color: themeColors.unfocusedText,
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "auto",
      textAlign: "center",
      fontSize: "1.5rem",
      cursor: "default",
      transition: "color 0.2s",
    },
    [`${container} > &:hover`]: {
      color: themeColors.focusedText,
      cursor: "pointer",
    },
  },
});
