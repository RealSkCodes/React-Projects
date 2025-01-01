/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ["Audiowide", "serif"],
        notosans: ["Noto Sans", "serif"],
      },
      colors: {
        text: "#0b0a0f",
        background: "#f5f4fa",
        primary: "#4d3acb",
        secondary: "#8e7ff0",
        accent: "#5b42ff",
      },
    },
  },
  plugins: [],
}
