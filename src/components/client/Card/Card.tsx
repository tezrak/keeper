import {
  amberDark,
  blueDark,
  bronzeDark,
  brownDark,
  crimsonDark,
  cyanDark,
  goldDark,
  grassDark,
  grayDark,
  greenDark,
  indigoDark,
  irisDark,
  jadeDark,
  limeDark,
  mauveDark,
  mintDark,
  oliveDark,
  orangeDark,
  pinkDark,
  plumDark,
  purpleDark,
  redDark,
  rubyDark,
  sageDark,
  sandDark,
  skyDark,
  slateDark,
  tealDark,
  tomatoDark,
  violetDark,
  yellowDark,
} from "@radix-ui/colors";
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

const colors = [
  [amberDark.amber4, amberDark.amber9],
  [blueDark.blue4, blueDark.blue9],
  [bronzeDark.bronze4, bronzeDark.bronze9],
  [brownDark.brown4, brownDark.brown9],
  [crimsonDark.crimson4, crimsonDark.crimson9],
  [cyanDark.cyan4, cyanDark.cyan9],
  [goldDark.gold4, goldDark.gold9],
  [grassDark.grass4, grassDark.grass9],
  [grayDark.gray4, grayDark.gray9],
  [greenDark.green4, greenDark.green9],
  [indigoDark.indigo4, indigoDark.indigo9],
  [irisDark.iris4, irisDark.iris9],
  [jadeDark.jade4, jadeDark.jade9],
  [limeDark.lime4, limeDark.lime9],
  [mauveDark.mauve4, mauveDark.mauve9],
  [mintDark.mint4, mintDark.mint9],
  [oliveDark.olive4, oliveDark.olive9],
  [orangeDark.orange4, orangeDark.orange9],
  [pinkDark.pink4, pinkDark.pink9],
  [plumDark.plum4, plumDark.plum9],
  [purpleDark.purple4, purpleDark.purple9],
  [redDark.red4, redDark.red9],
  [rubyDark.ruby4, rubyDark.ruby9],
  [sageDark.sage4, sageDark.sage9],
  [sandDark.sand4, sandDark.sand9],
  [skyDark.sky4, skyDark.sky9],
  [slateDark.slate4, slateDark.slate9],
  [tealDark.teal4, tealDark.teal9],
  [tomatoDark.tomato4, tomatoDark.tomato9],
  [violetDark.violet4, violetDark.violet9],
  [yellowDark.yellow4, yellowDark.yellow9],
] as const;

export function Card(props: {
  href: string;
  title: string;
  subtitle?: string;
  menu?: React.ReactNode;
  addColoredBackground?: boolean;
  children?: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const [randomGradient] = useState(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  });
  const [firstColor, secondColor] = randomGradient;

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  return (
    <RadixCard variant="ghost" className="rounded-lg">
      <a
        style={{
          background: !props.addColoredBackground
            ? "#000"
            : `linear-gradient(45deg, ${firstColor} 0%, ${secondColor} 100%)`,
        }}
        className="block rounded-lg"
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
