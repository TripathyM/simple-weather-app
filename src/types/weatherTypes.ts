// Types for Now's weather data
export type WeatherData = {
  area: string;
  forecast: string;
};

export type WeatherNowResponse = {
  items: WeatherData[];
};

// Types for weather prediction data for future dates
export type PredictionData = {
  date: string;
  prediction: string;
};

export type WeatherForecastResponse = {
  items: PredictionData[];
};

// Common types for weather
export type ErrorResponse = {
  error: string;
};
