import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Container, Flex, Link, Theme } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import {
  MDXH1,
  MDXH5,
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
          <Callout.Root color="blue">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              This sheet is currently in <b>read-only mode</b>. If you want to
              make changes, you can create a new campaign.
            </Callout.Text>
          </Callout.Root>
          <MDXH1>{props.currentAsset?.data.name}</MDXH1>
          <MDXH5 className="mt-[-0.5rem]">
            <Link
              href={AppUrl.game({
                slug: props.game.slug,
              })}
              color="gray"
              className="hover:text-[--accent-12]"
            >
              For {props.game.data.name}
            </Link>
          </MDXH5>
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
