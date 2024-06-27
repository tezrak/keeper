import { CircleIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { CircleCheckBig } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { CampaignContext } from "../../../../../domains/campaign/useCampaign";
import { parseProps } from "../../../../../domains/utils/parseProps";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  min: z.number().optional().default(1),
  max: z.number().optional(),
  asClock: z.boolean().optional(),
  children: z.any().optional(),
});

export type Props = z.input<typeof propsSchema>;

export function MDXTracker(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXTracker",
  });
  const name = useName({ name: props.name });
  const campaignManager = useContext(CampaignContext);
  const [values, setValues] = useState<Array<boolean>>(() => {
    return campaignManager.getCurrentFormValue({ name: name }) || [];
  });

  useEffect(() => {
    const numberOfMissingItems =
      values.length < props.min ? props.min - values.length : 0;

    for (const _i of Array(numberOfMissingItems).keys()) {
      setValues((prev) => {
        return [...prev, false];
      });
    }
  }, []);

  return (
    <Text data-mdx-type="text-field" as="label" size="2">
      <Flex gap="2">
        {values.map((value, i) => {
          return (
            <Box key={i}>
              <IconButton
                radius="full"
                // color={value ? undefined : "gray"}
                name={name + i.toString()}
                variant={value ? "soft" : "soft"}
                className={clsx(
                  {
                    "bg-[--accent-7]": value,
                    "bg-[--accent-4]": !value,
                  },
                  "hover:bg-[--accent-5]",
                )}
                key={i}
                onClick={() => {
                  if (campaignManager.readonly) {
                    return;
                  }

                  setValues((prev) => {
                    const copy = [...prev];
                    copy[i] = !copy[i];
                    return copy;
                  });
                }}
              >
                <div></div>
                {value ? (
                  <CircleCheckBig
                    width={"1.5rem"}
                    height={"1.5rem"}
                  ></CircleCheckBig>
                ) : (
                  <CircleIcon width={"1.5rem"} height={"1.5rem"} />
                )}
              </IconButton>
            </Box>
          );
        })}
      </Flex>
    </Text>
  );
}
