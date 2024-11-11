import { useEffect, useState } from "react";
import {
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
          // Replace with your actual API call
          const response = await fetch(
            `${import.meta.env.VITE_WEATHER_API_URL}/forecast?lat=34.7022887&lon=135.4953509&lang=jp&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
          );
          const data = await response.json();

          // Save to IndexedDB
          await saveForecast(data);

          setForecast(data as ForecastResponse);
        } else {
          // Retrieve from IndexedDB
          const savedForecast = await getLatestForecast();
          if (savedForecast) {
            setForecast(savedForecast);
          } else {
            setError("No forecast data available offline.");
          }
        }
      } catch (err) {
        setError("Failed to fetch forecast data.");
        console.error(err);
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
    </div>
  );
};

HomePage.whyDidYouRender = true;
export default HomePage;
