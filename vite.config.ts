import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: el sitio funciona en cualquier subcarpeta (GitHub Pages) o dominio propio.
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
