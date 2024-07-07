import { NextApiRequest, NextApiResponse } from "next";

type WeatherData = {
  area: string;
  forecast: string;
};

export type WeatherNowResponse = {
  items: WeatherData[];
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherNowResponse | ErrorResponse>,
) {
  if (req.method === "GET") {
    // Reminder: you can fetch the forecast data at https://birdsofaweather.netlify.app/api/weather/forecast
    const fetchResponse = await fetch(
      "https://birdsofaweather.netlify.app/api/weather/now",
    );
    if (fetchResponse.ok) {
      const responseJson = await fetchResponse.json();
      res.status(200).json(responseJson);
    } else {
      res.status(500).json({ items: [] });
    }
  } else {
    res.status(400).json({ error: "This API only supports GET requests" });
  }
}
