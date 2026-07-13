import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    // Inline imported images as base64 so the production build stays a
    // single JS/CSS pair with no separate asset files to serve.
    assetsInlineLimit: 1024 * 1024,
  },
})
