import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default {
  define: {
    "import.meta.env.VITE_BUILD_DATE": JSON.stringify(new Date().toISOString()),
  },
  plugins: [vanillaExtractPlugin()],
};
