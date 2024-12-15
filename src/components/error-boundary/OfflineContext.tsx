import React, { createContext, ReactNode } from "react";
import { useNetworkStatus } from "./useNetworkStatus";

interface OfflineContextValue {
  isOnline: boolean;
}

export const OfflineContext = createContext<OfflineContextValue>({
  isOnline: true,
});

interface OfflineContextProviderProps {
  children: ReactNode;
}

export const OfflineContextProvider: React.FC<OfflineContextProviderProps> = ({
  children,
}) => {
  const isOnline = useNetworkStatus();

  return (
    <OfflineContext.Provider value={{ isOnline }}>
      {children}
    </OfflineContext.Provider>
  );
};
