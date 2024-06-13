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
    }),
  }),
  library: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      game: reference("games"),
    }),
  }),
};
