import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Keeper Doc",
      disable404Route: true,
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
    contentCollectionJsonSchema: true,
  },
});
