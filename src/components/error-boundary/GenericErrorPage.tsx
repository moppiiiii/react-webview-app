import React from "react";

interface GenericErrorPageProps {
  message: string;
}

const GenericErrorPage: React.FC<GenericErrorPageProps> = ({ message }) => (
  <div className="generic-error-page">
    <h1>{message}</h1>
    <p>お手数ですが、ページを再読み込みするか後ほどお試しください。</p>
  </div>
);

export default GenericErrorPage;
