import type { APIRoute } from "astro";
import { renderOgImage } from "../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = {};

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  return await renderOgImage({
    title: "Keeper",
    description: "The best way to play your favorite TTRPGs",
    ctx: ctx,
  });
};
