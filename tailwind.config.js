/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"  // ✅ make Tailwind scan Angular templates
  ],
 theme: {
  extend: {
    colors: {
      primary: '#0e9787', // this will be your primary color
    },
  },
},

  plugins: [],
}
