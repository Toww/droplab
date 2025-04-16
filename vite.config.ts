import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), tailwindcss(), svgr()]
});
