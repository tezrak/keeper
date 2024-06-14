import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Card as RadixCard,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { useState } from "react";

export function Card(props: {
  href: string;
  title: string;
  subtitle?: string;
  menu?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  return (
    <RadixCard variant="ghost">
      <a
        href={props.href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Flex gap="2" align="start" direction={"column"} position={"relative"}>
          <AspectRatio
            ratio={6 / 4}
            className={clsx([
              "[&>img]:h-full",
              "[&>img]:w-full",
              "[&>img]:rounded-lg",
              "[&>img]:object-cover",
            ])}
          >
            {props.children}
          </AspectRatio>

          <Box
            position={"absolute"}
            className="bottom-0 left-0 h-[50%] w-full"
            style={{
              borderRadius: "var(--radius-2)",
              background:
                "linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .8) 50%, rgba(0, 0, 0, 1) 100%)",
            }}
          />
          <Box position={"absolute"} className="bottom-0 left-0 w-full">
            <Flex
              gap="2"
              justify={"between"}
              width={"100%"}
              className="px-4 py-4"
            >
              <Box className="w-full max-w-[75%]">
                <Text as="div" size="6" weight="bold" truncate>
                  {props.title}
                </Text>
                {props.subtitle && (
                  <Text as="div" size="5" color="gray" truncate>
                    by {props.subtitle}
                  </Text>
                )}
              </Box>
              {props.menu && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button
                      variant={hover ? "solid" : "outline"}
                      className="transition-all duration-75"
                    >
                      <HamburgerMenuIcon />
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>{props.menu}</DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </Flex>
          </Box>
        </Flex>
      </a>
    </RadixCard>
  );
}
