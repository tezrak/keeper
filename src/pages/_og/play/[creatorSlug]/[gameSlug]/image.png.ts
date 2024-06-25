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
