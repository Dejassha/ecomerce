/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F3ECDD",
        paper: "#FBF7EE",
        ink: "#241C15",
        charcoal: "#2B221A",
        line: "#DED1B4",
        gold: {
          DEFAULT: "#C79A45",
          dark: "#A87F35",
        },
        pine: {
          DEFAULT: "#3F5641",
          dark: "#2E4030",
        },
        rust: "#9C4A2E",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["\"Public Sans\"", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
