import { Flex } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  children: z.any().optional(),
  align: z
    .enum(["start", "center", "end", "baseline", "stretch"])
    .optional()
    .default("center"),
});

type Props = z.input<typeof propsSchema>;

export function MDXRow(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXRow",
  });

  return (
    <Flex data-mdx-type="row" gap="4" width={"100%"} align={props.align}>
      {props.children}
    </Flex>
  );
}
