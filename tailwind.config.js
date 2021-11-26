const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        heading: "#00f3ff",
        primary: "#296073",
        highlight: "#4c7e8f",
      },
      padding: {
        xss: "0.12rem",
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["hover", "active"],
    },
  },
  plugins: [],
};
