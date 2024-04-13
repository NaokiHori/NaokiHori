import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

globalStyle("html", {
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  lineHeight: "1.5",
  fontWeight: "400",
  color: themeVars.color,
  backgroundColor: themeVars.backgroundColor,
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
});
