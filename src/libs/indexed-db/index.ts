import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface WeatherDB extends DBSchema {
  apiCache: {
    key: string;
    value: {
      timestamp: number;
      data: any;
    };
    indexes: { 'by-timestamp': number };
  };
}

let dbPromise: Promise<IDBPDatabase<WeatherDB>>;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<WeatherDB>('WeatherAppDB', 1, {
      upgrade(db) {
        const store = db.createObjectStore('apiCache', {
          keyPath: 'key',
        });
        store.createIndex('by-timestamp', 'timestamp');
      },
    });
  }
  return dbPromise;
}