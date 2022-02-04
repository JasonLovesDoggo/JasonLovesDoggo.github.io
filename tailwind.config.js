module.exports = {
    content: ['.{html,js,css}'],
  theme: {
    colors: {
      'ral5000': '#314f6f',
      'blue-mud': '#202d31',
      'blue-beach': '#5F9CA2',
      'blue-dark': '#133c35',
      'gray-dark': '#141414',
      'gray-super': '#0a0a0a',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Signika', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),
],
}
