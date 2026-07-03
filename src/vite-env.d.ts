/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_APP_HOST: string;
  readonly VITE_MULTIPLAYER_HOST: string;
  readonly VITE_MULTIPLAYER_WS: string;
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly VITE_PREVIEW_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
