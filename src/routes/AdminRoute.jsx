import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import Preview from "../pages/admin/Register/Preview";
import RegisterForm from "../pages/admin/Register/RegisterForm";
import RegisterTable from "../pages/admin/Register/RegisterTable";
import RegistrationCondition from "../pages/admin/Register/RegistrationCondition";
import UpdateDetails from "../pages/admin/Register/UpdateDetails";
import BranchForm from "../pages/admin/Tree/Branch/BranchForm";
import BranchList from "../pages/admin/Tree/Branch/BranchList";
import HeadConditions from "../pages/admin/Tree/Branch/HeadConditions";
import DistrictList from "../pages/admin/Tree/District/DistrictList";
import BranchLayout from "../pages/admin/Tree/Structure/BranchLayout";

const AdminRoute = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "register",
    children: [
      { index: true, element: <RegisterTable /> },
      { path: "form", element: <RegisterForm /> },
      {
        path: "form/terms-and-condition",
        element: <RegistrationCondition />,
      },
      { path: "preview/:memberId", element: <Preview /> },
      { path: "update/:memberId", element: <UpdateDetails /> },
    ],
  },
  {
    path: "tree",
    children: [
      {
        path:"district",
        element: <DistrictList />,
      },
      { path: "district/:name/:districtId", element: <BranchList /> },
      { path: "district/:name/:districtId/new-tree", element: <BranchForm /> },
      { path: "district/:name/:districtId/new-tree/terms-and-condition", element: <HeadConditions /> },
      {
        path: "district/:name/:districtId/tree/:treeId/:headId/:treeName",
        element: <BranchLayout />,
      }
    ],
  },
];

export default AdminRoute;
