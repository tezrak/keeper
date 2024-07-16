import { Container, Flex, Link, Theme } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import {
  MDXH1,
  MDXH2,
  MDXWrapper,
  getMdxComponents,
} from "../../../../../components/client/MDX/MDX";
import { AppUrl } from "../../../../../domains/app-url/AppUrl";
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
        <Flex direction="column" gap="4">
          <MDXH1>{props.currentAsset?.data.name}</MDXH1>
          <MDXH2 className="mt-[-0.5rem]">
            <Link
              href={AppUrl.game({
                slug: props.game.slug,
              })}
              color="gray"
              className="hover:text-[--accent-12]"
            >
              For {props.game.data.name}
            </Link>
          </MDXH2>
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
        </Flex>
      </CampaignContext.Provider>
    </Theme>
  );
}
