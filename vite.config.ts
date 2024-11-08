import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    sassDts({
      enabledMode: ["development", "production"],
      global: {
        generate: false,
        outputFilePath: "",
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
    }),
  ],
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
  },
  build: {
    assetsInlineLimit: 0, // アセットのインライン化を無効化
  },
});
