/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#006A80",
        "custom-green": "#229575",
        "blues":"#5BA5E3",
        "blues1":"#BBE8F7",
        "red_aa":"#ff3f52"
      },
      fontFamily: {
        tajwal: ['Tajwal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
