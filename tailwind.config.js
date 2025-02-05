/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6f2dbd',
        secondary: '#a663cc',
        accent: '#b298dc',
        light: '#b8d0eb',
        background: '#b9faf8',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(111, 45, 189, 0.5)',
      },
    },
  },
  plugins: [],
};