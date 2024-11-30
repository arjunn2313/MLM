import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
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
      <div className="flex justify-end gap-5 items-center bg-white p-4 py-5">
        <div>
          <button
            onClick={handleArrowClick}
            className="border rounded-full py-2 px-6 text-primary border-primary"
          >
            New Registration
          </button>
        </div>
        <div className="flex items-center gap-5 border-l pl-4 px-5">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full ml-4"
          />
          <span className="font-semibold text-gray-700">John</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex pt-10 items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center space-y-5 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <MdOutlineClose size={24} />
            </button>
            <h3 className="text-2xl font-medium mb-4 text-primary text-center">
              New Registration
            </h3>
            <button className="border border-primary text-primary py-2 px-4 rounded-full">
              Share Registration Link
            </button>
            <div className="relative my-8 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              className="border border-primary text-primary py-2 px-4 rounded-full"
              onClick={() => {
                navigate("/user/register");
                handleCloseModal();
              }}
            >
              Registration Form
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
