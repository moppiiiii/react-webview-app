import React, { ReactNode, useContext } from "react";
import { OfflineContext } from "./OfflineContext";

interface OfflineBoundaryProps {
  children: ReactNode;
}

export const OfflineBoundary: React.FC<OfflineBoundaryProps> = ({
  children,
}) => {
  const { isOnline } = useContext(OfflineContext);

  if (!isOnline) {
    // オフライン時はここでエラーを投げてErrorBoundaryによるErrorFallbackを表示する
    throw new Error("Offline Error: The application is offline.");
  }

  return <>{children}</>;
};
