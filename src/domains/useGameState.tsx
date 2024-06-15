import { createContext, useEffect, useState } from "react";
import { DLStorage } from "./DLStorage";
import { getLogger } from "./getLogger";
import type { CampaignStateType } from "./keeperSchema";

const logger = getLogger("useGameState");

export const GameStateContext = createContext<ReturnType<typeof useGameState>>(
  undefined as any,
);

export function useGameState(props: { id: string | undefined }) {
  const [gameState, setGameState] = useState<CampaignStateType>();

  useEffect(() => {
    main();
    async function main() {
      if (!props.id) {
        return;
      }
      try {
        logger.log("Loading game state");
        const gameState = DLStorage.getStorage().campaigns[props.id];

        logger.log("Setting states");
        setGameState(gameState.state);
      } catch (error) {
        logger.error("Failed to load game", { error });
      }
    }
  }, [props.id]);

  return {
    loading: !gameState,
    // loading: true,
    gameState,
  };
}
