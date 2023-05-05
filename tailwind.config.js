const lineclamp = require('@tailwindcss/line-clamp')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0a804a',
        warn: '#f3a20e',
        danger: '#c80606',
        dark: '#393a44',
        grey: '#888',
        link: '#337ab7',
      },
    },
  },
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  plugins: [lineclamp],
}
