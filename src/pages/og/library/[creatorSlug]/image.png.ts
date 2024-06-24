import type { APIRoute } from "astro";
import { DLAstro } from "../../../../domains/dl/DLAstro";
import { renderOgImage } from "../../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const creator = await DLAstro.getCreator({
    slug: params.creatorSlug!,
  });

  return await renderOgImage({
    title: creator!.data.name,
    description: creator?.data.description || "Creator of games and assets",
  });
};
