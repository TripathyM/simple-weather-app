// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/now", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
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
    });
  }),
];
