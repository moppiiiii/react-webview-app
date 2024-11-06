import BaseLayout from "../../layouts/Base.layout";
import WeatherIcon from "../../ui/weather-icon/WetherIcon.ui";
import styles from "./Home.template.module.scss";
import { HomeTemplateProps } from "./type";

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  currentDate,
  currentTime,
  timeZoneClassification,
  cityName,
  weatherList,
}) => {
  const todaysWeather = weatherList.slice(0, 8);

  return (
    <BaseLayout timeZoneClassification={timeZoneClassification}>
      <div className={styles["home-container"]}>
        <p className={styles["current-date"]}>{currentDate}</p>
        <p className={styles["current-time"]}>{currentTime}</p>
        <div className={styles["todays-weather-wrapper"]}>
          <p className={styles["city-name"]}>{cityName}</p>
          <div className={styles["todays-weather-list"]}>
            {todaysWeather.map((weather) => {
              return (
                <div key={weather.dt} className={styles["weather-card"]}>
                  <WeatherIcon weatherType={weather.weather[0].main} />
                  <p className={styles["weather-time"]}>
                    {new Date(weather.dt_txt).getHours().toString().padStart(2, '0')}:
                    {new Date(weather.dt_txt).getMinutes().toString().padStart(2, '0')}
                  </p>
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
