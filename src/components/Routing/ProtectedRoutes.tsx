import { useSelector } from "react-redux";
import { isAuth as auth } from "../../utils/selectors";
import { Navigate, Outlet } from "react-router";
import { PATHS } from "../../utils/constants";

export const ProtectedRoutes = () => {
  const isAuth = useSelector(auth);
  return isAuth ? <Outlet /> : <Navigate to={PATHS.SIGNUP} replace />;
};
