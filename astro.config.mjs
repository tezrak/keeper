import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { constants } from "./src/domains/utils/constants";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  trailingSlash: "always",
  site: constants.site({
    localhost: process.env.NODE_ENV === "development",
  }),
  integrations: [
    starlight({
      title: "Storied Doc",
      disable404Route: true,
      sidebar: [
        {
          label: "Documentation",
          autogenerate: {
            directory: "docs",
          },
        },
      ],
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/docs.css",
      ],
    }),
    react(),
    tailwind(),
    mdx(),
  ],
  experimental: {
    contentCollectionCache: true,
    contentIntellisense: true,
    contentLayer: true,
  },
  adapter: netlify(),
});
