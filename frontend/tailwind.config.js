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
        colorCyanMain: "#02ACC3",
        colorCyanDark: "#008B8B",
        colorBlackDark: "#181A1B",
        colorCyanLV2: "#00FFFF",
        colorCyanLV3: "#00EEEE",
        colorCyanLV4: "#00CDCD",
        colorCyanLV5: "#00E5EE",
        colorCyanLV6: "#00C5CD",
        colorText: "CFCFCF",
        colorText1: "#1C1C1C",
        colorText2: "##E8E8E8",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
