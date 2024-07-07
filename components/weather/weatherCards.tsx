import { WeatherData } from "@/src/types/weatherTypes";
import Card from "../card";

const WeatherCards = ({
  dataItems: weatherDataItems,
}: {
  dataItems: WeatherData[];
}) => {
  return (
    <div className="w-[60%] flex flex-row gap-4">
      {weatherDataItems.map((data, i) => (
        <Card
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
