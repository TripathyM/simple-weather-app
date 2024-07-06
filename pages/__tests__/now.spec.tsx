import { render, screen, waitFor } from "@testing-library/react";
import Now from "../now";

describe("Now page", () => {
  it("shows the weather data", async () => {
    render(<Now />);

    await waitFor(() => {
      expect(screen.getByText("Boon Lay")).toBeInTheDocument();
    });
  });
});
