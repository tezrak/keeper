import { Flex, Text, TextField } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  name: z.string(),
  min: z.number().optional(),
  max: z.number().optional(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXNumberField(p: Props) {
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
        variant="soft"
        name={props.name}
        autoComplete="off"
        type="number"
        min={props.min}
        max={props.max}
        placeholder="0"
        className="w-full text-center text-[1.25rem] [&>input]:indent-0 [&>input]:font-semibold"
      ></TextField.Root>
    </Flex>
  );
}
