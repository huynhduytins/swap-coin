/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          500: '#FF7000',
          100: '#FFF1E6',
        },
        dark: {
          100: '#000000',
          200: '#0F1117',
          300: '#151821',
          400: '#212734',
          500: '#101012',
        },
        light: {
          900: '#FFFFFF',
          800: '#F4F6F8',
          850: '#FDFDFD',
          700: '#DCE3F1',
          500: '#7B8EC8',
          400: '#858EAD',
        },
      },
      backgroundColor: {
        switch: '#bdc2c4',
      },
      invert: {
        25: '.25',
        50: '.5',
        75: '.75',
      },
      sepia: {
        25: '.25',
        75: '.75',
        98: '.98',
      },
    },
    fontFamily: {
      kanit: ['Kanit', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
