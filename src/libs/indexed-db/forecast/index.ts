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
export async function saveForecast(forecast: unknown): Promise<ForecastEntry> {
  // Validate the forecast data
  console.log("データをindexedDBに保存します");
  const parsedForecast = ForecastResponseSchema.parse(forecast);

  const entry: ForecastEntry = {
    timestamp: Date.now(),
    data: parsedForecast,
  };

  // Add to IndexedDB
  const id = await db.forecasts.add(entry);
  console.log("データをindexedDBに保存しました");
  return { ...entry, id };
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
  const entry = await db.forecasts.orderBy("timestamp").last();
  return entry?.data;
}

/**
 * Clears all forecasts from IndexedDB.
 */
export async function clearForecasts(): Promise<void> {
  await db.forecasts.clear();
}
