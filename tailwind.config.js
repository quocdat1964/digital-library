/** @type {import('tailwindcss').Config} */
module.exports = {
  // Các đường dẫn đến file template chứa class của Tailwind
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

