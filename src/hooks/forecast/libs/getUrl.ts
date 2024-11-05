import { WEATHER_API_ENDPOINTS } from "../../constants";

/**
 * 5日間の天気予報を取得する API の URL を取得する
 * @param location 天気情報を取得する座標
 * @returns 5日間の天気予報を取得する API の URL
 */
const getUrl = (location: { latitude: number; longitude: number }) => {
  const baseUrl = `${import.meta.env.VITE_WEATHER_API_URL}/${WEATHER_API_ENDPOINTS.FORECAST}`;
  const url = new URL(baseUrl);

  // 天気情報を取得する座標を設定
  url.searchParams.append("lat", location.latitude.toString());
  url.searchParams.append("lon", location.longitude.toString());
  // 言語を日本語に設定
  url.searchParams.append("lang", "jp");
  // 取得温度を摂氏温度に設定
  url.searchParams.append("units", "metric");
  // APIキーを設定
  url.searchParams.append("appid", import.meta.env.VITE_WEATHER_API_KEY);

  return url.toString();
};

export default getUrl;
