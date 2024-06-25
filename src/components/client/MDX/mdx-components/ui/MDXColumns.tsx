import { Grid } from "@radix-ui/themes";
import { z } from "zod";
import { parseProps } from "../../../../../domains/utils/parseProps";

const propsSchema = z.object({
  cols: z.number().default(2),
  children: z.any().optional(),
});

export type Props = z.input<typeof propsSchema>;

export function MDXColumns(p: Props) {
  const props = parseProps({
    props: p,
    schema: propsSchema,
    componentName: "MDXColumns",
  });

  return (
    <Grid
      data-mdx-type="columns"
      columns={{ initial: "1", md: props.cols.toString() }}
      gap="4"
      width="auto"
    >
      {props.children}
    </Grid>
  );
}
