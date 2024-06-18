import {
  Check,
  FileSpreadsheet,
  RefreshCw,
  Save,
  Smartphone,
} from "lucide-react";

import {
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Skeleton,
  Tabs,
  TextField,
  Theme,
  Tooltip,
} from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState, type FormEvent } from "react";
import { getLogger } from "../../../../domains/utils/getLogger";

import {
  EyeClosedIcon,
  EyeOpenIcon,
  FilePlusIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { GameAsset } from "../../../../components/client/GameAsset/GameAsset";
import { NothingToShowHere } from "../../../../components/client/NothingToShowHere/NothingToShowHere";
import { getSurfaceStyle } from "../../../../components/client/Surface/getSurfaceStyle";
import {
  CampaignContext,
  useCampaign,
} from "../../../../domains/campaign/useCampaign";
import type { ThemeType } from "../../../../domains/utils/getTheme";
import { wait } from "../../../../domains/utils/wait";

const logger = getLogger("PlayPage");

export function PlayPage(props: {
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  assets: Array<CollectionEntry<"assets">>;
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
      <Box className="hidden lg:block">
        {id && (
          <Game
            id={id}
            game={props.game}
            creator={props.creator}
            assets={props.assets}
          ></Game>
        )}
      </Box>
      <Box className="lg:hidden">
        <NothingToShowHere
          icon={Smartphone}
          title={"Open on Desktop"}
          description={
            <>
              This page is not meant to be viewed on mobile. Please make your
              window bigger or open it in a desktop browser.
            </>
          }
        ></NothingToShowHere>
      </Box>
    </Theme>
  );
}

const possibleTabs = {
  assets: "My Assets",
  library: "Library",
} as const;
type TabType = [keyof typeof possibleTabs][0];

function Game(props: {
  id: string;
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  assets: Array<CollectionEntry<"assets">>;
}) {
  const [tab, setTab] = useState<TabType>("library");
  const [addingAssetId, setAddingAssetId] = useState<string>();
  const campaignManager = useCampaign({
    id: props.id,
  });
  const campaignAssets = campaignManager.campaign?.assets || {};
  const campaignAssetIds = Object.keys(campaignAssets);
  const selectedAssetSlug =
    campaignAssets[campaignManager.selectedAssetId!]?.slug;
  const selectedCampaignAsset = props.assets.find(
    (asset) => asset.slug === selectedAssetSlug,
  );

  async function handleAddAsset(p: { asset: CollectionEntry<"assets"> }) {
    setAddingAssetId(p.asset.id);
    await wait();
    campaignManager.addAsset({ slug: p.asset.slug });
    setTab("assets");
    setAddingAssetId(undefined);
  }

  function handleLoadAsset(p: { id: string }) {
    campaignManager.setSelectedAssetId(p.id);
  }

  function handleRemoveAsset(p: { id: string }) {
    campaignManager.removeAsset({ id: p.id });
  }

  function handleMoveAssetUp(p: { id: string }) {
    campaignManager.moveAssetUp({ id: p.id });
  }

  function handleMoveAssetDown(p: { id: string }) {
    campaignManager.moveAssetDown({ id: p.id });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    campaignManager.saveForm();
  }

  return (
    <CampaignContext.Provider value={campaignManager}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={campaignManager.formRef}
      >
        <Flex direction={"column"} gap="4">
          <Flex direction="row" gap="9" align="center">
            <TextField.Root
              size="3"
              color="gray"
              placeholder={"Campaign name..."}
              className={clsx(
                "h-[4rem] w-full bg-transparent text-[2rem] shadow-none",
                "[&>input]:h-[4rem] [&>input]:bg-transparent",
              )}
              autoComplete="off"
              value={campaignManager.campaign?.name || ""}
              onChange={(e) => {
                campaignManager.setCampaignName({ name: e.target.value });
              }}
            />
            <Flex direction="row" gap="2" align="center">
              <Badge variant="soft" size="3">
                {campaignManager.dirty ? (
                  <>
                    <RefreshCw size="15"></RefreshCw>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size="15"></Check>
                    Saved
                  </>
                )}
              </Badge>
              <Badge size="3">
                <FileSpreadsheet size="15"></FileSpreadsheet>
                [Sheet Name]
              </Badge>
            </Flex>
          </Flex>
          <Flex direction="row" gap="9">
            <Flex
              direction="column"
              gap="4"
              style={{
                ...getSurfaceStyle(),
              }}
              className="min-w-[272px] max-w-[272px] rounded-[--radius-2] p-4"
            >
              <Tooltip content="Save Entire Session">
                <Button
                  variant="soft"
                  size="3"
                  className="w-full"
                  type="submit"
                >
                  <Save size={15}></Save>
                </Button>
              </Tooltip>
              <Tabs.Root value={tab}>
                <Tabs.List size="2" justify={"center"}>
                  <Tabs.Trigger
                    value="library"
                    onClick={() => setTab("library")}
                  >
                    Library
                  </Tabs.Trigger>
                  <Tabs.Trigger value="assets" onClick={() => setTab("assets")}>
                    My Assets
                  </Tabs.Trigger>
                </Tabs.List>

                <Box pt="3" mt="2">
                  <Tabs.Content value="library">
                    <Flex direction="column" gap="2" px="2">
                      {props.assets.map((asset, i) => {
                        const isAdding = addingAssetId === asset.id;
                        return (
                          <div key={i}>
                            <Tooltip
                              content={`Add a new "${asset.data.name} ${asset.data.version}" to my assets`}
                            >
                              <Button
                                size="2"
                                loading={isAdding}
                                color="gray"
                                variant="outline"
                                className="w-full justify-start text-left"
                                onClick={() => {
                                  handleAddAsset({ asset: asset });
                                }}
                              >
                                <FilePlusIcon></FilePlusIcon>
                                {asset.data.name} {asset.data.version}
                              </Button>
                            </Tooltip>
                          </div>
                        );
                      })}
                    </Flex>
                  </Tabs.Content>
                  <Tabs.Content value="assets">
                    <Flex direction="column" gap="2" px="2">
                      {campaignAssetIds.map((assetId, i) => {
                        const assetSlug = campaignAssets[assetId].slug;
                        const asset = props.assets.find(
                          (asset) => asset.slug === assetSlug,
                        )!;
                        const isSelected =
                          assetId === campaignManager.selectedAssetId;
                        const isFirst = i === 0;
                        const isLast = i === campaignAssetIds.length - 1;
                        const customName =
                          campaignAssets[assetId].state["__keeper.assetName"];
                        console.log(
                          "campaignAssets[assetId]",
                          campaignAssets[assetId],
                        );

                        return (
                          <Flex key={assetId} gap="2">
                            <Button
                              size="2"
                              color={isSelected ? undefined : "gray"}
                              variant={"soft"}
                              className="w-full justify-start text-left"
                              onClick={() => {
                                handleLoadAsset({ id: assetId });
                              }}
                            >
                              {isSelected ? <EyeOpenIcon /> : <EyeClosedIcon />}
                              <Flex flexGrow={"1"}>
                                {customName || asset.data.name}
                              </Flex>
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                  <Button
                                    asChild
                                    variant="ghost"
                                    className="transition-all duration-75"
                                  >
                                    <span>
                                      <HamburgerMenuIcon />
                                      <DropdownMenu.TriggerIcon />
                                    </span>
                                  </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                  <DropdownMenu.Item
                                    color="gray"
                                    className={clsx(isFirst && "hidden")}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMoveAssetUp({ id: assetId });
                                    }}
                                  >
                                    Move Up
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    color="gray"
                                    className={clsx(isLast && "hidden")}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMoveAssetDown({ id: assetId });
                                    }}
                                  >
                                    Move Down
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    color="red"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveAsset({ id: assetId });
                                    }}
                                  >
                                    Delete
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Root>
                            </Button>
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Tabs.Content>
                </Box>
              </Tabs.Root>
            </Flex>
            <Flex direction="column" gap="4" flexGrow={"1"}>
              <Skeleton loading={campaignManager.loading} height={"60vh"}>
                {selectedCampaignAsset ? (
                  <>
                    <GameAsset asset={selectedCampaignAsset}></GameAsset>
                  </>
                ) : (
                  <>
                    <NothingToShowHere
                      title={"No asset selected"}
                      description={<>Select an asset to view it.</>}
                    ></NothingToShowHere>
                  </>
                )}
              </Skeleton>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </CampaignContext.Provider>
  );
}
