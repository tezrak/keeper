import { Text } from "@radix-ui/themes";
import clsx from "clsx";
import { z } from "zod";
import { TEXT_CLASSES } from "../MDX";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXDetail(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Text as="span" color="gray" className={clsx("w-full", TEXT_CLASSES)}>
      {props.children}
    </Text>
  );
}
