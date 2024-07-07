import React from "react";

const CardSkeleton = () => {
  return (
    <div className="opacity-80 bg-gray-300 max-w-sm rounded-lg shadow-md overflow-hidden flex-1 animate-pulse">
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-400 rounded-full"></div>
        <div className="h-4 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export const CardsSkeleton = ({ count = 4 }) => {
  const skeletonCards = Array(count).fill(null); // Create an array with the specified count

  return (
    <div className="w-[60%] flex flex-row gap-4">
      {skeletonCards.map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
