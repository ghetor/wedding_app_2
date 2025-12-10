import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petrolio: "#0D4F57",
        crema: "#F5F5F2",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        script: ["var(--font-great-vibes)"],
      },
    },
  },
  plugins: [],
};
export default config;
