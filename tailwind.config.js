/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"  // ✅ make Tailwind scan Angular templates
  ],
 theme: {
  extend: {
    colors: {
      primary: '#003c73', // this will be your primary color
            secoundry: '#bc8835', // this will be your primary color

    },
  },
},

  plugins: [],
}
