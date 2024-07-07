import { WeatherData } from "@/src/types/weatherTypes";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  additionalClassNames?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  additionalClassNames,
}) => {
  return (
    <div
      className={`opacity-80 bg-gray-300 max-w-sm rounded-lg shadow-md overflow-hidden ${additionalClassNames}`}
    >
      <div className="p-4">
        <h2 className="text-gray-700 text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
