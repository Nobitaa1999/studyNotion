/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}",],
  theme: {
    extend: {
      colors: {
        richblack: {
          900:'#0b0a0a',
          850:'#242121',
          800: '#0D0D0D',
          700:'#2a2727',
          600:'#2a2f38',
          500:'#434040',
          100:'#6a6565',
          110:'#959aa1',
          50:'#736d6d',
          5:'#827f7f',  
        },
        richblue:{
          900:'#0716b4',
          800:'#1e2fe3',
          700:'#3343ef',
          50:'#5f6bf4',
          5:'#848df8', 
        }
      },
    },
  },
  plugins: [],
}

