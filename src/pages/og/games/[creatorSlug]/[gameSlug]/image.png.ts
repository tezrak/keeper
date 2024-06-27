import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = {
  creatorSlug: CollectionEntry<"creators">["slug"];
  gameSlug: string;
};

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { creator } = await DLAstro.getCreator({ slug: params.creatorSlug });
  const { game } = await DLAstro.getGame({
    slug: `${params.creatorSlug}/${params.gameSlug}` as any,
  });

  return await renderOgImage({
    title: game.data.name,
    src: game.data.image?.src,
    description: game.data.description || `By ${creator.data.name}`,
    accentColor: game.data.theme?.accentColor,
  });
};
