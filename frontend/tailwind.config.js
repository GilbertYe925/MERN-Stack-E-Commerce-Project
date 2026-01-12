/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#CCCCCC',
        'component': '#7B7b7b',
        'text-primary': '#000000',
        'text-secondary': '#484848',
      },
      fontFamily: {
        'display-sc': ['Playfair Display SC', 'serif'],
        'display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
