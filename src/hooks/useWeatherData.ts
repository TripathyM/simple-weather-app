import { WeatherNowResponse } from "@/pages/api/now";
import { useQuery } from "@tanstack/react-query";

const fetchWeatherData = async (): Promise<WeatherNowResponse> => {
  const response = await fetch("/api/now");
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const useWeatherData = () => {
  return useQuery({
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
  });
};
