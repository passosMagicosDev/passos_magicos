import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-gray": "#F5F5F5",
        "text-dark": "#333333",
        "text-medium": "#555555",
        "button-blue": "#2377C6",
      },
    },
  },
  plugins: [],
};
export default config;
