import type { APIRoute } from "astro";
import { renderOgImage } from "../../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  return await renderOgImage({
    title: "Asset Creation Playground",
    description: "Create your own assets and contribute to the community!",
  });
};
