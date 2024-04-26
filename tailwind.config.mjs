/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "#0e273c",
      secondary: "#e7e6f7",
      accent: "#fcf5e5",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        montse: ["Montserrat Variable", "sans-serif"],
        chivo: ["Chivo Mono Variable", "monospace"],
      },
    },
  },
  plugins: [],
};
