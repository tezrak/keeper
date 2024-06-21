import {
  Blockquote,
  Em,
  Flex,
  Heading,
  Link,
  Strong,
  Table,
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

export function getMdxComponents(arg: { bumpOneLevel?: boolean } = {}) {
  return {
    h1: !arg.bumpOneLevel ? MDXH1 : MDXH2,
    h2: !arg.bumpOneLevel ? MDXH2 : MDXH3,
    h3: !arg.bumpOneLevel ? MDXH3 : MDXH4,
    h4: !arg.bumpOneLevel ? MDXH4 : MDXH5,
    h5: !arg.bumpOneLevel ? MDXH5 : MDXH6,
    h6: !arg.bumpOneLevel ? MDXH6 : MDXH6,
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
  };
}

function MDXH1(props: any) {
  return <Heading data-mdx-type="h1" {...props} as="h1" size={"9"} />;
}

function MDXH2(props: any) {
  return (
    <Heading
      data-mdx-type="h2"
      {...props}
      as="h2"
      size={"8"}
      className="mt-4"
    />
  );
}

function MDXH3(props: any) {
  return <Heading data-mdx-type="h3" {...props} as="h3" size={"7"} />;
}

function MDXH4(props: any) {
  return <Heading data-mdx-type="h4" {...props} as="h4" size={"6"} />;
}

function MDXH5(props: any) {
  return <Heading data-mdx-type="h5" {...props} as="h5" size={"5"} />;
}

function MDXH6(props: any) {
  return <Heading data-mdx-type="h6" {...props} as="h6" size={"4"} />;
}

function MDXA(props: any) {
  return (
    <Link
      data-mdx-type="a"
      {...props}
      weight={"medium"}
      underline="always"
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

function MDXBlockquote(props: any) {
  return <Blockquote data-mdx-type="blockquote" {...props} />;
}

function MDXEm(props: any) {
  return (
    <Em
      data-mdx-type="em"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

function MDXStrong(props: any) {
  return (
    <Strong
      data-mdx-type="strong"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

function MDXPre(props: any) {
  return (
    <pre
      data-mdx-type="pre"
      {...props}
      className={clsx(props.className, "p-2", TEXT_CLASSES)}
    />
  );
}

function MDXUl(props: any) {
  return (
    <ul
      data-mdx-type="ul"
      {...props}
      className={clsx(props.className, "list-disc")}
    />
  );
}

function MDXOl(props: any) {
  return (
    <ol
      data-mdx-type="ol"
      {...props}
      className={clsx(props.className, "list-decimal")}
    />
  );
}

function MDXLi(props: any) {
  return (
    <li
      data-mdx-type="li"
      {...props}
      className={clsx(props.className, "ml-4")}
    />
  );
}

function MDXCode(props: any) {
  return (
    <code
      data-mdx-type="code"
      {...props}
      className={clsx(props.className, TEXT_CLASSES)}
    />
  );
}

function MDXP(props: any) {
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

function MDXTable(props: any) {
  return <Table.Root data-mdx-type="table" variant="surface" {...props} />;
}

function MDXTHead(props: any) {
  return <Table.Header data-mdx-type="thead" {...props} />;
}

function MDXTBody(props: any) {
  return <Table.Body data-mdx-type="tbody" {...props} />;
}

function MDXTr(props: any) {
  return <Table.Row data-mdx-type="tr" {...props} />;
}

function MDXTh(props: any) {
  return <Table.ColumnHeaderCell data-mdx-type="th" {...props} />;
}

function MDXTd(props: any) {
  return <Table.Cell data-mdx-type="td" {...props} />;
}
