import React from "react";
import LoadingBox from "../../Loaders/LoadingBox";

const CategoryCard = ({ stat, color, icon, count, isLoading }) => {
  const formatCount = (count) => {
    return count < 10 ? `0${count}` : `${count}`;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border ${color} `}>
      {isLoading ? (
        <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
      ) : (
        <div className="flex  justify-between">
          <span className="flex justify-between items-center gap-6">
            <span>
              <img src={icon} className={`bg-${color}-100 rounded-lg`} />
            </span>
            <div>
              <h1 className="text-4xl text-primary font-semibold">
                {formatCount(count)}
              </h1>
              <h2 className="text-gray-600">{stat}</h2>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
