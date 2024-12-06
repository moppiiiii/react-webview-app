import { useState, useEffect } from "react";
import { RechartTemplateProps } from "../../components/templates/rechart/type";
import RechartTemplate from "../../components/templates/rechart/Rechart.template";
import useForecast from "../../hooks/forecast";
import { getCurrentTime, getTimeZoneClassification } from "../../libs/date";

const RechartPage: React.FC = () => {
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

  const chartTemplateProps: RechartTemplateProps = {
    timeZoneClassification: getTimeZoneClassification(
      Number(currentTime.split(":")[0]),
    ),
    weatherList: data?.list ?? [],
  };

  return <RechartTemplate {...chartTemplateProps} />;
};

RechartPage.whyDidYouRender = true;
export default RechartPage;
