import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, reference, z } from "astro:content";
import { Colors } from "../domains/colors/colors";

export const collections = {
  creators: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      description: z.string().default(""),
    }),
  }),
  games: defineCollection({
    type: "content",
    schema: (ctx) =>
      z.object({
        name: z.string(),
        description: z.string().default(""),
        creator: reference("creators"),
        image: ctx.image(),
        theme: z
          .object({
            accentColor: z.enum(Colors.getAccentColors()).optional(),
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
      description: z.string().default(""),
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
