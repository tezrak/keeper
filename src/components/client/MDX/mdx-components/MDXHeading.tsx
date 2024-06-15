import { Heading } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXHeading(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Heading data-mdx-type="heading" size={"7"} weight={"bold"}>
      {props.children}
    </Heading>
  );
}
