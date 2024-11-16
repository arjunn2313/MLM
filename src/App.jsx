import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Management/Layout";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: AdminRoutes,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
