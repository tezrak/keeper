import { Flex, TextField, Tooltip } from "@radix-ui/themes";
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
  children: z.any().optional(),
  tooltip: z.string().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTextField(p: Props) {
  const props = propsSchema.parse(p);
  const name = useName({ name: props.name });
  const campaignManager = useContext(CampaignContext);
  const [value, setValue] = useState(() => {
    return campaignManager.getCurrentFormValue({ name: name }) || "";
  });

  return (
    <Flex
      gap="1"
      direction={"column"}
      className="w-full"
      data-mdx-type="text-field"
    >
      <ConditionalWrapper
        wrapWhen={!!props.tooltip}
        wrapper={(children) => (
          <Tooltip content={props.tooltip}>{children}</Tooltip>
        )}
      >
        <TextField.Root
          size="3"
          color="gray"
          variant="soft"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
      </ConditionalWrapper>

      {props.children && (
        <Flex>
          <MDXDetail>{props.children}</MDXDetail>
        </Flex>
      )}
      <CampaignState name={name} value={value}></CampaignState>
    </Flex>
  );
}
