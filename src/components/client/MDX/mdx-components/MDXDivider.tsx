import { Separator } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({});

export type Props = z.infer<typeof propsSchema>;

export function MDXDivider(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Separator data-mdx-type="divider" size="4" className="my-4"></Separator>
  );
}
