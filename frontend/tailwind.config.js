// filepath: frontend/tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        primary: '#ec4899', // Soft pink for valentine theme
        secondary: '#f472b6',
        background: '#fdf2f8',
        text: '#1f2937',
      },
    },
  },
  plugins: [],
};