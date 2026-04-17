import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/off': {
        target: 'https://world.openfoodfacts.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/off/, ''),
      },
    },
  },
})
