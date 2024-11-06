import { TIME_ZONE_CLASSIFICATION } from "./constants";

/**
 * 数値を2桁の文字列にフォーマットするヘルパー関数
 * @param num 数値
 * @returns 2桁の文字列
 */
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0');
};

/**
 * 現在の日付を取得
 * @returns 現在の日付 (形式: yyyy-MM-dd)
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = padZero(now.getMonth() + 1); // 月は0から始まるため +1
  const day = padZero(now.getDate());
  return `${year}-${month}-${day}`;
};

/**
 * 現在の時間を取得
 * @returns 現在の時間 (形式: HH:mm)
 */
export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  return `${hours}:${minutes}`;
};

/**
 * 指定された日付の時間を取得
 * @param date 指定された日付 (文字列形式)
 * @returns 指定された日付の時間 (形式: HH:mm)
 */
export const getDesignatedDateTime = (date: string): string => {
  const specifiedDate = new Date(date);
  
  // 有効な日付かどうかを確認
  if (isNaN(specifiedDate.getTime())) {
    throw new Error('無効な日付形式です。');
  }

  const hours = padZero(specifiedDate.getHours());
  const minutes = padZero(specifiedDate.getMinutes());
  return `${hours}:${minutes}`;
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
