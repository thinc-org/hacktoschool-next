/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bgcolor':'#F6F5F4',
        'customtext1':'#2B788B'
      }
    },
  },
  plugins: [],
}
