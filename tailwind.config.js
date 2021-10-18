/* eslint-disable no-undef */
module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        playfair: "'Playfair Display', serif",
        roboto: "'Roboto', sansSerif",
      },
      colors: {
        dark: "#12232E",
        primary: "#005c94",
        secondary: "#4DA8DA",
        shadow: "#203647",
        highlight: "#f5d531",
        bright: "#EEFBFB",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
