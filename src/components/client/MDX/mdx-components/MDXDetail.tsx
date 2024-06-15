import { Text } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXDetail(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Text as="span" color="gray" className="w-full">
      {props.children}
    </Text>
  );
}
