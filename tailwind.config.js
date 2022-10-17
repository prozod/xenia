/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/*.{css,js,scss}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#111111",
          800: "#1A1A1A",
        },
      },
      keyframes: {
        scalein: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        scalein: "scalein 100ms ease-in 1",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
  },
  plugins: [],
};
