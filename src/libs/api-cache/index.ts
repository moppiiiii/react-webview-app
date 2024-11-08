// src/utils/apiCache.ts
import { getDB } from '../../libs/indexed-db';

const CACHE_DURATION = 1000 * 60 * 60; // 1時間

export async function fetchWithCache(url: string): Promise<any> {
  const db = await getDB();
  const cached = await db.get('apiCache', url);

  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log('キャッシュから取得:', url);
    return cached.data;
  }

  console.log('ネットワークから取得:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  await db.put('apiCache', { data, timestamp: now });

  return data;
}