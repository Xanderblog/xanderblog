import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from the root ('/'); GitHub Pages serves from '/xanderblog/'.
// Vercel sets VERCEL=1 during its build, so the right base is picked automatically.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/xanderblog/',
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
