import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Card as RadixCard,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { useState } from "react";
import { Colors, type ColorType } from "../../../domains/colors/colors";
import { getRandomElement } from "../../../domains/utils/random";
import { Graphic } from "../Graphic/Graphic";

export function Card(props: {
  href?: string;
  title: string;
  subtitle?: string;
  menu?: React.ReactNode;
  addColoredBackground?: boolean;
  error?: string;
  children?: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const allColors = Colors.getAccentColors() as any;
  const [randomColor] = useState(() => {
    return getRandomElement<ColorType>(allColors, props.title);
  });
  const firstColor = Colors.getDarkColor(randomColor, 3);
  const secondColor = Colors.getDarkColor(randomColor, 11);

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  return (
    <RadixCard variant="ghost" className="rounded-lg">
      <a
        style={
          {
            // background: !props.addColoredBackground
            //   ? "#000"
            //   : `linear-gradient(45deg, ${firstColor} 0%, ${secondColor} 100%)`,
          }
        }
        className={clsx(
          "relative block overflow-hidden rounded-lg transition-all",
          hover ? "brightness-[115%]" : "",
        )}
        href={props.href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Flex gap="2" align="start" direction={"column"} position={"relative"}>
          <AspectRatio
            ratio={630 / 500}
            className={clsx([
              "[&>img]:h-full",
              "[&>img]:w-full",
              "[&>img]:rounded-lg",
              "[&>img]:object-cover",
            ])}
          >
            <Graphic
              accentColor={randomColor}
              style={{
                width: "250%",
              }}
            />

            {props.children}
          </AspectRatio>

          <Box
            position={"absolute"}
            className="bottom-0 left-0 h-[100%] w-full"
            style={{
              borderRadius: "var(--radius-2)",
              background:
                "linear-gradient(rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0,.2) 65%, rgba(0, 0, 0, .66) 75%, rgba(0, 0, 0, 1) 100%)",
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
                <Flex gap="2" align="end">
                  {props.error && (
                    <Badge size="2" color="red">
                      {props.error}
                    </Badge>
                  )}
                  <Text as="div" size="6" weight="bold" truncate>
                    {props.title}
                  </Text>
                </Flex>

                {props.subtitle && (
                  <Text as="div" size="5" color="gray" truncate>
                    {props.subtitle}
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
