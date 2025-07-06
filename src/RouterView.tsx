import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./views/home/Home.tsx"));
const Configure = lazy(() => import("./views/configure/Configure.tsx"));
const Roll = lazy(() => import("./views/roll/Roll.tsx"));

export default function RouterView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/configure" element={<Configure />} />
      <Route path="/roll" element={<Roll />} />
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}
