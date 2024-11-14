import React from "react";

const Spinner = ({ size = "8", color = "blue-500", borderSize = "4" }) => {
  return (
    <div className={`flex justify-center items-center h-1/2`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-${borderSize} border-primary  border-r-transparent border-solid`}
        style={{ borderWidth: `${borderSize}px` }}
      ></div>
    </div>
  );
};

export default Spinner;
