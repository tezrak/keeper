import { IconButton } from "@radix-ui/themes";
import { Dices } from "lucide-react";

export function DiceRollerButton(props: {}) {
  return (
    <>
      <IconButton
        radius="full"
        size="3"
        variant="ghost"
        className="cursor-pointer"
        onClick={() => {
          alert("Coming soon!");
        }}
      >
        <Dices />
      </IconButton>
    </>
  );
}
