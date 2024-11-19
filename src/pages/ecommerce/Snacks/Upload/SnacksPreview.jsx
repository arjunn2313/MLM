import React, { useState } from "react";
import Heading from "../../../../components/Headings/Headings";
import { CiEdit } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetails, useUpdateProductStatus } from "../../../../hooks/useProduct";
import { LuUpload } from "react-icons/lu";
import ProductPreviewCard from "../../../../components/Product/ProductPreviewCard";
import toast from "react-hot-toast";

export default function SnacksPreview() {
  const { id } = useParams();
  const { data } = useProductDetails(id);
  const [status, setStatus] = useState(data?.status);
  const navigate = useNavigate();

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    // if (file && validImageTypes.includes(file.type)) {
    //   const numericIndex = Number(index);

    //   const updatedPhotos = [...formData.photos];
    //   updatedPhotos[numericIndex] = URL.createObjectURL(file);
    //   setFormData({ ...formData, photos: updatedPhotos });

    //   const formDataToSend = new FormData();
    //   formDataToSend.append("productImage", file);
    //   formDataToSend.append("index", numericIndex);

    //   try {
 
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //   }  
    // } else {
    //   toast.error("Please upload a valid image file (JPEG, PNG, GIF)");
    // }
  };

  const {mutate} = useUpdateProductStatus()

  const handleUpdate = () =>{
    mutate({status,id})
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2   p-3">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
          {data?.weight?.map((wt) => (
            <>
              <div className="space-y-2 sm:space-y-4 font-medium">
                <p>Weight</p>
                <p>Price</p>
              </div>
              <div className="space-y-2 sm:space-y-4">
                <p>
                  {wt?.value} {wt?.unit}
                </p>
                <p>{wt?.price} Rs</p>
              </div>
            </>
          ))}
        </div>
      </div>

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleUpdate}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
