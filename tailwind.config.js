/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iris: {
          200: "#ECEEFD",
          400: "#B4BCF6",
          800: "#6878ED",
        },
      },
    },
  },
  plugins: [],
};
