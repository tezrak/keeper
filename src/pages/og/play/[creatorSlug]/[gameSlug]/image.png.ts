import type { APIRoute } from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = {
  creatorSlug: string;
  gameSlug: string;
};

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { game, creator } = await DLAstro.getGame({
    slug: `${params.creatorSlug}/${params.gameSlug}` as any,
    includeCreator: true,
  });

  return await renderOgImage({
    title: "Playing " + game.data.name,
    description: game.body,
    footerItems: [`By ${creator!.data.name}`],
  });
};
