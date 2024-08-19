/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['"Lexend Deca"', 'sans-serif'],
        'Agharti': ['Agharti', 'sans-serif'],
        'Exo' : ["Exo 2", 'sans-serif;'],
        "Cursive":["Edu VIC WA NT Beginner", 'cursive'],
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(22deg, rgba(255,103,0,1) 13%, rgba(255,255,255,1) 100%)',
      },
    },
  },
  plugins: [],
}
