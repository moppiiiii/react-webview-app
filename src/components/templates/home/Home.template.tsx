import BaseLayout from "../../layouts/Base.layout";
import WeatherIcon from "../../ui/weather-icon/WetherIcon.ui";
import styles from "./Home.template.module.scss";
import { HomeTemplateProps } from "./type";

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  currentDate,
  currentTime,
  timeZoneClassification,
  cityName,
  todaysWeatherList,
}) => {
  return (
    <BaseLayout timeZoneClassification={timeZoneClassification}>
      <div className={styles["home-container"]}>
        <p className={styles["current-date"]}>{currentDate}</p>
        <p className={styles["current-time"]}>{currentTime}</p>
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
      </div>
    </BaseLayout>
  );
};

HomeTemplate.whyDidYouRender = true;
export default HomeTemplate;
