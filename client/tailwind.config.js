/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightPurple: "#742BDE",
      lightPurpleBox: "#f0e9fc",
        darkPurple: "#6710D4",
        textDark: "#171819",
        textMediumDark: "#232425",
        textLight: "#38393A",
        textExtraLight: "#DDDFE3",
      },
    },
  },
  plugins: [],
};
