import { Container, Flex, Link, Theme } from "@radix-ui/themes";
import { MDXH1, MDXP } from "../../components/client/MDX/MDX";
import type { ThemeType } from "../../domains/utils/getTheme";

interface Props {
  theme: ThemeType;
  error?: unknown;
}

export const ServerErrorRoute = (props: Props) => {
  return (
    <Theme {...props.theme} hasBackground={false}>
      <Container className="mx-auto max-w-3xl text-center">
        <Flex gap="5" direction="column">
          <MDXH1>Server Error</MDXH1>

          <MDXP>
            Oops! Something went wrong on our servers. Please try again later,
            or <Link href="https://farirpgs.com/contact">contact us</Link> if
            the problem persists.
          </MDXP>

          <MDXP>We apologize for the inconvenience!</MDXP>

          <div>
            {props.error instanceof Error
              ? props.error.message
              : "Unknown error"}
          </div>

          <Flex align="center" justify={"center"}>
            <Link href="/">
              <button className="inline-flex items-center justify-center rounded-full bg-[--accent-9] px-4 py-2 text-base text-[--accent-9-contrast] hover:bg-[--accent-10]">
                Go back home
              </button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Theme>
  );
};
