import "./AuthForm.css";
import { useFormik } from "formik";
import { NavLink } from "react-router";
import { PATHS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/authSlice";
import { RootState } from "../../store/store";
import * as Yup from "yup";

type AuthFormType = {
  type: "signin" | "signup";
};

export const AuthForm = ({ type }: AuthFormType) => {
  const isSignup = type === "signup";

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  type FormValues = {
    username: string;
    password: string;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: isSignup
        ? Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(15, "Maximum 15 characters")
            .required("Username requred")
        : Yup.string(),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .max(15, "Maximum 15 characters")
        .required("Password requred"),
    }),
    onSubmit: (values) => {
      if (isSignup) {
        dispatch(registerUser(values));
      }
      else {
        dispatch(loginUser(values))
      }
    },
  });

  return (
    <div className="container form">
      <div className="form_wrapper">
        <h1 className="form_title">{isSignup ? "Sign Up" : "Sign In"}</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="sign_form"
          autoComplete="false"
        >
          <label className="sign_label" htmlFor="username">
            Name
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            className="sign_input"
            type="text"
            name="username"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error-message">{formik.errors.username}</div>
          )}
          <label className="sign_label" htmlFor="password">
            Password
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            className="sign_input"
            type="text"
            name="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
          <button className="sign_button" type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
        {isSignup ? (
          <p className="link">
            Already registered? <NavLink to={PATHS.SIGNIN}>Sing In</NavLink>
          </p>
        ) : (
          <p className="link">
            New here? <NavLink to={PATHS.SIGNUP}>Sing Up</NavLink>
          </p>
        )}
        <span className="error">{auth.error}</span>
      </div>
    </div>
  );
};
