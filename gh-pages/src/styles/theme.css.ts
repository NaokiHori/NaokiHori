import { createGlobalTheme } from "@vanilla-extract/css";

export const themeVars = createGlobalTheme(":root", {
  backgroundColor: "#242424",
  color: "#ffffffde",
  focusedTextColor: "#ffff00",
  unfocusedTextColor: "#888888",
});
