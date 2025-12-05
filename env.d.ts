/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  // más variables si las agregas...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
