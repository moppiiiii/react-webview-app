import React from "react";
import ErrorLayout from "../layouts/error-layout/Error.layout";

interface GenericErrorPageProps {
  message: string;
}

const GenericErrorPage: React.FC<GenericErrorPageProps> = ({ message }) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorLayout>
      <div className="generic-error-page">
        <h1>{message}</h1>
        <p>お手数ですが、ページを再読み込みするか後ほどお試しください。</p>
        <button onClick={handleRetry}>再試行</button>
      </div>
    </ErrorLayout>
  );
};

export default GenericErrorPage;
