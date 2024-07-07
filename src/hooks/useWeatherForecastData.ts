import { useQuery } from "@tanstack/react-query";
import { WeatherForecastResponse } from "../types/weatherTypes";

const fetchWeatherForecastData = async (): Promise<WeatherForecastResponse> => {
  const response = await fetch("/api/forecast");
  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast data");
  }
  return response.json();
};

export const useWeatherForecastData = () => {
  return useQuery({
    queryKey: ["weatherForecastData"],
    queryFn: fetchWeatherForecastData,
  });
};
