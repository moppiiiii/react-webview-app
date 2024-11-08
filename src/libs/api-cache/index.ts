import { getDB } from '../../libs/indexed-db';

const CACHE_DURATION = 1000 * 60 * 60; // 1時間

export async function fetchWithCache<T>(url: string): Promise<T> {
  if (!url) {
    console.error('fetchWithCache called with undefined or empty url');
    throw new Error('URL is required');
  }

  console.log('Fetching URL:', url); // デバッグ用ログ
  const db = await getDB();
  const cached = await db.get('apiCache', url);

  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log('キャッシュから取得:', url);
    return cached.data as T;
  }

  console.log('ネットワークから取得:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    console.log('Fetched data:', data); // デバッグ用ログ

    // データが正しく取得できた場合のみ保存
    if (data) {
      const entry = { key: url, data, timestamp: now };
      console.log('Storing in IndexedDB:', entry); // デバッグ用ログ
      await db.put('apiCache', entry);
      console.log('データをIndexedDBに保存しました:', url);
    } else {
      console.warn('取得したデータが空です:', url);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}