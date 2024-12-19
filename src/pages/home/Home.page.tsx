import { useEffect, useMemo, useState } from "react";
import HomeTemplate from "../../components/templates/home/Home.template";
import { HomeTemplateProps } from "../../components/templates/home/type";
import useForecast from "../../hooks/forecast";
import {
  getCurrentDate,
  getCurrentTime,
  getDesignatedDateTime,
  getTimeZoneClassification,
} from "../../libs/date";

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const location = { latitude: 34.7022887, longitude: 135.4953509 };
  const { data, error } = useForecast(location);

  // エラーがある場合は、ErrorBoundaryに伝播させる
  if (error) {
    throw error;
  }

  const currentDate = getCurrentDate();

  useEffect(() => {
    // 1秒ごとに時刻を更新するためのインターバルを設定
    const timerId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // クリーンアップ関数でインターバルをクリア
    return () => clearInterval(timerId);
  }, []);

  const homeTemplateProps: HomeTemplateProps = useMemo(
    () => ({
      currentDate,
      currentTime,
      timeZoneClassification: getTimeZoneClassification(
        Number(currentTime.split(":")[0]),
      ),
      cityName: data && !error ? data.city.name : "",
      todaysWeatherList:
        data && !error
          ? data.list
              .filter((v) => v.dt_txt.includes(currentDate))
              .map((v) => ({
                weatherType: v.weather[0].main,
                time: getDesignatedDateTime(v.dt_txt),
              }))
          : [],
    }),
    [currentTime, data, currentDate, error],
  );

  return <HomeTemplate {...homeTemplateProps} />;
};

HomePage.whyDidYouRender = true;
export default HomePage;
