import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { getFallbackUI, AppError } from "./FallBackUtils";

function ErrorFallback({ error }: FallbackProps) {
  // errorをAppError型として扱う
  const appError = error as AppError;
  // 状況に応じたUIを取得
  const fallbackUI = getFallbackUI(appError);

  return fallbackUI;
}

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
