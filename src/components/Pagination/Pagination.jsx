import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="flex items-center space-x-2">
        <button
          className={`p-2 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary"
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack size={25} />
        </button>
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            className={`p-2 w-10 h-10 rounded-[50%] font-semibold ${
              currentPage === number ? "bg-primary text-white " : " "
            }`}
            onClick={() => typeof number === "number" && onPageChange(number)}
            disabled={typeof number !== "number"}
          >
            {number}
          </button>
        ))}
        <button
          className={`p-2 ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary"
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward size={25} />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
