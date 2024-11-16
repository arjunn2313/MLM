import React from 'react';

const LoadingBox = ({ width = 'w-full', height = 'h-24', rounded = 'rounded-md' }) => {
  return (
    <div className={`bg-gray-300 ${width} ${height} ${rounded} animate-pulse`}></div>
  );
};

export default LoadingBox;
