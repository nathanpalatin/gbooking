/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#A0FF36',
        secondary: '#E1E1E6',
      },
      backgroundColor: {
        primary: '#A0FF36',
      },
      fontFamily: {
        bold: 'Inter_700Bold',
        medium: 'Inter_500Medium',
        regular: 'Inter_400Regular',
      },
    },
  },
  plugins: [],
}
