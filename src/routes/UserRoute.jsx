import { Children } from "react";
import UserDashboard from "../pages/user/Dashboard/UserDashboard";
import MyTree from "../pages/user/MyTree/MyTree";
import EarningHistory from "../pages/user/EarningHistory/EarningHistory";
import PurchaseHistory from "../pages/user/PurchaseHistory/PurchaseHistory";
import RegisterForm from "../pages/user/Register/RegisterForm";

const AgentRoute = [
  {
    // index: true,
    path: "dashboard",
    element: <UserDashboard />,
    Children: [],
  },
  {
    path: "my-tree",
    element: <MyTree />,
  },
  {
    path: "purchase-history",
    element: <PurchaseHistory />,
  },
  {
    path: "earnings-history",
    element: <EarningHistory />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
];

export default AgentRoute;
