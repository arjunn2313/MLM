import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Management/Layout";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./routes/AdminRoute";
import NotFound from "./components/Warnings/NotFound";
import AdminLogin from "./pages/admin/Auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoutes";
import SignIn from "./pages/user/signIn";
import SignUp from "./pages/user/SignUp";
 

export const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const router = createHashRouter([
  // ADMIN ROUTE
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
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
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
