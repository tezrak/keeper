import type { APIRoute, InferGetStaticParamsType } from "astro";
import { renderOgImage } from "../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  return await renderOgImage({
    title: "Asset Creation Playground",
    description: "Create your own assets and contribute to the community!",
  });
};

export async function getStaticPaths() {
  return [];
}
