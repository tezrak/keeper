import { Flex, Heading } from "@radix-ui/themes";
import { type CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { DLStorage } from "../../domains/DLStorage";

export function CreateGame(props: {}) {
  const [game, setGame] = useState<CollectionEntry<"games">>();

  useEffect(() => {
    main();
    async function main() {
      const slug = new URLSearchParams(window.location.search).get("slug");
      const response = await fetch(`/api/getGame/${slug}/data.json`);
      const json: CollectionEntry<"games"> = await response.json();

      setGame(json);

      const uuid = DLStorage.addGame({ slug: json.slug });

      window.location.href = `/play/?id=${uuid}`;
    }
  }, []);

  return (
    <Flex direction="column" gap="6">
      <Heading size="9">Creating your {game?.data.name} game...</Heading>
    </Flex>
  );
}
