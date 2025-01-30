import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignInPage, SignUpPage } from "./pages/AuthPages/AuthPages";
import { Header } from "./components/Header";
import { PATHS } from "./utils/constants";
import { useAuthWatcher } from "./hooks/useAuthWatcher";

const Layout = () => {
  useAuthWatcher();
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Layout />,
    children: [
      { path: PATHS.HOME, element: <HomePage /> },
      { path: PATHS.SIGNUP, element: <SignUpPage /> },
      { path: PATHS.SIGNIN, element: <SignInPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
