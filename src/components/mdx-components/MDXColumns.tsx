import { Grid } from "@radix-ui/themes";
import { z } from "zod";

const propsSchema = z.object({
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

export function MDXColumns(p: Props) {
  const props = propsSchema.parse(p);

  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap="4"
      width="auto"
      data-mdx-type="columns"
    >
      {props.children}
    </Grid>
  );
}
