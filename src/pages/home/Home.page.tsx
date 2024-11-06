import { useEffect, useMemo, useState } from "react";
import HomeTemplate from "../../components/templates/home/Home.template";
import { HomeTemplateProps } from "../../components/templates/home/type";
import useForecast from "../../hooks/forecast";
import {
  getCurrentDate,
  getCurrentTime,
  getTimeZoneClassification,
} from "../../libs/date";

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const location = { latitude: 34.7022887, longitude: 135.4953509 };
  const { data } = useForecast(location);

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
      currentDate: getCurrentDate(),
      currentTime,
      timeZoneClassification: getTimeZoneClassification(
        Number(currentTime.split(":")[0]),
      ),
      cityName: data?.city.name ?? "",
      weatherList: data?.list ?? [],
    }),
    [currentTime, data],
  );

  return <HomeTemplate {...homeTemplateProps} />;
};

HomePage.whyDidYouRender = true;
export default HomePage;
