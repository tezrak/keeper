import type { APIRoute, GetStaticPathsItem } from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

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

export async function getStaticPaths() {
  const gamesAndCreators = await DLAstro.getAllGamesWithCreatorsAndAssets();

  return gamesAndCreators.map((item) => {
    return {
      params: {
        creatorSlug: item.creator.slug,
        gameSlug: item.game.slug.split("/").pop(),
      },
    } satisfies GetStaticPathsItem;
  });
}
