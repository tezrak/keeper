import type { APIRoute } from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const gameWithCreator = await DLAstro.getGameWithCreator({
    slug: `${params.creatorSlug}/${params.gameSlug}`,
  });

  return await renderOgImage({
    title: "Playing " + gameWithCreator!.game.data.name,
    description: gameWithCreator!.game.body,
    footerItems: [`By ${gameWithCreator!.creator.data.name}`],
  });
};
