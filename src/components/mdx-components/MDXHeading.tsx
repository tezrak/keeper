import { Heading } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXHeading(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Heading
      asChild
      size={"7"}
      weight={"bold"}
      className="mt-2"
      data-mdx-type="heading"
    >
      <span>{props.children}</span>
    </Heading>
  );
}
