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
        "visualiser": "radial-gradient(circle,'#a6b1e1' 0%,'#a6b1e1' 55%,'#a6b1e1' 60%,'#dcd6g7' 65%,'#dcd6g7' 70%,'#dcd6g7' 75%,'#f4eeff' 80%,'#f4eeff' 90%,'#f4eeff' 100%)",
      },
      animation: {
        loader1: "loadanim 1s linear infinite",
        loader2: "loadanim 1s 50ms linear infinite",
        loader3: "loadanim 1s 100ms linear infinite",
        loader4: "loadanim 1s 150ms linear infinite",
        loader5: "loadanim 1s 200ms linear infinite",
        loader6: "loadanim 1s 250ms linear infinite",
        loader7: "loadanim 1s 300ms linear infinite",
        cover: "coverspin 15s linear infinite",
        cover_paused: "coverspin 15s linear infinite paused",
      },

      keyframes: {
        loadanim: {
          "50%": { height: "1rem" },
        },

        coverspin: {
          "from": {transform: "rotate(0deg)"},
          "to": {transform: "rotate(360deg)"},
        }
      },
    },
  },
  plugins: [],
};
