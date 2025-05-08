/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunny: "#000000",
        cloudy: "#111111",
      },
    },
  },
  plugins: [],
} 