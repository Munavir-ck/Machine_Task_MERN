/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          montserrat: ["Montserrat", "sans-serif"],
          urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
          primary: "#5542F6",
          highlight: "#eae8fb",
          bgGray: "#fbfafd",
      },
  },
  },
  plugins: [],
}

