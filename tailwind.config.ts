import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#17331f",
          dark: "#102416",
          light: "#234c2f",
        },
        wine: {
          DEFAULT: "#7a2431",
          light: "#9e3444",
          dark: "#5c1923",
        },
        gold: {
          DEFAULT: "#c9a24b",
          light: "#e5c678",
          dark: "#a38032",
        },
        cream: {
          DEFAULT: "#f7f2e7",
          dark: "#eae2d0",
        },
        ink: "#24312a",
        muted: "#67756c",
        line: "#e6dfce",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(23, 51, 31, 0.08)",
        card: "0 6px 24px -4px rgba(23, 51, 31, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
