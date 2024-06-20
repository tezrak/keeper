import {
  Blockquote,
  Em,
  Flex,
  Heading,
  Link,
  Strong,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import type React from "react";
import { MDXCheckboxField } from "./mdx-components/state/MDXCheckboxField";
import { MDXList } from "./mdx-components/state/MDXList";
import { MDXNumberField } from "./mdx-components/state/MDXNumberField";
import { MDXSelectField } from "./mdx-components/state/MDXSelectField";
import { MDXTextAreaField } from "./mdx-components/state/MDXTextAreaField";
import { MDXTextField } from "./mdx-components/state/MDXTextField";
import { MDXTracker } from "./mdx-components/state/MDXTracker";
import { MDXBox } from "./mdx-components/ui/MDXBox";
import { MDXColumns } from "./mdx-components/ui/MDXColumns";
import { MDXDetail } from "./mdx-components/ui/MDXDetail";
import { MDXDivider } from "./mdx-components/ui/MDXDivider";
import { MDXHeading } from "./mdx-components/ui/MDXHeading";
import { MDXLabel } from "./mdx-components/ui/MDXLabel";
import { MDXRow } from "./mdx-components/ui/MDXRow";
import { MDXStack } from "./mdx-components/ui/MDXStack";

export const TEXT_CLASSES = "text-[1.2rem] leading-[1.5em] tracking-normal";

export function MDXWrapper(props: { children: React.ReactNode }) {
  return (
    <Flex gap="3" direction="column">
      {props.children}
    </Flex>
  );
}
export function getMdxComponents() {
  return {
    h1: (props: any) => {
      return <Heading data-mdx-type="h1" {...props} as="h1" size={"9"} />;
    },
    h2: (props: any) => {
      return (
        <Heading
          data-mdx-type="h2"
          {...props}
          as="h2"
          size={"8"}
          className="mt-4"
        />
      );
    },
    h3: (props: any) => {
      return <Heading data-mdx-type="h3" {...props} as="h3" size={"7"} />;
    },
    h4: (props: any) => {
      return <Heading data-mdx-type="h4" {...props} as="h4" size={"6"} />;
    },
    h5: (props: any) => {
      return <Heading data-mdx-type="h5" {...props} as="h5" size={"5"} />;
    },
    h6: (props: any) => {
      return <Heading data-mdx-type="h6" {...props} as="h6" size={"4"} />;
    },
    a: (props: any) => {
      return (
        <Link
          data-mdx-type="a"
          {...props}
          weight={"medium"}
          underline="always"
          className={clsx(props.className, TEXT_CLASSES)}
        />
      );
    },
    blockquote: (props: any) => {
      return <Blockquote data-mdx-type="blockquote" {...props} />;
    },
    em: (props: any) => {
      return (
        <Em
          data-mdx-type="em"
          {...props}
          className={clsx(props.className, TEXT_CLASSES)}
        />
      );
    },
    strong: (props: any) => {
      return (
        <Strong
          data-mdx-type="strong"
          {...props}
          className={clsx(props.className, TEXT_CLASSES)}
        />
      );
    },
    pre: (props: any) => {
      return (
        <pre
          data-mdx-type="pre"
          {...props}
          className={clsx(props.className, "p-2", TEXT_CLASSES)}
        />
      );
    },
    ul: (props: any) => {
      return (
        <ul
          data-mdx-type="ul"
          {...props}
          className={clsx(props.className, "list-disc")}
        />
      );
    },
    ol: (props: any) => {
      return (
        <ol
          data-mdx-type="ol"
          {...props}
          className={clsx(props.className, "list-decimal")}
        />
      );
    },
    li: (props: any) => {
      return (
        <li
          data-mdx-type="li"
          {...props}
          className={clsx(props.className, "ml-4")}
        />
      );
    },
    code: (props: any) => {
      return (
        <code
          data-mdx-type="code"
          {...props}
          className={clsx(props.className, TEXT_CLASSES)}
        />
      );
    },
    p: (props: any) => {
      return (
        <Text
          data-mdx-type="p"
          {...props}
          as="span"
          size={""}
          className={clsx(props.className, TEXT_CLASSES)}
        />
      );
    },
    hr: MDXDivider,
    Divider: MDXDivider,
    Row: MDXRow,
    Columns: MDXColumns,
    Box: MDXBox,
    Stack: MDXStack,
    Heading: MDXHeading,
    Label: MDXLabel,
    List: MDXList,
    TextField: MDXTextField,
    TextAreaField: MDXTextAreaField,
    SelectField: MDXSelectField,
    CheckboxField: MDXCheckboxField,
    NumberField: MDXNumberField,
    Detail: MDXDetail,
    Tracker: MDXTracker,
  };
}
