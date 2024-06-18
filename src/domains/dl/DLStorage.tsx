import { getLogger } from "../utils/getLogger";

import z from "zod";
import { zodBuild } from "../utils/zodBuild";

export const STORAGE_KEY = "keeper";

export const ASSET_NAME_KEY = "__keeper.assetName" as const;
const stateSchema = z.union([
  z.record(z.string(), z.any()).default({}),
  z.object({
    [ASSET_NAME_KEY]: z.string(),
  }),
]);
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

export type StorageType = z.infer<typeof storageSchema>;
export type StorageInputType = z.input<typeof storageSchema>;
export type CampaignType = z.infer<typeof campaignSchema>;
export type CampaignInputType = z.input<typeof campaignSchema>;
export type CampaignStateType = z.infer<typeof stateSchema>;
export type CampaignStateInputType = z.input<typeof stateSchema>;

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
