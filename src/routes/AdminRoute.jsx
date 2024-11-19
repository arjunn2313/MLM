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
import IncompletTable from "../pages/admin/IncompletedTree/IncompletTable";
import IncompleteDashboard from "../pages/admin/IncompletedTree/IncompleteDashboard";
import CompletedTable from "../pages/admin/CompletedTree/CompletedTable";
import CompletedDashboard from "../pages/admin/CompletedTree/CompletedDashboard";
import LevelsAnalyzer from "../pages/admin/Levels/LevelsAnalyzer";
import MembersTable from "../pages/admin/Members/MembersTable";
import MemberDashView from "../pages/admin/Members/MemberDashView";
import Refferal from "../pages/admin/Wallets/Refferal/Refferal";
import Commision from "../pages/admin/Wallets/Commision/Commision";
import Settings from "../pages/admin/Wallets/Settings/Settings";
import HeadsList from "../pages/admin/DistrictHead/HeadsList";
import HeadRegForm from "../pages/admin/DistrictHead/HeadRegForm";
import HeadPreview from "../pages/admin/DistrictHead/HeadPreview";
 
import { Navigate } from "react-router-dom";
import SnacksDashboard from "../pages/ecommerce/Snacks/Dashboard/SnacksDashboard";
import SnacksList from "../pages/ecommerce/Snacks/Upload/SnacksList";
import SnacksStock from "../pages/ecommerce/Snacks/Stock/SnacksStock";
import SnacksNewStock from "../pages/ecommerce/Snacks/Stock/SnacksNewStock";
import SnacksDataUpload from "../pages/ecommerce/Snacks/Upload/SnacksDataUpload";
import SnacksPreview from "../pages/ecommerce/Snacks/Upload/SnacksPreview";
import CrackersDashboard from "../pages/ecommerce/Crackers/Dashboard/CrackersDashboard";
import CrackersStock from "../pages/ecommerce/Crackers/Stock/CrackersStock";
import ExpenseList from "../pages/ecommerce/Expense/ExpenseList";
import Review from "../pages/ecommerce/ReviewsAndRatings/Review";
import Delivery from "../pages/ecommerce/Delivery/Delivery";

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
        path: "district",
        element: <DistrictList />,
      },
      { path: "district/:name/:districtId", element: <BranchList /> },
      { path: "district/:name/:districtId/new-tree", element: <BranchForm /> },
      {
        path: "district/:name/:districtId/new-tree/terms-and-condition",
        element: <HeadConditions />,
      },
      {
        path: "district/:name/:districtId/tree/:treeId/:headId/:treeName",
        element: <BranchLayout />,
      },
    ],
  },
  {
    path: "incomplete-tree",
    children: [
      { path: "", element: <IncompletTable /> },
      { path: ":memberId/tree-view", element: <IncompleteDashboard /> },
    ],
  },
  {
    path: "completed-tree",
    children: [
      { path: "", element: <CompletedTable /> },
      { path: ":memberId/tree-view", element: <CompletedDashboard /> },
    ],
  },
  {
    path: "levels-tracking",
    children: [{ path: "", element: <LevelsAnalyzer /> }],
  },
  {
    path: "members",
    children: [
      { path: "", element: <MembersTable /> },
      { path: ":memberId", element: <MemberDashView /> },
      // { path: ":memberId/expense", element: <MemberExpense /> },
    ],
  },
  {
    path: "wallet",
    children: [
      { index: true, path: "commission", element: <Commision /> },
      { path: "referal", element: <Refferal /> },
      { path: "settings", element: <Settings /> },
      { path: "", element: <Navigate to="commission" /> },
    ],
  },
  {
    path: "district-head",
    children: [
      { path: "", element: <HeadsList /> },
      { path: "registration", element: <HeadRegForm /> },
      { path: "preview/:memberId", element: <HeadPreview /> },
    ],
  },
  {
    path: "snacks",
    children: [
      { path: "dashboard", element: <SnacksDashboard /> },
      { path: "list", element: <SnacksList /> },
      { path: "list/add", element: <SnacksDataUpload/> },
      { path: "list/preview/:id", element: <SnacksPreview /> },
      // { path: "list/edit/:id", element: <SnacksUpdateProductForm /> },
      { path: "stock", element: <SnacksStock /> },
      { path: "stock/new", element: <SnacksNewStock /> },
      // { path: "stock/update/:id", element: <SnaksUpdateProduct /> },
      { path: "", element: <Navigate to="dashboard" /> },
    ],
  },
  {
    path: "crackers",
    children: [
      { path: "dashboard", element: <CrackersDashboard /> },
      // { path: "list", element: <CrackersList /> },
      // { path: "list/add", element: <CrackersUploadProducts /> },
      // { path: "list/preview/:id", element: <ProductPreview /> },
      // { path: "list/edit/:id", element: <UpdateProductForm /> },
      { path: "stock", element: <CrackersStock /> },
      // { path: "stock/new", element: <NewProduct /> },
      // { path: "stock/edit/:id", element: <CrackersStockEdit /> },
    ],
  },
  {
    path: "expense",
    children: [{ path: "", element: <ExpenseList/> }],
  },
  {
    path: "delivery",
    children: [{ path: "", element: <Delivery /> }],
  },
  {
    path: "reviews",
    children: [{ path: "", element: <Review /> }],
  },
];

export default AdminRoute;
