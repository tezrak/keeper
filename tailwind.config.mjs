/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,

  theme: {
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "24px",
      6: "32px",
      7: "40px",
      8: "48px",
      9: "64px",
    },
    screens: {
      // matching https://www.radix-ui.com/themes/docs/theme/breakpoints
      initial: "0px",
      xs: "520px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1640px",
      "2xl": "1920px",
      "3xl": "2560px",
      "4xl": "3840px",
    },
    extend: {
      keyframes: {
        blur: {
          "0%": { filter: "blur(48px)" },
          "100%": { filter: "blur(128px)" },
        },
      },
      animation: {
        blur: "blur 2s linear alternate infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
