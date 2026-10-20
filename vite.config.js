import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repository name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/xanderblog/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
