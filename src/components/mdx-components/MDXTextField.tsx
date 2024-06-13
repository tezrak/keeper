import { Flex, Text, TextField } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  name: z.string(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextField(p: Props) {
  const props = propsSchema.parse(p);
  return (
    <Flex gap="1" direction={"column"} className="w-full">
      {props.children && (
        <Text as="label" color="gray">
          {props.children}:
        </Text>
      )}
      <TextField.Root
        size="3"
        placeholder="..."
        variant="soft"
        name={props.name}
        autoComplete="off"
      />
    </Flex>
  );
}
