import z from "zod";

export const STORAGE_KEY = "keeper";

const gameState = z.object({
  name: z.string().default(""),
});

const game = z.object({
  slug: z.string(),
  gameState: gameState,
});

const storage = z
  .object({
    games: z.record(z.string(), game).default({}),
  })
  .default({});

export const keeperSchema = {
  storage,
  game: game,
  gameState: gameState,
};

export type StorageType = z.infer<typeof storage>;
export type GameType = z.infer<typeof game>;
export type GameStateType = z.infer<typeof gameState>;
