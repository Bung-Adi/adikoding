/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Your brand colors
        'studio-blue': '#20afdb',
        'studio-green': '#57da3d',
      },
      // Fine-tuning the Typography (Prose) plugin
      typography: {
        DEFAULT: {
          css: {
            'max-width': 'none', // Allows your content to fill the width you want
            color: '#cbd5e1', // Slate 300
            a: {
              color: '#20afdb',
              '&:hover': {
                color: '#57da3d',
              },
            },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            strong: { color: '#ffffff' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}