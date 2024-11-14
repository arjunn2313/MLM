import { useForm } from "react-hook-form";
import Heading from "../../../components/Headings/Headings";
import InputField from "../../../components/Form/InputField";
import JoindedBox from "../../../components/Form/SelectBoxCombo";
import RadioField from "../../../components/Form/RadioField";
import SaveButton from "../../../components/Button/saveButton";

const statusOptions = [
  {
    value: "active",
    label: "Active",
    color: "text-green-500",
    textColor: "text-green-600",
  },
  {
    value: "inactive",
    label: "In Active",
    color: "text-red-500",
    textColor: "text-red-600",
  },
];



export default function LeaveForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isLoading = false;

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container bg-white mx-auto p-4 ">
      <Heading text="New Leave" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <InputField
            label="Leave Name"
            name="leaveName"
            register={register("leaveName", {
              required: "Leave Name is required",
            })}
            error={errors.leaveName}
          />
          <JoindedBox
            label="Number of Days"
            name="numberOfDays"
            register={register}
            options={["Monthly"]}
            error={errors.combinedField}
          />
          <JoindedBox
            label="Leave Valid From"
            name="leaveValidFrom"
            register={register}
            options={["Days"]}
            error={errors.combinedField}
          />
          <JoindedBox
            label="Apply Leave Before"
            name="applyLeaveBefore"
            register={register}
            options={["Days"]}
            error={errors.combinedField}
          />
          <RadioField
            label="Status"
            name="status"
            register={register}
            options={statusOptions}
          />
        </div>
        <div className="flex justify-end gap-5 mt-5 p-6">
          <SaveButton loading={isLoading} text="Save" loadingText="Saving..." />
        </div>
      </form>
    </div>
    
  );
}
