/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          high: "#2979ff",
          DEFAULT: "#448AFF",
          low: "#75a9ff",
        },
        surface: {
          DEFAULT: "#273240",
          low: "#354355",
        },
        body: "#CED3D9",
        danger: {
          high: "#2B0809",
          DEFAULT: "#ef4444",
          low: "#F7D4D5",
        },
        success: {
          high: "#1f652a" /*green-800*/,
          DEFAULT: "#38B449" /*green-500*/,
          low: "#ebf7ed" /*green-50*/,
        },
        purple: {
          high: "#361E50" /*purple-900*/,
          DEFAULT: "#8148BF" /*purple-500*/,
          low: "#D8C6EB" /*purple-100*/,
        },
      },
    },
  },
  plugins: [],
};
