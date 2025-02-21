/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				audiowide: ["Audiowide", "serif"],
				geist: ["Geist", "sans-serif"], // Changed 'serif' to 'sans-serif' for modern look
			},
			colors: {
				text: "#E0E6ED", // Light gray for high readability (instead of #37b6d2)
				background: "#0A0F1F", // Dark navy blue for depth (instead of #000024)
				background_2: "#12172B", // Slightly lighter navy for layered contrast
				background_3: "#191D36", // Further softened variation
				primary: "#6D28D9", // More vibrant purple for buttons & key elements
				secondary: "#6472d5", // Softer blue for secondary elements
				accent: "#22C55E", // A fresh green for highlights and success messages
				border: "#292F4C", // More subtle and modern border color
			},
		},
	},
	plugins: [],
}
