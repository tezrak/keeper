import type { APIRoute } from "astro";
import { renderOgImage } from "../../../domains/og-image/renderOgImage";

export const GET: APIRoute = async ({ params, request }) => {
  return await renderOgImage({
    title: "My Campaigns",
    description: "",
  });
};
