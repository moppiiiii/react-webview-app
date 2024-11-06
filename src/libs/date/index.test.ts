import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getCurrentDate,
  getCurrentTime,
  getDesignatedDateTime,
  getTimeZoneClassification,
} from "./";
import { format } from "date-fns";
import { TIME_ZONE_CLASSIFICATION } from "./constants";

describe("date libs", () => {
  // 固定する日時を設定
  const 固定日時 = new Date("2023-08-15T12:34:56Z"); // UTC時間

  beforeEach(() => {
    // フェイクタイマーを使用してシステム時刻を固定
    vi.useFakeTimers();
    vi.setSystemTime(固定日時);
  });

  afterEach(() => {
    // フェイクタイマーをリセット
    vi.useRealTimers();
  });

  describe("getCurrentDate 関数", () => {
    it('現在の日付が "yyyy-MM-dd" 形式で返されること', () => {
      const 期待される日付 = format(固定日時, "yyyy-MM-dd");
      const 現在の日付 = getCurrentDate();
      expect(現在の日付).toBe(期待される日付);
    });
  });

  describe("getCurrentTime 関数", () => {
    it('現在の時間が "HH:mm" 形式で返されること', () => {
      const 期待される時間 = format(固定日時, "HH:mm");
      const 現在の時間 = getCurrentTime();
      expect(現在の時間).toBe(期待される時間);
    });
  });

  describe("getDesignatedDateTime 関数", () => {
    it("指定された日付の時間を正しくフォーマットできること", () => {
      const input = "2024-11-06 11:00:00";
      const expected = "11:00";
      expect(getDesignatedDateTime(input)).toBe(expected);
    });
  });

  describe("getTimeZoneClassification 関数", () => {
    // テスト用の時間と期待される分類のペア
    const テストケース = [
      { input: 5, expected: TIME_ZONE_CLASSIFICATION.MORNING },
      { input: 11, expected: TIME_ZONE_CLASSIFICATION.MORNING },
      { input: 12, expected: TIME_ZONE_CLASSIFICATION.NOON },
      { input: 14, expected: TIME_ZONE_CLASSIFICATION.NOON },
      { input: 15, expected: TIME_ZONE_CLASSIFICATION.EVENING },
      { input: 18, expected: TIME_ZONE_CLASSIFICATION.EVENING },
      { input: 19, expected: TIME_ZONE_CLASSIFICATION.NIGHT },
      { input: 4, expected: TIME_ZONE_CLASSIFICATION.NIGHT },
    ];

    テストケース.forEach(({ input, expected }) => {
      it(`"${input}" の場合、タイムゾーンが "${expected}" と分類されること`, () => {
        const 結果 = getTimeZoneClassification(input);
        expect(結果).toBe(expected);
      });
    });
  });
});
