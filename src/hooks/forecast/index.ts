import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "../../libs/fetcher";
import { UseForecastResponse, type ForecastResponse } from "./type";
import getUrl from "./libs/getUrl";

const useForecast = (
  location: { latitude: number; longitude: number },
  config?: SWRConfiguration,
): UseForecastResponse => {
  const forecastUrl = getUrl(location);

  const { data, error, mutate } = useSWR<ForecastResponse>(
    forecastUrl,
    fetcher,
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
