import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'soul-purple': '#87127C',
        'soul-purple-dark': '#6b0e62',
        'soul-text': '#1A202C',
        'soul-blue-dark': '#170F49',
        'soul-pink-light': '#fdf2f8',
        'soul-pink-gradient': '#FFE9FD',
        'soul-pink-box': '#FFE0FC',
      },
    },
  },
  plugins: [],
};
export default config;
