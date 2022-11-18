/* eslint-disable no-undef */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        blob: "blob 20s ease-in-out infinite"
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          // transform position and scale
          "33.33%": {
            transform: "translate(30px, -50px) scale(1.5)"
          },
          "66.6%": {
            transform: "translate(-20px, 30px) scale(1)"
          }
        }
      },
      fontFamily: {
        playfair: "'Playfair Display', serif",
        roboto: "'Roboto', sansSerif"
      },
      colors: {
        dark: "#12232E",
        primary: "#005c94",
        secondary: "#4DA8DA",
        shadow: "#203647",
        highlight: "#FDA50F",
        bright: "#EEFBFB"
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
        "100v": "100vh"
      }
    }
  },
  plugins: []
}
