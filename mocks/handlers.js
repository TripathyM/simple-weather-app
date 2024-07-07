// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { nowResponse } from "./data";

export const handlers = [
  http.get("/api/now", () => {
    return HttpResponse.json(nowResponse);
  }),
];
