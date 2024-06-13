import { Flex, Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { z } from "zod";
import { DLStorage } from "../../domains/DLStorage";
import { getLogger } from "../../domains/getLogger";

const logger = getLogger("CreateGame");
export function CreateGame(props: {}) {
  useEffect(() => {
    main();
    async function main() {
      const slug = new URLSearchParams(window.location.search).get("slug");

      const parsedParams = z
        .object({
          slug: z.string(),
        })
        .safeParse({ slug });

      if (!parsedParams.success) {
        throw logger.error("Failed to parse slug", { params: parsedParams });
      }

      const uuid = DLStorage.addGame({ slug: parsedParams.data.slug });

      window.location.href = `/play/${slug}?id=${uuid}`;
    }
  }, []);

  return (
    <Flex direction="column" gap="6" justify={"center"} align={"center"}>
      <Spinner size="3" className="h-[2rem] w-[2rem]" />
    </Flex>
  );
}
