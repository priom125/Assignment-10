import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← MUST be here!
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}