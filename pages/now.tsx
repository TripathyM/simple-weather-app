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

  useEffect(() => {
    const getWeatherData = async () => {
      // const fetchResponse = await fetch("/api/now");
      // const responseJson = await fetchResponse.json();
      const responseJson = {
        items: [
          {
            area: "Boon Lay",
            forecast: "Partly Cloudy (Day)",
          },
          {
            area: "Punggol",
            forecast: "Partly Cloudy (Day)",
          },
          {
            area: "Sentosa",
            forecast: "Partly Cloudy (Day)",
          },
          {
            area: "Tampines",
            forecast: "Partly Cloudy (Day)",
          },
        ],
      };
      setWeatherData(responseJson.items);
    };
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
