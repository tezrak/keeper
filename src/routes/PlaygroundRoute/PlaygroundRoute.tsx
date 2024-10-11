import { Flex, TextArea, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  getMdxComponents,
  MDXH1,
  MDXWrapper,
} from "../../components/client/MDX/MDX";
import {
  CampaignContext,
  useCampaign,
} from "../../domains/campaign/useCampaign";
import { evaluateMdx } from "../../domains/mdx/evaluateMdx";
import { getLogger } from "../../domains/utils/getLogger";
import type { ThemeType } from "../../domains/utils/getTheme";

const logger = getLogger("PlaygroundPage");

export function PlaygroundRoute(props: { theme: ThemeType }) {
  const [text, setText] = useState("");
  const campaignManager = useCampaign({
    id: "",
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
      <MDXH1>Asset Creation Playground</MDXH1>
      <Flex gap="7" direction="row">
        <div className="w-[30%]">
          <TextArea
            className="f-full"
            rows={20}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></TextArea>
        </div>
        <div className="w-[70%]">
          <CampaignContext.Provider value={campaignManager}>
            <MDXWrapper>
              {MDXContent && (
                <MDXContent
                  components={{
                    ...getMdxComponents({}),
                  }}
                />
              )}
            </MDXWrapper>
          </CampaignContext.Provider>
        </div>
      </Flex>
    </Theme>
  );
}
