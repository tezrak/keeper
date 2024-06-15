import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, z } from "astro:content";

export const collections = {
  creators: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
    }),
  }),
  games: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      image: z.string(),
      theme: z.object({
        accentColor: z
          .enum([
            "gray",
            "gold",
            "bronze",
            "brown",
            "yellow",
            "amber",
            "orange",
            "tomato",
            "red",
            "ruby",
            "crimson",
            "pink",
            "plum",
            "purple",
            "violet",
            "iris",
            "indigo",
            "blue",
            "cyan",
            "teal",
            "jade",
            "green",
            "grass",
            "lime",
            "mint",
            "sky",
          ])
          .optional(),
        headingFont: z.string().optional(),
        bodyFont: z.string().optional(),
      }),
    }),
  }),
  library: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      version: z
        .number()
        .default(1)
        .transform((version) => {
          if (version === 1) return "";
          return `v${version}`;
        }),
    }),
  }),
  docs: defineCollection({ schema: docsSchema() }),
};
