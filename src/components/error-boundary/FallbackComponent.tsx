import React from "react";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const FallbackComponent: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default FallbackComponent;
