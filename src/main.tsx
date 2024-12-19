import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";

import "./wdyr.ts";
import AppRoutes from "./AppRoutes.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/error-boundary/ErrorFallback.tsx";
import { NetworkStatusCheck } from "./components/error-boundary/NetworkStatusCheck.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NetworkStatusCheck />
      <AppRoutes />
    </ErrorBoundary>
  </StrictMode>,
);
