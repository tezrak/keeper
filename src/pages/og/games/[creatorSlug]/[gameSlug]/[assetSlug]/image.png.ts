import type { APIRoute } from "astro";
import { DLAstro } from "../../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = {
  creatorSlug: string;
  gameSlug: string;
  assetSlug: string;
};

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { asset, game, creator } = await DLAstro.getAssetWithGameAndCreator({
    slug: `${params.creatorSlug}/${params.gameSlug}/${params.assetSlug}` as any,
  });

  return await renderOgImage({
    title: asset.data.name,
    description:
      asset.data.description || `For ${game.data.name} by ${creator.data.name}`,
    accentColor: game.data.theme?.accentColor,
  });
};
