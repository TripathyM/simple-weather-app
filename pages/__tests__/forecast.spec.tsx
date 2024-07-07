import { render, screen, waitFor, within } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/node";
import Forecast from "../forecast";
import { forecastResponse } from "@/mocks/data";

const FORECAST_API_PATH = "/api/forecast";

describe("Forecast page", () => {
  it("should show the weather forecast data retrieved from api", async () => {
    render(<Forecast />);

    await waitFor(() => {
      forecastResponse.items.forEach((item, idx) => {
        const forecastCard = screen.getByTestId(`forecast-card-${idx}`);
        expect(within(forecastCard).getByText(item.date)).toBeInTheDocument();
        expect(
          within(forecastCard).getByText(item.prediction),
        ).toBeInTheDocument();
      });
    });
  });

  it("should show error message and retry button on failure of weather forecast data retrieval", async () => {
    server.use(
      http.get(FORECAST_API_PATH, () => {
        return HttpResponse.json({ items: [] }, { status: 500 });
      }),
    );

    render(<Forecast />);

    expect(
      await screen.findByText("Failed to fetch weather forecast data"),
    ).toBeVisible();

    expect(
      screen.getByRole("button", {
        name: "Retry",
      }),
    );
  });

  it("should retry fetching weather forecast data on click of retry button", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(
        FORECAST_API_PATH,
        () => {
          return HttpResponse.json({ items: [] }, { status: 500 });
        },
        {
          once: true,
        },
      ),
    );

    render(<Forecast />);

    const retryButton = await screen.findByRole("button", { name: "Retry" });

    user.click(retryButton);

    await waitFor(() => {
      forecastResponse.items.forEach((_, idx) => {
        expect(screen.getByTestId(`forecast-card-${idx}`)).toBeVisible();
      });
    });
  });

  it("should remove error message and retry button on successful weather data retrieval", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(
        FORECAST_API_PATH,
        () => {
          return HttpResponse.json({ items: [] }, { status: 500 });
        },
        {
          once: true,
        },
      ),
    );

    render(<Forecast />);

    const retryButton = await screen.findByRole("button", { name: "Retry" });

    user.click(retryButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Failed to fetch weather forecast data"),
      ).toBeNull();
      expect(screen.queryByRole("button", { name: "Retry" })).toBeNull();
    });
  });
});
