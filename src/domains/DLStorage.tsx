import { getLogger } from "./getLogger";
import {
  STORAGE_KEY,
  keeperSchema,
  type CampaignStateType,
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
  addCampaign(props: { slug: string }) {
    const uuid = crypto.randomUUID();
    const storage = this.getStorage();

    const parsedState = keeperSchema.state.safeParse({
      slug: props.slug,
    });

    if (!parsedState.success) {
      throw logger.error("Failed to parse state", {
        state: parsedState,
      });
    }

    storage.campaigns[uuid] = {
      slug: props.slug,
      state: parsedState.data,
    };

    this.saveStorage(storage);
    return uuid;
  },
  updateCampaign(uuid: string, newState: CampaignStateType) {
    const storage = this.getStorage();
    storage.campaigns[uuid].state = newState;
    this.saveStorage(storage);
  },
  removeCampaign(uuid: string) {
    const storage = this.getStorage();
    delete storage.campaigns[uuid];
    this.saveStorage(storage);
  },
};
