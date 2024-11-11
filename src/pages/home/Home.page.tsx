import { useEffect, useState } from "react";
import {
  clearForecasts,
  getLatestForecast,
  saveForecast,
} from "../../libs/indexed-db/forecast";
import { ForecastResponse } from "../../hooks/forecast/type";

const HomePage: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        if (navigator.onLine) {
          console.log("オンラインです");
          // Replace with your actual API call
          const response = await fetch(
            `${import.meta.env.VITE_WEATHER_API_URL}/forecast?lat=34.7022887&lon=135.4953509&lang=jp&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
          );

          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`,
            );
          }

          const data = await response.json();

          // IndexedDBに保存
          const saved = await saveForecast(data);
          if (saved) {
            setForecast(data as ForecastResponse);
          } else {
            throw new Error("Failed to save forecast to IndexedDB.");
          }
        } else {
          console.log("オフラインです");
          // Retrieve from IndexedDB
          const savedForecast = await getLatestForecast();
          console.log("indexedDBから取得したデータ", savedForecast);
          if (savedForecast) {
            setForecast(savedForecast);
          } else {
            setError("No forecast data available offline.");
          }
        }
      } catch (fetchError) {
        console.warn(
          "Fetch failed, attempting to retrieve from IndexedDB:",
          fetchError,
        );

        // IndexedDBからデータを取得
        const savedForecast = await getLatestForecast();
        if (savedForecast) {
          setForecast(savedForecast);
        } else {
          setError("No forecast data available offline.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();

    // Optional: Listen for online/offline events to sync data
    window.addEventListener("online", fetchForecast);

    return () => {
      window.removeEventListener("online", fetchForecast);
    };
  }, []);

  if (loading) return <div>Loading forecast...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Weather Forecast for {forecast?.city.name}</h2>
      {/* Render forecast details */}
      {/* Example: */}
      <p>Temperature: {forecast?.list[0].main.temp}°C</p>
      <p>Weather: {forecast?.list[0].weather[0].description}</p>
      {/* Add more details as needed */}
      <button
        style={{ border: "1px solid black", marginTop: "20px" }}
        onClick={() => clearForecasts()}
      >
        Cache Clear
      </button>
    </div>
  );
};

HomePage.whyDidYouRender = true;
export default HomePage;
