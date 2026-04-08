import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 插件前端打包为单个 ESM 入口，由 core 的 plugin-loader 在运行时动态加载。
// react 由 core 通过 window.__airgate_shared 提供，插件不重复打包。
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
