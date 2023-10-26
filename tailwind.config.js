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
        '250': '250px',
        '156': '156px',
      },
      borderRadius: {
        '30': '30px',
      },
    },
  },
  plugins: [],
}

