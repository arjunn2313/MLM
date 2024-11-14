/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196F3",
        secondary: "#345220",
        active : "#345261"
      },
    },
  },
  plugins: [],
};
