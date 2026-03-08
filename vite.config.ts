import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// SSG: uncomment the line below after `npm install vite-plugin-prerender -D`
// import vitePrerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // SSG: uncomment below after installing vite-plugin-prerender
    // mode === "production" &&
    //   vitePrerender({
    //     staticDir: path.resolve(__dirname, "dist"),
    //     routes: ["/", "/about", "/projects", "/contact"],
    //     renderer: new (await import("@prerenderer/renderer-puppeteer")).default({
    //       renderAfterTime: 3000,
    //     }),
    //   }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
