import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Vite config to handle proxying API calls in development
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.swiggy.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
})
