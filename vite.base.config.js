import vue from '@vitejs/plugin-vue';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from "vite";
import MyAliasPlugin from './plugins/MyAliasPlugin';

export default defineConfig({
  plugins: [ vue(), MyAliasPlugin()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly', // 生成的样式对象类型key形式，camel or dash
      scopeBehaviour: 'local', // 是否开启css模块化
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
    devSourcemap: true,
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  },
  resolve: {
    alias: {
      '@': './src',
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  optimizeDeps: {
    force: true
  }
})