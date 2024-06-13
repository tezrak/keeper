import {
  STORAGE_KEY,
  keeperSchema,
  type GameStateType,
  type StorageType,
} from "./keeperSchema";

export const DLStorage = {
  getStorage() {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const data = keeperSchema.storage.parse(storage);
    return data;
  },
  saveStorage(newStorage: StorageType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
  },
  addGame(props: { slug: string }) {
    const uuid = crypto.randomUUID();
    const storage = this.getStorage();

    const newGameState = keeperSchema.gameState.parse({
      slug: props.slug,
    });
    storage.games[uuid] = {
      slug: props.slug,
      gameState: newGameState,
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
