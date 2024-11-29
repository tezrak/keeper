import type { z } from "zod";

export function zodBuild<T extends z.ZodType>(schema: T, data: z.input<T>) {
  return schema.parse(data satisfies z.input<T>);
}

function zodSafeBuild<T extends z.ZodType>(schema: T, data: z.input<T>) {
  return schema.safeParse(data satisfies z.input<T>);
}
