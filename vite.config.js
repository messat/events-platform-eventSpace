import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.CLIENT_ID' : JSON.stringify(env.CLIENT_ID)
    },
    plugins: [react()],
    resolve : {
      mainFields: []
    }
  }
})
