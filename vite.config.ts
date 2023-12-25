/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'; // vite中的defineConfig 不包含test选项，故改为使用vitest/config中引入 活使用vitest.config.js 配置test选项
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
// import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(), // 项目index.html 的位置
  base: '/project/', // 公共基础路径
  mode: '',
  plugins: [
    vue(),
    // visualizer({
    //   gzipSize: false,
    //   brotliSize: true,
    //   emitFile: false,
    //   filename: "test.html", //分析图生成的文件名
    //   open: true //如果存在本地服务端口，将在打包后自动展示
    // }),
    viteCompression(
      {
        filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件
        algorithm: 'gzip',
        threshold: 10240,
      }
    ),
  ],
  test: {
    // 模拟dom环境
    environment: "happy-dom",
    coverage: {
      // 覆盖率提供者
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      // 设置覆盖文件夹
      reportsDirectory: "./coverage",
      // 检查每个文件的阈值
      perFile: true,
      // 设置代码覆盖率阈值
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75,
    },
    open: true,
    include: ["./src/components/**/*.{test,spec}.{js,ts}"],
  },
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
      },
      '/common/images': {
        target: 'https://mock.tatakai.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common\/images/, '')
      },
    }
  },
  // build: {
  // sourcemap: true,
  // rollupOptions: {
  //   external: ['vue', 'element-plus'],
  //   plugins: [
  //     externalGlobals({
  //       vue: 'Vue',
  //       'element-plus': 'ElementPlus',
  //     }),
  //   ],
  // }
  // }
})
