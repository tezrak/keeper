import { Flex, TextArea } from "@radix-ui/themes";
import { z } from "zod";
import { MDXDetail } from "./MDXDetail";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  rows: z.number().optional().default(3),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextAreaField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });

  return (
    <Flex
      data-mdx-type="text-area-field"
      gap="1"
      direction={"column"}
      className="w-full"
    >
      <TextArea
        size="3"
        placeholder="..."
        variant="soft"
        name={name}
        color="gray"
        rows={props.rows}
        autoComplete="off"
        resize="vertical"
      />
      <Flex align={"end"}>
        {props.children && <MDXDetail>{props.children}</MDXDetail>}
      </Flex>
    </Flex>
  );
}
