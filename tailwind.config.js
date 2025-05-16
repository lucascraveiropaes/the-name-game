/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      colors: {
        ...colors,
        primary: "#223547",
        secondary: "#15659D",
        background: "#ffffff",
        foreground: "#223547",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
};
