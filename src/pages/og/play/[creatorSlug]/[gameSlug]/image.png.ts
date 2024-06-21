import type { APIRoute, GetStaticPathsItem } from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

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

export async function getStaticPaths() {
  const gamesWithCreatorsAndSheets =
    await DLAstro.getAllGamesWithCreatorsAndAssets();
  return gamesWithCreatorsAndSheets.map((item) => {
    return {
      params: {
        creatorSlug: item.creator.slug,
        gameSlug: item.game.slug.split("/").pop(),
      },
    } satisfies GetStaticPathsItem;
  });
}
