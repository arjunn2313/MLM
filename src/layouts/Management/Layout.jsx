import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/SideBar";
import Management from "../../constatnts/MenuTxt";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={Management} className="h-screen overflow-y-auto" />
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Navbar />
        <main className="flex-grow p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
