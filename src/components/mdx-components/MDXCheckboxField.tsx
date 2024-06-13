import { Checkbox, Flex, Text } from "@radix-ui/themes";
import { z } from "zod";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDCheckboxField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });

  return (
    <Text as="label" size="2" data-mdx-type="text-field">
      <Flex gap="2">
        <Checkbox defaultChecked name={name} />
        {props.children}
      </Flex>
    </Text>
  );
}
