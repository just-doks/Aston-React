import "./Header.css";
import Logo from "../../assets/logo";
import { NavLink } from "react-router";

type TProps = {
  isAuth?: boolean;
  userName?: string;
};

const Header = ({ isAuth, userName }: TProps) => {
  return (
    <div className="header">
      <div className="container header_wrapper">
        <NavLink to="/">
          <Logo />
        </NavLink>
        {isAuth ? (
          <div className="header_buttons">
            <NavLink className="header_button" to="/favorites">
              Favorites
            </NavLink>
            <NavLink className="header_button" to="/history">
              History
            </NavLink>
            <p className="header_username">Hi, {userName}</p>
            <button className="header_button">Logout</button>
          </div>
        ) : (
          <div className="header_buttons">
            <NavLink className="header_button" to="/login">
              Sign in
            </NavLink>
            <NavLink className="header_button" to="/singin">
              Sing up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
