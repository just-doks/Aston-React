import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { HeaderContainer } from "./components/Header";
import { PATHS } from "./utils/constants";

const Layout = () => (
  <>
    <HeaderContainer />
    <main>
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Layout />,
    children: [{ path: PATHS.HOME, element: <HomePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
