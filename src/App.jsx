import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Management/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeProfile from "./pages/EmployeeProfile/List";
import AddNewEmployee from "./pages/EmployeeProfile/AddNew";
import EmployeePreview from "./pages/EmployeeProfile/EmployeePreview";
import { Toaster } from "react-hot-toast";
import LeaveList from "./pages/Attendence/LeaveSettings/LeaveList";
import LeaveForm from "./pages/Attendence/LeaveSettings/LeaveForm";
import HolidayList from "./pages/Attendence/HolidayList/HolidayList";
import HolidayForm from "./pages/Attendence/HolidayList/HolidayForm";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";

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
        path: "hiring",
        element: <Dashboard />,
      },
      {
        path: "employee-profile",
        children: [
          {
            path: "",
            element: <EmployeeProfile />,
          },
          {
            path: "create",
            element: <AddNewEmployee />,
          },
          {
            path: "preview/:id",
            element: <EmployeePreview />,
          },
        ],
      },
      {
        path: "attendance",
        children: [
          {
            path: "leave-settings",
            element: <LeaveList />,
          },
          {
            path: "leave-settings/create",
            element: <LeaveForm />,
          },
          {
            path: "holiday-list",
            element: <HolidayList />,
          },
          {
            path: "holiday-list/create",
            element: <HolidayForm />,
          },
        ],
      },
      {
        path: "assign-task",
        element: <Dashboard />,
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
