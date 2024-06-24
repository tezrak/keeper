import type { APIRoute } from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const gameWithCreator = await DLAstro.getGameWithCreator({
    slug: `${params.creatorSlug}/${params.gameSlug}`,
  });

  return await renderOgImage({
    title: gameWithCreator!.game.data.name,
    description:
      gameWithCreator!.game.data.description ||
      `By ${gameWithCreator!.creator.data.name}`,

    accentColor: gameWithCreator!.game.data.theme?.accentColor,
  });
};
