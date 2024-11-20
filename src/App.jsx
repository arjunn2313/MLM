import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Management/Layout";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./routes/AdminRoute";
import NotFound from "./components/Warnings/NotFound";
import AdminLogin from "./pages/admin/Auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: AdminRoutes,
      },
    ],
  },
  {
    path: "admin-login",
    element: (
      <PublicRoute
        element={<AdminLogin />}
        redirectPath="/"
        isAuthenticated={!!localStorage.getItem("accessToken")}
      />
    ),
  },
  {
    path: "*",
    element: <NotFound />,
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
