import { Box } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXBox(p: Props) {
  const props = propsSchema.parse(p);

  return <Box data-mdx-type="box">{props.children}</Box>;
}
