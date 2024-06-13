import { getLogger } from "./getLogger";
import {
  STORAGE_KEY,
  keeperSchema,
  type GameStateType,
  type StorageType,
} from "./keeperSchema";

const logger = getLogger("DLStorage");
export const DLStorage = {
  getStorage() {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const parsedStorage = keeperSchema.storage.safeParse(storage);

    if (!parsedStorage.success) {
      throw logger.error("Failed to parse storage", { storage: parsedStorage });
    }

    return parsedStorage.data;
  },
  saveStorage(newStorage: StorageType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
  },
  addGame(props: { slug: string }) {
    const uuid = crypto.randomUUID();
    const storage = this.getStorage();

    const parsedGameState = keeperSchema.gameState.safeParse({
      slug: props.slug,
    });

    if (!parsedGameState.success) {
      throw logger.error("Failed to parse game state", {
        gameState: parsedGameState,
      });
    }

    storage.games[uuid] = {
      slug: props.slug,
      gameState: parsedGameState.data,
    };

    this.saveStorage(storage);
    return uuid;
  },
  updateGame(uuid: string, newGameState: GameStateType) {
    const storage = this.getStorage();
    storage.games[uuid].gameState = newGameState;
    this.saveStorage(storage);
  },
  removeGame(uuid: string) {
    const storage = this.getStorage();
    delete storage.games[uuid];
    this.saveStorage(storage);
  },
};
