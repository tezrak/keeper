import { Button } from "@radix-ui/themes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { DLStorage } from "../../../domains/dl/DLStorage";
import { wait } from "../../../domains/utils/wait";

export function CreateNewCampaignButton(props: { gameSlug: string }) {
  const [ready, setReady] = useState(false);
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    main();

    async function main() {
      await wait();
      setReady(true);
    }
  }, []);

  async function handleClick() {
    setAdding(true);
    await wait();
    const id = DLStorage.addCampaign({
      slug: props.gameSlug,
    });

    location.href = `/play/${props.gameSlug}?id=${id}`;

    setAdding(false);
  }

  return (
    <span>
      <Button
        size="4"
        className={clsx("font-bold", "transition-all")}
        variant="solid"
        disabled={!ready || adding}
        onClick={handleClick}
        loading={adding}
      >
        Start a new game
      </Button>
    </span>
  );
}
