import { useEffect } from "react";
import { PATHS } from "../utils/constants";
import { isAuth as auth } from "../utils/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const useAuthRedirect = () => {
  const isAuth = useSelector(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate(PATHS.HOME);
    }
  }, [isAuth, navigate]);
};
