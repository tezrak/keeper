import type { APIRoute } from "astro";
import { z } from "zod";
import { DLAstro } from "../../../../domains/dl/DLAstro";

export const GET: APIRoute = async ({ params, request }) => {
  const parsedParams = z
    .object({
      path: z.string(),
    })
    .parse(params);

  const game = await DLAstro.getGameWithCreator({
    slug: parsedParams.path,
  });

  return new Response(JSON.stringify(game));
};

export async function getStaticPaths() {
  const games = await DLAstro.getAllGames();

  return games.map((game) => {
    return {
      params: {
        path: game.slug,
      },
    };
  });
}
