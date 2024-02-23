/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent-light-blue': '#f4eeff',
        'transparent-dark-blue': '#dcd6f7',
        'light-blue': '#a6b1e1',
        'dark-blue': '#424874',
        'light-red': '#e74c3c',
      }
    },
  },
  plugins: [],
};
