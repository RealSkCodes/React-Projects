/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ["Audiowide", "serif"],
        geist: ["Geist", "serif"],
      },
      colors: {
        text: "#e4e5fb", // text, headings, readable content
        background: "#020617", // website background
        background_2: "#0c1222",
        primary: "#460fa5", // buttons, links, key interactive elements
        secoundary: "#7783f0", // navigation bars, secondary buttons, hover effects
        accent: "#77e93a", // callouts, success messages, attention-grabbing elements
        border: "#7D7467",
      },
    },
  },
  plugins: [],
}
