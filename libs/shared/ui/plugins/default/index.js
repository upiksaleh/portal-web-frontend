module.exports = require('tailwindcss/plugin')(
  ({ addBase, addComponents, addUtilities, config, postcss }) => {
    addComponents({
      // '.base-container': {
      //   '@apply container mx-auto px-6 2xl:px-0 xl:max-w-7xl': {},
      //   // '@apply mx-auto': {},
      // },
    });
  },
  {}
);
