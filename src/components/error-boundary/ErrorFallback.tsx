import { FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import { ApiError } from "../../libs/errors/ApiError";
import {
  addAuthErrorListener,
  dispatchAuthErrorEvent,
} from "../../libs/events/authEvents";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  useEffect(() => {
    // 認証エラーイベントのハンドラー
    const handleAuthError = (
      event: CustomEvent<{ status: number; message: string }>,
    ) => {
      if (event.detail.status === 401) {
        // トークンリフレッシュのロジックを実行
        console.log("トークンリフレッシュを実行");
        // TODO: 実際のトークンリフレッシュ処理を実装
        // refreshToken().then(() => resetErrorBoundary());
      }
    };

    // イベントリスナーを登録
    const cleanup = addAuthErrorListener(handleAuthError);
    return cleanup;
  }, [resetErrorBoundary]);

  // APIエラーの場合の特別な処理
  if (error instanceof ApiError) {
    // 401エラーの場合
    if (error.status === 401) {
      // 認証エラーイベントを発火
      dispatchAuthErrorEvent({
        status: error.status,
        message: "トークンの有効期限が切れました",
      });

      return (
        <div role="alert">
          <h2>認証エラー</h2>
          <p>認証の再実行中です。しばらくお待ちください...</p>
        </div>
      );
    }

    // その他のAPIエラーの場合
    return (
      <div role="alert">
        <h2>APIエラーが発生しました</h2>
        <p>ステータスコード: {error.status}</p>
        <p>エラー内容: {error.statusText}</p>
        <button onClick={resetErrorBoundary}>再試行</button>
      </div>
    );
  }

  // オフラインエラーの場合
  if (error.message.includes("Offline Error")) {
    return (
      <div role="alert">
        <h2>オフラインエラー</h2>
        <p>インターネット接続を確認してください</p>
        <button onClick={resetErrorBoundary}>再試行</button>
      </div>
    );
  }

  // その他のエラーの場合
  return (
    <div role="alert">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>再試行</button>
    </div>
  );
};
