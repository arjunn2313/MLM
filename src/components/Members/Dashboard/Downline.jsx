import React from "react";
import { useNavigate } from "react-router-dom";
import downline from "../../../assets/downline.svg";
import Heading from "../../Headings/Headings";

const DownlineMembers = ({ members }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 h-full bg-white shadow rounded-xl border-2 border-blue-400 overflow-hidden">
      <Heading text="Downline Members" />

      <div className="  overflow-y-auto mt-3">
        {members?.children?.map((member, index) => (
          <div
            key={index}
            className="flex items-center space-x-4  py-2 border-b"
          >
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${
                member?.registrationId?.applicantPhoto
              }`}
              alt="down"
              className="w-9 h-9 border-2 border-blue-500 rounded-full"
            />
            <div>
              <p className="font-bold">{member?.registrationId?.name}</p>
              <p className="text-gray-700 text-sm">{member.memberId}</p>
            </div>
          </div>
        ))}
        {members?.children?.length < 5 && (
          <div
            className="flex items-center space-x-4 py-2 border-b cursor-pointer"
            onClick={() =>
              navigate(`/register/form?sponsorId=${members?.memberId}`)
            }
          >
            <img src={downline} alt="downline" className="w-12 h-12" />
            <div className="text-custom-orange font-semibold">Add</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownlineMembers;
