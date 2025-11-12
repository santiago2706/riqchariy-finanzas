import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  server: {
    proxy: {
      // Cualquier petición que empiece con '/api'
      '/api': {
        // será redirigida a tu backend
        target: 'http://127.0.0.1:8000',

        // Necesario para que el backend acepte la petición
        changeOrigin: true, 
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


