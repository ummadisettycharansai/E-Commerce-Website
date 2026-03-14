/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1a1a2e', 50: '#f0f0f8', 100: '#d0d0e8', 500: '#1a1a2e', 600: '#16162a', 700: '#111126' },
        accent: { DEFAULT: '#e94560', 50: '#fef0f3', 500: '#e94560', 600: '#d63d56' },
      },
    },
  },
  plugins: [],
};
