import { Flex } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXRow(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXRow",
  });

  return (
    <Flex data-mdx-type="row" gap="4" width={"100%"} align={"start"}>
      {props.children}
    </Flex>
  );
}
