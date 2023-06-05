const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = () => ({
  theme: {
    extend: {
      screens: {
        xs: '450px', // => @media (min-width: 450px) { ... }
      },
      colors: {
        // primary: '#dc2626',
        // 'primary-dark': '#b91c1c',
        // primary: {
        //   base: '#c6312a', //'#dc2626',
        //   dark: '#b91c1c',
        //   50: '#fef2f2',
        //   100: '#fee2e2',
        //   200: '#fecaca',
        //   300: '#fca5a5',
        //   400: '#f87171',
        //   500: '#ef4444',
        //   600: '#dc2626',
        //   700: '#b91c1c',
        //   800: '#991b1b',
        //   900: '#7f1d1d',
        // },
        // gray: {
        //   50: '#FAFAFA',
        //   100: '#F5F5F5',
        //   200: '#EEEEEE',
        //   300: '#E0E0E0',
        //   400: '#BDBDBD',
        //   500: '#9E9E9E',
        //   600: '#757575',
        //   700: '#616161',
        //   800: '#424242',
        //   900: '#212121',
        // },
        'blue-gray': {
          50: '#E3E7ED',
          100: '#B9C3D3',
          200: '#8D9DB5',
          300: '#627798',
          400: '#415C84',
          500: '#1A4373',
          600: '#133C6B',
          700: '#083461',
          800: '#022B55',
          900: '#001B3D',
        },
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lora: ['Lora', 'serif'],
        opensans: ['Open Sans', 'sans-serif'],
        segoeui: ['Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: '0px 6px 22px rgba(2, 43, 85, 0.08)',
      },
      gridTemplateColumns: {
        'news-container': '60% auto',
        'news-large': '200px auto',
        'news-small': '72px auto',
        'search-container': '300px auto',
        'search-item': '120px auto',
      },

      transitionTimingFunction: {
        brand: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-gradient-r': 'radial-gradient(100% 2589.12% at 0 0, var(--tw-gradient-stops))',
        'gradient-radial-to-br': 'radial-gradient(100% 2589.12% at 0 0, var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {
      divideColor: ['group-hover'],
      grayscale: ['group-hover'],
      visibility: ['group-hover'],
      transform: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
    require('../../plugins/default'),
  ],

  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          primary: '#c6312a',
          secondary: '#0ea5e9',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
});
