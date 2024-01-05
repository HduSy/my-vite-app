import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'

const viteConfig = {
  build: () => {
    console.debug('生产环境')
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  },
  serve: () => {
    console.debug('开发环境')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.debug('command', command, 'mode', mode)
  // const env = loadEnv(mode, process.cwd(), '')
  // console.debug(env)
  return viteConfig[command]()
})
