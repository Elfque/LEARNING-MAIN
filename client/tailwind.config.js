/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        courseGrid: "repeat(auto-fill,minmax(15rem,1fr))",
        messageGrid: "1fr 2rem",
      },
      colors: {
        bluish: "#228CDB",
      },
      fontFamily: {
        reos: "Reospec",
      },
    },
  },
  plugins: [],
};
