import { Flex, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { MDXDetail } from "./MDXDetail";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  min: z.number().optional(),
  max: z.number().optional(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXNumberField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });
  return (
    <Flex
      gap="1"
      direction={"column"}
      className="w-full"
      data-mdx-type="number-field"
    >
      <TextField.Root
        size="3"
        variant="soft"
        name={name}
        autoComplete="off"
        type="number"
        min={props.min}
        max={props.max}
        placeholder="0"
        className="w-full text-center text-[1.25rem] [&>input]:indent-0 [&>input]:font-semibold"
      ></TextField.Root>
      {props.children && (
        <Flex>
          <MDXDetail>{props.children}</MDXDetail>
        </Flex>
      )}
    </Flex>
  );
}
