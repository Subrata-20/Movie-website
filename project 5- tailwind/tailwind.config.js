/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./script.js"],
  theme: {
    extend: {
  
      colors:{
        'primary': '#f5c518'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',  // Custom spacing value
        '20': '5rem',    
        '24': '6rem',    
        '28': '7rem',    
      },
    },
  },
  
  
  plugins: [],
}

