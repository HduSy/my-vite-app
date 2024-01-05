import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[hash]_[name].[ext]'
      },
    },
    outDir: 'dist',
    assetsDir: 'static',
    assetsInlineLimit: 4096000,
    emptyOutDir: true,
  }
})