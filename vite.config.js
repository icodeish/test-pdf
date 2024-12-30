import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  devServer: {
    proxy: {
     '/api': {//匹配/api开头的请求
  ​    target: 'https://pay-staging.zkeduo.com',//转发的目标服务器
  ​    changeOrigin: true,//允许跨域
  ​    rewrite: (path) => path.replace(/^\/api/, '')//在请求转发前移除/api
     }
    }
  }

})
