import z from "zod";

export const STORAGE_KEY = "keeper";

const state = z.object({
  name: z.string().default(""),
});

const campaign = z.object({
  slug: z.string(),
  state: state,
});

const campaignId = z.string();
const storage = z
  .object({
    campaigns: z.record(campaignId, campaign).default({}),
  })
  .default({});

export const keeperSchema = {
  storage,
  game: campaign,
  state: state,
};

export type StorageType = z.infer<typeof storage>;
export type CampaignType = z.infer<typeof campaign>;
export type CampaignStateType = z.infer<typeof state>;
