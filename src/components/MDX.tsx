import {
  Blockquote,
  Box,
  Em,
  Flex,
  Grid,
  Heading,
  Link,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import clsx from "clsx";
import type React from "react";
import { z } from "zod";

export function MDX(props: { children: React.ReactNode }) {
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
    Row: (props: { children: React.ReactNode }) => {
      return <Flex gap="4">{props.children}</Flex>;
    },
    Columns: (props: { children: React.ReactNode }) => {
      const parsed = z
        .object({
          children: z.any().optional(),
        })
        .parse(props);
      return (
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          {parsed.children}
        </Grid>
      );
    },
    Column: (props: { children: React.ReactNode }) => {
      const parsed = z
        .object({
          children: z.any().optional(),
        })
        .parse(props);
      return <Box>{parsed.children}</Box>;
    },
    Heading: (props: {}) => {
      return <Box>Heading</Box>;
    },
    Label: (props: {}) => {
      return <Box>Label</Box>;
    },
    List: (props: {}) => {
      return <Box>List</Box>;
    },
    TextField: (props: {}) => {
      const parsed = z
        .object({
          name: z.string(),
          children: z.any().optional(),
        })
        .parse(props);
      return (
        <Flex gap="1" direction={"column"}>
          {parsed.children && (
            <Text as="label" color="gray">
              {parsed.children}:
            </Text>
          )}
          <TextField.Root size="3" variant="soft" name={parsed.name} />
        </Flex>
      );
    },
    TextAreaField: (props: {}) => {
      const parsed = z
        .object({
          name: z.string(),
        })
        .parse(props);
      return <Box>TextAreaField</Box>;
    },
    DieField: (props: {}) => {
      return <Box>DieField</Box>;
    },
    CheckboxField: (props: {}) => {
      return <Box>CheckboxField</Box>;
    },
    NumberField: (props: {}) => {
      return <Box>NumberField</Box>;
    },
  };
}
