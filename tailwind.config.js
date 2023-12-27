/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      mono: ["Space Mono", "monospace"],
      manrope: ["Manrope", "sans-serif"],
    },
    extend: {
      colors: {
        lightModeBackground: "#f6f8ff",
        lightModeBodyColor: "#ffffff",
        iconButtonColor: "#0079ff",
        lightModeTextColor: "#697cb4",
        lightNotAvailableColor: "#bbb3ca",
        darKModeBackground: "#141d2f",
        darkModeBodyColor: "#1e2a47",
        darkModeTextColor: "#ffffff",

        // advice
        lightCyan: "hsl(193, 38%, 86%)",
        neonGreen: "hsl(150, 100%, 66%)",
        grayishBlue: "hsl(217, 19%, 38%)",
        darkGrayishBlue: "hsl(217, 19%, 24%)",
        darkBlue: "hsl(218, 23%, 16%)",
      },
    },
  },
  plugins: [],
};
