/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        a5x: {
          surface: '#E9EEF5',
          raised: '#F1F4F8',
          white: '#FFFFFF',
          primary: '#071B3A',
          secondary: '#5B6B82',
          disabled: '#9AA7B8',
          blue: '#1677FF',
          blueHover: '#0E5ECC',
          hairline: 'rgba(7, 27, 58, 0.06)',
          hairlineDark: 'rgba(7, 27, 58, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm-alt': ['13px', '18px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'xl': ['20px', '28px'],
      },
      boxShadow: {
        'neu-raised': '-6px -6px 14px rgba(255, 255, 255, 0.95), 6px 6px 14px rgba(163, 177, 198, 0.45)',
        'neu-raised-sm': '-3px -3px 8px rgba(255, 255, 255, 0.95), 3px 3px 8px rgba(163, 177, 198, 0.35)',
        'neu-pressed': 'inset -3px -3px 8px rgba(255, 255, 255, 0.9), inset 3px 3px 8px rgba(163, 177, 198, 0.4)',
        'neu-accent': '0 4px 14px rgba(22, 119, 255, 0.35)',
      },
      borderRadius: {
        'neu-panel': '16px',
        'neu-btn': '12px',
      }
    },
  },
  plugins: [],
}
