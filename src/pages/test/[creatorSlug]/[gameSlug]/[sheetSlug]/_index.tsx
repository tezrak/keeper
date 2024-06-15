import { evaluateSync } from "@mdx-js/mdx";
import type { CollectionEntry } from "astro:content";
import type { ThemeType } from "../../../../../domains/getTheme";

import { Heading, Theme } from "@radix-ui/themes";
import * as runtime from "react/jsx-runtime";
import {
  MDXWrapper,
  getMdxComponents,
} from "../../../../../components/client/MDX/MDX";

export function SheetTestPage(props: {
  game: CollectionEntry<"games">;
  creator: CollectionEntry<"creators">;
  sheet: CollectionEntry<"library">;
  theme: ThemeType;
}) {
  const res = evaluateSync(props.sheet.body, runtime as any);
  const MDXContent = res.default;

  return (
    <Theme {...props.theme} hasBackground={false}>
      <MDXWrapper>
        <Heading size="9" align={"center"} mb="9">
          {props.sheet.data.name}
        </Heading>
        {MDXContent && (
          <MDXContent
            components={{
              ...getMdxComponents(),
            }}
          />
        )}
      </MDXWrapper>
    </Theme>
  );
}
