import { Flex, Select, Tooltip } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  name: z.string(),
  defaultValue: z.string().optional(),
  options: z.array(z.string()),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXSelectField(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Tooltip content={props.children}>
      <Flex gap="1" direction={"column"} className="w-full">
        <Select.Root defaultValue={props.defaultValue}>
          <Select.Trigger className="text-[1.25rem]"></Select.Trigger>
          <Select.Content>
            {props.options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="text-[1.25rem]"
              >
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Tooltip>
  );
}
