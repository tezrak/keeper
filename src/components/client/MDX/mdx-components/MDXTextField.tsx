import { Flex, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { MDXDetail } from "./MDXDetail";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });
  return (
    <Flex
      gap="1"
      direction={"column"}
      className="w-full"
      data-mdx-type="text-field"
    >
      <TextField.Root
        size="3"
        color="gray"
        placeholder="..."
        variant="soft"
        name={name}
        autoComplete="off"
      />
      <Flex align={"end"}>
        {props.children && <MDXDetail>{props.children}</MDXDetail>}
      </Flex>
    </Flex>
  );
}
