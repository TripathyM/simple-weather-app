import { render, screen, waitFor, within } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/node";
import Now from "../now";
import { nowResponse } from "@/mocks/data";

const NOW_API_PATH = "/api/now";

describe("Now page", () => {
  it("should show the weather data for cities retrieved from api", async () => {
    render(<Now />);

    await waitFor(() => {
      nowResponse.items.forEach((item, idx) => {
        const weatherCard = screen.getByTestId(`weather-card-${idx}`);
        expect(within(weatherCard).getByText(item.area)).toBeInTheDocument();
        expect(
          within(weatherCard).getByText(item.forecast),
        ).toBeInTheDocument();
      });
    });
  });

  it("should show error message and retry button on failure of weather data retrieval", async () => {
    server.use(
      http.get(NOW_API_PATH, () => {
        return HttpResponse.json({ items: [] }, { status: 500 });
      }),
    );

    render(<Now />);

    expect(
      await screen.findByText("Failed to fetch weather data"),
    ).toBeVisible();

    expect(
      screen.getByRole("button", {
        name: "Retry",
      }),
    );
  });

  it("should retry fetching weather data on click of retry button", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(
        NOW_API_PATH,
        () => {
          return HttpResponse.json({ items: [] }, { status: 500 });
        },
        {
          once: true,
        },
      ),
    );

    render(<Now />);

    const retryButton = await screen.findByRole("button", { name: "Retry" });

    user.click(retryButton);

    await waitFor(() => {
      nowResponse.items.forEach((_, idx) => {
        expect(screen.getByTestId(`weather-card-${idx}`)).toBeVisible();
      });
    });
  });

  it("should remove error message and retry button on successful weather data retrieval", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(
        NOW_API_PATH,
        () => {
          return HttpResponse.json({ items: [] }, { status: 500 });
        },
        {
          once: true,
        },
      ),
    );

    render(<Now />);

    const retryButton = await screen.findByRole("button", { name: "Retry" });

    user.click(retryButton);

    await waitFor(() => {
      expect(screen.queryByText("Failed to fetch weather data")).toBeNull();
      expect(screen.queryByRole("button", { name: "Retry" })).toBeNull();
    });
  });
});
