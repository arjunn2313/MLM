import React from "react";

const StatsCard = ({ title, amount, image }) => {
  return (
    <div className="p-5 bg-white border-2 border-blue-400 rounded-xl text-center flex items-center justify-evenly">
      <img src={image} />
      <div className="space-y-1">
        <p className="font-bold text-3xl text-blue-500">Rs. {amount}</p>
        <p className="text-sm text-start text-gray-600 font-normal">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;