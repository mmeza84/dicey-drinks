import { lazy } from "react";
import { Route, Routes } from "react-router";
import AuthenticatedRoute from "@/components/authenticated-route/AuthenticatedRoute";

const Home = lazy(() => import("./views/home/Home.tsx"));
const Login = lazy(() => import("./views/login/Login.tsx"));
const Logout = lazy(() => import("./views/logout/Logout.tsx"));
const Configure = lazy(() => import("./views/configure/Configure.tsx"));
const Roll = lazy(() => import("./views/roll/Roll.tsx"));

export default function RouterView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path="/configure" element={<Configure />} />
        <Route path="/roll" element={<Roll />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}
