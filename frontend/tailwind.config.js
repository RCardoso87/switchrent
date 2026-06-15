/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'switch-red': '#E60012',
        'switch-blue': '#00C3E3',
        'switch-dark': '#1a1a1a',
        'switch-gray': '#2d2d2d',
      },
    },
  },
  plugins: [],
};