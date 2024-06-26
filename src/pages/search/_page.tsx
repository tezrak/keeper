import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Grid, Heading, Skeleton, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/client/Card/Card";

export type SearchIndexType = {
  title: string;
  subTitle: string;
  searchIn: Array<string>;
  imageAttr:
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
    | undefined;
  imageSrc: string;
  type: string;
  href: string;
};

export function Page(props: { indexes: Array<SearchIndexType> }) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Array<SearchIndexType>>([]);
  const [searching, setSearching] = useState<boolean | null>(null);
  const timeout = useRef<Timer | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (query !== "") {
      setSearching(true);
      timeout.current = setTimeout(() => {
        const newResults = props.indexes.filter((index) => {
          const searchIn = index.searchIn.join(" ").toLowerCase();
          return searchIn.includes(query.toLowerCase());
        });
        setResults(newResults);
        setSearching(false);
      }, 500);
    } else {
      setResults([]);
      setSearching(null);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [query]);

  return (
    <>
      <Heading size="9">Search</Heading>

      <TextField.Root
        placeholder="Search for games, resources, and more..."
        size="3"
        color="gray"
        variant="soft"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      {searching !== null && (
        <Skeleton loading={searching}>
          <Heading size="8">
            Found {results.length} result{results.length === 1 ? "" : "s"}...
          </Heading>

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
                  href={item.href}
                  title={item.title}
                  subtitle={item.subTitle}
                  accentColor={"gold"}
                >
                  {item.imageAttr ? (
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
        </Skeleton>
      )}
    </>
  );
}
