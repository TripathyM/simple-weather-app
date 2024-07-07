import { WeatherData } from "@/src/types/weatherTypes";
import Card from "../card";

const WeatherCards = ({ dataItems }: { dataItems: WeatherData[] }) => {
  return (
    <div className="w-[60%] flex flex-row gap-4">
      {dataItems.map((data, i) => (
        <Card
          data-testid={`weather-card-${i}`}
          key={i}
          title={data.area}
          description={data.forecast}
          additionalClassNames="flex-1"
        />
      ))}
    </div>
  );
};

export default WeatherCards;
