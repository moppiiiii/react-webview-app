import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./FallbackComponent";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // Reset any state if needed
        // For example, you might want to reset a form or retry a network request
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
