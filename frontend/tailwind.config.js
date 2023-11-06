const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts}",
    "./public/index.html",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
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
  plugins: [require("@tailwindcss/forms")],
});
