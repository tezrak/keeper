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
import { getRandomElement } from "../../../domains/random";
import { Graphic } from "../Graphic/Graphic";

const colors = [
  [amberDark.amber3, amberDark.amber11],
  [blueDark.blue3, blueDark.blue11],
  [bronzeDark.bronze3, bronzeDark.bronze11],
  [brownDark.brown3, brownDark.brown11],
  [crimsonDark.crimson3, crimsonDark.crimson11],
  [cyanDark.cyan3, cyanDark.cyan11],
  [goldDark.gold3, goldDark.gold11],
  [grassDark.grass3, grassDark.grass11],
  [grayDark.gray3, grayDark.gray11],
  [greenDark.green3, greenDark.green11],
  [indigoDark.indigo3, indigoDark.indigo11],
  [irisDark.iris3, irisDark.iris11],
  [jadeDark.jade3, jadeDark.jade11],
  [limeDark.lime3, limeDark.lime11],
  [mauveDark.mauve3, mauveDark.mauve11],
  [mintDark.mint3, mintDark.mint11],
  [oliveDark.olive3, oliveDark.olive11],
  [orangeDark.orange3, orangeDark.orange11],
  [pinkDark.pink3, pinkDark.pink11],
  [plumDark.plum3, plumDark.plum11],
  [purpleDark.purple3, purpleDark.purple11],
  [redDark.red3, redDark.red11],
  [rubyDark.ruby3, rubyDark.ruby11],
  [sageDark.sage3, sageDark.sage11],
  [sandDark.sand3, sandDark.sand11],
  [skyDark.sky3, skyDark.sky11],
  [slateDark.slate3, slateDark.slate11],
  [tealDark.teal3, tealDark.teal11],
  [tomatoDark.tomato3, tomatoDark.tomato11],
  [violetDark.violet3, violetDark.violet11],
  [yellowDark.yellow3, yellowDark.yellow11],
];

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
    return getRandomElement(colors, props.title);
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
            ratio={6 / 4}
            className={clsx([
              "[&>img]:h-full",
              "[&>img]:w-full",
              "[&>img]:rounded-lg",
              "[&>img]:object-cover",
            ])}
          >
            <Graphic asBackground={false} />

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
