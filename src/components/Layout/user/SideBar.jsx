import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineLogout,
} from "react-icons/md";

const Sidebar = ({ items }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg">
      <div className="flex items-center mt-2">
        <div className="bg-primary text-white px-10 py-1 my-2 text-2xl text-center rounded-r-full font-bold">
          S I P
        </div>
      </div>
      <div className="overflow-hidden hover:overflow-y-auto scrollbar-hide pt-2">
        <ul className="text-[19px] p-5 flex    flex-col gap-5">
          {items.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center text-gray-700 transition-colors rounded-md duration-300 ${
                    isActive
                      ? "text-primary font-medium"
                      : "hover:bg-[#f0f0f0] hover:text-[#345261]"
                  }`
                }
              >
                {item.icon && <item.icon className="mr-2" />}
                <span>{item.label}</span>{" "}
              </NavLink>
            </li>
          ))}
          <li
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="mb-4 flex items-center text-gray-700 transition-colors rounded-md duration-300 hover:bg-[#f0f0f0] hover:text-[#345261] cursor-pointer "
          >
            <span className="mr-2">
              <MdOutlineLogout />
            </span>{" "}
            Log Out
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
            <h3 className="text-lg font-semibold mb-4">Logout Confirmation</h3>
            <p>Are you sure you want to log out?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
