/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        courseGrid: "repeat(auto-fill,minmax(15rem,1fr))",
        messageGrid: "1fr 2rem",
        template: "15rem 1fr",
        conversationsGrid: "13rem 1fr",
        message: "1fr 4rem",
      },
      gridTemplateRows: {
        message: "3rem 1fr 6rem",
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
