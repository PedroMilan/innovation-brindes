import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3fbeb",
          100: "#dff4c6",
          200: "#c6ea97",
          300: "#a7dc5c",
          400: "#88cc2f",
          500: "#79c000", // primary green
          600: "#5e9900",
          700: "#477300",
          800: "#314f00",
          900: "#1e3200"
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
