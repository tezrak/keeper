import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Container, Flex, Link, Theme } from "@radix-ui/themes";
import { MDXH1, MDXP } from "../../components/client/MDX/MDX";
import { AppUrl } from "../../domains/app-url/AppUrl";
import type { ThemeType } from "../../domains/utils/getTheme";

export function NotFoundRoute(props: { theme: ThemeType }) {
  return (
    <Theme {...props.theme} hasBackground={false}>
      <Container className="mx-auto max-w-3xl text-center">
        <Flex gap="5" direction="column">
          <MDXH1>Page Not Found</MDXH1>

          <MDXP>
            The page you are looking for does not exist. Please double-check the
            URL and try again, or search for the page you are looking for using
            the search button below. If you still can't find it, you can{" "}
            <Link href="https://farirpgs.com/contact">contact us</Link>.
          </MDXP>

          <MDXP>We’re here to help!</MDXP>

          <Flex align="center" justify={"center"}>
            <a
              href={AppUrl.search({})}
              aria-label="Search"
              className="hidden lg:inline-flex"
            >
              <Button radius="full" size="4" variant="soft" className="m-0">
                Search for content
                <MagnifyingGlassIcon className="h-[24px] w-[24px]" />
              </Button>
            </a>
          </Flex>
        </Flex>
      </Container>
    </Theme>
  );
}
