import { z } from "zod";

const propsSchema = z.object({});

export type Props = z.infer<typeof propsSchema>;

export function MDXDivider(p: Props) {
  const props = propsSchema.parse(p);
  return <hr data-mdx-type="divider" className="my-4 border-[--accent-5]"></hr>;
}
