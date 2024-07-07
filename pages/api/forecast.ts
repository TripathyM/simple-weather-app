import {
  ErrorResponse,
  WeatherForecastResponse,
} from "@/src/types/weatherTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherForecastResponse | ErrorResponse>,
) {
  if (req.method === "GET") {
    const fetchResponse = await fetch(
      "https://birdsofaweather.netlify.app/api/weather/forecast",
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
