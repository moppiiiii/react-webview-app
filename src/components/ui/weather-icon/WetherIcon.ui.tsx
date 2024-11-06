import { WEATHER_TYPE } from "./constants";
import WiThunderstorm from "../../../assets/icons/thunder.svg";
import WiDrizzle from "../../../assets/icons/drizzle.svg";
import WiRain from "../../../assets/icons/rainy.svg";
import WiSnow from "../../../assets/icons/snowy.svg";
import WiDaySunny from "../../../assets/icons/day.svg";
import WiCloudy from "../../../assets/icons/cloudy.svg";
import { WeatherIconProps } from "./type";

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherType, isLazy }) => {
  const iconMap: Record<
    (typeof WEATHER_TYPE)[keyof typeof WEATHER_TYPE],
    string
  > = {
    [WEATHER_TYPE.THUNDER_STORM]: WiThunderstorm,
    [WEATHER_TYPE.DRIZZLE]: WiDrizzle,
    [WEATHER_TYPE.RAIN]: WiRain,
    [WEATHER_TYPE.SNOW]: WiSnow,
    [WEATHER_TYPE.CLEAR]: WiDaySunny,
    [WEATHER_TYPE.CLOUDS]: WiCloudy,
  };

  return (
    <img
      loading={isLazy ? "lazy" : "eager"}
      alt={`${weatherType} icon`}
      src={iconMap[weatherType]}
    />
  );
};

WeatherIcon.whyDidYouRender = true;
export default WeatherIcon;
