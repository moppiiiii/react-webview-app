import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.page";
import Chart from "./pages/chart/Chart.page";
import Rechart from "./pages/rechart/Rechart.page";
import Carousel from "./pages/carousel/Carousel.page";
import NotFoundPage from "./pages/not-found/NotFound.page";
import BadRequestPage from "./pages/400/BadRequest.page";
import UnauthorizedPage from "./pages/401/Unauthorized.page";
import ServerErrorPage from "./pages/500/ServerError.page";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/rechart" element={<Rechart />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/400" element={<BadRequestPage />} />
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
