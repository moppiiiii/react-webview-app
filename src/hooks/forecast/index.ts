import useSWR, { SWRConfiguration } from "swr";
import { UseForecastResponse, type ForecastResponse } from "./type";
import getUrl from "./libs/getUrl";
import { fetchWithCache } from "../../libs/api-cache";

const useForecast = (
  location: { latitude: number; longitude: number },
  config?: SWRConfiguration,
): UseForecastResponse => {
  const forecastUrl = getUrl(location);

  const { data, error, mutate } = useSWR<ForecastResponse>(
    forecastUrl,
    fetchWithCache,
    config,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate: mutate as () => Promise<ForecastResponse | undefined>,
  };
};

export default useForecast;
