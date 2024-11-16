import React from "react";
import { memberKey } from "../../constatnts/Member";
import moment from "moment";

export default function MemberPreviewCard({data}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-3">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
        <div className="space-y-2 sm:space-y-4 font-medium">
          {memberKey.map((key, ind) => (
            <p key={ind}>{key}</p>
          ))}
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>{data?.memberId}</p>
          <p>{data?.name}</p>
          <p>{data?.parentName}</p>
          <p>{data?.phoneNumber}</p>
          <p>{data?.whatsAppNumber}</p>
          <p>{data?.occupation}</p>
          <p>{moment(new Date(data?.dateOfBirth)).format("DD-MM-YYYY")}</p>
          <p>{data?.gender}</p>
          <p>{data?.maritalStatus}</p>
          <p>{data?.panNumber}</p>
          <p>{data?.accountNumber}</p>
          <p>{data?.ifscCode}</p>
          <p>{data?.bankName}</p>
          <p>{data?.branchName}</p>
          <p>{data?.aadharNumber}</p>
          <p>{data?.address}</p>
          <p>{data?.nameOfNominee}</p>
          <p>{data?.relationshipWithNominee}</p>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${data.applicantPhoto}`}
          alt="member"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-sm"
        />
      </div>
    </div>
  );
}
