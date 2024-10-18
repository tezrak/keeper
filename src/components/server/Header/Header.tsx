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
  Flex,
  Grid,
  Link,
  VisuallyHidden,
} from "@radix-ui/themes";
import { SquareLibrary, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AppUrl } from "../../../domains/app-url/AppUrl";
import type { ThemeType } from "../../../domains/utils/getTheme";
import { DiceRoller } from "../../client/DiceRoller/DiceRoller";
import { getSurfaceStyle } from "../../client/Surface/getSurfaceStyle";
import { NameLogo } from "./Logo";
import { Patreon } from "./Patreon";

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
    <>
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
          <a href={AppUrl.patreon()} target="_blank">
            <Button
              radius="full"
              size="3"
              variant="ghost"
              className="m-0 hidden lg:inline-flex"
            >
              <Patreon />
              <span
                style={{
                  fontFamily,
                }}
              >
                Support
              </span>
            </Button>
          </a>

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
                  <Link href="https://farirpgs.com/patreon" color="gray">
                    Support
                  </Link>
                </Flex>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Grid>
    </>
  );
}
