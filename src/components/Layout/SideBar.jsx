import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Sidebar = ({ items }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col  shadow-lg">
      <div className="flex items-center mt-2">
        <div className="bg-primary text-white px-10 py-1 my-2  text-2xl  text-center rounded-r-full  font-bold">
          S I P
        </div>
      </div>
      <div className="overflow-hidden hover:overflow-y-auto scrollbar-hide pt-2">
        <ul className="text-[19px] p-5 flex flex-col gap-5">
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
                {item.submenu && (
                  <MdOutlineKeyboardArrowDown
                    onClick={() => handleSubmenuToggle(index)}
                    className={`ml-auto transform transition-transform duration-300 ${
                      openSubmenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>
              {item.subHeading && 
               <li className=" flex items-center text-orange-800 font-bold border-b-2 border-orange-800">
               {item.subicon && <item.subicon className="mr-2" />}
               <span>{item.subHeading}</span>
               </li>
}
              {/* Check if the item has a submenu */}
              {item.submenu && openSubmenu === index && (
                <div className="ml-2 mt-2 flex flex-col space-y-3 text-[15px] relative">
                  <div className="absolute top-8 left-[13px] w-[2px] h-24 bg-gray-300"></div>

                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="relative flex items-center group cursor-pointer  "
                    >
                      <div className="absolute w-2 h-2 bg-[#345261] rounded-full left-[10px] group-hover:bg-[#345261]"></div>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center py-2 pl-8 text-gray-700 transition-colors rounded-md duration-300 ${
                            isActive
                              ? "text-[#345261] font-medium"
                              : "hover:bg-[#f0f0f0] hover:text-[#345261]"
                          }`
                        }
                      >
                        <span>{subItem.label}</span>
                      </NavLink>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
