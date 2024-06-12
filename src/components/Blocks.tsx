import clsx from "clsx";

export const Blocks = {
  Container(props: { className?: string; children: React.ReactNode }) {
    return (
      <div className={clsx("container mx-auto", props.className)}>
        {props.children}
      </div>
    );
  },
  Stack(props: {
    className?: string;
    spacing: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
  }) {
    const { spacing } = props;
    return (
      <div
        className={clsx(
          `flex flex-col`,
          { "space-y-1": spacing === 1 },
          { "space-y-2": spacing === 2 },
          { "space-y-3": spacing === 3 },
          { "space-y-4": spacing === 4 },
          { "space-y-5": spacing === 5 },
          { "space-y-6": spacing === 6 },
          props.className,
        )}
      >
        {props.children}
      </div>
    );
  },
  Prose(props: { children: React.ReactNode; className?: string }) {
    return (
      <div className={clsx("prose prose-invert xl:prose-lg", props.className)}>
        {props.children}
      </div>
    );
  },
};
