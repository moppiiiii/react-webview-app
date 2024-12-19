import BaseLayout from "../../layouts/base-layout/Base.layout";
import CurrentDate from "./_ui/current-date/CurrentDate.ui";
import TodaysWeatherList from "./_ui/todays-weather-list/TodaysWeatherList.ui";
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
        <CurrentDate currentDate={currentDate} currentTime={currentTime} />
        <TodaysWeatherList
          cityName={cityName}
          todaysWeatherList={todaysWeatherList}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a href="/400">400 Bad Request エラーレスポンス検証</a>
        <a href="/401">401 Unauthorized エラーレスポンス検証</a>
        <a href="/500">500 Internal Server Error エラーレスポンス検証</a>
      </div>
    </BaseLayout>
  );
};

HomeTemplate.whyDidYouRender = true;
export default HomeTemplate;
