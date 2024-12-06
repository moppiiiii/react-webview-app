import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";

import "./wdyr.ts";
import AppRoutes from "./AppRoutes.tsx";
import ErrorBoundaryWrapper from "./components/error-boundary/ErrorBoundaryWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryWrapper>
      <AppRoutes />
    </ErrorBoundaryWrapper>
  </StrictMode>,
);
