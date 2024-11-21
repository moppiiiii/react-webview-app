import { useEffect, useState } from "react";
import { ForecastResponse, UseForecastResponse } from "./type";
import getUrl from "./libs/getUrl";
import { fetcher } from "../../libs/fetcher";

const useForecast = (
  location: { latitude: number; longitude: number },
): UseForecastResponse => {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const forecastUrl = getUrl(location);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const result = await fetcher<ForecastResponse>(forecastUrl);
      setData(result);
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastUrl]); // forecastUrl が変わったときに再フェッチ

  return {
    data: data!,
    isLoading,
    isError,
    error,
  };
};
export default useForecast;