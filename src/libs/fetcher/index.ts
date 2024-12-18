/**
 * フェッチ関数
 * @param url - リクエスト先のURL
 * @returns Promise<T> - パースされたJSONデータ
 * @throws ネットワークがオフラインの場合や、レスポンスが正常でない場合にエラーをスロー
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  if (!navigator.onLine) {
    console.log("ネットワークがオフラインです。接続を確認してください。");
    throw new Error("ネットワークがオフラインです。接続を確認してください。");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `ネットワークエラー: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
