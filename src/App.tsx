import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/header';

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
)

const HomePath = "/"

const router = createBrowserRouter([
  {
    path: HomePath,
    element: <Layout />,
    children: [
      { path: HomePath, element: <HomePage /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
