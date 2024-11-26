import { style } from "@vanilla-extract/css";
import { themeColors } from "../../styles/theme.css";

export const listContainer = style({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  margin: "0",
  lineHeight: "2",
});

export const listItem = style({
  selectors: {
    [`${listContainer} > &`]: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: "1rem",
    },
  },
});

export const disc = style({
  selectors: {
    [`${listItem} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      flexBasis: "1rem",
    },
  },
});

export const listText = style({
  selectors: {
    [`${listItem} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "auto",
      fontSize: "large",
    },
  },
});

export const circle = style({
  fill: themeColors.foreground,
});
