import type { CollectionEntry } from "astro:content";
import { getLogger } from "./getLogger";

const logger = getLogger("ClientDL");

export const ClientDL = {
  async getGameWithCreator(props: { slug: string }) {
    try {
      const response = await fetch(
        `/api/getGameWithCreator/${props.slug}/data.json`,
      );
      const json: {
        game: CollectionEntry<"games">;
        creator: CollectionEntry<"creators">;
      } = await response.json();
      return json;
    } catch (error) {
      throw logger.error("getGameWithCreator", { error });
    }
  },
};
