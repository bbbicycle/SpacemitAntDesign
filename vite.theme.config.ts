import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/theme/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist/theme',
    emptyOutDir: true,
    rollupOptions: {
      external: ['ant-design-vue', 'vue'],
    },
  },
})
