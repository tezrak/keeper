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
import { MDCheckboxField } from "./mdx-components/MDXCheckboxField";
import { MDXColumns } from "./mdx-components/MDXColumns";
import { MDXHeading } from "./mdx-components/MDXHeading";
import { MDXLabel } from "./mdx-components/MDXLabel";
import { MDXList } from "./mdx-components/MDXList";
import { MDXNumberField } from "./mdx-components/MDXNumberField";
import { MDXRow } from "./mdx-components/MDXRow";
import { MDXSelectField } from "./mdx-components/MDXSelectField";
import { MDXStack } from "./mdx-components/MDXStack";
import { MDXTextAreaField } from "./mdx-components/MDXTextAreaField";
import { MDXTextField } from "./mdx-components/MDXTextField";

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
      return <Heading {...props} as="h1" size={"9"} />;
    },
    h2: (props: any) => {
      return <Heading {...props} as="h2" size={"8"} />;
    },
    h3: (props: any) => {
      return <Heading {...props} as="h3" size={"7"} />;
    },
    h4: (props: any) => {
      return <Heading {...props} as="h4" size={"6"} />;
    },
    h5: (props: any) => {
      return <Heading {...props} as="h5" size={"5"} />;
    },
    h6: (props: any) => {
      return <Heading {...props} as="h6" size={"4"} />;
    },
    a: (props: any) => {
      return (
        <Link
          {...props}
          weight={"medium"}
          underline="always"
          className={clsx(props.className, textClasses)}
        />
      );
    },
    blockquote: (props: any) => {
      return <Blockquote {...props} />;
    },
    em: (props: any) => {
      return <Em {...props} className={clsx(props.className, textClasses)} />;
    },
    strong: (props: any) => {
      return (
        <Strong {...props} className={clsx(props.className, textClasses)} />
      );
    },
    pre: (props: any) => {
      return (
        <pre {...props} className={clsx(props.className, "p-2", textClasses)} />
      );
    },
    code: (props: any) => {
      return <code {...props} className={clsx(props.className, textClasses)} />;
    },
    p: (props: any) => {
      return (
        <Text
          {...props}
          as="span"
          size={"5"}
          className={clsx(props.className, textClasses)}
        />
      );
    },
    Row: MDXRow,
    Columns: MDXColumns,
    Stack: MDXStack,
    Heading: MDXHeading,
    Label: MDXLabel,
    List: MDXList,
    TextField: MDXTextField,
    TextAreaField: MDXTextAreaField,
    SelectField: MDXSelectField,
    CheckboxField: MDCheckboxField,
    NumberField: MDXNumberField,
  };
}
