import Button from "@/components/button";
import ErrorMessageWithRetry from "@/components/errorMessageWithRetry";
import { CardsSkeleton } from "@/components/skeletons";
import WeatherCards from "@/components/weather/weatherCards";
import { useWeatherNowData } from "@/src/hooks/useWeatherNowData";
import { useRouter } from "next/router";

export default function Now() {
  const router = useRouter();
  const {
    data: weatherData,
    isError,
    isLoading,
    refetch,
  } = useWeatherNowData();

  return (
    <div>
      <div className="absolute left-4 top-4">
        <Button title="back" onClick={() => router.push("/")}></Button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">
          What&apos;s it like outside?
        </h1>
        {isError && (
          <ErrorMessageWithRetry
            message="Failed to fetch weather data"
            onRetry={refetch}
          />
        )}
        {isLoading && <CardsSkeleton />}
        {weatherData && <WeatherCards dataItems={weatherData.items} />}
      </div>
    </div>
  );
}
