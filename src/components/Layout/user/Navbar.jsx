import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const decoded = jwtDecode(token);

  const handleArrowClick = () => {
    setIsRotated(!isRotated);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRotated(!isRotated);
  };

  const handleCopy = () => {
    const textToCopy =  `${import.meta.env.VITE_BASE_URL}/#/refferal?sponsorId=${decoded?.memberId}`;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        toast.success("Link copied to clipboard");
      },
      (err) => {
        toast.error("Failed to copy text: ", err);
      }
    );
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
            src={`${import.meta.env.VITE_API_BASE_URL}/${decoded?.photoUrl}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full ml-4"
          />
          <span className="font-semibold text-gray-700">{decoded?.name}</span>
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
            <button
              className="border border-primary text-primary py-2 px-4 rounded-full"
              onClick={() => handleCopy()}
            >
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
                navigate(`/user/register?sponsorId=${decoded?.memberId}`);
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
