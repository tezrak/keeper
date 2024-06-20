import { CircleIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";
import { useName } from "./MDXList";

const propsSchema = z.object({
  name: z.string(),
  min: z.number().optional().default(1),
  max: z.number().optional(),
  asClock: z.boolean().optional(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXTracker(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXTracker",
  });
  const name = useName({ name: props.name });

  const numberOfBoxes = props.min;

  return (
    <Text data-mdx-type="text-field" as="label" size="2">
      <Flex gap="2">
        {Array.from({ length: numberOfBoxes }, (_, i) => {
          return (
            <Box key={i}>
              <IconButton color="gray" variant="soft" key={i}>
                <CircleIcon width={"1.5rem"} height={"1.5rem"} />
              </IconButton>
            </Box>
          );
        })}
      </Flex>
    </Text>
  );
}
