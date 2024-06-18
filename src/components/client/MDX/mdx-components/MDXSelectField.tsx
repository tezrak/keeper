import { Flex, Select, Tooltip } from "@radix-ui/themes";
import { useContext } from "react";
import { z } from "zod";
import { CampaignContext } from "../../../../domains/campaign/useCampaign";
import { MDXDetail } from "./MDXDetail";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  defaultValue: z.string().optional(),
  options: z.array(z.string()),
  children: z.any().optional(),
  tooltip: z.string().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXSelectField(p: Props) {
  const props = propsSchema.parse(p);
  const campaignManager = useContext(CampaignContext);
  const name = useName({ name: props.name });

  return (
    <Flex
      data-mdx-type="select-field"
      gap="1"
      direction={"column"}
      className="w-full"
    >
      <Select.Root defaultValue={props.defaultValue} name={name} size="3">
        <Tooltip content={props.tooltip}>
          <Select.Trigger variant="soft" color="gray"></Select.Trigger>
        </Tooltip>
        <Select.Content color="gray">
          {props.options.map((option) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {props.children && (
        <Flex>
          <MDXDetail>{props.children}</MDXDetail>
        </Flex>
      )}
    </Flex>
  );
}
