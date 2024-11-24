/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js}',  // Include all your page files
    './layouts/**/*.{vue,js}', // Include all your layout files
    './components/**/*.{vue,js}', // Include all your component files
    './assets/css/**/*.{css,scss}', // Ensure this path includes the tailwind.css file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
