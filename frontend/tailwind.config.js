/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts}", "./public/index.html"],
  theme: {
    padding: {
      main: "40px",
    },
    extend: {
      backgroundColor: {
        bgColorDark: "#181A1B",
        bgDarkLight: "#1E2122",
      },
      colors: {
        colorCyan: "#22b8cf",
        colorCyanDark: "#5BFCFF",
        colorBlackDark: "#181A1B",
      },
    },
  },
  plugins: [],
};
