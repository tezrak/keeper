import { getLogger } from "../utils/getLogger";

import z from "zod";
import { zodBuild } from "../utils/zodBuild";

const STORAGE_KEY = "keeper";

const stateSchema = z.record(z.string(), z.any()).default({});

const assetSchema = z.object({
  /**
   * Asset Slug
   */
  slug: z.string(),
  state: stateSchema,
});
const campaignSchema = z.object({
  slug: z.string(),
  name: z.string().default(""),
  assets: z
    .record(
      /**
       * Asset Id
       */
      z.string(),
      assetSchema,
    )
    .default({}),
});
const storageSchema = z
  .object({
    campaigns: z
      .record(
        /**
         * Campaign Id
         */
        z.string(),
        campaignSchema,
      )
      .default({}),
  })
  .default({});

export const schemas = {
  storage: storageSchema,
  campaignSchema: campaignSchema,
  assetSchema: assetSchema,
  state: stateSchema,
};

type StorageType = z.infer<typeof storageSchema>;
type StorageInputType = z.input<typeof storageSchema>;
export type CampaignType = z.infer<typeof campaignSchema>;
type CampaignInputType = z.input<typeof campaignSchema>;
type CampaignStateType = z.infer<typeof stateSchema>;
type CampaignStateInputType = z.input<typeof stateSchema>;

const logger = getLogger("DLStorage");

export const DLStorage = {
  getStorage() {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    return zodBuild(storageSchema, storage);
  },
  saveStorage(newStorage: StorageType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
  },
  getCampaign(props: { campaignId: string }) {
    const storage = this.getStorage();
    return zodBuild(campaignSchema, storage.campaigns[props.campaignId]);
  },
  addCampaign(props: { slug: string }) {
    const uuid = crypto.randomUUID();
    const storage = this.getStorage();
    storage.campaigns[uuid] = zodBuild(campaignSchema, {
      slug: props.slug,
    });

    this.saveStorage(storage);
    return uuid;
  },
  updateCampaign(props: { campaignId: string; updatedCampaign: CampaignType }) {
    const storage = this.getStorage();

    storage.campaigns[props.campaignId] = zodBuild(
      campaignSchema,
      props.updatedCampaign,
    );
    this.saveStorage(storage);
  },
  removeCampaign(props: { campaignId: string }) {
    const storage = this.getStorage();
    delete storage.campaigns[props.campaignId];
    this.saveStorage(storage);
  },
};
