import type { ThemeProps } from "@radix-ui/themes";

export function getTheme(props: { theme?: ThemeProps }) {
  const themeProps = {
    accentColor: props.theme?.accentColor || "gold",
    panelBackground: "translucent" as ThemeProps["panelBackground"],
    scaling: "110%" as ThemeProps["scaling"],
  };

  return themeProps;
}

export type ThemeType = ReturnType<typeof getTheme>;
