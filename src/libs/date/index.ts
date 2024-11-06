import { format } from "date-fns";
import { TIME_ZONE_CLASSIFICATION } from "./constants";

/**
 * 現在の日付を取得
 * @returns 現在の日付
 */
export const getCurrentDate = () => {
  return format(new Date(), "yyyy/MM/dd");
};

/**
 * 現在の時間を取得
 * @returns 現在の時間
 */
export const getCurrentTime = () => {
  return format(new Date(), "HH:mm");
};

/**
 * 時間帯の分類を取得
 * @param currentHour 現在の時間
 * @returns 時間帯の分類
 */
export const getTimeZoneClassification = (currentHour: number) => {
  // タイムゾーンの分類
  if (currentHour >= 5 && currentHour < 12) {
    return TIME_ZONE_CLASSIFICATION.MORNING;
  }

  if (currentHour >= 12 && currentHour < 15) {
    return TIME_ZONE_CLASSIFICATION.NOON;
  }

  if (currentHour >= 15 && currentHour < 19) {
    return TIME_ZONE_CLASSIFICATION.EVENING;
  }

  // 19時以上または5時未満の場合
  return TIME_ZONE_CLASSIFICATION.NIGHT;
};
