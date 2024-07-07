// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { forecastResponse, nowResponse } from "./data";

export const handlers = [
  http.get("/api/now", () => {
    return HttpResponse.json(nowResponse);
  }),
  http.get("/api/forecast", () => {
    return HttpResponse.json(forecastResponse);
  }),
];
