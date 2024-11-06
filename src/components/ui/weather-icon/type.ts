import { WEATHER_TYPE } from "./constants";

export type WeatherIconProps = {
  weatherType: (typeof WEATHER_TYPE)[keyof typeof WEATHER_TYPE];
  isLazy?: boolean;
};
