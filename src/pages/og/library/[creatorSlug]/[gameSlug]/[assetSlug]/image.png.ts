import type { APIRoute, GetStaticPathsItem } from "astro";
import { DLAstro } from "../../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../../domains/og-image/renderOgImage";

export const GET: APIRoute = async ({ params, request }) => {
  const assetWithGameAndCreator = await DLAstro.getAssetWithGameAndCreator({
    slug: `${params.creatorSlug}/${params.gameSlug}/${params.assetSlug}`,
  });

  return await renderOgImage({
    title: assetWithGameAndCreator!.asset.data.name,
    description: `For ${assetWithGameAndCreator!.game.data.name} by ${assetWithGameAndCreator!.creator.data.name}`,
  });
};

export async function getStaticPaths() {
  const gameCreatorsAndAssets =
    await DLAstro.getAllGamesWithCreatorsAndAssets();

  return gameCreatorsAndAssets.flatMap((item) => {
    return item.assets.map((asset) => {
      return {
        params: {
          creatorSlug: item.creator.slug,
          gameSlug: item.game.slug.split("/").pop(),
          assetSlug: asset.slug.split("/").pop(),
        },
      } satisfies GetStaticPathsItem;
    });
  });
}
