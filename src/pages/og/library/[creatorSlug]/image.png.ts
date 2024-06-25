import type {
  APIRoute,
  GetStaticPathsItem,
  InferGetStaticParamsType,
} from "astro";
import { DLAstro } from "../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { creator } = await DLAstro.getCreator({
    slug: params.creatorSlug,
  });

  return await renderOgImage({
    title: creator.data.name,
    description: creator.data.description || "Creator of games and assets",
  });
};

export async function getStaticPaths() {
  const { creators } = await DLAstro.getAllCreators();
  return creators.map((creator) => {
    return {
      params: {
        creatorSlug: creator.slug,
      },
    } satisfies GetStaticPathsItem;
  });
}
