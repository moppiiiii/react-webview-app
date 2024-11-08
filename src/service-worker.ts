/// <reference lib="webworker" />

import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { openDB } from "idb";
import { ForecastResponse } from "./hooks/forecast/type";
import {
  API_CACHE_NAME,
  OFFLINE_DB_NAME,
  STATIC_ASSETS_CACHE_NAME,
} from "./libs/indexed-db/constants";
import { WEATHER_API_ENDPOINTS } from "./hooks/constants";

declare const self: ServiceWorkerGlobalScope;

// キャッシュされたビルドアセットを事前キャッシュ
precacheAndRoute(self.__WB_MANIFEST);

// シングルページアプリケーションの場合
const handler = createHandlerBoundToURL("/index.html");
registerRoute(({ request }) => {
  // navigation request
  if (request.mode === "navigate") {
    return true;
  }
  return false;
}, handler);

// 静的アセットのキャッシュ
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font",
  new StaleWhileRevalidate({
    cacheName: STATIC_ASSETS_CACHE_NAME,
  }),
);

// APIリクエストのキャッシュ戦略
const API_BASE_URL = process.env.VITE_API_BASE_URL ?? '';

registerRoute(
  ({ url }) => url.origin === new URL(API_BASE_URL).origin,
  new NetworkFirst({
    cacheName: API_CACHE_NAME,
    networkTimeoutSeconds: 1,
    plugins: [
      {
        async cacheDidUpdate({ request, newResponse }) {
          const db = await openDB(OFFLINE_DB_NAME, 1);
          const urlObj = new URL(request.url);
          const endpoint = urlObj.pathname.split("/")[1];

          // クエリパラメータを含めたキーの生成
          const queryParams = urlObj.searchParams.toString();
          const cacheKey = queryParams
            ? `${endpoint}?${queryParams}`
            : endpoint;

          if (endpoint === WEATHER_API_ENDPOINTS.FORECAST) {
            const data = (await newResponse.clone().json()) as ForecastResponse;
            await db.put(WEATHER_API_ENDPOINTS.FORECAST, {
              key: cacheKey,
              data,
            });
          }
        },
      },
    ],
  }),
);

// オフライン時のフォールバック
self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(API_BASE_URL)) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          return response;
        } catch (error) {
          console.error("Fetch failed; returning cached data instead.", error);
          const db = await openDB(OFFLINE_DB_NAME, 1);
          const url = new URL(event.request.url);
          const endpoint = url.pathname.split("/")[1];
          const queryParams = url.searchParams.toString();
          const cacheKey = queryParams
            ? `${endpoint}?${queryParams}`
            : endpoint;

          let cachedData;
          if (endpoint === WEATHER_API_ENDPOINTS.FORECAST) {
            const record = await db.get(
              WEATHER_API_ENDPOINTS.FORECAST,
              cacheKey,
            );
            cachedData = record ? record.data : null;
          }

          if (cachedData) {
            return new Response(cachedData, {
              headers: { "Content-Type": "application/json" },
            });
          }

          // データがキャッシュに存在しない場合
          return new Response(
            JSON.stringify({ error: "Data not available offline" }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      })(),
    );
  }
});
