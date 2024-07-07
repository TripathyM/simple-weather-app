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
      const forecastCard0 = screen.getByTestId(`forecast-card-0`);
      expect(within(forecastCard0).getByText("Mon, Jul 8")).toBeInTheDocument();
      expect(
        within(forecastCard0).getByText(forecastResponse.items[0].prediction),
      ).toBeInTheDocument();

      const forecastCard1 = screen.getByTestId(`forecast-card-1`);
      expect(within(forecastCard1).getByText("Tue, Jul 9")).toBeInTheDocument();
      expect(
        within(forecastCard1).getByText(forecastResponse.items[1].prediction),
      ).toBeInTheDocument();

      const forecastCard2 = screen.getByTestId(`forecast-card-2`);
      expect(
        within(forecastCard2).getByText("Wed, Jul 10"),
      ).toBeInTheDocument();
      expect(
        within(forecastCard2).getByText(forecastResponse.items[2].prediction),
      ).toBeInTheDocument();

      const forecastCard3 = screen.getByTestId(`forecast-card-3`);
      expect(
        within(forecastCard3).getByText("Thu, Jul 11"),
      ).toBeInTheDocument();
      expect(
        within(forecastCard3).getByText(forecastResponse.items[3].prediction),
      ).toBeInTheDocument();
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
