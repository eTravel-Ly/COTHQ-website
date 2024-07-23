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
        "blue":"#EAFBFF",
        "red_aa":"#ff3f52"
      },
      fontFamily: {
        tajwal: ['Tajwal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
