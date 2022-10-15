/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*{.html,/*.js}"],
    theme: {
      extend: {
        fontFamily: {
          'roboto': "'Roboto', sans-serif",
        },
      },
      container: {
        center: true,
        // padding: '1rem',
      },
    },
  plugins: [],
}
