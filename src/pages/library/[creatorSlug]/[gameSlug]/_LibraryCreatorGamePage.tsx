import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Link,
  Text,
  Theme,
  VisuallyHidden,
} from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import {
  MDXWrapper,
  getMdxComponents,
} from "../../../../components/client/MDX/MDX";
import {
  CampaignContext,
  useCampaign,
} from "../../../../domains/campaign/useCampaign";
import { CreateNewCampaignButton } from "./_components/CreateNewCampaignButton";

import { useEffect, useState } from "react";
import { evaluateMdxSync } from "../../../../domains/mdx/evaluateMdx";
import type { ThemeType } from "../../../../domains/utils/getTheme";

export function LibraryCreatorGamePage(props: {
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  assets: Array<CollectionEntry<"assets">>;
  currentAsset?: CollectionEntry<"assets">;
  children: React.ReactNode;
  theme: ThemeType;
}) {
  const MDXContent = props.currentAsset
    ? evaluateMdxSync({
        mdx: props.currentAsset.body,
      })
    : null;
  const campaignManager = useCampaign({
    id: "",
    readonly: true,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.currentAsset) {
      setOpen(true);
    }
  }, [props.currentAsset]);

  return (
    <Theme {...props.theme} hasBackground={false}>
      <CampaignContext.Provider value={campaignManager}>
        <Flex direction="column" gap="5">
          <Heading size="9">{props.game.data.name}</Heading>
          <Heading size="6" className="mt-[-1rem]">
            <Link
              href={`/library/${props.creator.slug}`}
              color="gray"
              className="hover:text-[--accent-12]"
            >
              By {props.creator.data.name}
            </Link>
          </Heading>
          <Flex gap="2" align="center">
            <Badge
              size="2"
              className="bg-transparent p-0 font-bold uppercase"
              color="gray"
              variant="soft"
            >
              Included Assets
            </Badge>
            {props.assets.map((asset) => {
              return (
                <a href={`/library/${asset.slug}`} key={asset.slug}>
                  <Button size="1" color="gray">
                    {asset.data.name}
                  </Button>
                </a>
              );
            })}
          </Flex>
          <CreateNewCampaignButton gameSlug={props.game.slug} />

          <MDXWrapper>{props.children}</MDXWrapper>

          {renderAssetDialog()}
          {renderAssetJustToMakeSureBuildPasses()}
        </Flex>
      </CampaignContext.Provider>
    </Theme>
  );

  function renderAssetJustToMakeSureBuildPasses() {
    return (
      <>
        <VisuallyHidden>{renderAssetContent()}</VisuallyHidden>
      </>
    );
  }

  function renderAssetDialog() {
    return (
      <>
        <Dialog.Root
          open={open}
          onOpenChange={(newOpen) => {
            if (!newOpen) {
              location.href = `/library/${props.game.slug}`;
            }
          }}
        >
          <Dialog.Content maxWidth="1024px">
            <Box pt={"7"} px="7">
              <Dialog.Title>
                <Text size="7" align="center" className="block" color="gray">
                  {props.game.data.name}/{props.currentAsset?.data.name}
                </Text>
              </Dialog.Title>

              {renderAssetContent()}

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray" size="4">
                    Close
                  </Button>
                </Dialog.Close>
              </Flex>
            </Box>
          </Dialog.Content>
        </Dialog.Root>
      </>
    );
  }

  function renderAssetContent() {
    return (
      <>
        {MDXContent && (
          <MDXWrapper>
            <MDXContent
              components={{
                ...getMdxComponents({
                  bumpOneLevel: true,
                }),
              }}
            ></MDXContent>
          </MDXWrapper>
        )}
      </>
    );
  }
}
