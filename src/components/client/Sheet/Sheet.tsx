import { evaluate } from "@mdx-js/mdx";
import { Badge, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { getLogger } from "../../../domains/getLogger";
import type { SheetType } from "../../../pages/play/[creatorSlug]/[gameSlug]/index.astro";
import { MDXWrapper, getMdxComponents } from "../MDX/MDX";

const logger = getLogger("Sheet");

export function Sheet(props: { sheet: SheetType }) {
  const [MDXContent, setMDXContent] =
    useState<Awaited<ReturnType<typeof evaluate>>["default"]>();

  useEffect(() => {
    main();
    async function main() {
      try {
        const res = await evaluate(props.sheet.body, runtime as any);
        setMDXContent(() => res.default);
      } catch (error) {
        logger.error("Failed to evaluate MDX", { error });
      }
    }
  }, []);

  return (
    <MDXWrapper>
      <Flex align={"center"} justify={"end"}>
        <Badge size="3" mb="4" className="">
          {props.sheet.data.name} {props.sheet.data.version}
        </Badge>
      </Flex>
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
