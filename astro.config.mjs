import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";
import { constants } from "./src/domains/utils/constants";

// https://astro.build/config
export default defineConfig({
  site: constants.site({ localhost: false }),
  integrations: [
    starlight({
      title: "Keeper Doc",
      disable404Route: true,
      sidebar: [
        {
          label: "Documentation",
          autogenerate: { directory: "docs" },
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
    // contentCollectionJsonSchema: true,
    // contentCollectionCache: true,
  },
});
