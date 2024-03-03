/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ["DynaPuff", "sans-serif"],
      },
      colors: {
        'xmts-black': '#000000',
        'xmts-darkbrown': '#211B11',
        'xmts-yellow': '#F5B900',
        'xmts-red': '#F50000',
        'xmts-lightbrown': '#7D633F',
        'xmts-tan': '#D7BC95'
      }
    },
  },
  plugins: [],
}

