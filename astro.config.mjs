import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import svelte from "@astrojs/svelte";

export default defineConfig({
  // Canonical site URL (no trailing slash is safest)
  site: "https://bashir.bio",

  integrations: [
    sitemap(),
    robotsTxt({
      // Match your canonical domain
      sitemap: ["https://bashir.bio/sitemap-index.xml"],
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  // Static output for Vercel is correct here
  output: "static",

  vite: {
    assetsInclude: ["**/*.riv"],
  },
});
