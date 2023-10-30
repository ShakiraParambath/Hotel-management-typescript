/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      spacing: {
        '450': '450px',
        '50': '50px',
        '100': '100px',
        '650':'650px',
        '300': '300px',
        '500':'500px',
        '250': '250px',
        '156': '156px',
        '80' : '80px',
        '7' :'7px',
        '10':'10px',
        '600':'600px',
        '400':'400px',
        '120':'120px'
      },
      colors: {
        'white-900': '#FFFFFF',
        'yellow':'#FFAE42',
        'blue':'#1976d2',
      },
      borderRadius: {
        '30': '30px',
      },
    },
  },
  plugins: [],
}

