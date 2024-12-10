import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const handleArrowClick = () => {
    setIsRotated(!isRotated);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRotated(!isRotated);
  };

  return (
    <>
      <div className="flex justify-end items-center bg-white p-4 py-5">
        <div className="flex items-center border-l pl-4">
          <span className="font-semibold text-gray-700">ADMIN</span>
          <FaUserShield className="w-6 h-6 mr-2" />

          <MdOutlineKeyboardArrowDown
            size={25}
            className={`transform transition-transform duration-300 cursor-pointer ${
              isRotated ? "rotate-180" : ""
            }`}
            onClick={handleArrowClick}
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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
    </>
  );
};

export default Navbar;
