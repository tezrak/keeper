import type {
  APIRoute,
  GetStaticPathsItem,
  InferGetStaticParamsType,
} from "astro";
import { DLAstro } from "../../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { creator } = await DLAstro.getCreator({ slug: params.creatorSlug });
  const { game } = await DLAstro.getGame({
    slug: `${params.creatorSlug}/${params.gameSlug}` as any,
  });

  return await renderOgImage({
    title: game.data.name,
    description: game.data.description || `By ${creator.data.name}`,
    accentColor: game.data.theme?.accentColor,
  });
};
export async function getStaticPaths() {
  const { games } = await DLAstro.getAllGamesWithCreator({});
  return games.map((item) => {
    return {
      params: {
        creatorSlug: item.creator.slug,
        gameSlug: item.game.slug.split("/").pop(),
      },
    } satisfies GetStaticPathsItem;
  });
}
