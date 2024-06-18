/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,
  theme: {
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
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
