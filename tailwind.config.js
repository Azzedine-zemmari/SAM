/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['"Lexend Deca"', 'sans-serif'],
        'Agharti': ['Agharti', 'sans-serif'],
        'Exo' : ["Exo 2", 'sans-serif;']
      },
    },
  },
  plugins: [],
}
