/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rand", "sans-serif"],
      },
      colors: {
        primary: "#056f75",
        green: "#2C5530",
        lightgreen: "#E5E9E6",
        mintgreen: "#E8EFEA",
        orange: "#FF6B4A",
        yellow: "#FFA451",
      },
    },
  },
  plugins: [],
};
