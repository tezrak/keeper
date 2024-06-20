import { evaluate } from "@mdx-js/mdx";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import {
  MDXWrapper,
  getMdxComponents,
} from "../../../../../components/client/MDX/MDX";
import { getLogger } from "../../../../../domains/utils/getLogger";

const logger = getLogger("Sheet");

export function GameAsset(props: {
  id: string | undefined;
  asset: CollectionEntry<"assets">;
}) {
  const keyToForceRerenderOnAssetChange = props.id;
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
  }, [props.id, props.asset.id]);

  return (
    <MDXWrapper key={keyToForceRerenderOnAssetChange}>
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
