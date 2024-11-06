import {
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  ReaderIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Grid,
  Link,
  Theme,
  VisuallyHidden,
} from "@radix-ui/themes";
import confetti from "canvas-confetti";
import { PartyPopperIcon, SquareLibrary, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AppUrl } from "../../../domains/app-url/AppUrl";
import type { ThemeType } from "../../../domains/utils/getTheme";
import { wait } from "../../../domains/utils/wait";
import { DiceRoller } from "../../client/DiceRoller/DiceRoller";
import { getSurfaceStyle } from "../../client/Surface/getSurfaceStyle";
import { NameLogo } from "./Logo";

const fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI (Custom)', Roboto, 'Helvetica Neue', 'Open Sans (Custom)', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

export function Header(props: { theme?: ThemeType }) {
  const [open, setOpen] = useState(false);

  function handleThemeButtonClick() {
    const element = document.documentElement;
    element.classList.toggle("dark");
    element.classList.toggle("light");

    const isDark = element.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  useEffect(() => {
    // get theme
    let theme = undefined;
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      theme = localStorage.getItem("theme");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "dark";
      } else {
        theme = "light";
      }
    }
    // update html + localStorage
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    window.localStorage.setItem("theme", theme as any);

    document.addEventListener("astro:after-swap", handleAstroNavigation);

    return () => {
      document.removeEventListener("astro:after-swap", handleAstroNavigation);
    };

    function handleAstroNavigation() {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.toggle("dark", true);
        document.documentElement.classList.toggle("light", true);
      }
    }
  }, []);

  return (
    <Theme {...props.theme} hasBackground={false} className="min-h-0">
      <Grid
        justify={"between"}
        align={"center"}
        columns="3"
        className="my-9 items-center rounded-[--radius-2] border-b border-l border-r border-t border-[--accent-4] px-6 py-5 initial:my-6 initial:mb-[3rem] print:hidden"
        style={{
          ...getSurfaceStyle(),
        }}
      >
        <Flex justify={"start"}>
          <Link href={AppUrl.home()} highContrast>
            <NameLogo className="h-[1.25rem] fill-[currentColor]" />
          </Link>
        </Flex>
        <Flex gap="4" justify="center">
          <a href={AppUrl.campaigns()}>
            <Button
              radius="full"
              size="3"
              variant="ghost"
              className="m-0 hidden lg:flex"
            >
              <SquareLibrary />

              <span
                style={{
                  fontFamily,
                }}
              >
                My Campaigns
              </span>
              <VisuallyHidden> My Campaigns </VisuallyHidden>
            </Button>
          </a>
        </Flex>
        <Flex justify={"end"} gap="2" align={"center"}>
          <Box className="hidden sm:inline-block">
            <DiceRoller theme={props.theme} />
          </Box>
          <a href={AppUrl.docs()}>
            <Button
              radius="full"
              size="3"
              variant="ghost"
              className="m-0 hidden md:inline-block"
              style={{
                fontFamily,
              }}
            >
              <ReaderIcon className="h-[24px] w-[24px]" />
            </Button>
          </a>

          <a
            href={AppUrl.search({})}
            aria-label="Search"
            className="hidden lg:inline-flex"
          >
            <Button radius="full" size="3" variant="ghost" className="m-0">
              <MagnifyingGlassIcon className="h-[24px] w-[24px]" />
            </Button>
          </a>
          <Box className="hidden sm:inline-block">{renderSupportButton()}</Box>
          {/* <Box className="inline-block">{renderSupportButton()}</Box> */}

          <Button
            radius="full"
            size="3"
            id="themeToggle"
            onClick={handleThemeButtonClick}
            variant="ghost"
            className="m-0"
          >
            <SunIcon className="sun h-[24px] w-[24px]" />
            <MoonIcon className="moon h-[24px] w-[24px]" />
          </Button>
          <Dialog.Root open={open}>
            <Dialog.Trigger
              onClick={() => {
                return setOpen((prev) => !prev);
              }}
            >
              <Button
                radius="full"
                size="3"
                id="themeToggle"
                variant="ghost"
                className="m-0 inline-flex lg:hidden"
              >
                <HamburgerMenuIcon className="h-[24px] w-[24px]" />
              </Button>
            </Dialog.Trigger>

            <Dialog.Content size={"3"}>
              <Dialog.Content size={"4"}>
                <Dialog.Title className="relative">
                  Menu
                  <Flex
                    gap="3"
                    justify="end"
                    className="absolute right-0 top-0"
                  >
                    <Dialog.Close>
                      <Button
                        variant="ghost"
                        color="gray"
                        onClick={() => {
                          return setOpen((prev) => !prev);
                        }}
                      >
                        <XIcon></XIcon>
                      </Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Title>
                <Flex direction="column">
                  <Link href="campaigns" color="gray">
                    My Campaigns
                  </Link>
                  <Link href="dice" color="gray">
                    Dice Roller
                  </Link>
                  <Link href="docs" color="gray">
                    Documentation
                  </Link>
                  <Link href="search" color="gray">
                    Search
                  </Link>
                  {renderSupportButton()}
                </Flex>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Grid>
    </Theme>
  );

  function renderSupportButton() {
    return (
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button radius="full" size="3" variant="ghost" className="m-0">
              <PartyPopperIcon className="h-[24px] w-[24px]"></PartyPopperIcon>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onClick={async () => {
                await shootConfetti(3);
                // await wait(1000);
                window.open(AppUrl.kofi(), "_blank");
              }}
            >
              Buy a Coffee
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onClick={async () => {
                await shootConfetti(3);
                // await wait(1000);
                window.open(AppUrl.patreon(), "_blank");
              }}
            >
              Support on Patreon
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </>
    );
  }
}

async function shootConfetti(numberOfTimes: number) {
  var scalar = 5;

  const unicorn = confetti.shapeFromText({ text: "☕", scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn],
    scalar,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  }

  for (let i = 0; i < numberOfTimes; i++) {
    shoot();
    await wait(100);
    shoot();
    await wait(200);
    shoot();
    await wait(500);
  }
}
