/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      colors: {
        'primary-dark': '#1e40af',
        'fba-gold': '#cd9933',
        'fba-gray': '#808080',
        'fba-black': '#000000',
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          600: '#4b5563',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}