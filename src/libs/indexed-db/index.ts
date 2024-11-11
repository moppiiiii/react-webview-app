import Dexie, { Table } from "dexie";
import { ForecastResponse } from "../../hooks/forecast/type";

export interface ForecastEntry {
  id?: number; // Auto-incremented primary key
  timestamp: number; // Unix timestamp when the entry was saved
  data: ForecastResponse;
}

export class ForecastDatabase extends Dexie {
  forecasts!: Table<ForecastEntry, number>;

  constructor() {
    super("ForecastDatabase");
    this.version(1).stores({
      forecasts: "++id, timestamp",
    });
  }
}

export const db = new ForecastDatabase();
