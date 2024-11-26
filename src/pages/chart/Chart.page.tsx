import { useEffect, useState } from "react";
import ChartTemplate from "../../components/templates/chart/Chart.template";
import { ChartTemplateProps } from "../../components/templates/chart/type";
import useForecast from "../../hooks/forecast";
import { getCurrentTime, getTimeZoneClassification } from "../../libs/date";

const ChartPage: React.FC = () => {
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

  const chartTemplateProps: ChartTemplateProps = {
    timeZoneClassification: getTimeZoneClassification(
      Number(currentTime.split(":")[0]),
    ),
    weatherList: data?.list ?? [],
  };

  return <ChartTemplate {...chartTemplateProps} />;
};

ChartPage.whyDidYouRender = true;
export default ChartPage;
