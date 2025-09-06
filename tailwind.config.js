/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'pharma-blue': '#BBDCE5',
        'pharma-cream': '#ECEEDF',
        'pharma-beige': '#D9C4B0',
        'pharma-brown': '#CFAB8D',
        'pharma-dark': '#333333'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
