import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "../../domains/og-image/renderOgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const numberOfCreators = (await getCollection("creators")).length;
  const numberOfGames = (await getCollection("games")).length;
  const numberOfAssets = (await getCollection("assets")).length;

  return await renderOgImage({
    title: "Keeper",
    description: "The best way to play your favorite TTRPGs",
    // footerItems: [
    //   `${numberOfCreators} creators`,
    //   `${numberOfGames} games`,
    //   `${numberOfAssets} assets`,
    // ],
  });
};
