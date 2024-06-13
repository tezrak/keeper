import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button, Card, DropdownMenu, Flex } from "@radix-ui/themes";
import React from "react";
import { z } from "zod";

const propsSchema = z.object({
  min: z.number().optional().default(1),
  max: z.number().optional(),
  children: z.any().optional(),
});

export type Props = z.infer<typeof propsSchema>;

const ListContext = React.createContext<number>(0);

export function useName(props: { name: string }) {
  const listContextValue = React.useContext(ListContext);

  if (listContextValue === undefined) {
    return props.name;
  } else {
    return props.name.replace("#", listContextValue.toString());
  }
}

export function MDXList(p: Props) {
  const props = propsSchema.parse(p);

  const numberOfItems = props.min || 0;

  return (
    <Flex direction={"column"} gap="2" data-mdx-type="list">
      {Array.from({ length: numberOfItems }, (_, i) => {
        return (
          <ListContext.Provider value={i}>
            <Card size="2">
              <Flex gap="4" align={"start"}>
                <Flex flexGrow={"1"}>{props.children}</Flex>
                <Flex>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft" size="2">
                        <HamburgerMenuIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item onClick={() => {}}>
                        Add Below
                      </DropdownMenu.Item>
                      <DropdownMenu.Item color="red" onClick={() => {}}>
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>
              </Flex>
            </Card>
          </ListContext.Provider>
        );
      })}
    </Flex>
  );
}
