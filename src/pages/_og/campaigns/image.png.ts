import type { APIRoute, InferGetStaticParamsType } from "astro";
import { renderOgImage } from "../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  return await renderOgImage({
    title: "My Campaigns",
    description: "",
  });
};

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export async function getStaticPaths() {
  [];
}
