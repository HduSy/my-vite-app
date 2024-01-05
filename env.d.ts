// TypeScript 的智能提示
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  readonly TEAT_APIENV: string
  readonly TEAT_PLATFORM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
