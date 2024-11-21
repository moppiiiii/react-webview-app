/**
 * フェッチ関数
 * @param url
 * @returns
 */
export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());
