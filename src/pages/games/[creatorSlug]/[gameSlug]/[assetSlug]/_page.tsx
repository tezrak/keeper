import { Container, Theme } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import {
  MDXWrapper,
  getMdxComponents,
} from "../../../../../components/client/MDX/MDX";
import {
  CampaignContext,
  useCampaign,
} from "../../../../../domains/campaign/useCampaign";
import { evaluateMdxSync } from "../../../../../domains/mdx/evaluateMdx";
import type { ThemeType } from "../../../../../domains/utils/getTheme";

export function Page(props: {
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  assets: Array<CollectionEntry<"assets">>;
  currentAsset?: CollectionEntry<"assets">;
  gameCover?: React.ReactNode;
  theme: ThemeType;
}) {
  const campaignManager = useCampaign({
    id: "",
    readonly: true,
  });
  const MDXContent = props.currentAsset
    ? evaluateMdxSync({
        mdx: props.currentAsset.body,
      })
    : null;

  return (
    <Theme {...props.theme} hasBackground={false}>
      <CampaignContext.Provider value={campaignManager}>
        <Container size={"1"}>
          {MDXContent && (
            <MDXWrapper>
              <MDXContent
                components={{
                  ...getMdxComponents({}),
                }}
              ></MDXContent>
            </MDXWrapper>
          )}
        </Container>
      </CampaignContext.Provider>
    </Theme>
  );
}
