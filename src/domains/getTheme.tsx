import type { ThemeProps } from "@radix-ui/themes";

export function getTheme(props: { theme?: ThemeProps }) {
  const themeProps = props.theme || {
    accentColor: "gold",
    appearance: "dark",
    panelBackground: "translucent",
  };

  return themeProps;
}
