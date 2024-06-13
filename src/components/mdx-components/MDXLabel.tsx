import { Text } from "@radix-ui/themes";
import clsx from "clsx";
import { z } from "zod";

const propsSchema = z.object({
  fullWidth: z.boolean().optional(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXLabel(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Text
      size={"5"}
      weight={"bold"}
      className={clsx("text-[--accent-9]", {
        "w-full": props.fullWidth,
      })}
    >
      {props.children}
    </Text>
  );
}
