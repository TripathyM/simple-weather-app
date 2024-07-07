import { PredictionData, WeatherData } from "@/src/types/weatherTypes";
import Card from "../card";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

const ForecastCards = ({ dataItems }: { dataItems: PredictionData[] }) => {
  return (
    <div className="w-[60%] flex flex-row gap-4">
      {dataItems.map((data, i) => (
        <Card
          data-testid={`forecast-card-${i}`}
          key={i}
          title={formatDate(data.date)}
          description={data.prediction}
          additionalClassNames="flex-1"
        />
      ))}
    </div>
  );
};

export default ForecastCards;
