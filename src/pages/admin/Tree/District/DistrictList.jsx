import React, { useState } from "react";
import {
  useCreateDistrict,
  useDistrictList,
} from "../../../../hooks/useDistrict";
import { MdAdd } from "react-icons/md";
import DistrictCard from "../../../../components/Tree/District/DistrictCard";
import LoadingBox from "../../../../components/Loaders/LoadingBox";
import DistrictModal from "../../../../components/Tree/District/DistrictForm";

export default function DistrictList() {
  const { data: districts, isLoading } = useDistrictList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const { mutate, isPending } = useCreateDistrict();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setServerError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServerError("");
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        setIsModalOpen(false);
      },
      onError: (error) => {
        toast.error(`Submission failed: ${error}`);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-start gap-10 p-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingBox
            key={index}
            width="w-full"
            height="h-24"
            rounded="rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="w-full flex flex-wrap justify-start gap-10">
        {districts?.map((district) => (
          <DistrictCard key={district._id} district={district} />
        ))}
        <div
          onClick={handleOpenModal}
          className="bg-white cursor-pointer flex flex-col items-center justify-center space-y-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg border-2 border-dashed border-orange-300"
        >
          <MdAdd className="text-orange-400" size={35} />
          <span className="text-md text-orange-400 font-medium">New</span>
        </div>
      </div>

      <DistrictModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        serverError={serverError}
        loading={isPending}
      />
    </div>
  );
}
