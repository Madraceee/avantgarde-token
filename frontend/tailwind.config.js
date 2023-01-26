/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        background: "#5CDB95",
        textColor: "#EDF5E1",
        highlight: "#05386B"
      },
      fontFamily:{
        body: ['Montserrat']
      },
      width:{
        address: "550px",
        minWidth: "250px"
      }
    },
  },
  plugins: [],
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}
