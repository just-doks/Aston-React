import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Layout } from "./Layout";
import { PATHS } from "src/utils/constants";
import { privateRoutes, publicRoutes, RouteType } from "src/routes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useLoader } from "../../hooks/useLoader";

const renderRoutes = (routes: RouteType[]) => {
  return routes.map(({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));
};

export const AppRouter = () => {
  const loader = useLoader()
  return (
  <BrowserRouter>
    {loader}
    <Routes>
      <Route element={<Layout />}>
        {renderRoutes(publicRoutes)}
        <Route element={<ProtectedRoutes />}>
          {renderRoutes(privateRoutes)}
        </Route>
        <Route path="*" element={<Navigate to={PATHS.HOME} />} />
      </Route>
    </Routes>
  </BrowserRouter>
)};
