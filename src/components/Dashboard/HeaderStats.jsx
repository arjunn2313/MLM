import React from "react";
import Spinner from "../loaders/Spinner";
import LoadingBox from "../Loaders/LoadingBox";

const HeaderStats = ({ stat, color, icon, count, isLoading }) => {
  const formatCount = (count) => {
    return count < 10 ? `0${count}` : `${count}`;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border ${color} `}>
      {isLoading ? (
        <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
      ) : (
        <div className="flex  justify-between">
          <span>
            <h1 className="text-4xl font-semibold">{formatCount(count)}</h1>
            <h2 className="text-gray-600">{stat.title}</h2>
          </span>
          <span>
            <img src={icon} className={`bg-${color}-100 rounded-lg`} />
          </span>
        </div>
      )}
    </div>
  );
};

export default HeaderStats;
