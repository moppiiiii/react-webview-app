import BaseLayout from "../../layouts/base-layout/Base.layout";
import { ChartTemplateProps } from "./type";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import styles from "./Chart.templte.module.scss";

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

const data: ChartData = {
  labels: ["9/9", "9/10", "9/11", "9/12", "9/13", "9/14", "9/15"],
  datasets: [
    {
      type: "line",
      label: "他ユーザーの平均",
      data: [4.5, 4.8, 4.5, 4.9, 4.8, 4.7, 5.1],
      borderColor: "#94938F",
      borderWidth: 2,
      fill: false,
      yAxisID: "y",
      pointRadius: 0,
      pointStyle: "line",
    },
    {
      type: "bar",
      label: "あなた",
      data: [3, 4, 2, 9, 7, 1, 3],
      backgroundColor: "#39827B",
      yAxisID: "y",
      pointStyle: "rect",
    },
  ],
};

const options: ChartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      type: "linear",
      position: "left",
      max: 10,
      grid: {
        lineWidth: 2,
        tickBorderDash: [1, 1],
        tickBorderDashOffset: 1,
      },
      title: {
        display: false,
      },
      ticks: {
        stepSize: 5, // 目盛りの間隔を5に設定
      },
      border: {
        display: false, // Y軸のボーダーラインを非表示
        dash: function (context) {
          if (context.tick.value === 0) {
            return []; // Y=0のグリッドラインを実線
          } else {
            return [5]; // その他のグリッドラインを破線
          }
        },
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      align: "end",
      labels: {
        usePointStyle: true, // デフォルトのアイコンスタイルを使用
        boxWidth: 7, // 凡例アイコンの幅
        padding: 20, // 凡例項目間の余白
        useBorderRadius: true,
        borderRadius: 5,
      },
      reverse: true,
    },
  },
};

const ChartTemplate: React.FC<ChartTemplateProps> = ({
  timeZoneClassification,
  weatherList,
}) => {
  console.log(weatherList);
  return (
    <BaseLayout timeZoneClassification={timeZoneClassification}>
      <div className={styles["chart-container"]}>
        <div className={styles["chart-wrapper"]}>
          <Chart type="bar" data={data} options={options} />
        </div>
      </div>
    </BaseLayout>
  );
};

ChartTemplate.whyDidYouRender = true;
export default ChartTemplate;
