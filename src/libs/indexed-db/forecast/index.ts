import { db, ForecastEntry } from "../index";
import {
  ForecastResponse,
  ForecastResponseSchema,
} from "../../../hooks/forecast/type";

/**
 * Saves a ForecastResponse to IndexedDB after validating it with Zod.
 * @param forecast The ForecastResponse object to save.
 * @returns The saved ForecastEntry.
 */
export async function saveForecast(
  forecast: unknown,
): Promise<ForecastEntry | null> {
  try {
    // Validate the forecast data
    console.log("データをindexedDBに保存します");
    const parsedForecast = ForecastResponseSchema.parse(forecast);

    const entry: ForecastEntry = {
      timestamp: Date.now(),
      data: parsedForecast,
    };

    // Add to IndexedDB
    const id = await db.forecasts.add(entry);
    console.log(`Forecast saved with ID: ${id}`);
    console.log("データをindexedDBに保存しました");
    return { ...entry, id };
  } catch (error) {
    console.error("Error saving forecast:", error);
    return null;
  }
}

/**
 * Retrieves all ForecastResponses from IndexedDB.
 * @returns An array of ForecastResponse objects.
 */
export async function getAllForecasts(): Promise<ForecastResponse[]> {
  console.log("データをindexedDBから取得します");
  const entries = await db.forecasts.toArray();
  console.log("取得が完了したので返却します");
  return entries.map((entry) => entry.data);
}

/**
 * Retrieves the latest ForecastResponse based on timestamp.
 * @returns The latest ForecastResponse or undefined if none exist.
 */
export async function getLatestForecast(): Promise<
  ForecastResponse | undefined
> {
  try {
    const entry = await db.forecasts.orderBy("timestamp").last();

    if (entry) {
      console.log("最新のデータをindexedDBから取得します");
      console.log("Retrieved forecast from IndexedDB:", entry);
      console.log(entry?.data);
      console.log("取得が完了したので返却します");
      return entry.data;
    } else {
      console.warn("No forecast entries found in IndexedDB.");
      return undefined;
    }
  } catch (error) {
    console.error("Error retrieving forecast:", error);
    return undefined;
  }
}

/**
 * Clears all forecasts from IndexedDB.
 */
export async function clearForecasts(): Promise<void> {
  try {
    await db.forecasts.clear();
    console.log("All forecasts cleared from IndexedDB.");
  } catch (error) {
    console.error("Error clearing forecasts:", error);
  }
}

/**
 * APIからForecastを取得し、IndexedDBに保存する。失敗した場合はIndexedDBから取得する。
 * @returns ForecastResponseまたはnull。
 */
export async function fetchForecast(): Promise<ForecastResponse | null> {
  if (navigator.onLine) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=34.7022887&lon=135.4953509&lang=jp&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
      ); // 実際のAPIエンドポイントに変更してください
      if (!response.ok) {
        throw new Error(`API response was not ok: ${response.statusText}`);
      }
      const data = await response.json();

      // IndexedDBに保存
      const saved = await saveForecast(data);
      if (saved) {
        return data as ForecastResponse;
      } else {
        throw new Error("Failed to save forecast to IndexedDB.");
      }
    } catch (error) {
      console.warn(
        "Fetch failed, attempting to retrieve from IndexedDB:",
        error,
      );
      // フェッチに失敗した場合でもIndexedDBからデータを取得
      const savedForecast = await getLatestForecast();
      if (savedForecast) {
        return savedForecast;
      } else {
        console.error("No forecast data available in IndexedDB.");
        return null;
      }
    }
  } else {
    console.log("Offline: Retrieving forecast from IndexedDB.");
    // オフラインの場合はIndexedDBからデータを取得
    const savedForecast = await getLatestForecast();
    if (savedForecast) {
      return savedForecast;
    } else {
      console.error("No forecast data available in IndexedDB.");
      return null;
    }
  }
}
