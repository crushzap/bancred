import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBaseUrl = env.VITE_API_BASE_URL || ''
  const apiTarget = apiBaseUrl.replace(/\/api\/?$/, '')
  const proxy: Record<string, { target: string; changeOrigin: boolean; secure?: boolean }> = {
    '/consulta': {
      target: 'http://localhost:3005',
      changeOrigin: true,
    },
  }

  if (apiTarget) {
    proxy['/api'] = {
      target: apiTarget,
      changeOrigin: true,
      secure: false,
    }
  }

  return {
    plugins: [react()],
    server: {
      proxy,
    },
  }
})
