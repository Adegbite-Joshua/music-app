/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html', // For Vite
    './src/**/*.{js,ts,jsx,tsx}', // Adjust based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
