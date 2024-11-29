import { Flex } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  align: z
    .enum(["start", "center", "end", "baseline", "stretch"])
    .optional()
    .default("start"),
  justify: z
    .enum(["start", "center", "end", "between"])
    .optional()
    .default("start"),

  children: z.any().optional(),
});

type Props = z.input<typeof propsSchema>;

export function MDXStack(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXStack",
  });

  return (
    <Flex
      data-mdx-type="stack"
      direction={"column"}
      gap="2"
      width="100%"
      align={props.align}
      justify={props.justify}
    >
      {props.children}
    </Flex>
  );
}
