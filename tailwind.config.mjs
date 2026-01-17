/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: ["row-span-", "col-span-"],
  theme: {
    colors: {
      white: "#FFF",
      black: "#000",
      primary: "#6E6E6E",
      secondary: "#009B4D",
      tertiary: "#BAFF39",
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
        'text-slider': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        typing: "typing 3s steps(30) infinite alternate, blink .7s infinite",
        'text-slider': 'text-slider 20s linear infinite',
      },
    },
  },
  plugins: [],
};
