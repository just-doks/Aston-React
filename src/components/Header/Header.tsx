import "./Header.css";
import Logo from "../../assets/logo";
import { NavLink } from "react-router";
import { PATHS } from "../../utils/constants";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";


export const Header = () => {

  const user = useSelector((state: RootState) => state.auth.loginUser)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div className="container header_wrapper">
        <NavLink to={PATHS.HOME}>
          <Logo />
        </NavLink>
        {isAuth ? (
          <div className="header_buttons">
            <NavLink className="header_button" to={PATHS.FAVORITES}>
              Favorites
            </NavLink>
            <NavLink className="header_button" to={PATHS.HISTORY}>
              History
            </NavLink>
            <p className="header_username">Hi, {user?.username}</p>
            <button onClick={handleLogout} className="header_button">Logout</button>
          </div>
        ) : (
          <div className="header_buttons">
            <NavLink className="header_button" to={PATHS.SIGNIN}>
              Sign in
            </NavLink>
            <NavLink className="header_button" to={PATHS.SIGNUP}>
              Sing up
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};