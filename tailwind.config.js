/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      container: {
        colors: {
          primary: "#ffc001",
          secondary: "#ff9c01",
        },
        center:true,
        padding: {
          DEFAULT:"1rem",
          sm:"3rem"
        }
      }
  }
  },
  plugins: [],
}

