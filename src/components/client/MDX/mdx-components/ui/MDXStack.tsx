import { Flex } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXStack(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXStack",
  });

  return (
    <Flex data-mdx-type="stack" direction={"column"} gap="2" width="100%">
      {props.children}
    </Flex>
  );
}
