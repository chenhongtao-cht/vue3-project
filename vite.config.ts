import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(), // 项目index.html 的位置
  base: '/', // 公共基础路径
  mode: '',
  plugins: [
    vue(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "test.html", //分析图生成的文件名
      open: true //如果存在本地服务端口，将在打包后自动展示
    }),
    viteCompression(),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    //指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")]
      }
    },
    devSourcemap: true
  },
  server: {
    open: true, //在开发服务器启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // sourcemap: true,
    rollupOptions: {
      external: ['vue', 'element-plus'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        }),
      ],
    }
  }
})
