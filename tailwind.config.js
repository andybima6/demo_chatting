/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0a0f1a',
          800: '#0f1623',
          700: '#141c2b',
          600: '#1b2538',
          500: '#232f47',
          400: '#33415c',
          300: '#5a6b8a',
        },
        brand: {
          400: '#5b8cff',
          500: '#3b6cff',
          600: '#2b54f0',
        },
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'rise': { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease both',
        'rise': 'rise 0.3s ease both',
      },
    },
  },
  plugins: [],
}
