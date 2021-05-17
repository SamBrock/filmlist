module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    colors: {
      white: 'var(--white)',
      black: 'var(--black)',
      primary: 'var(--primary)',      
      red: 'var(--red)',      
      grey: 'var(--grey)',      
      'opacity-1': 'var(--opacity-1)',
      'opacity-2': 'var(--opacity-2)',
      'opacity-3': 'var(--opacity-3)',
      'opacity-5': 'var(--opacity-5)',
      'opacity-primary': 'var(--opacity-primary)',
    },
    fontSize: {
      xxs: 'var(--fz-xxs)',
      xs: 'var(--fz-xs)',
      sm: 'var(--fz-sm)',
      md: 'var(--fz-md)',
      lg: 'var(--fz-lg)',
      xl: 'var(--fz-xl)',
      xxl: 'var(--fz-xxl)',
      heading: 'var(--fz-heading)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
