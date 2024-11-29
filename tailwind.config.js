/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2196F3",
        secondary: "#345220",
        active : "#345261",
        "custom-orange" : "rgba(170, 91, 23, 1)",
        popover:"rgba(33, 150, 243, 1)",
        popcontent:"rgba(170, 91, 23, 1)",
        "custom-orange" : "rgba(170, 91, 23, 1)",
        "custom-pink" :"rgba(255, 114, 114, 1)",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],  
      },
    },
  },
  plugins: [],
};
