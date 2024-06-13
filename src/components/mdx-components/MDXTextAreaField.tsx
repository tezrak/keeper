import { Flex, Text, TextArea } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  name: z.string(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextAreaField(p: Props) {
  const props = propsSchema.parse(p);
  return (
    <Flex gap="1" direction={"column"} className="w-full">
      {props.children && (
        <Text as="label" color="gray">
          {props.children}:
        </Text>
      )}
      <TextArea
        size="3"
        placeholder="..."
        variant="soft"
        name={props.name}
        autoComplete="off"
        resize="vertical"
      />
    </Flex>
  );
}
