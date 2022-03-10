module.exports = {
  content: ['./src/containers/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      margin: ['last', 'first'],
      padding: ['last', 'first'],
      display: ['hover'],
      borderWidth: ['hover'],
      borderColor: ['hover'],
      opacity: ['hover']
    }
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Mohave', 'sans-serif'],
      display: ['Mohave'],
      body: ['Mohave']
    },
    fontSize: {
      point: '.4rem',
      mini: '.5rem',
      small: '.6rem',
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    zIndex: {
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      100: 100,
      120: 120
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move'
    },
    extend: {
      width: {
        w28: '28px',
        w24: '24px',
        w130: '130px'
      },
      height: {
        h28: '28px',
        h24: '24px',
        h130: '130px'
      },
      colors: {
        light: '#e8e8e8',
        inactive: 'rgba(255, 255, 255, 0.7)',
        whitegrey: 'rgba(255, 255, 255, 0.5)',
        active: 'rgba(255, 255, 255, 0.9)',
        white10: 'rgba(255, 255, 255, 0.1)',
        white20: 'rgba(255, 255, 255, 0.2)',
        white30: 'rgba(255, 255, 255, 0.3)',
        green: '#5AFB1E',
        dark: '#101010',
        dark21: '#212121',
        dart2C: '#2c2c2c'
      },
      fontSize: {
        small: '0.45rem',
        mini: '0.6rem',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem'
      },
      screens: {
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px'
        // => @media (min-width: 1280px) { ... }
      }
    }
  }
};
