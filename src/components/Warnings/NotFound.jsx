import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";  

const NotFound = () => {
  const navigate = useNavigate();

  
  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <FaExclamationTriangle className="mx-auto text-red-500 text-6xl mb-4" />
        <h1 className="text-4xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={goHome}
          className=" border border-primary text-primary px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
