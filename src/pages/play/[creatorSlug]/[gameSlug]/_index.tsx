import { Flex, Heading, Skeleton, Theme } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { DLStorage } from "../../../../domains/DLStorage";
import { getLogger } from "../../../../domains/getLogger";
import type { GameStateType } from "../../../../domains/keeperSchema";
import type { SheetsType } from "./index.astro";

import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { MDXWrapper, getMdxComponents } from "../../../../components/MDX";
import type { ThemeType } from "../../../../domains/getTheme";

const logger = getLogger("PlayPage");

export function PlayPage(props: {
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  sheets: SheetsType;
  theme: ThemeType;
}) {
  const [id, setId] = useState<string>();

  useEffect(() => {
    const idFromParams = new URLSearchParams(window.location.search).get("id");

    if (!idFromParams) {
      throw logger.error("No id provided");
    }

    setId(idFromParams);
  }, []);

  return (
    <Theme {...props.theme} hasBackground={false}>
      <Game
        id={id}
        game={props.game}
        creator={props.creator}
        sheets={props.sheets}
      ></Game>
    </Theme>
  );
}

function Game(props: {
  id: string | undefined;
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  sheets: SheetsType;
}) {
  const [gameState, setGameState] = useState<GameStateType>();
  const [MDXContent, setMDXContent] =
    useState<Awaited<ReturnType<typeof evaluate>>["default"]>();

  useEffect(() => {
    main();
    async function main() {
      const firstSheet = props.sheets[0];
      const res = await evaluate(firstSheet.body, runtime as any);

      setMDXContent(() => res.default);
    }
  }, []);

  useEffect(() => {
    main();
    async function main() {
      if (!props.id) {
        return;
      }
      try {
        logger.log("Loading game state");
        const gameState = DLStorage.getStorage().games[props.id];

        logger.log("Setting states");
        setGameState(gameState.gameState);
      } catch (error) {
        logger.error("Failed to load game", { error });
      }
    }
  }, [props.id]);

  return (
    <>
      <Skeleton loading={!gameState}>
        <Flex direction="column" gap="4">
          {props.sheets.map((sheet, i) => {
            return (
              <div key={i}>
                <MDXWrapper>
                  <Heading size="9" align={"center"} mb="9">
                    {sheet.data.name}
                  </Heading>
                  {MDXContent && (
                    <MDXContent
                      components={{
                        ...getMdxComponents(),
                      }}
                    />
                  )}
                </MDXWrapper>
              </div>
            );
          })}
        </Flex>
      </Skeleton>
    </>
  );
}
