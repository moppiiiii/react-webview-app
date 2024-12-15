import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";

import "./wdyr.ts";
import AppRoutes from "./AppRoutes.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { OfflineContextProvider } from "./components/error-boundary/OfflineContext.tsx";
import { ErrorFallback } from "./components/error-boundary/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OfflineContextProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
          console.error("Logging error:", error, info);
        }}
        onReset={() => {
          console.log("Error boundary reset");
        }}
      >
        <AppRoutes />
      </ErrorBoundary>
    </OfflineContextProvider>
  </StrictMode>,
);
