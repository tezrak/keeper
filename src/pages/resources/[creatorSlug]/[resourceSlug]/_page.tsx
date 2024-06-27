import {
  Box,
  Card,
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
import { getSurfaceStyle } from "../../../../components/client/Surface/getSurfaceStyle";
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
  return (
    <Theme {...props.theme} hasBackground={false}>
      <div className="flex gap-9">
        <div className="hidden flex-shrink-0 flex-grow basis-[300px] lg:flex">
          <Card
            className=""
            style={{
              ...getSurfaceStyle(),
            }}
          >
            {renderSidebar()}
          </Card>
        </div>
        <div className="block">
          <MDXWrapper>
            <MDXH1 size="9">{props.doc.currentPage.title}</MDXH1>
            <MDXH2 color="gray" className="mt-[-.5rem]" size="6">
              {props.resource.data.name}
            </MDXH2>
            {props.children}
          </MDXWrapper>
        </div>
      </div>
    </Theme>
  );

  function renderSidebar() {
    return (
      <Flex direction="column">
        {props.image && (
          <Inset clip="padding-box" side="top" pb="current">
            {props.image}
          </Inset>
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
                  <>
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
                            <>
                              {renderLink({
                                href: `#${toc.id}`,
                                title: toc.title,
                                isCurrent: false,
                                level: toc.level,
                              })}
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </React.Fragment>
          );
        })}
        {props.doc.sidebar.root.map((item) => {
          return (
            <Flex direction="column">
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
    level?: number;
  }) {
    return (
      <>
        <Link href={p.href}>
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
                "--border-item": p.isCurrent
                  ? Colors.getDarkColor(props.theme.accentColor, 9)
                  : Colors.getDarkColor("gray", 9),
              } as React.CSSProperties
            }
          >
            <Text
              className={clsx({ "font-medium": p.isCurrent })}
              highContrast={!p.isCurrent && p.level === undefined}
              size="2"
              color={p.isCurrent ? props.theme.accentColor : "gray"}
            >
              {p.title}
            </Text>
          </Box>
        </Link>
      </>
    );
  }
}
