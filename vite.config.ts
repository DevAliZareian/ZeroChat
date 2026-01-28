import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    proxy: {
      "/realms": {
        target: "https://auth.sabzp-api.ir",
        changeOrigin: true,
        secure: false,
      },
      "/graphql": {
        target: "https://asp.sabzp-api.ir",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, "/graphql"),
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
