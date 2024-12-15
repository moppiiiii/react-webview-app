import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.page";
import Chart from "./pages/chart/Chart.page";
import Rechart from "./pages/rechart/Rechart.page";
import Carousel from "./pages/carousel/Carousel.page";
import NotFoundPage from "./pages/not-found/NotFound.page";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/rechart" element={<Rechart />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
