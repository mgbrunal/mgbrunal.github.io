/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: ["row-span-", "col-span-"],
  theme: {
    colors: {
      white: "#FFF",
      black: "#000",
      primary: "#0C1A1A",
      secondary: "#6ACFC7",
      tertiary: "#FF6B4A",
    },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 3s steps(30) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};
