import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    // assigning project port
    host: '0.0.0.0',
    port: 6721,
    allowedHosts: ['VisualizationKB.northdev.xyz', 'localhost', '192.168.2.41'],
    proxy: {
      '/api': {
        target: 'http://localhost:6710',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
