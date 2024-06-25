import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const DLAstro = {
  // CREATOR
  async getAllCreators() {
    const creators = await getCollection("creators");
    return { creators };
  },
  async getCreator(props: {
    slug: CollectionEntry<"creators">["slug"];
    includeGames?: boolean;
  }) {
    const creator = await getEntry("creators", props.slug);

    if (props.includeGames) {
      const games = await getCollection("games", ({ data }) => {
        return data.creator.slug === creator.slug;
      });

      return { creator, games: games };
    } else {
      return { creator, games: [] };
    }
  },

  // GAMES
  async getAllGames() {
    const games = await getCollection("games");
    return { games };
  },
  async getGame(props: {
    slug: CollectionEntry<"games">["slug"];
    includeCreator?: boolean;
  }) {
    const game = await getEntry("games", props.slug);

    if (props.includeCreator) {
      const creator = await getEntry("creators", game.data.creator.slug);
      return { game, creator };
    }

    return { game };
  },
  async getAllGamesWithCreator(props: { includeAssets?: boolean }) {
    const games = await getCollection("games");

    const gamesWithCreators = await Promise.all(
      games.map(async (game) => {
        const creator = await getEntry("creators", game.data.creator.slug);

        const assets = props.includeAssets
          ? await getCollection("assets", ({ data }) => {
              return data.game.slug === game.slug;
            })
          : [];

        return {
          game,
          creator,
          assets,
        };
      }),
    );

    return { games: gamesWithCreators };
  },

  async getAssetWithGameAndCreator(props: {
    slug: CollectionEntry<"assets">["slug"];
  }) {
    const asset = await getEntry("assets", props.slug);

    const game = await getEntry(asset.data.game);
    const creator = await getEntry(game.data.creator);
    return {
      asset: asset!,
      game: game!,
      creator: creator!,
    };
  },
  async getAssetsForGame(props: { slug: CollectionEntry<"games">["slug"] }) {
    const assets = await getCollection("assets", ({ data }) => {
      return data.game.slug === props.slug;
    });

    return { assets };
  },
};
