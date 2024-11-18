import React, { useEffect } from "react";
import Heading from "../../../../components/Headings/Headings";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteCommision,
  useFetchJoiningFee,
  useUpdateSettings,
} from "../../../../hooks/useSettings";
import Spinner from "../../../../components/loaders/Spinner";

export default function SetCommision() {
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      referralCommission: "",
      commissions: [],
    },
  });

  const { data, isLoading } = useFetchJoiningFee();
  const { mutate: deleteCommission } = useDeleteCommision();
  const { mutate: updateSettings } = useUpdateSettings();

  useEffect(() => {
    if (data) {
      setValue("referralCommission", data.joiningFee);
      setValue("commissions", data.levelCommissions || []);
    }
  }, [data, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "commissions",
  });

  const onSubmit = (formData) => {
    const { referralCommission, commissions } = formData;

    updateSettings({
      referralCommission,
      commissions,
    });
  };

  const handleDelete = (id) => {
    deleteCommission(id);
  };

  if (isLoading) return <Spinner />;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4">
          <Heading text="Joining Fee" color="default" />
          <input
            type="text"
            className="border-2 border-blue-400 rounded-lg p-2 w-80 my-4"
            {...register("referralCommission")}
          />
          <Heading text="Set level wise commission" color="default" />

          {fields.map((field, index) => (
            <div
              key={field._id}
              className="flex items-center space-x-5 space-y-2 w-[90%] mb-2"
            >
              <input
                type="text"
                className="border-2 border-blue-400 rounded-lg p-2 w-full"
                {...register(`commissions.${index}.level`)}
                placeholder="Level"
              />
              <input
                type="text"
                className="border-2 border-blue-400 rounded-lg p-2 w-full"
                {...register(`commissions.${index}.amount`)}
                placeholder="Commission Amount (Rs)"
              />
              <button
                type="button"
                className="text-red-500 flex items-center justify-center gap-3"
                onClick={() => handleDelete(field._id)}
              >
                <RiDeleteBin6Line />
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mb-4 font-medium underline text-md"
            onClick={() =>
              append({
                level: "",
                amount: "",
                _id: Math.random().toString(36).substr(2, 9),
              })
            }
          >
            + Add values
          </button>
          <div className="flex justify-end py-5 space-x-4">
            <button
              type="button"
              className="text-red-500 font-medium px-4 py-2 rounded-lg text-lg"
              onClick={() => window.location.reload()}
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg"
              // disabled={saving}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white mt-3 p-10 rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Cash Debit</h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="levelwise-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="levelwise-debit" className="text-gray-700 text-lg">
              Level Wise Debit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="weekly-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="weekly-debit" className="text-gray-700 text-lg">
              Weekly Debit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="immediate-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="immediate-debit" className="text-gray-700 text-lg">
              Immediate Debit
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end py-5 space-x-4">
        <button
          className="text-red-500 font-medium px-4 py-2 rounded-lg text-lg"
          //   onClick={() => window.location.reload()}
        >
          Discard
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg"
          //   onClick={handleSaveChanges}
          //   disabled={saving}
        >
          Save
        </button>
      </div>
    </React.Fragment>
  );
}
