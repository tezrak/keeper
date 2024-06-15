import { Save } from "lucide-react";

import {
  Box,
  Button,
  Flex,
  Skeleton,
  Tabs,
  TextField,
  Theme,
  Tooltip,
} from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState, type FormEvent } from "react";
import { getLogger } from "../../../../domains/getLogger";
import type { SheetsType } from "./index.astro";

import { FilePlusIcon } from "@radix-ui/react-icons";
import { Sheet } from "../../../../components/client/Sheet/Sheet";
import { getSurfaceStyle } from "../../../../components/client/Surface/getSurfaceStyle";
import type { ThemeType } from "../../../../domains/getTheme";
import {
  GameStateContext,
  useGameState,
} from "../../../../domains/useGameState";

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
  const possibleTabs = ["my-sheets", "library"] as const;
  type TabType = (typeof possibleTabs)[number];
  const [tab, setTab] = useState<TabType>("my-sheets");
  const gameStateManager = useGameState({
    id: props.id,
  });

  function handleAddSheet(p: { sheet: SheetsType[number] }) {
    // setSheets([...sheets, new Sheet()]);
    setTab("my-sheets");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const serializedFormData = Object.fromEntries(formData.entries());
    logger.info("interesting", { aslut: serializedFormData });
    // gameStateManager.addSheet({ name: sheetName });
  }

  return (
    <GameStateContext.Provider value={gameStateManager}>
      <form onSubmit={handleSubmit}>
        <Flex direction="row" gap="9">
          <Flex
            direction="column"
            gap="4"
            style={{
              ...getSurfaceStyle(),
            }}
            className="min-w-[272px] max-w-[272px] rounded-[--radius-2] p-4"
          >
            <TextField.Root
              size="3"
              color="gray"
              placeholder={"Campaign name"}
              className="shadow-none"
              autoComplete="off"
            />
            <Tooltip content="Save Entire Session">
              <Button variant="soft" size="3" className="w-full" type="submit">
                <Save size={15}></Save>
              </Button>
            </Tooltip>
            <Tabs.Root value={tab}>
              <Tabs.List size="2" justify={"center"}>
                <Tabs.Trigger
                  value="my-sheets"
                  onClick={() => setTab("my-sheets")}
                >
                  {renderMySheets()}
                </Tabs.Trigger>
                <Tabs.Trigger value="library" onClick={() => setTab("library")}>
                  {renderLibrarySheets()}
                </Tabs.Trigger>
              </Tabs.List>

              <Box pt="3" mt="2">
                <Tabs.Content value="my-sheets">SHEETS</Tabs.Content>
                <Tabs.Content value="library">
                  <Flex direction="column" gap="4" px="2">
                    {props.sheets.map((sheet, i) => {
                      return (
                        <div key={i}>
                          <Tooltip
                            content={`Add a new "${sheet.data.name} ${sheet.data.version}" to my sheets`}
                          >
                            <Button
                              size="2"
                              variant="ghost"
                              className="w-full justify-start text-left"
                              onClick={() => {
                                handleAddSheet({ sheet });
                              }}
                            >
                              <FilePlusIcon></FilePlusIcon>
                              {sheet.data.name} {sheet.data.version}
                            </Button>
                          </Tooltip>
                        </div>
                      );
                    })}
                  </Flex>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Flex>
          <Flex direction="column" gap="4" flexGrow={"1"}>
            <Skeleton loading={gameStateManager.loading} height={"60vh"}>
              {props.sheets.map((sheet, i) => {
                return (
                  <div key={i}>
                    <Sheet sheet={sheet}></Sheet>
                  </div>
                );
              })}
            </Skeleton>
          </Flex>
        </Flex>
      </form>
    </GameStateContext.Provider>
  );

  function renderMySheets() {
    return <>My Sheets</>;
  }
  function renderLibrarySheets() {
    return <>Library</>;
  }
}
