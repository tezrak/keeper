import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Flex,
  Grid,
  SegmentedControl,
  Skeleton,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/client/Card/Card";
import { MDXH1, MDXH2 } from "../../components/client/MDX/MDX";

export const searchTypes = {
  all: "All",
  games: "Games",
  resources: "Resources",
} as const;

export type SearchType = keyof typeof searchTypes;

export type SearchIndexType = {
  title: string;
  subTitle: string;
  segments: Array<string>;
  imageMetaData:
    | {
        src: string;
        width: number;
        height: number;
        format:
          | "png"
          | "jpg"
          | "jpeg"
          | "tiff"
          | "webp"
          | "gif"
          | "svg"
          | "avif";
      }
    | undefined
    | null;
  imageSrc: string;
  type: SearchType;
  href: string;
};

export function Page(props: { indexes: Array<SearchIndexType> }) {
  const [type, setType] = useState<SearchType>("all");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Array<SearchIndexType>>([]);
  const [searching, setSearching] = useState<boolean | null>(null);
  const timeout = useRef<Timer | null>(null);
  const isSearchPredetermined = query === "*";

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (query !== "") {
      setSearching(true);
      timeout.current = setTimeout(() => {
        const newResults = props.indexes.filter((index) => {
          const joinedSegments = index.segments.join(" ").toLowerCase();
          const queryMatch = joinedSegments.includes(query.toLowerCase());
          const typeMatch = type === "all" || index.type === type;

          if (query === "*") {
            return typeMatch;
          }

          if (type === "all") {
            return queryMatch;
          }

          return queryMatch && typeMatch;
        });
        setResults(newResults);
        setSearching(false);
      }, 500);
    } else {
      setResults(props.indexes);
      setSearching(false);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [query, type]);

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const queryParam = queryString?.get("query") as string;

    if (queryParam) {
      setQuery(queryParam);
    }

    const typeParam = queryString?.get("type") as SearchType;
    if (typeParam && Object.keys(searchTypes).includes(typeParam)) {
      setType(typeParam);
    }
  }, []);

  return (
    <>
      <MDXH1>
        {!isSearchPredetermined && <>Search</>}
        {type === "all" ? "" : ` ${searchTypes[type]}`}
      </MDXH1>

      {!isSearchPredetermined && (
        <Flex direction={{ initial: "column", sm: "row" }} gap="4">
          <TextField.Root
            placeholder="Search for games, resources, and more..."
            size="3"
            color="gray"
            variant="soft"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className="w-full"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <SegmentedControl.Root
            value={type}
            size={{
              initial: "1",
              xs: "3",
            }}
          >
            {Object.keys(searchTypes).map((key) => {
              return (
                <SegmentedControl.Item
                  key={key}
                  value={key}
                  onClick={() => setType(key as SearchType)}
                >
                  {(searchTypes as any)[key]}
                </SegmentedControl.Item>
              );
            })}
          </SegmentedControl.Root>
        </Flex>
      )}
      {searching !== null && (
        <Skeleton loading={searching} height={"30vh"}></Skeleton>
      )}

      {searching === false && (
        <>
          <MDXH2 color="gray">
            {results.length} result{results.length === 1 ? "" : "s"}
          </MDXH2>

          <Grid
            columns={{
              sm: "2",
              lg: "3",
            }}
            gap="6"
            width="auto"
          >
            {results.map((item) => {
              return (
                <Card
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  subtitle={item.subTitle}
                  accentColor={"gold"}
                  badge={
                    <>
                      <Badge
                        size="3"
                        variant="outline"
                        color="gray"
                        className="bg-[--accent-2]"
                      >
                        {item.type === "games" ? "Game" : "Resource"}
                      </Badge>
                    </>
                  }
                >
                  {item.imageMetaData ? (
                    <img
                      loading={"eager"}
                      src={item.imageSrc}
                      alt={item.title}
                      style={{
                        position: "absolute",
                        objectFit: "cover",
                        objectPosition: "left",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : null}
                </Card>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}
