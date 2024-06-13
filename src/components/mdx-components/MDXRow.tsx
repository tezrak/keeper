import { Flex } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXRow(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Flex gap="4" width={"100%"} align={"center"} data-mdx-type="row">
      {props.children}
    </Flex>
  );
}
