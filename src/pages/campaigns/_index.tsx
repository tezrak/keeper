import {
  Box,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Link,
  Skeleton,
  Text,
  Theme,
} from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { Dices } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/client/Card/Card";
import { ClientDL } from "../../domains/ClientDL";
import { DLStorage } from "../../domains/DLStorage";
import { getLogger } from "../../domains/getLogger";
import type { ThemeType } from "../../domains/getTheme";
import type { CampaignType } from "../../domains/keeperSchema";

const logger = getLogger("GamesPage");

export function CampaignsPage(props: { theme: ThemeType }) {
  const [campaigns, setCampaigns] = useState<Record<string, CampaignType>>();
  const loading = !campaigns;
  const campaignList = Object.entries(campaigns || {}).map(([id, game]) => ({
    id,
    ...game,
  }));
  const empty = campaignList.length === 0;

  useEffect(() => {
    setCampaigns(DLStorage.getStorage().campaigns);
  }, []);

  function handleDelete(gameId: string) {
    DLStorage.removeCampaign(gameId);
    setCampaigns(DLStorage.getStorage().campaigns);
  }

  return (
    <Theme {...props.theme} hasBackground={false}>
      <Skeleton loading={loading} className="h-[50vh]">
        {!loading && (
          <>
            {empty && (
              <Box className="py-[10vh]">
                <Flex direction="column" gap="4" align="center">
                  <Dices size="20vh" className="mb-[2rem]"></Dices>
                  <Heading size="8">You have no campaigns</Heading>
                  <Text>
                    Go to the <Link href="/">homepage</Link> and pick one of the
                    available games to get started.
                  </Text>
                </Flex>
              </Box>
            )}
            <Grid
              columns={{
                sm: "2",
                lg: "3",
              }}
              gap="6"
              width="auto"
            >
              {campaignList?.map((campaign) => {
                return (
                  <GameCard
                    key={campaign.id}
                    name={campaign.state.name}
                    id={campaign.id}
                    slug={campaign.slug}
                    onDelete={handleDelete}
                  ></GameCard>
                );
              })}
            </Grid>
          </>
        )}
      </Skeleton>
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
  const [errored, setErrored] = useState(false);

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
        if (ignore) {
          return;
        }
        logger.error("Failed to get game", { error });
        setErrored(true);
      }
    }

    return () => {
      ignore = true;
    };
  }, [props.id, props.slug]);

  if (errored) {
    return null;
  }

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
