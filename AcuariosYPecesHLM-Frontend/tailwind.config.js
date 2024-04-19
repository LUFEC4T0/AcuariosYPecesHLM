/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'cooper': ['Cooper Black' , "sans-serif"],
      },
      boxShadow: {
        '3xl': ' 5px 5px 20px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        'sm': {'min': '320px', 'max': '767px'},
        // => @media (min-width: 320px and max-width: 767px) { ... }
  
        'md': {'min': '768px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'md2': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
    },
  },
  plugins: [],
}}
