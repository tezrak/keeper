import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Inset,
  Link,
  Text,
  Theme,
} from "@radix-ui/themes";
import type { CollectionEntry } from "astro:content";
import clsx from "clsx";
import React from "react";
import {
  MDXH1,
  MDXH2,
  MDXWrapper,
} from "../../../../components/client/MDX/MDX";
import { AppUrl } from "../../../../domains/app-url/AppUrl";
import { Colors } from "../../../../domains/colors/colors";
import type { DocType } from "../../../../domains/document/DocParser";
import type { ThemeType } from "../../../../domains/utils/getTheme";

export function Page(props: {
  creator: CollectionEntry<"creators">;
  resource: CollectionEntry<"resources">;
  image?: React.ReactNode;
  doc: DocType;
  theme: ThemeType;
  pathname: string;
  children: any;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Theme {...props.theme} hasBackground={false}>
      <div className="flex gap-9">
        <div className="hidden flex-shrink-0 flex-grow basis-[300px] lg:flex">
          <Box
            className="sticky top-6 overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 32px)",
            }}
          >
            {renderSidebar({
              withImage: true,
            })}
          </Box>
        </div>
        <div className="block">
          <MDXWrapper>
            <MDXH1>{props.doc.currentPage.title}</MDXH1>
            <MDXH2 color="gray" className="mt-[-.5rem]" size="6">
              {props.resource.data.name}
            </MDXH2>
            {props.children}

            {renderPreviousAndNextButtons()}
          </MDXWrapper>
        </div>
      </div>
      <Dialog.Root open={open}>
        <Box className="fixed bottom-0 left-0 right-0 w-full bg-black lg:hidden">
          <Dialog.Trigger
            onClick={() => {
              return setOpen((prev) => !prev);
            }}
          >
            <Button
              variant="solid"
              size="4"
              radius="none"
              className="fixed bottom-0 left-0 right-0 w-full lg:hidden"
            >
              <HamburgerMenuIcon
                width={"1.5rem"}
                height={"1.5rem"}
              ></HamburgerMenuIcon>
            </Button>
          </Dialog.Trigger>
        </Box>

        <Dialog.Content size={"3"}>
          {renderSidebar({
            withImage: false,
          })}
          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  return setOpen((prev) => !prev);
                }}
              >
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Theme>
  );

  function renderPreviousAndNextButtons() {
    return (
      <Flex
        gap="3"
        className="mt-[3rem]"
        direction={{ initial: "column", sm: "row" }}
        justify={
          props.doc.previousPage && props.doc.nextPage
            ? "between"
            : props.doc.previousPage
              ? "start"
              : "end"
        }
      >
        {props.doc.previousPage && (
          <Link
            href={AppUrl.resourcePage({
              slug: props.resource.slug,
              page: props.doc.previousPage.id,
            })}
            size="4"
          >
            <Flex
              gap="2"
              direction="column"
              className="rounded-md border border-[--border] p-4"
              style={
                {
                  "--border": Colors.getDarkColor(props.theme.accentColor, 7),
                } as React.CSSProperties
              }
            >
              <Text size="2" color="gray" className="no-underline">
                Previous
              </Text>

              {props.doc.previousPage.title}
            </Flex>
          </Link>
        )}
        {props.doc.nextPage && (
          <Link
            href={AppUrl.resourcePage({
              slug: props.resource.slug,
              page: props.doc.nextPage.id,
            })}
            size="4"
          >
            <Flex
              gap="2"
              direction="column"
              className="rounded-md border border-[--border] p-4"
              style={
                {
                  "--border": Colors.getDarkColor(props.theme.accentColor, 7),
                } as React.CSSProperties
              }
            >
              <Text size="2" color="gray">
                Next
              </Text>

              {props.doc.nextPage.title}
            </Flex>
          </Link>
        )}
      </Flex>
    );
  }

  function renderSidebar(p: { withImage?: boolean }) {
    return (
      <Flex direction="column" mb="5">
        {props.image && p.withImage && (
          <Box className="pb-5">
            <Inset clip="padding-box" side="top" pb="current">
              {props.image}
            </Inset>
          </Box>
        )}
        {Object.keys(props.doc.sidebar.categories).map((category) => {
          return (
            <React.Fragment key={category}>
              <Heading
                size="1"
                mt="3"
                mb="1"
                className="uppercase"
                color="gray"
              >
                {category}
              </Heading>
              {props.doc.sidebar.categories[category].map((item) => {
                const itemPatname = AppUrl.resourcePage({
                  slug: props.resource.slug,
                  page: item.id,
                });
                const isCurrent = itemPatname === props.pathname;

                return (
                  <React.Fragment key={item.id}>
                    {renderLink({
                      isCurrent,
                      href: itemPatname,
                      title: item.title,
                    })}
                    {isCurrent && (
                      <>
                        {/* TOC */}
                        {props.doc.currentPage.toc.map((toc) => {
                          return (
                            <React.Fragment key={toc.id}>
                              {renderLink({
                                href: `#${toc.id}`,
                                title: toc.title,
                                isCurrent: false,
                                isToc: true,
                                level: toc.level,
                              })}
                            </React.Fragment>
                          );
                        })}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
        {props.doc.sidebar.root.map((item) => {
          return (
            <Flex key={item.id} direction="column">
              {renderLink({
                isCurrent: item.id === props.pathname,
                href: AppUrl.resourcePage({
                  slug: props.resource.slug,
                  page: item.id,
                }),
                title: item.title,
              })}
            </Flex>
          );
        })}
      </Flex>
    );
  }

  function renderLink(p: {
    href: string;
    title: string;
    isCurrent: boolean;
    isToc?: boolean;
    level?: number;
  }) {
    return (
      <>
        <Link
          href={p.href}
          style={
            {
              color:
                p.isCurrent && !p.isToc
                  ? Colors.getDarkColor(props.theme.accentColor, 11)
                  : p.isToc
                    ? Colors.getDarkColor("gray", 11)
                    : Colors.getDarkColor("gray", 12),
            } as React.CSSProperties
          }
        >
          <Box
            pl={p.level ? (p.level + 2).toString() : "2"}
            className={clsx(
              "border-l-solid border-l-[1px] border-l-[--border-item] hover:border-l-[--border-current]",
              {
                "m-[0px]": p.isCurrent,
              },
            )}
            style={
              {
                "--border-current": Colors.getDarkColor(
                  props.theme.accentColor,
                  9,
                ),
                "--border-item":
                  p.isCurrent || p.isToc
                    ? Colors.getDarkColor(props.theme.accentColor, 9)
                    : Colors.getDarkColor("gray", 6),
              } as React.CSSProperties
            }
          >
            <Text className={clsx({ "font-bold": p.isCurrent })} size="2">
              {p.title}
            </Text>
          </Box>
        </Link>
      </>
    );
  }
}
