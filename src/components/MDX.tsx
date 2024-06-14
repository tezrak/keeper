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
import { MDXBox } from "./mdx-components/MDXBox";
import { MDXCheckboxField } from "./mdx-components/MDXCheckboxField";
import { MDXColumns } from "./mdx-components/MDXColumns";
import { MDXDetail } from "./mdx-components/MDXDetail";
import { MDXDivider } from "./mdx-components/MDXDivider";
import { MDXHeading } from "./mdx-components/MDXHeading";
import { MDXLabel } from "./mdx-components/MDXLabel";
import { MDXList } from "./mdx-components/MDXList";
import { MDXNumberField } from "./mdx-components/MDXNumberField";
import { MDXRow } from "./mdx-components/MDXRow";
import { MDXSelectField } from "./mdx-components/MDXSelectField";
import { MDXStack } from "./mdx-components/MDXStack";
import { MDXTextAreaField } from "./mdx-components/MDXTextAreaField";
import { MDXTextField } from "./mdx-components/MDXTextField";
import { MDXTracker } from "./mdx-components/MDXTracker";

export function MDXWrapper(props: { children: React.ReactNode }) {
  return (
    <Flex gap="3" direction="column">
      {props.children}
    </Flex>
  );
}
export function getMdxComponents() {
  const textClasses = "!text-[1.2rem] !leading-[1.5em] !tracking-normal";

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
          className={clsx(props.className, textClasses)}
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
          className={clsx(props.className, textClasses)}
        />
      );
    },
    strong: (props: any) => {
      return (
        <Strong
          data-mdx-type="strong"
          {...props}
          className={clsx(props.className, textClasses)}
        />
      );
    },
    pre: (props: any) => {
      return (
        <pre
          data-mdx-type="pre"
          {...props}
          className={clsx(props.className, "p-2", textClasses)}
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
          className={clsx(props.className, textClasses)}
        />
      );
    },
    p: (props: any) => {
      return (
        <Text
          data-mdx-type="p"
          {...props}
          as="span"
          size={"5"}
          className={clsx(props.className, textClasses)}
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
