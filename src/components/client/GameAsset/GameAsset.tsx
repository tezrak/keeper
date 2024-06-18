import { evaluate } from "@mdx-js/mdx";
import { TextField } from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import {
  CampaignContext,
  CampaignState,
} from "../../../domains/campaign/useCampaign";
import { ASSET_NAME_KEY } from "../../../domains/dl/DLStorage";
import { getLogger } from "../../../domains/utils/getLogger";
import { MDXWrapper, getMdxComponents } from "../MDX/MDX";

const logger = getLogger("Sheet");

export function GameAsset(props: { asset: CollectionEntry<"assets"> }) {
  const [MDXContent, setMDXContent] =
    useState<Awaited<ReturnType<typeof evaluate>>["default"]>();

  useEffect(() => {
    main();
    async function main() {
      try {
        const res = await evaluate(props.asset.body, runtime as any);
        setMDXContent(() => res.default);
      } catch (error) {
        logger.error("Failed to evaluate MDX", { error });
      }
    }
  }, [props.asset.id]);

  return (
    <MDXWrapper>
      <GameAssetName></GameAssetName>

      {MDXContent && (
        <MDXContent
          components={{
            ...getMdxComponents(),
          }}
        />
      )}
    </MDXWrapper>
  );
}

function GameAssetName(props: {}) {
  const campaignManager = useContext(CampaignContext);
  const key = ASSET_NAME_KEY;
  const [value, setValue] = useState(() => {
    return campaignManager.getCurrentFormValue({ name: key }) || "";
  });

  return (
    <>
      <TextField.Root
        color="gray"
        placeholder={"Asset name..."}
        className={clsx(
          "h-[3rem] w-full bg-transparent text-[1.5rem] shadow-none",
          "[&>input]:h-[3rem] [&>input]:bg-transparent",
        )}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <CampaignState name={key} value={value}></CampaignState>
    </>
  );
}
