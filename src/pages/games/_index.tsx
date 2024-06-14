import { DropdownMenu, Grid, Skeleton, Theme } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { ClientDL } from "../../domains/ClientDL";
import { DLStorage } from "../../domains/DLStorage";
import { getLogger } from "../../domains/getLogger";
import type { ThemeType } from "../../domains/getTheme";
import type { GameType } from "../../domains/keeperSchema";

const logger = getLogger("GamesPage");

export function GamesPage(props: { theme: ThemeType }) {
  const [games, setGames] = useState<Record<string, GameType>>({});

  const gamesList = Object.entries(games).map(([id, game]) => ({
    id,
    ...game,
  }));

  useEffect(() => {
    const games = DLStorage.getStorage().games;
    setGames(games);
  }, []);

  function handleDelete(gameId: string) {
    DLStorage.removeGame(gameId);
    setGames(DLStorage.getStorage().games);
  }

  return (
    <Theme {...props.theme} hasBackground={false}>
      <Grid
        columns={{
          sm: "2",
          lg: "3",
        }}
        gap="6"
        width="auto"
      >
        {gamesList?.map((game) => (
          <GameCard
            key={game.id}
            name={game.gameState.name}
            id={game.id}
            slug={game.slug}
            onDelete={handleDelete}
          ></GameCard>
        ))}
      </Grid>
    </Theme>
  );
}

function GameCard(props: {
  id: string;
  slug: string;
  name: string;
  onDelete: (id: string) => void;
}) {
  const [gameWithCreator, setGameWithCreator] = useState<{
    game: CollectionEntry<"games">;
    creator: CollectionEntry<"creators">;
  }>();

  function handleDelete() {
    props.onDelete(props.id);
  }

  useEffect(() => {
    let ignore = false;
    main();
    async function main() {
      if (!props.id || !props.slug) {
        return;
      }
      try {
        logger.log("Fetching game card");
        const result = await ClientDL.getGameWithCreator({
          slug: props.slug,
        });

        logger.log("Setting states");

        if (ignore) {
          return;
        }
        setGameWithCreator(result);
      } catch (error) {
        logger.error("Failed to load game", { error });
      }
    }

    return () => {
      ignore = true;
    };
  }, [props.id, props.slug]);

  return (
    <Skeleton loading={!gameWithCreator}>
      {gameWithCreator && (
        <Card
          href={`/play/${props.slug}?id=${props.id}`}
          title={props.name || gameWithCreator.game.data.name}
          menu={
            <>
              <DropdownMenu.Item color="red" onClick={handleDelete}>
                Delete
              </DropdownMenu.Item>
            </>
          }
        >
          <img
            src={gameWithCreator.game.data.image}
            alt={gameWithCreator.game.data.name}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Card>
      )}
    </Skeleton>
  );
}
