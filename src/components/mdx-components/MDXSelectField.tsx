import { Flex, Select, Tooltip } from "@radix-ui/themes";
import { z } from "zod";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  defaultValue: z.string().optional(),
  options: z.array(z.string()),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXSelectField(p: Props) {
  const props = propsSchema.parse(p);

  const name = useName({ name: props.name });

  return (
    <Tooltip data-mdx-type="select-field" content={props.children}>
      <Flex gap="1" direction={"column"} className="w-full">
        <Select.Root defaultValue={props.defaultValue}>
          <Select.Trigger
            variant="soft"
            color="gray"
            className="h-[40px] text-[1.25rem]"
            name={name}
          ></Select.Trigger>
          <Select.Content color="gray">
            {props.options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="h-[40px] text-[1.25rem]"
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
