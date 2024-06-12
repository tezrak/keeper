import { Heading, Skeleton } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { getLogger } from "../../domains/getLogger";
import type { GameStateType } from "../../domains/keeperSchema";
import { keeperStorage } from "../../domains/keeperStorage";

const logger = getLogger("PlayPage");
export function PlayPage(props: {}) {
  const [id, setId] = useState<string>();
  const [gameState, setGameState] = useState<GameStateType>();
  const [game, setGame] = useState<CollectionEntry<"games">>();

  useEffect(() => {
    const idFromParams = new URLSearchParams(window.location.search).get("id");

    if (!idFromParams) {
      throw logger.error("No id provided");
    }

    setId(idFromParams);
  }, []);

  useEffect(() => {
    main();
    async function main() {
      if (!id) {
        return;
      }
      logger.log("Loading game state");
      const gameState = keeperStorage.getStorage().games[id];

      logger.log("Fetching game data");
      const response = await fetch(`/api/getGame/${gameState.slug}/data.json`);
      const json: CollectionEntry<"games"> = await response.json();

      logger.log("Setting states");
      setGameState(gameState);
      setGame(json);
    }
  }, [id]);

  return (
    <>
      <Skeleton loading={!gameState}>
        <Heading size="9">Playing {game?.data.name}...</Heading>
      </Skeleton>
    </>
  );
}
