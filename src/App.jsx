import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Management/Layout";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import RegisterTable from "./pages/admin/Register/RegisterTable";
import RegisterForm from "./pages/admin/Register/RegisterForm";
import RegistrationCondition from "./pages/admin/Register/RegistrationCondition";
import Preview from "./pages/admin/Register/Preview";
import ScrollToTop from "./utils/scrollToTop";

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
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "register",
        children: [
          { path: "", element: <RegisterTable /> },
          { path: "form", element: <RegisterForm /> },
          {
            path: "form/terms-and-condition",
            element: <RegistrationCondition />,
          },
          { path: "preview/:memberId", element: <Preview /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
