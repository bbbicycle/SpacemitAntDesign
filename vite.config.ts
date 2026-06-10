import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('ant-design-vue') || id.includes('@ant-design/icons-vue')) {
              return 'ant-design-vendor'
            }
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
