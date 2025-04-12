import { style } from "@vanilla-extract/css";
import { themeColors, WideScreen, NarrowScreen } from "../global.css";

export const repository = {
  wide: style({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    columnGap: "1rem",
    "@media": {
      [NarrowScreen]: {
        display: "none",
      },
    },
  }),
  narrow: style({
    width: "100%",
    display: "block",
    "@media": {
      [WideScreen]: {
        display: "none",
      },
    },
  }),
};

export const categoryNameAndCardList = style({
  selectors: {
    [`${repository.wide} > &, ${repository.narrow} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      rowGap: "0.5rem",
    },
  },
});

export const categoryNames = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",
  rowGap: "1.5rem",
});

const sharedCategoryNameStyle = {
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "auto",
  fontSize: "x-large",
  color: themeColors.unfocused,
  backgroundColor: themeColors.background,
  border: "none",
  cursor: "pointer",
  transition: "color 0.2s",
};

const onCategoryNameHovered = {
  [`${categoryNames} > &:hover`]: {
    color: themeColors.focused,
  },
};

export const categoryName = {
  selected: style({
    selectors: {
      [`${categoryNames} > &`]: {
        textAlign: "left",
        ...sharedCategoryNameStyle,
        color: themeColors.foreground,
        textDecoration: "underline",
      },
      ...onCategoryNameHovered,
    },
  }),
  unselected: style({
    selectors: {
      [`${categoryNames} > &`]: {
        textAlign: "left",
        ...sharedCategoryNameStyle,
        color: themeColors.unfocused,
      },
      ...onCategoryNameHovered,
    },
  }),
};

export const cardList = style({
  selectors: {
    [`${repository.wide} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      flexBasis: "auto",
    },
  },
});

// make it shorter and left-aligned,
//   such that the text does not overlap
//   with a close button on the right-top corner
export const categoryNameInCardList = style({
  selectors: {
    [`${cardList} > &`]: {
      width: "80%",
      paddingTop: "1.25rem",
      paddingBottom: "1.25rem",
      fontSize: "x-large",
      fontWeight: "bold",
      color: themeColors.foreground,
      textAlign: "left",
      whiteSpace: "wrap",
    },
  },
});

export const cards = style({
  selectors: {
    [`${cardList} > &`]: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "stretch",
      rowGap: "0.5rem",
    },
  },
});
