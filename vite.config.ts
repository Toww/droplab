import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import glsl from "vite-plugin-glsl";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
import netlify from "@netlify/vite-plugin";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    glsl(),
    tailwindcss(),
    svgr(),
    netlify(),
    netlifyReactRouter(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      src: "/src",
      "@utils": "/src/utils/",
      "@assets": "/src/assets/",
      "@stores": "/src/stores/",
      "@shaders": "/src/shaders/",
      "@projects": "/src/projects/",
      "@components": "/src/components/"
    }
  }
});
