import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import Preview from "../pages/admin/Register/Preview";
import RegisterForm from "../pages/admin/Register/RegisterForm";
import RegisterTable from "../pages/admin/Register/RegisterTable";
import RegistrationCondition from "../pages/admin/Register/RegistrationCondition";
import UpdateDetails from "../pages/admin/Register/UpdateDetails";

const AdminRoute = [
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
      { path: "update/:memberId", element: <UpdateDetails /> },
    ],
  },
];

export default AdminRoute;
