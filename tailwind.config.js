/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Dosis", "sans-serif"],
      },
      colors: {
        primary: "#5d04aa",
        secondary: {
          DEFAULT: "#cfa8f3",
        },
        success: { DEFAULT: "#38A457" },
        warning: { DEFAULT: "#FB9F34" },
        danger: { DEFAULT: "#B33A3A" },
        info: { DEFAULT: "#2196F3" },
      },
    },
  },
  plugins: [],
};
