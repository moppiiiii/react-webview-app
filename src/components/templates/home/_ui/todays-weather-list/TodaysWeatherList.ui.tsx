import WeatherIcon from "../../../../ui/weather-icon/WetherIcon.ui";
import styles from "./TodaysWeatherList.ui.module.scss";
import { TodaysWeatherListProps } from "./type";

const TodaysWeatherList: React.FC<TodaysWeatherListProps> = ({
  cityName,
  todaysWeatherList,
}) => {
  return (
    <div className={styles["todays-weather-wrapper"]}>
      <p className={styles["city-name"]}>{cityName}</p>
      <div className={styles["todays-weather-list"]}>
        {todaysWeatherList.map((weather) => {
          return (
            <div key={weather.time} className={styles["weather-card"]}>
              <WeatherIcon weatherType={weather.weatherType} />
              <p className={styles["weather-time"]}>{weather.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TodaysWeatherList.whyDidYouRender = true;
export default TodaysWeatherList;
