import Button from "@/components/button";
import Card from "@/components/card";
import { CardsSkeleton } from "@/components/skeletons";
import { useWeatherData } from "@/src/hooks/useWeatherData";
import { useRouter } from "next/router";

export interface WeatherData {
  area: string;
  forecast: string;
}

export default function Now() {
  const router = useRouter();
  const { data: weatherData, isError, isLoading, refetch } = useWeatherData();
  return (
    <div>
      <main>
        <div className="bg-[url('./public/background.jpg')] h-screen bg-cover bg-center">
          <div className="absolute left-4 top-4">
            <Button title="back" onClick={() => router.push("/")}></Button>
          </div>
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">
              What&apos;s it like outside?
            </h1>
            {isError && (
              <div className="flex flex-row items-center gap-4">
                <p className="text-center text-red-600 text-3xl font-bold">
                  Failed to fetch weather data
                </p>
                <Button title="Retry" onClick={refetch} />
              </div>
            )}
            {isLoading && <CardsSkeleton />}
            <div className="w-[60%] flex flex-row gap-4">
              {weatherData &&
                weatherData.items.map((data, i) => (
                  <Card
                    key={i}
                    weatherData={data}
                    additionalClassNames="flex-1"
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
