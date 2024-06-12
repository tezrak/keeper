import { Flex, Text } from "@radix-ui/themes";
import type React from "react";

export function MDX(props: { children: React.ReactNode }) {
  return (
    <Flex gap="3" direction="column">
      {props.children}
    </Flex>
  );
}
export function getMdxComponents() {
  return {
    p: (props: any) => {
      return <Text {...props} as="span" size={"5"} />;
    },
  };
}
