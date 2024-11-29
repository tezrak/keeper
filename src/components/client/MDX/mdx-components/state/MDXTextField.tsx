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
  placeholder: z.string().optional(),
  children: z.any().optional(),
  tooltip: z.string().optional(),
});

type Props = z.input<typeof propsSchema>;

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
        {props.children && (
          <Flex>
            <MDXDetail>{props.children}</MDXDetail>
          </Flex>
        )}
        <TextField.Root
          size="3"
          color="gray"
          variant="soft"
          value={value}
          placeholder={getDefaultPlaceholder({
            children: props.children,
            placeholder: props.placeholder,
          })}
          disabled={campaignManager.readonly}
          onChange={(e) => {
            if (campaignManager.readonly) {
              return;
            }
            return setValue(e.target.value);
          }}
          autoComplete="off"
        />
      </ConditionalWrapper>

      <CampaignState name={name} value={value}></CampaignState>
    </Flex>
  );
}

export function getDefaultPlaceholder(p: {
  children: string;
  placeholder?: string;
}) {
  if (p.placeholder) {
    return p.placeholder;
  }

  if (p.children) {
    return `${p.children.toString()}...`;
  }

  return "";
}
