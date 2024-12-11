/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#059669",
          DEFAULT: "#059669",
          dark: "#34d399",
        },
        secondary: {
          light: "#6b7280",
          DEFAULT: "#4b5563",
          dark: "#374151",
        },
        accent: {
          light: "#200596",
          DEFAULT: "#200596",
          dark: "#4934d3",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#ffffff",
          dark: "#242222",
        },
        danger: {
          light: "#b41c2b",
          DEFAULT: "#b41c2b",
          dark: "#b41c2b",
        },
        success: {
          light: "#009f42",
          DEFAULT: "#009f42",
          dark: "#009f42",
        },
        warning: {
          light: "#cc8800",
          DEFAULT: "#cc8800",
          dark: "#cc8800",
        },
        info: {
          light: "#388cfa",
          DEFAULT: "#388cfa",
          dark: "#388cfa",
        },
      },
    },
  },
  plugins: [],
};
