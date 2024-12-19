// カスタムイベントの型定義
export interface AuthErrorEventDetail {
  status: number;
  message: string;
}

// カスタムイベント名
export const AUTH_ERROR_EVENT = "auth-error" as const;

// イベントを発火する関数
export const dispatchAuthErrorEvent = (detail: AuthErrorEventDetail) => {
  console.log("dispatchAuthErrorEvent", detail);
  const event = new CustomEvent<AuthErrorEventDetail>(AUTH_ERROR_EVENT, {
    detail,
    bubbles: true,
  });
  window.dispatchEvent(event);
};

// イベントリスナーを登録する関数
export const addAuthErrorListener = (
  handler: (event: CustomEvent<AuthErrorEventDetail>) => void,
) => {
  window.addEventListener(AUTH_ERROR_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener(AUTH_ERROR_EVENT, handler as EventListener);
  };
};
