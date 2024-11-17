import React from "react";
import user from "../../../assets/user.svg"
import level from "../../../assets/level.svg"
import sponsor from "../../../assets/sponsor.svg"
import phone from "../../../assets/phone.svg"

const HeadList = ({member}) => {
  return (
    <div className="bg-white   rounded-xl border-2 border-blue-400 py-1">
      <div className="p-4  flex flex-col md:flex-row   justify-around items-center">
        <div className="flex items-center space-x-5">
          <img src={user} alt="user" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">{member?.name}</h4>
            <p className="text-sm text-gray-600 ">{member?.memberId}</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src={level} alt="level" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">{member?.applicantPlacementLevel}</h4>
            <p className="text-sm text-gray-600 ">Level</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src={sponsor} alt="sponsor" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">{member?.sponsorId}</h4>
            <p className="text-sm text-gray-600 ">Sponsor ID</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src={sponsor} alt="sponsor" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">{member?.placementId}</h4>
            <p className="text-sm text-gray-600 ">Placement ID</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src={phone} alt="phone" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">{member?.phoneNumber}</h4>
            <p className="text-sm text-gray-500 ">Phone Number</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadList;