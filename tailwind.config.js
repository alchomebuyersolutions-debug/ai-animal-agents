/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-surface': '#1A1A1A',
        'primary': '#EC4899',
        'secondary': '#06B6D4',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'dog': '#06B6D4',
        'tiger': '#EF4444',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
