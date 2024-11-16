import React, { useState } from "react";
import RadioGroup from "../Form/RadioGroup";
import SaveButton from "../Button/saveButton";
import { useUpdateMemberStatus } from "../../hooks/useMember";

export default function MemberStatusCard({ data }) {
  const memberId = data?._id;
  const [status, setStatus] = useState(data?.status);
  const { mutate, isPending, isError, error, isSuccess } =
    useUpdateMemberStatus();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    mutate({ data: { status }, memberId });
  };

  return (
    <div className="mt-3 p-3">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
        <div className="space-y-2 sm:space-y-4 font-medium">
          <p>Sponsor ID</p>
          <p>Placement ID</p>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>{data.sponsorId}</p>
          <p>{data.placementId}</p>
        </div>
      </div>

      <RadioGroup
        label="Status"
        name="status"
        options={[
          { label: "Approved", value: "Approved", color: "text-green-500" },
          { label: "Un Approved", value: "Un Approved", color: "text-red-500" },
        ]}
        selectedValue={status}
        onChange={handleStatusChange}
      />

      <div className="flex justify-end gap-5 mt-5 p-6">
        <SaveButton
          onClick={handleSave}
          loading={isPending}
          text="Save"
          loadingText="Saving..."
        />
      </div>
    </div>
  );
}
