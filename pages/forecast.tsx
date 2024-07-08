import Button from "@/components/button";
import ErrorMessageWithRetry from "@/components/errorMessageWithRetry";
import { CardsSkeleton } from "@/components/skeletons";
import ForecastCards from "@/components/weather/forecastCards";
import { useWeatherForecastData } from "@/src/hooks/useWeatherForecastData";
import { useRouter } from "next/router";

export default function Now() {
  const router = useRouter();
  const {
    data: forecastData,
    isError,
    isLoading,
    refetch,
  } = useWeatherForecastData();

  return (
    <div>
      <div className="absolute left-4 top-4">
        <Button title="back" onClick={() => router.push("/")}></Button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">
          What&apos;s it like in the coming days?
        </h1>
        {isError && (
          <ErrorMessageWithRetry
            message="Failed to fetch weather forecast data"
            onRetry={refetch}
          />
        )}
        {isLoading && <CardsSkeleton />}
        {forecastData && <ForecastCards dataItems={forecastData.items} />}
      </div>
    </div>
  );
}
