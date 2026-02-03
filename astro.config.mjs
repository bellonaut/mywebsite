import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import svelte from "@astrojs/svelte";

export default defineConfig({
  // update this to your actual canonical domain when ready
  site: "https://bashir.bio/",
  integrations: [
    sitemap(),
    robotsTxt({
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
  output: "static",
  vite: {
    assetsInclude: "**/*.riv",
  },
});
