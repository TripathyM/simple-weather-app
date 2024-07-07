import { useQuery } from "@tanstack/react-query";
import { WeatherNowResponse } from "../types/weatherTypes";

const fetchWeatherNowData = async (): Promise<WeatherNowResponse> => {
  const response = await fetch("/api/now");
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const useWeatherNowData = () => {
  return useQuery({
    queryKey: ["weatherNowData"],
    queryFn: fetchWeatherNowData,
  });
};
