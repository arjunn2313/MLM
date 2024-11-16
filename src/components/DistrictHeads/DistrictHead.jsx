import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Headings/Headings";
import { useDistrictHead } from "../../hooks/useDashboard";
import { MdAdd } from "react-icons/md";
import LoadingBox from "../Loaders/LoadingBox";

export default function DistrictHead() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDistrictHead();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
      <Heading text=" District Heads" />
      {isLoading ? (
        <LoadingBox width="w-full" height="h-64" rounded="rounded-md" />
      ) : (
        <>
          {data?.map((head, index) => (
            <div
              key={index}
              className="flex items-center mb-4 border-b-2 border-blue-50 py-4"
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${
                  head.applicantImage
                }`}
                alt={head.name}
                className="w-10 h-10 rounded-full mr-4 border-2 border-blue-500"
              />
              <div>
                <h3 className="text-md">{head.name}</h3>
                <p className="text-gray-400 text-sm font-medium">
                  {head.districtName}
                </p>
              </div>
            </div>
          ))}
          <div
            className="flex items-center mb-4 space-x-4 text-custom-orange font-semibold border-b-2 border-blue-50 pb-3 cursor-pointer "
            onClick={() => navigate("/district-head/registration")}
          >
            <span className="border rounded-full p-1 border-custom-orange">
              <MdAdd size={30} />
            </span>
            <div>
              <h5 className="text-md">Add District Head</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
