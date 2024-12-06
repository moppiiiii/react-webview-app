// import BaseLayout from "../../layouts/base-layout/Base.layout";
import { RechartTemplateProps } from "./type";
import styles from "./Rechart.template.module.scss";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxisProps,
  LegendProps,
  YAxisProps,
} from "recharts";
import { memo } from "react";

const data = [
  { date: "9/9", average: 4.5, you: 3 },
  { date: "9/10", average: 4.8, you: 4 },
  { date: "9/11", average: 4.5, you: 2 },
  { date: "9/12", average: 4.9, you: 9 },
  { date: "9/13", average: 4.8, you: 7 },
  { date: "9/14", average: 4.7, you: 1 },
  { date: "9/15", average: 5.1, you: 3 },
];

const renderCustomizedTick: XAxisProps["tick"] = (props) => {
  const { x, y, payload } = props as {
    x: number;
    y: number;
    payload: { value: string };
  };
  const isTargetDate = payload.value === "9/15";
  const fillColor = isTargetDate ? "#2C2C2B" : "#94938F";

  return (
    <text
      x={x}
      y={y + 16} // テキストの垂直位置を調整
      textAnchor="middle"
      fill={fillColor}
      fontSize={14} // フォントサイズを14pxに設定
    >
      {payload.value}
    </text>
  );
};

const legendFormatter: LegendProps["formatter"] = (value) => {
  return <span style={{ fontSize: "10px", color: "#94938F" }}>{value}</span>;
};

const renderCustomizedYAxisTick: YAxisProps["tick"] = (props) => {
  const { x, y, payload } = props as {
    x: number;
    y: number;
    payload: { value: number };
  };

  if (payload.value === 0) {
    return <></>;
  }

  return (
    <text
      x={x}
      y={y} // テキストの垂直位置を調整
      textAnchor="end"
      fill="#909090" // フォントカラーを#909090に設定
      fontSize={10} // フォントサイズを10pxに設定
    >
      {payload.value}
    </text>
  );
};

const RechartTemplate: React.FC<RechartTemplateProps> = memo(
  ({ timeZoneClassification, weatherList }) => {
    console.log(timeZoneClassification);
    console.log(weatherList);

    return (
      // <BaseLayout timeZoneClassification={timeZoneClassification}>
      <div className={styles["rechart-container"]}>
        <div className={styles["rechart-wrapper"]}>
          <p className={styles["title"]}>今週の記事閲覧数</p>
          <div className={styles["data-layer"]}>
            <div className={styles["data-layer-item"]}>
              <p className={styles["data-name"]}>あなた</p>
              <div className={styles["data-detail"]}>
                <p className={styles["data-value"]}>25</p>
                <p className={styles["data-text"]}>記事</p>
              </div>
            </div>
            <div className={styles["data-layer-item"]}>
              <p className={styles["data-name"]}>他ユーザーの平均</p>
              <div className={styles["data-detail"]}>
                <p className={styles["data-value"]}>32.8</p>
                <p className={styles["data-text"]}>記事</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={165}>
            <ComposedChart data={data}>
              {/* X軸の設定 */}
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={renderCustomizedTick}
              />

              {/* Y軸の設定 */}
              <YAxis
                domain={[0, 10]}
                ticks={[0, 5, 10]}
                axisLine={false}
                tickLine={false}
                width={20}
                tick={renderCustomizedYAxisTick}
              />

              {/* グリッドラインの設定 */}
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e0e0e0"
              />

              {/* 凡例の設定 */}
              <Legend
                verticalAlign="bottom"
                align="right"
                iconSize={7}
                wrapperStyle={{ paddingTop: 12 }}
                formatter={legendFormatter}
              />

              {/* バーチャート（あなた） */}
              <Bar
                dataKey="you"
                name="あなた"
                fill="#39827B"
                barSize={26}
                legendType="square"
              />

              {/* ラインチャート（他ユーザーの平均） */}
              <Line
                type="linear"
                dataKey="average"
                name="他ユーザーの平均"
                stroke="#94938F"
                strokeWidth={2}
                dot={false}
                legendType="plainline"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      // </BaseLayout>
    );
  },
);

RechartTemplate.whyDidYouRender = true;
export default RechartTemplate;
