import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Dices } from "lucide-react";

export function NothingToShowHere(props: {
  title: JSX.Element | string;
  description: JSX.Element | string;
  icon?: React.ComponentType<any>;
}) {
  const CustomIcon = props.icon;
  return (
    <Container className="mx-auto max-w-[768px]">
      <div className="py-[10vh]">
        <Flex direction="column" gap="4" align="center">
          {CustomIcon ? (
            <CustomIcon size="20vh" className="mb-[2rem]"></CustomIcon>
          ) : (
            <Dices size="20vh" className="mb-[2rem]"></Dices>
          )}
          <Heading size="8" align={"center"}>
            {props.title}
          </Heading>
          <Text align={"center"}>{props.description}</Text>
        </Flex>
      </div>
    </Container>
  );
}
