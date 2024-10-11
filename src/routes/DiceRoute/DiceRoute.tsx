import { Container } from "@radix-ui/themes";
import { DiceRoller } from "../../components/client/DiceRoller/DiceRoller";

export function DiceRoute() {
  return (
    <Container maxWidth={"600px"}>
      <DiceRoller button={false} />
    </Container>
  );
}
