import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  appDirectory: "src",
  ssr: false,
  presets: [vercelPreset()],
  async prerender() {
    return ["/about"];
  }
} satisfies Config;
