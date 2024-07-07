import Button from "@/components/button";
import Card from "@/components/card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface WeatherData {
  area: string;
  forecast: string;
}

export default function Now() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isError, setError] = useState<boolean>(false);

  const getWeatherData = async () => {
    try {
      const fetchResponse = await fetch("/api/now");
      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const responseJson = await fetchResponse.json();
      setWeatherData(responseJson.items);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

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
                <p className="text-center text-red-600 font-bold">
                  Failed to fetch weather data
                </p>
                <Button title="Retry" onClick={getWeatherData} />
              </div>
            )}
            <div className="w-[60%] flex flex-row gap-4">
              {weatherData.map((data, i) => (
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
