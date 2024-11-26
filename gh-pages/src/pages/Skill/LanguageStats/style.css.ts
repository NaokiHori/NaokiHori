import { style } from "@vanilla-extract/css";
import { WideScreen, NarrowScreen } from "../../../styles/responsive";
import { themeColors } from "../../../styles/theme.css";

// for wider screen, labels and bar charts sit side-by-side
// labels have a fixed width, whilst charts can expand / shrink horizontally
// the updated date comes to the right-bottom corner,
//   which is the reason why "position: 'relative'" is used
export const wideDisplayLanguageStats = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "stretch",
  margin: "auto",
  "@media": {
    [NarrowScreen]: {
      display: "none",
    },
  },
});

// for narrower screen, labels, pie chart, updated date align vertically
export const narrowDisplayLanguageStats = style({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "0.75rem",
  width: "90%",
  margin: "auto",
  "@media": {
    [WideScreen]: {
      display: "none",
    },
  },
});

const barChartConfig = {
  rowGap: "0.75rem",
  fontSize: "large",
};

export const labels = {
  wide: style({
    selectors: {
      [`${wideDisplayLanguageStats} > &`]: {
        flexGrow: "0",
        flexShrink: "0",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        rowGap: barChartConfig.rowGap,
      },
    },
  }),
  narrow: style({
    selectors: {
      [`${narrowDisplayLanguageStats} > &`]: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        rowGap: "0.5rem",
      },
    },
  }),
};

export const label = style({
  selectors: {
    [`${labels.wide} > &, ${labels.narrow} > &`]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: "0.75rem",
      color: themeColors.foreground,
      fontSize: barChartConfig.fontSize,
      margin: "0",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
    },
  },
});

export const update = {
  wide: style({
    selectors: {
      [`${wideDisplayLanguageStats} > &`]: {
        position: "absolute",
        right: "0",
        bottom: "0",
      },
    },
  }),
  narrow: style({
    selectors: {
      [`${narrowDisplayLanguageStats} > &`]: {
        margin: "auto",
      },
    },
  }),
};

export const pieChart = style({
  selectors: {
    [`${narrowDisplayLanguageStats} > &`]: {
      margin: "auto",
      width: "90%",
      maxWidth: "20rem",
      aspectRatio: "1",
      borderRadius: "50%",
      borderColor: themeColors.foreground,
      borderStyle: "solid",
      borderWidth: "0.1rem",
    },
  },
});

// bar chart can grow and shrink horizontally
export const barChart = style({
  selectors: {
    [`${wideDisplayLanguageStats} > &`]: {
      flexGrow: "1",
      flexShrink: "1",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      rowGap: barChartConfig.rowGap,
    },
  },
});

export const bar = style({
  selectors: {
    [`${barChart} > &`]: {
      paddingLeft: "0rem",
      paddingRight: "0rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
});

export const barText = style({
  selectors: {
    [`${bar} > &`]: {
      flexGrow: "0",
      flexShrink: "0",
      flexBasis: "auto",
      marginLeft: "0.25rem",
      fontSize: barChartConfig.fontSize,
    },
  },
});
