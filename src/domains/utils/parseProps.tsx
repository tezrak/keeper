import type { z } from "zod";
import { getLogger } from "./getLogger";

export function parseProps<TSchema extends z.ZodType>(arg: {
  componentName: string;
  schema: TSchema;
  props: z.input<TSchema>;
}): z.infer<TSchema> {
  const logger = getLogger(`${arg.componentName}.parseProps`);
  const props = arg.schema.safeParse(arg.props);

  if (props.success) {
    return props.data as z.infer<TSchema>;
  } else {
    throw logger.error("Invalid props", {
      format: props.error.format(),
      error: props.error,
    });
  }
}
