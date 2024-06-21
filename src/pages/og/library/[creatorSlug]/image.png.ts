import type { APIRoute, GetStaticPathsItem } from "astro";
import { DLAstro } from "../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../domains/og-image/renderOgImage";

export const GET: APIRoute = async ({ params, request }) => {
  const creator = await DLAstro.getCreator({
    slug: params.creatorSlug!,
  });

  return await renderOgImage({
    title: creator!.data.name,
    description: creator!.body,
  });
};

export async function getStaticPaths() {
  const creators = await DLAstro.getAllCreatorsWithTheirGames();
  return creators.map((creatorWithGames) => {
    return {
      params: {
        creatorSlug: creatorWithGames.creator.slug,
      },
    } satisfies GetStaticPathsItem;
  });
}
