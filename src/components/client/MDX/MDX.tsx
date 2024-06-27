import {
  Blockquote,
  Card,
  Em,
  Flex,
  Heading,
  Link,
  Strong,
  Table,
  Text,
  type HeadingProps,
} from "@radix-ui/themes";
import clsx from "clsx";
import type React from "react";
import { MDXCheckboxField } from "./mdx-components/state/MDXCheckboxField";
import { MDXList } from "./mdx-components/state/MDXList";
import { MDXNumberField } from "./mdx-components/state/MDXNumberField";
import { MDXRollingTable } from "./mdx-components/state/MDXRollingTable";
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

export function getMdxComponents(arg: { allowH1s?: boolean } = {}) {
  const allowH1s = arg.allowH1s ?? false;
  return {
    h1: allowH1s ? MDXH1 : MDXH2,
    h2: allowH1s ? MDXH2 : MDXH3,
    h3: allowH1s ? MDXH3 : MDXH4,
    h4: allowH1s ? MDXH4 : MDXH5,
    h5: allowH1s ? MDXH5 : MDXH6,
    h6: allowH1s ? MDXH6 : MDXH6,
    a: MDXA,
    blockquote: MDXBlockquote,
    em: MDXEm,
    strong: MDXStrong,
    pre: MDXPre,
    ul: MDXUl,
    ol: MDXOl,
    li: MDXLi,
    code: MDXCode,
    p: MDXP,
    table: MDXTable,
    thead: MDXTHead,
    tbody: MDXTBody,
    tr: MDXTr,
    th: MDXTh,
    td: MDXTd,
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
    RollingTable: MDXRollingTable,
  };
}

export function MDXH1(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h1"
      as="h1"
      size={{
        initial: "8",
        sm: "9",
      }}
      {...props}
      className={clsx("", props.className)}
    />
  );
}

export function MDXH2(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h2"
      as="h2"
      size={{
        initial: "7",
        sm: "8",
      }}
      {...props}
      className={clsx("mt-4", props.className)}
    />
  );
}

export function MDXH3(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h3"
      as="h3"
      size={{
        initial: "6",
        sm: "7",
      }}
      {...props}
    />
  );
}

export function MDXH4(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h4"
      as="h4"
      size={{
        initial: "5",
        sm: "6",
      }}
      {...props}
    />
  );
}

export function MDXH5(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h5"
      as="h5"
      size={{
        initial: "4",
        sm: "5",
      }}
      {...props}
    />
  );
}

export function MDXH6(props: HeadingProps) {
  return (
    <Heading
      data-mdx-type="h6"
      as="h6"
      size={{
        initial: "3",
        sm: "4",
      }}
      {...props}
    />
  );
}

export function MDXA(props: any) {
  return (
    <Link
      data-mdx-type="a"
      weight={"medium"}
      underline="always"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

export function MDXBlockquote(props: any) {
  return <Blockquote data-mdx-type="blockquote" {...props} />;
}

export function MDXEm(props: any) {
  return (
    <Em
      data-mdx-type="em"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

export function MDXStrong(props: any) {
  return (
    <Strong
      data-mdx-type="strong"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

export function MDXPre(props: any) {
  return (
    <Card>
      <pre
        data-mdx-type="pre"
        {...props}
        className={clsx(
          props.className,
          "p-2",
          TEXT_CLASSES,
          "whitespace-pre-wrap",
        )}
      />
    </Card>
  );
}

export function MDXUl(props: any) {
  return (
    <ul
      data-mdx-type="ul"
      {...props}
      className={clsx(props.className, "list-disc")}
    />
  );
}

export function MDXOl(props: any) {
  return (
    <ol
      data-mdx-type="ol"
      {...props}
      className={clsx(props.className, "list-decimal")}
    />
  );
}

export function MDXLi(props: any) {
  return (
    <li
      data-mdx-type="li"
      {...props}
      className={clsx(props.className, "ml-4")}
    />
  );
}

export function MDXCode(props: any) {
  return (
    <code
      data-mdx-type="code"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

export function MDXP(props: any) {
  return (
    <Text
      data-mdx-type="p"
      {...props}
      as="span"
      size={""}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

export function MDXTable(props: any) {
  return <Table.Root data-mdx-type="table" variant="surface" {...props} />;
}

export function MDXTHead(props: any) {
  return <Table.Header data-mdx-type="thead" {...props} />;
}

export function MDXTBody(props: any) {
  return <Table.Body data-mdx-type="tbody" {...props} />;
}

export function MDXTr(props: any) {
  return <Table.Row data-mdx-type="tr" {...props} />;
}

export function MDXTh(props: any) {
  return <Table.ColumnHeaderCell data-mdx-type="th" {...props} />;
}

export function MDXTd(props: any) {
  return <Table.Cell data-mdx-type="td" {...props} />;
}
