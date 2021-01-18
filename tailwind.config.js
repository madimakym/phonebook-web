module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontWeight: 200,
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        orange: {
          light: '#fd6c00',
          DEFAULT: '#fd6c00',
          dark: '#fd6c00',
          "200": '#fa6c0169',
        },
        bg: {
          light: '#F6F6F6',
          dark: '#F6F6F6',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            maxWidth: '700px',
          },
          '@screen lg': {
            maxWidth: '800px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        },
      });
    },
  ],
};
