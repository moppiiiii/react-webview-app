import { ApiError } from "../errors/ApiError";

/**
 * フェッチ関数
 * @param url - リクエスト先のURL
 * @returns Promise<T> - パースされたJSONデータ
 * @throws ネットワークがオフラインの場合や、レスポンスが正常でない場合にエラーをスロー
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(`APIエラーが発生しました`, 401, response.statusText);
  }

  return response.json();
};
