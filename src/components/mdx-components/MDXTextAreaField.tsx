import { Flex, Text, TextArea } from "@radix-ui/themes";
import { z } from "zod";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextAreaField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });

  return (
    <Flex
      gap="1"
      direction={"column"}
      className="w-full"
      data-mdx-type="text-area-field"
    >
      <TextArea
        size="3"
        placeholder="..."
        variant="soft"
        name={name}
        autoComplete="off"
        resize="vertical"
      />
      <Flex align={"end"}>
        {props.children && (
          <Text as="label" color="gray" className="w-full">
            {props.children}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
