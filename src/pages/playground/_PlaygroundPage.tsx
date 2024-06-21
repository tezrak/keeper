import { Box, Flex, TextArea, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getMdxComponents, MDXWrapper } from "../../components/client/MDX/MDX";
import {
  CampaignContext,
  useCampaign,
} from "../../domains/campaign/useCampaign";
import { evaluateMdx } from "../../domains/mdx/evaluateMdx";
import { getLogger } from "../../domains/utils/getLogger";
import type { ThemeType } from "../../domains/utils/getTheme";

const logger = getLogger("PlaygroundPage");

export function PlaygroundPage(props: { theme: ThemeType }) {
  const [text, setText] = useState("");
  const campaignManager = useCampaign({
    id: "playground",
  });

  const [MDXContent, setMDXContent] =
    useState<Awaited<ReturnType<typeof evaluateMdx>>>();

  useEffect(() => {
    main();
    async function main() {
      try {
        const mdxContent = await evaluateMdx({
          mdx: text,
        });
        setMDXContent(() => mdxContent);
      } catch (error) {
        logger.error("Failed to evaluate MDX", { error });
      }
    }
  }, [text]);

  return (
    <Theme {...props.theme} hasBackground={false}>
      <Flex gap="7" direction="row">
        <Box flexBasis={"30%"}>
          <TextArea
            className="f-full"
            rows={20}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></TextArea>
        </Box>
        <Box flexBasis={"60%"}>
          <CampaignContext.Provider value={campaignManager}>
            <MDXWrapper>
              {MDXContent && (
                <MDXContent
                  components={{
                    ...getMdxComponents({ bumpOneLevel: true }),
                  }}
                />
              )}
            </MDXWrapper>
          </CampaignContext.Provider>
        </Box>
      </Flex>
    </Theme>
  );
}
