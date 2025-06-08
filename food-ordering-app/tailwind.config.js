module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],safelist: [
    'text-gray-800',
    'text-blue-600',
    'mb-4',
    'mb-8'
  ],
  theme: {
    extend: {

         backgroundImage: {
        'hero-pattern': "url('/path-to-your-bg.jpg')",
      },
    },
  },
  plugins: [],
};
