import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Make sure this matches the port you're using
  },
  build: {
    outDir: "dist", // Output directory for production builds
  },
})
