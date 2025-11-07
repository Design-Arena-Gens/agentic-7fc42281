import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f5ff',
          100: '#e9e9ff',
          200: '#d0d0ff',
          300: '#a7a8ff',
          400: '#797bff',
          500: '#4c4dff',
          600: '#2e31e6',
          700: '#2024b4',
          800: '#14177f',
          900: '#0a0d4f'
        }
      }
    }
  },
  plugins: []
};

export default config;
