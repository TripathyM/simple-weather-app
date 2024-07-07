import { PredictionData, WeatherData } from "@/src/types/weatherTypes";
import Card from "../card";

const ForecastCards = ({ dataItems }: { dataItems: PredictionData[] }) => {
  return (
    <div className="w-[60%] flex flex-row gap-4">
      {dataItems.map((data, i) => (
        <Card
          data-testid={`forecast-card-${i}`}
          key={i}
          title={data.date}
          description={data.prediction}
          additionalClassNames="flex-1"
        />
      ))}
    </div>
  );
};

export default ForecastCards;
