import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async ({ params, request }) => {
  const path = params.path;

  const game = await getEntry("games", path!);

  return new Response(JSON.stringify(game));
};

export async function getStaticPaths() {
  const games = await getCollection("games");

  return games.map((game) => {
    return {
      params: {
        path: game.slug,
      },
    };
  });
}
