import { TIME_ZONE_CLASSIFICATION } from "../../../libs/date/constants";
import { WEATHER_TYPE } from "../../ui/weather-icon/constants";

type TodaysWeatherList = {
  weatherType: (typeof WEATHER_TYPE)[keyof typeof WEATHER_TYPE];
  time: string;
};

export type HomeTemplateProps = {
  currentDate: string;
  currentTime: string;
  timeZoneClassification: (typeof TIME_ZONE_CLASSIFICATION)[keyof typeof TIME_ZONE_CLASSIFICATION];
  cityName: string;
  todaysWeatherList: TodaysWeatherList[];
};
