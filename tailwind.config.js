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
        "transparent-light-blue": "#f4eeff",
        "transparent-dark-blue": "#dcd6f7",
        "light-blue": "#a6b1e1",
        "dark-blue": "#424874",
        "light-red": "#e74c3c",
      },
      animation: {
        loader1: "loadanim 1s linear infinite",
        loader2: "loadanim 1s 50ms linear infinite",
        loader3: "loadanim 1s 100ms linear infinite",
        loader4: "loadanim 1s 150ms linear infinite",
        loader5: "loadanim 1s 200ms linear infinite",
        loader6: "loadanim 1s 250ms linear infinite",
        loader7: "loadanim 1s 300ms linear infinite",
      },

      keyframes: {
        loadanim: {
          "50%": { height: "1rem" },
        },
      },
    },
  },
  plugins: [],
};
