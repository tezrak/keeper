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
    schema: (ctx) =>
      z.object({
        name: z.string(),
        creator: reference("creators"),
        image: ctx.image(),
        theme: z
          .object({
            accentColor: z.enum(getRadixAccentColors()).optional(),
            headingFont: z.string().optional(),
            bodyFont: z.string().optional(),
          })
          .optional(),
      }),
  }),
  assets: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      game: reference("games"),
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

function getRadixAccentColors() {
  return [
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
  ] as const;
}
