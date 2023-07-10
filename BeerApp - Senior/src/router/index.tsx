import { BrowserRouter, Route, Routes } from "react-router-dom";
import Offline from "../views/Offline";
import NotFound from "../views/404";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { Suspense, lazy } from "react";

const Beer = lazy(() => import("../views/Beer"));
const Home = lazy(() => import("../views/Home"));
const BeerList = lazy(() => import("../views/BeerList"));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Menu>
        <Offline />
        <Routes>
          <Route index element={<Home />} />
          <Route path="beer">
            <Route index element={<BeerList />} />
            <Route path=":id" element={<Beer />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Menu>
    </Suspense>
  </BrowserRouter>
);

export default Router;
