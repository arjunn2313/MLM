import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetails, useUpdateProductStatus } from "../../../../hooks/useProduct";
import Heading from "../../../../components/Headings/Headings";
import { CiEdit } from "react-icons/ci";
import ProductPreviewCard from "../../../../components/Product/ProductPreviewCard";
import Spinner from "../../../../components/loaders/Spinner";
import { LuUpload } from "react-icons/lu";

export default function CrackersPreview() {
  const { id } = useParams();
  const { data,isLoading } = useProductDetails(id);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { mutate } = useUpdateProductStatus();

  const handleUpdate = () => {
    mutate({ status, id });
  };

  useEffect(() => {
    if (data) {
      setStatus(data?.status);  
    }
  }, [data]);

  const handleImageUpload = () => {}
   

  return (
    <div className="container mx-auto bg-white p-4">
      <div className="flex justify-between items-center">
        <Heading text="New Product" color="default" />
        <div>
          <button
            className="text-primary hover:text-blue-700 flex items-center justify-center gap-2"
            onClick={() => navigate(`/register/update/${id}`)}
          >
            <CiEdit />
            Edit
          </button>
        </div>
      </div>

      {/* CARD */}
      <ProductPreviewCard data={data} />

      {/* Status */}
      <div className="mt-5 grid grid-cols-2 w-3/4 ml-3">
        <label className="font-medium">Status</label>
        <div className="flex items-center space-x-10 mt-2 font-semibold">
          {["active", "inactive", "out of stock"].map((statusOption) => (
            <label key={statusOption} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={statusOption}
                checked={status === statusOption}
                onChange={() => setStatus(statusOption)}
                className={`form-radio ${
                  statusOption === "active"
                    ? "text-green-500"
                    : statusOption === "inactive"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              />
              <span
                className={`ml-2 ${
                  statusOption === "active"
                    ? "text-green-500"
                    : statusOption === "inactive"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div className="mt-6 ml-3">
        <label className="font-medium">Photos</label>
        <div className="flex items-center space-x-4 mt-4">
          {data?.photos?.map((img, ind) => (
            <div key={ind} className="relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id={`fileInput-${ind}`}
                onChange={(e) => handleImageUpload(e, ind)}
              />
              <LuUpload
                className="absolute border rounded-full p-1 border-red-500 top-0 left-0 m-1 cursor-pointer"
                color="red"
                size={25}
                onClick={() =>
                  document.getElementById(`fileInput-${ind}`).click()
                }
              />
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${img}`}
                alt="Product"
                className="h-24 w-24 object-cover rounded-lg border"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex items-end justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Upload
        </button>
      </div>
    </div>
  );
}