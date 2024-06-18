import { Flex, TextArea, Tooltip } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { z } from "zod";
import {
  CampaignContext,
  CampaignState,
} from "../../../../domains/campaign/useCampaign";
import { MDXDetail } from "./MDXDetail";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  rows: z.number().optional().default(3),
  children: z.any().optional(),
  tooltip: z.string().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextAreaField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });
  const campaignManager = useContext(CampaignContext);
  const [value, setValue] = useState(() => {
    return campaignManager.getCurrentFormValue({ name: props.name }) || "";
  });

  return (
    <Flex
      data-mdx-type="text-area-field"
      gap="1"
      direction={"column"}
      className="w-full"
    >
      <Tooltip content={props.tooltip}>
        <TextArea
          size="3"
          variant="soft"
          name={name}
          color="gray"
          rows={props.rows}
          autoComplete="off"
          resize="vertical"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Tooltip>
      {props.children && (
        <Flex>
          <MDXDetail>{props.children}</MDXDetail>
        </Flex>
      )}
      <CampaignState name={name} value={value}></CampaignState>
    </Flex>
  );
}
