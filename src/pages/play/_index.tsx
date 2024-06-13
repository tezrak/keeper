import { Flex, Heading, Skeleton, TextField } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { DLStorage } from "../../domains/DLStorage";
import { getLogger } from "../../domains/getLogger";
import type { GameStateType } from "../../domains/keeperSchema";

const logger = getLogger("PlayPage");
export function PlayPage(props: {}) {
  const [id, setId] = useState<string>();

  useEffect(() => {
    const idFromParams = new URLSearchParams(window.location.search).get("id");

    if (!idFromParams) {
      throw logger.error("No id provided");
    }

    setId(idFromParams);
  }, []);

  return (
    <>
      <Game id={id}></Game>
    </>
  );
}

function Game(props: { id: string | undefined }) {
  const [game, setGame] = useState<CollectionEntry<"games">>();
  const [gameState, setGameState] = useState<GameStateType>();

  useEffect(() => {
    main();
    async function main() {
      if (!props.id) {
        return;
      }
      try {
        logger.log("Loading game state");
        const gameState = DLStorage.getStorage().games[props.id];

        logger.log("Fetching game data");
        const response = await fetch(
          `/api/getGame/${gameState.slug}/data.json`,
        );
        const json: CollectionEntry<"games"> = await response.json();

        logger.log("Setting states");
        setGameState(gameState.gameState);
        setGame(json);
      } catch (error) {
        logger.error("Failed to load game", { error });
      }
    }
  }, [props.id]);

  return (
    <>
      <Skeleton loading={!gameState}>
        <Flex direction="column" gap="4">
          <Heading size="9">Playing {game?.data.name}...</Heading>

          <TextField.Root
            size="3"
            variant="soft"
            placeholder="Give this game a name."
          />
        </Flex>
      </Skeleton>
    </>
  );
}
