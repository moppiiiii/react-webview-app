import React from "react";

interface ErrorDialogProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ message, onRetry }) => (
  <div role="dialog" aria-modal="true">
    <p>{message}</p>
    {onRetry && <button onClick={onRetry}>再試行</button>}
  </div>
);

export default ErrorDialog;
