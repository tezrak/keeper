import { getCollection, getEntry } from "astro:content";

export const DL = {
  async getAllGames() {
    const games = await getCollection("games");
    return games;
  },
  async getAllGamesWithCreators() {
    const games = await this.getAllGames();
    const gamesWithCreators = await Promise.all(
      games.map(async (game) => {
        const [creatorSlug] = game.id.split("/");
        const creator = await getEntry("creators", creatorSlug);
        return {
          game,
          creator: creator!,
        };
      }),
    );

    return gamesWithCreators;
  },
  async getAllGamesWithCreatorsAndSheets() {
    const gamesWithCreators = await this.getAllGamesWithCreators();
    const gamesWithCreatorsAndSheets = await Promise.all(
      gamesWithCreators.map(async (gameWithCreator) => {
        const sheets = await this.getGameSheets({
          slug: gameWithCreator.game.slug,
        });
        return {
          game: gameWithCreator.game,
          creator: gameWithCreator.creator!,
          sheets: sheets,
        };
      }),
    );

    return gamesWithCreatorsAndSheets;
  },
  async getGameWithCreator(props: { slug: string }) {
    const game = await getEntry("games", props.slug);

    if (!game) {
      return null;
    }
    const [creatorSlug] = game.id.split("/");
    const creator = await getEntry("creators", creatorSlug);
    return {
      game,
      creator,
    };
  },
  async getGameSheets(props: { slug: string }) {
    const sheets = await getCollection("library");
    const sheetsMatchingGame = sheets.filter((sheet) => {
      return sheet.slug.startsWith(props.slug);
    });

    return sheetsMatchingGame;
  },
};
