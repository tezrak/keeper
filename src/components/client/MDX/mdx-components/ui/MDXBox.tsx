import { Box } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.input<typeof propsSchema>;

export function MDXBox(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXBox",
  });

  return <Box data-mdx-type="box">{props.children}</Box>;
}
