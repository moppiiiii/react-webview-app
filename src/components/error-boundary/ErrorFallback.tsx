import React, { useContext } from "react";
import { OfflineContext } from "./OfflineContext";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { isOnline } = useContext(OfflineContext);

  return (
    <div role="alert">
      {isOnline ? (
        <>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </>
      ) : (
        <>
          <h2>You are offline.</h2>
          <p>Please check your network connection.</p>
        </>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
