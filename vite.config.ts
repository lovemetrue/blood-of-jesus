import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// При запуске npm run dev из blood-of-jesus собираем frontend/, а не корневой src/
const projectRoot = path.resolve(__dirname, 'frontend')

export default defineConfig({
  root: projectRoot,
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, 'src'),
    },
  },
})
