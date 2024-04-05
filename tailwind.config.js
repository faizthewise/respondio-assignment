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
        surface: "#273240",
        body: "#CED3D9",
      },
    },
  },
  plugins: [],
};
