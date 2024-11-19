import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/clinicadental': {
        target: 'http://localhost:8081', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})