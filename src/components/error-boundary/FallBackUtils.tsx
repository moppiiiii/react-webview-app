import ErrorDialog from "./ErrorDialog";
import GenericErrorPage from "./GenericErrorPage";

export interface AppError extends Error {
  statusCode?: number;
  isNetworkError?: boolean;
}

export function getFallbackUI(error: AppError | null): JSX.Element {
  if (!error) {
    return <GenericErrorPage message="表示に失敗しました" />;
  }

  const { statusCode, isNetworkError } = error;

  if (isNetworkError) {
    return (
      <ErrorDialog
        message="表示に失敗しました（ネットワークが見つかりません）。接続を確認後、再試行してください。"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (statusCode !== undefined) {
    if (statusCode === 400) {
      return (
        <ErrorDialog message="表示に失敗しました（入力が不正です）。修正して再試行してください。" />
      );
    }
    if (statusCode === 401 || statusCode === 403) {
      return (
        <ErrorDialog message="表示に失敗しました（認証または権限に問題があります）。ログイン状況を確認してください。" />
      );
    }
    if (statusCode === 404) {
      return (
        <ErrorDialog message="表示に失敗しました（対象が見つかりません）。URL等を再確認してください。" />
      );
    }
    if (statusCode === 429) {
      return (
        <ErrorDialog message="表示に失敗しました（リクエストが多すぎます）。少し待ってから再試行してください。" />
      );
    }
    if (statusCode >= 500) {
      return (
        <GenericErrorPage message="表示に失敗しました（サーバエラー発生）。後ほどお試しください。" />
      );
    }
  }

  // ステータスコードなし、想定外エラー
  return <GenericErrorPage message="表示に失敗しました" />;
}
