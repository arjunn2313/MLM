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
import UserLayout from "./layouts/User/Layout";
import SignUp from "./pages/user/Auth/SignUp";
import SignIn from "./pages/user/Auth/SignIn";
import AgentRoute from "./routes/UserRoute";
import { GetRoleFromToken } from "./utils/CheckRole";


 
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
        // isAuthenticated={!!localStorage.getItem("accessToken")}
      />
    ),
  },
  {
    path: "/user",
    element: (
      <UserLayout>
        <Outlet />
      </UserLayout>
    ),
    children: [
      {
        element: <ProtectedRoute allowedRoles={["agent"]} />,
        children: AgentRoute,
      },
    ],
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
