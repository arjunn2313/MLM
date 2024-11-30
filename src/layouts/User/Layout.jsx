import { Outlet } from "react-router-dom";
import { useRef } from "react";
import ScrollToTop from "../../utils/scrollToTop";
import { Agent } from "../../constatnts/MenuTxt";
import Sidebar from "../../components/Layout/user/SideBar";
import Navbar from "../../components/Layout/user/Navbar";

const UserLayout = () => {
  const mainContentRef = useRef(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={Agent} className="h-screen overflow-y-auto" />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main ref={mainContentRef} className="flex-grow p-5 overflow-y-auto">
          <ScrollToTop targetRef={mainContentRef} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
