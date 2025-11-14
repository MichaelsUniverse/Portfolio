import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
        'comp-229-fo3y.onrender.com'
    ]
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
