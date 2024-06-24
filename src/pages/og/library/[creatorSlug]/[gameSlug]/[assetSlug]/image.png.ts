import type { APIRoute } from "astro";
import { DLAstro } from "../../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const assetWithGameAndCreator = await DLAstro.getAssetWithGameAndCreator({
    slug: `${params.creatorSlug}/${params.gameSlug}/${params.assetSlug}`,
  });

  return await renderOgImage({
    title: assetWithGameAndCreator!.asset.data.name,
    description:
      assetWithGameAndCreator?.asset.data.description ||
      `For ${assetWithGameAndCreator!.game.data.name} by ${assetWithGameAndCreator!.creator.data.name}`,
    accentColor: assetWithGameAndCreator!.game.data.theme?.accentColor,
  });
};
