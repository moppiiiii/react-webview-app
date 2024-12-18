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
      // Service Worker の登録タイプ
      registerType: 'autoUpdate',
      // Service Worker の登録スクリプトをインラインで注入
      injectRegister: 'inline',
      // Web App Manifest を無効化
      manifest: false,
      // Workbox の設定
      workbox: {
        // プリキャッシュ設定
        // Vite が生成するビルドファイルを自動的にプリキャッシュ
        // 特別な設定が不要な場合、vite-plugin-pwa が自動で処理します
        // ただし、必要に応じて globPatterns をカスタマイズ可能
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif}'],
        // ランタイムキャッシング設定
        runtimeCaching: [
          {
            // 画像などの静的アセットをキャッシュする場合
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'NetworkFirst', // キャッシュファースト戦略
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100, // キャッシュエントリの最大数
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30日（秒）
              },
            },
          },
        ],
        // 以下のオプションを追加することで、Service Worker の即時適用を可能にします
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  build: {
    assetsInlineLimit: 0,
  },
});
