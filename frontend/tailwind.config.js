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
        'details-bg': '#7b7b7b',
        'text-primary': '#000000',
        'text-secondary': '#484848',
        'white': '#FFFFFF',
        'greenyellow': 'greenyellow',
      },
      fontFamily: {
        'display-sc': ['Playfair Display SC', 'serif'],
        'display': ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'footer-bg': 'url("/src/public/footer.png")',
      },
    },
  },
  plugins: [],
}
