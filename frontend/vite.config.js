import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // Force Vite to always use port 5174
    strictPort: true, // Prevents Vite from switching to another port
  },
})
