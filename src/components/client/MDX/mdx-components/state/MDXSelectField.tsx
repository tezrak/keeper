import { Flex, Select, Tooltip } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { z } from "zod";
import {
  CampaignContext,
  CampaignState,
} from "../../../../../domains/campaign/useCampaign";
import { ConditionalWrapper } from "../../../ConditionalWrapper/ConditionalWrapper";
import { MDXDetail } from "../ui/MDXDetail";
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
  const [value, setValue] = useState(() => {
    return campaignManager.getCurrentFormValue({ name: name }) || "";
  });

  return (
    <Flex
      data-mdx-type="select-field"
      gap="1"
      direction={"column"}
      className="w-full"
    >
      <Select.Root
        defaultValue={props.defaultValue}
        size="3"
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      >
        <ConditionalWrapper
          wrapWhen={!!props.tooltip}
          wrapper={(children) => (
            <Tooltip content={props.tooltip}>{children}</Tooltip>
          )}
        >
          <Select.Trigger variant="soft" color="gray"></Select.Trigger>
        </ConditionalWrapper>

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

      <CampaignState name={name} value={value}></CampaignState>
    </Flex>
  );
}
