import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, reference, z } from "astro:content";

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
      creator: reference("creators"),
      image: z.string(),
      headingFont: z.string().optional(),
      bodyFont: z.string().optional(),
    }),
  }),
  library: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      game: reference("games"),
    }),
  }),
  docs: defineCollection({ schema: docsSchema() }),
};
