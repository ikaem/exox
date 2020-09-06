module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato"],
        catamaran: ["Catamaran"],
      },
      gridTemplateColumns: {
        "mobile-game-columns": "repeat(3, 108px)",
        "desktop-game-columns": "repeat(3, 160px)",
      },
      gridTemplateRows: {
        "mobile-game-rows": "repeat(3, 108px)",
        "desktop-game-rows": "repeat(3, 160px)",
      },

      height: {
        "mobile-height": "328px",
        "desktop-height": "360rem",
      },
      width: {
        "mobile-width": "328px",
        "desktop-width": "360rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
