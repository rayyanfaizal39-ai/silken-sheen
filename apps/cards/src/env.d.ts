/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CARDS_SITE_URL?: string;
  readonly VITE_CARDS_STANDALONE?: string;
  readonly VITE_MAIN_SITE_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
